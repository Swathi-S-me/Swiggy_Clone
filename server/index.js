const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const fetch = require("node-fetch");
require("dotenv").config(); 


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Store OTPs
const otpStore = new Map();


const generateOtp = () => {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
};

const helpApiMap = {
  "partner-onboarding": "https://www.swiggy.com/dapi/support/v3/issues/partner-onboarding?",
  "faq": "https://www.swiggy.com/dapi/support/v3/issues/faq?",
  "legal": "https://www.swiggy.com/dapi/support/v3/issues/legal?",
  "instamart": "https://www.swiggy.com/dapi/support/v3/issues/instamart_onboarding?",
  "irctc": "https://www.swiggy.com/dapi/support/v3/issues/irctc_faq?",
};

app.get("/api/help/:key", async (req, res) => {
  const key = req.params.key;
  const url = helpApiMap[key];

  if (!url) return res.status(404).json({ error: "Invalid help key" });

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Help fetch failed", err);
    res.status(500).json({ error: "Failed to fetch help data" });
  }
});


app.get("/api/swiggy", async (req, res) => {
  try {
     const { lat = "9.9252007", lng = "78.1197754" } = req.query;
    const swiggyURL =
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(swiggyURL);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching Swiggy data:", error.message);
    res.status(500).json({ error: "Failed to fetch Swiggy data" });
  }
});

// send otp
app.post("/send-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone is required" });
  }

  const otp = generateOtp();
  otpStore.set(phone, otp); // Save OTP
 console.log(`Generated OTP for ${phone}: ${otp}`);

  res.json({ success: true, message: "OTP sent" });
});

app.get("/api/collection", async (req, res) => {
  const { id, tags , lat = "9.9252007", lng = "78.1197754"} = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing collection id" });
  }

  const baseUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${id}`;
  const finalUrl = `${baseUrl}${tags ? `&tags=${encodeURIComponent(tags)}` : ""}&type=rcv2`;

  // console.log("➡️ Requested Collection ID:", id);
  // console.log("➡️ Requested Tags:", tags);
  // console.log("➡️ Final Swiggy URL:", finalUrl);

  try {
    const response = await fetch(finalUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Referer": "https://www.swiggy.com/",
        "Origin": "https://www.swiggy.com",
      },
    });

    const contentType = response.headers.get("content-type");

    
    if (!contentType || !contentType.includes("application/json")) {
      const rawText = await response.text();
      console.error(" Swiggy returned non-JSON:", rawText.slice(0, 300));
      return res.status(500).json({
        error: "Swiggy returned non-JSON content",
        hint: "Maybe rate-limited or blocked. Try again.",
        raw: rawText,
      });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(" Error fetching Swiggy collection:", error.message);
    res.status(500).json({ error: "Failed to fetch collection data" });
  }
});



app.get("/api/restaurant-menu", async (req, res) => {
const { restaurantId, lat = "9.9252007", lng = "78.1197754" } = req.query;
if (!restaurantId) {
    return res.status(400).json({ error: "Missing restaurantId" });
  }

  const swiggyUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await fetch(swiggyUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0", 
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Menu fetch failed", err);
    res.status(500).json({ error: "Failed to fetch restaurant menu" });
  }
});

const users = []; 

app.get("/users", (req, res) => {
  const { phone } = req.query;
  const found = users.find(u => u.phone === phone);
  res.json(found ? [found] : []);
});

app.post("/users", (req, res) => {
  const { phone, name, email } = req.body;
  const exists = users.find(u => u.phone === phone);
  if (exists) return res.status(400).json({ error: "User already exists" });

  const newUser = { phone, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});


// verify otp
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  const storedOtp = otpStore.get(phone);

  if (!storedOtp) {
    return res.status(400).json({ success: false, message: "No OTP found" });
  }

  if (otp !== storedOtp) {
    return res.status(401).json({ success: false, message: "Invalid OTP" });
  }

  otpStore.delete(phone); 
  res.json({ success: true, message: "OTP verified" });
});


app.get("/api/search", async (req, res) => {
  try {
    const { lat, lng, str } = req.query;

    const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${str}&trackingId=&submitAction=ENTER&queryUniqueId=${Date.now()}`;

    const response = await fetch(swiggyUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Swiggy API failed: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching Swiggy search:", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    const line_items = cart.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
