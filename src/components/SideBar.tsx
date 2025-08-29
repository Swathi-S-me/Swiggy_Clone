import Button from "./Button/Button";
import type { Sidebar } from "./HelpAccordion/helpAccordion.types";

export default function Sidebar({ active, setActive }: Sidebar) {
 const sidebarItems = [
  { key: "Partner-onboarding", label: "Partner Onboarding" },
  { key: "Faq", label: "FAQs" },
  { key: "Legal", label: "Legal"},
  { key: "Instamart", label: "Instamart Onboarding"},
  { key: "Irctc", label: "IRCTC FAQ" },
];

  return (
    <aside className="w-1/4 bg-gray-100 rounded-xl p-4">
      {sidebarItems.map((item) => (
        <Button
          key={item.key}
          onClick={() => setActive(item.key)}
          className={`block w-full text-left px-3 py-2 rounded-lg mb-2 font-bold ${
            active === item.key
              ? "bg-white shadow text-orange-600"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {item.label}
        </Button>
      ))}
    </aside>
  );
}
