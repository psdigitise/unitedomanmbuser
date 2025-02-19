import React, { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";

interface HomeServiceCardProps {
  cardID: number;
  cardQuestion: string;
  cardAnswer: string;
}

export const HomeServiceCard: React.FC<HomeServiceCardProps> = ({
  cardID,
  cardQuestion,
  cardAnswer,
}) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Toggle accordion based on the cardID
  const toggleAccordion = (id: number) => {
    if (activeAccordion === id) {
      setActiveAccordion(null); // Close accordion if it's already open
    } else {
      setActiveAccordion(id); // Open the accordion of the selected card
    }
  };

  return (
    <div>
      <div className="xl:w-3/4 mx-auto mb-3">
        <div className="bg-mindfulWhite rounded-[11px] border-2 border-mindfulLightGrey px-[25px] py-[15px] home-faq-custom-padding">
          {/* Toggle accordion by using cardID */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAccordion(cardID)}
          >
            <h5 className="text-[18px] text-mindfulBlack font-semibold">
              {cardQuestion}
            </h5>
            <div className="flex-shrink-0 pl-2">
              {/* Change icon based on the active accordion */}
              {activeAccordion === cardID ? (
                <HiMinus className="text-mindfulBlack font-semibold" />
              ) : (
                <HiPlus className="text-mindfulBlack font-semibold" />
              )}
            </div>
          </div>

          {/* Conditionally render the answer based on the active accordion */}
          {activeAccordion === cardID && (
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out
                            ${
                              activeAccordion === cardID
                                ? "max-h-96"
                                : "max-h-0"
                            } 
                            border-t-2 border-t-mindfulLightGrey mt-3 pt-3`}
            >
              <div className={activeAccordion === cardID ? "block" : "hidden"}>
                <p className="text-mindfulBlack">{cardAnswer}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
