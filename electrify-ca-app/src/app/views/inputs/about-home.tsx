import React from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Flex } from "@chakra-ui/react";
import { FormRow } from "../forms";
import ZipCodeInput from "./zipcode";
import SeasonInput from "./season-input"
import HousingInput from "./housing-input"

const AboutYourHomeInputs: React.FC = () => {
  return (
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem>
        <AccordionButton>
            <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
                About Your Home
            </Box>
            <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
            <FormRow>
                <ZipCodeInput />
            </FormRow>
            <Flex mt="5" direction="column" width="100%">
                <SeasonInput />
                <HousingInput />
            </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AboutYourHomeInputs;
