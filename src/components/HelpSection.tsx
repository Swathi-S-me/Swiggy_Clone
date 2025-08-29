import { useState } from "react";
import { useHelpQuery } from "../hooks/Queries/useHelpQuery";
import type { HelpIssue } from "./HelpAccordion/helpAccordion.types";
import AccordionItem from "./HelpAccordion/HelpAccordion";

export default function HelpSection({ api }: { api: string }) {
  const { data, isLoading, error } = useHelpQuery(api);
  const [openId, setOpenId] = useState<number | null>(null);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load FAQs.</p>;

  const issues: HelpIssue[] = data?.data?.issues?.data || [];
  const title = data?.data?.issues?.meta?.type.toUpperCase().replace(/[-_]/g, " ");

  return (
    <div className="bg-white shadow rounded-xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {issues.map((issue) => (
        <AccordionItem key={issue.id} issue={issue} openId={openId} setOpenId={setOpenId} />
      ))}
    </div>
  );
}
