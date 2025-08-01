const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Store OTPs
const otpStore = new Map();


const generateOtp = () => {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
};

app.get("/api/swiggy", async (req, res) => {
  try {
    const swiggyURL =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.9252007&lng=78.1197754&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

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
  const { id, tags } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing collection id" });
  }

  const baseUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.9252&lng=78.1197&collection=${id}`;
  const finalUrl = `${baseUrl}${tags ? `&tags=${encodeURIComponent(tags)}` : ""}&type=rcv2`;

  console.log("➡️ Requested Collection ID:", id);
  console.log("➡️ Requested Tags:", tags);
  console.log("➡️ Final Swiggy URL:", finalUrl);

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

    // 🛡️ Check if the response is actually JSON
    if (!contentType || !contentType.includes("application/json")) {
      const rawText = await response.text();
      console.error("❌ Swiggy returned non-JSON:", rawText.slice(0, 300));
      return res.status(500).json({
        error: "Swiggy returned non-JSON content",
        hint: "Maybe rate-limited or blocked. Try again.",
        raw: rawText,
      });
    }

    // ✅ JSON parse
    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("❌ Error fetching Swiggy collection:", error.message);
    res.status(500).json({ error: "Failed to fetch collection data" });
  }
});


// In your Express server (e.g. server.js)
app.get("/api/restaurant-menu", async (req, res) => {
  const { restaurantId } = req.query;

  const swiggyUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=9.9252007&lng=78.1197754&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await fetch(swiggyUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0", // Swiggy might reject unknown agents
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Menu fetch failed", err);
    res.status(500).json({ error: "Failed to fetch restaurant menu" });
  }
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

  otpStore.delete(phone); // remove OTP after verification
  res.json({ success: true, message: "OTP verified" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
