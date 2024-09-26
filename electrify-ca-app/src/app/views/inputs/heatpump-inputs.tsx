import React from "react";
import { useAtom } from "jotai";
import { heatpumpEnabledAtom } from "../../app-state/inputs/input-state"
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

const HeatPumpInputs: React.FC = () => {
  const [heatpumpEnabled, setHeatPumpEnabled] = useAtom(heatpumpEnabledAtom);

  return (
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            Heat Pump Costs
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <FormRow>
            <Checkbox
                isChecked={heatpumpEnabled}
                onChange={(e) => setHeatPumpEnabled(e.target.checked)}
                size="lg"
                colorScheme="teal"
              >
                 <Text fontSize="lg" fontWeight="bold" ml={2}>
                  Enable Heat Pump
                </Text>
              </Checkbox>
          </FormRow>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default HeatPumpInputs;
