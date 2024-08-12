import React from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Flex } from "@chakra-ui/react";
import ElectricityPricesView from "./electricity-prices-view";

const PreElectrificationInputs: React.FC = () => {
  return (
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            Pre-Electrification
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
            <ElectricityPricesView />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default PreElectrificationInputs;
