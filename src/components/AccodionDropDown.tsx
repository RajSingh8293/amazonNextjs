import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IAddress } from "@/lib/actions/address.actions";

interface AccodionDropDownProps {
  children: React.ReactNode;
  title: string;
  count?: IAddress[];
}
const AccodionDropDown = ({
  children,
  title,
  count,
}: AccodionDropDownProps) => {
  return (
    <div>
      <Accordion type="single" collapsible value="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            <h1 className="font-semibold text-xl flex justify-start">
              {title}
              {count && <span className="ml-2">({count.length})</span>}
            </h1>
          </AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccodionDropDown;
