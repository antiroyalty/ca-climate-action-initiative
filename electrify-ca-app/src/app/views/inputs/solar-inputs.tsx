import React from "react";
import { useAtom } from "jotai";
import { solarEnabledAtom } from "../../app-state/inputs/input-state"
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

const SolarInputs: React.FC = () => {
  const [solarEnabled, setSolarEnabled] = useAtom(solarEnabledAtom);

  const [solarEquipmentCost, setSolarEquipmentCost] = useAtom(solarEquipmentCostAtom);
  const [solarLaborCost, setSolarLaborCost] = useAtom(solarLaborCostAtom);
  const [solarReturnPeriod, setSolarReturnPeriod] = useAtom(solarReturnPeriodAtom);
  const [discountRate, setDiscountRate] = useAtom(discountRateAtom);
  const [solarPanelCapacity, setSolarPanelCapacity] = useAtom(solarPanelCapacityAtom);

  return (
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            Solar Costs
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <FormRow>
            <Checkbox
                isChecked={solarEnabled}
                onChange={(e) => setSolarEnabled(e.target.checked)}
                size="lg"
                colorScheme="teal"
              >
                 <Text fontSize="lg" fontWeight="bold" ml={2}>
                  Enable Solar
                </Text>
              </Checkbox>
          </FormRow>
          {/* <FormRow>
            <Box width="full">
              <Text mb={2}>Solar Panel Capacity, Total (kW): {solarPanelCapacity}</Text>
              <Slider
                id="slider-solar-panel-capacity"
                defaultValue={solarPanelCapacity}
                min={0}
                max={20}
                step={1}
                onChange={(val) => setSolarPanelCapacity(val)}
                value={solarPanelCapacity}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </FormRow> */}
          {/* <FormRow>
            <NumericFormInputView
              label="Solar equipment cost"
              placeholder="15000"
              value={solarEquipmentCost ?? ""}
              tooltip={
                <>
                  Enter the equipment cost of the solar system. This includes all costs related to the purchase of the system.
                </>
              }
              prefix="$"
              setValue={setSolarEquipmentCost}
              minValue={0}
              step={100}
              maxValue={100000}
            />
            <NumericFormInputView
              label="Installation costs"
              placeholder="5000"
              value={solarLaborCost ?? ""}
              tooltip={
                <>
                  Enter the labor cost for the installation of the solar system. This includes all costs related to the installation process.
                </>
              }
              prefix="$"
              setValue={setSolarLaborCost}
              minValue={0}
              step={100}
              maxValue={100000}
            />
          </FormRow> */}
          {/* <FormRow>
            <NumericFormInputView
              label="Discount rate"
              placeholder="5"
              value={discountRate ?? ""}
              tooltip={
                <>
                  Enter the discount rate used for the investment. This rate is used to discount future cash flows to present value.
                </>
              }
              suffix="%"
              setValue={setDiscountRate}
              minValue={0}
              step={0.1}
              maxValue={100}
            />
          </FormRow> */}
          {/* <FormRow>
            <NumericFormInputView
              label="Investment return period"
              placeholder="10"
              value={solarReturnPeriod ?? ""}
              tooltip={
                <>
                  Enter the investment return period for the solar system. This includes the time horizon over which the investment is expected to return.
                </>
              }
              suffix="years"
              setValue={setSolarReturnPeriod}
              minValue={0}
              step={1}
              maxValue={100}
            />
          </FormRow> */}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SolarInputs;
