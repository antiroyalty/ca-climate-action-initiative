import React from "react";
import { useAtom } from "jotai";
import { storageEnabledAtom } from "../../app-state/inputs/input-state"
import {
  storageEquipmentCostAtom,
  storageLaborCostAtom,
  storageReturnPeriodAtom,
  discountRateAtom,
  batteryCapacityAtom
} from "../../app-state/inputs/storage-specs-state";
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
  Checkbox
} from "@chakra-ui/react";

const StorageInputs: React.FC = () => {
  const [storageEnabled, setStorageEnabled] = useAtom(storageEnabledAtom);

  const [storageEquipmentCost, setStorageEquipmentCost] = useAtom(storageEquipmentCostAtom);
  const [storageLaborCost, setStorageLaborCost] = useAtom(storageLaborCostAtom);
  const [storageReturnPeriod, setStorageReturnPeriod] = useAtom(storageReturnPeriodAtom);
  const [discountRate, setDiscountRate] = useAtom(discountRateAtom);
  const [batteryCapacity, setBatteryCapacity] = useAtom(batteryCapacityAtom);

  return (
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            Storage Costs
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <FormRow>
              <Checkbox
                  isChecked={storageEnabled}
                  onChange={(e) => setStorageEnabled(e.target.checked)}
                  size="lg"
                  colorScheme="teal"
                >
                  <Text fontSize="lg" fontWeight="bold" ml={2}>
                    Enable Storage
                  </Text>
                </Checkbox>
            </FormRow>
          {/* <FormRow>
            <Box width="full">
              <Text mb={2}>Battery Capacity (kWh): {batteryCapacity}</Text>
              <Slider
                id="slider-battery-capacity"
                defaultValue={batteryCapacity}
                min={0}
                max={30}
                step={2}
                onChange={(val) => setBatteryCapacity(val)}
                value={batteryCapacity}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </FormRow>
          <FormRow>
            <NumericFormInputView
              label="Battery cost"
              placeholder="9300"
              value={storageEquipmentCost ?? ""}
              tooltip={
                <>
                  Enter the equipment cost of the storage system. This includes all costs related to the purchase of the system.
                </>
              }
              prefix="$"
              setValue={setStorageEquipmentCost}
              minValue={0}
              step={100}
              maxValue={100000}
            />
            <NumericFormInputView
              label="Installation costs"
              placeholder="2200"
              value={storageLaborCost ?? ""}
              tooltip={
                <>
                  Enter the labor cost for the installation of the storage system. This includes all costs related to the installation process.
                </>
              }
              prefix="$"
              setValue={setStorageLaborCost}
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
              value={storageReturnPeriod ?? ""}
              tooltip={
                <>
                  Enter the investment return period for the storage system. This includes the time horizon over which the investment is expected to return.
                </>
              }
              suffix="years"
              setValue={setStorageReturnPeriod}
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

export default StorageInputs;
