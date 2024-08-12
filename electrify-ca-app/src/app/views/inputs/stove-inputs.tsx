import React from "react";
import { useAtom } from "jotai";
import { stoveEnabledAtom } from "../../app-state/inputs/input-state"
import {
  solarEquipmentCostAtom,
  solarLaborCostAtom,
  solarReturnPeriodAtom,
  discountRateAtom,
  solarPanelCapacityAtom
} from "../../app-state/inputs/solar-specs-state";
import { NumericFormInputView, FormRow } from "../forms";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
} from "@chakra-ui/react";

const StoveInputs: React.FC = () => {
  const [stoveEnabled, setStoveEnabled] = useAtom(stoveEnabledAtom);

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            Stove Costs
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <FormRow>
            <Checkbox
                isChecked={stoveEnabled}
                onChange={(e) => setStoveEnabled(e.target.checked)}
                size="lg"
                colorScheme="teal"
              >
                 <Text fontSize="lg" fontWeight="bold" ml={2}>
                  Enable Stove
                </Text>
              </Checkbox>
          </FormRow>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default StoveInputs;
