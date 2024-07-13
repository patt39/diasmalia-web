import { cn } from "@/lib/utils";
import { useState } from "react";

interface HtmlParserProps {
  html: string;
  value: number;
}

const ReadMore: React.FC<HtmlParserProps> = ({ html, value }) => {
  const lengthValue = html.length;
  const [isReadMore, setIsReadMore] = useState(true);

  return (
    <>
      {isReadMore ? html.slice(0, value) : html}
      {lengthValue > value && (
        <span
          onClick={() => setIsReadMore((lk) => !lk)}
          className={cn("text-sm text-blue-600 cursor-pointer")}
        >
          {isReadMore ? "...read more" : ""}
        </span>
      )}
    </>
  );
};

export { ReadMore };
