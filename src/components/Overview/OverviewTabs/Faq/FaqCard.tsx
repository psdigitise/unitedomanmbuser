import { useState, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";

interface FaqCardProps {
  id?: string;
  faqQuestion?: string;
  faqAnswer?: string;
  createdTime?: string;
  updatedTime?: string;
}

export const FaqCard: React.FC<FaqCardProps> = ({ faqQuestion, faqAnswer }) => {
  // Accordion state declaration
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");

  const contentRef = useRef<HTMLDivElement>(null);

  const handleAccordion = () => {
    if (contentRef.current) {
      setIsOpen(!isOpen);
      setHeight(isOpen ? "0px" : `${contentRef.current.scrollHeight}px`);
    }
  };

  return (
    <div className="border-b-[1px] border-mindfulLightGrey mb-5">
      <div
        onClick={handleAccordion}
        className="flex justify-between items-center pb-5 cursor-pointer"
      >
        <h5 className="text-xl text-mindfulBlack font-semibold">
          {faqQuestion}
        </h5>
        <IoChevronDown
          className={`text-[22px] text-mindfulGreyTertiary transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""
            }`}
        />
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: `${height}` }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <p className="text-lg text-mindfulBlack mb-5">
          {faqAnswer}
        </p>
      </div>
    </div>
  );
};
