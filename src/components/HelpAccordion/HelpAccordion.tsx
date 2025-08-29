import Button from "../Button/Button";
import Icon from "../Icons/Icon";
import type { HelpProps } from "./helpAccordion.types";

export default function AccordionItem({ issue, openId, setOpenId }: HelpProps) {
  const isOpen = openId === issue.id;

  return (
    <div className="border-b">
      <button
        onClick={() => setOpenId(isOpen ? null : issue.id)}
        className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-800"
      >
        {issue.title}
        <span>{isOpen ? <Icon name="up" size={15}/>: <Icon name="down" size={15}/>}</span>
      </button>

      {isOpen && (
        <div className="pb-4 pl-2 text-gray-600 space-y-3">
          {issue.description && <p>{issue.description}</p>}

          {issue.hyperLink && (
            <a
              href={issue.hyperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {issue.hyperLinkText}
            </a>
          )}

          {issue.options?.map((opt, idx) => (
            <div key={idx}>
              <Button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600">
                {opt.title}
              </Button>
              {opt.waitTimeDescription && (
                <p className="text-sm text-gray-500">
                  {opt.waitTimeDescription}
                </p>
              )}
              {opt.metadata?.emailId && (
                <p className="text-sm">
                  Email:{" "}
                  <a
                    href={`mailto:${opt.metadata.emailId}`}
                    className="text-blue-600"
                  >
                    {opt.metadata.emailId}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
