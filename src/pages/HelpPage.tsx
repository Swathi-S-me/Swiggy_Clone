import { useState } from "react";
import Sidebar from "../components/SideBar"
import HelpSection from "../components/HelpSection";


export default function HelpPage() {
    const sidebarItems = [
    { key: "Partner-onboarding", label: "Partner Onboarding", api: "partner-onboarding" },
    { key: "Faq", label: "FAQs", api: "faq" },
    { key: "Legal", label: "Legal", api: "legal" },
    { key: "Instamart", label: "Instamart Onboarding", api: "instamart" },
    { key: "Irctc", label: "IRCTC FAQ", api: "irctc" },
  ];
  const [active, setActive] = useState(sidebarItems[0].key);
  const activeItem = sidebarItems.find((i) => i.key === active)!;



return (
    <div className=" min-h-screen pt-0 mt-0">
      <div className="flex max-w-6xl mx-auto p-6 gap-6">
        <Sidebar active={active} setActive={setActive} />
        <main className="flex-1">
          <HelpSection api={activeItem.api} />
        </main>
      </div>
    </div>
  );
}