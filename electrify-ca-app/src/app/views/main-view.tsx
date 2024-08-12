import React from "react";
import {
  Flex,
  Heading,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  CardColumnStackView,
  CardStackView,
  LoadingCardView,
} from "./cards";
import { ElectricityPricesView } from "./inputs/electricity-prices-view";
import { climateZoneAtom } from "../app-state/outputs/climatezone-state";
import { useAtomValue } from "jotai";
import NPVCardView from "./outputs/npv-results-view";
import AnnualCostsCardView from "./outputs/annual-costs-view";
import AnnualSavingsCardView from "./outputs/annual-savings-view";
import DailyCostsCardView from "./outputs/daily-costs-view";
import LoadProfileOutputCardView from "./outputs/load-profile-output-card-view";
// Inputs
import StorageInputs from "../views/inputs/storage-inputs";
import SolarInputs from "../views/inputs/solar-inputs";
import HeatPumpInputs from "../views/inputs/heatpump-inputs";
import StoveInputs from "../views/inputs/stove-inputs";
import PreElectrificationInputs from "../views/inputs/pre-electrification-inputs";
import AboutYourHomeInputs from "../views/inputs/about-home"
import { zipCodeAtom } from "../app-state/inputs/input-state";

export const MainView: React.FC = () => {
  const zipCode = useAtomValue(zipCodeAtom);
  const climateZone = useAtomValue(climateZoneAtom); // Subscribe to climateZoneAtom
  const isLoading = !zipCode || zipCode.length !== 5;
  const columns = useBreakpointValue(
    {
      base: 1,
      md: 2,
      lg: 3,
    },
    { ssr: false }
  );

  let column1: React.ReactNode[] = [];
  let column2: React.ReactNode[] = [];

  if (isLoading) {
    column1.push(<LoadingCardView key={"loading-1"} height={400} />);
    column2.push(<LoadingCardView key={"loading-2"} height={300} />);
    column1.push(<LoadingCardView key={"loading-3"} height={300} />);
    column2.push(<LoadingCardView key={"loading-4"} height={200} />);
  } else {
    if (columns == null || columns < 3) {
      column2 = column1;
    }
    column1.push(<DailyCostsCardView key={"daily-costs-card"} />);
    column1.push(<AnnualCostsCardView key={"annual-costs-card"} />);
    // column1.push(<AnnualSavingsCardView key={"annual-savings-card"} />);
    // column2.push(<NPVCardView key={"npv-card"} />);
    column2.push(
      <LoadProfileOutputCardView
        key="load-profile-output"
        climateZone={climateZone} // Pass climateZone as a prop
        season="summer" // Pass season as a prop
      />
    );

    // if (statusQuoFurnaceFuel === "gas") {
    //   column2.push(<GasServiceFixedCostsCardView key={"gas-service"} />);
    // }
    // column2.push(<AboutThisCalculatorCardView key={"about"} />);
  }

  let formSections: React.ReactNode[] = [
    <AboutYourHomeInputs />,
  ];

  if (!isLoading) {
    formSections.push(<PreElectrificationInputs key="pre-electrification" />);
  }

  const renderFormSections = (
    <Flex direction="column" h="full" w={"400px"} p="20px" gap="20px">
      <Heading textAlign={"center"}>The Cost of Electrifying</Heading>
      {formSections}
      <SolarInputs />
      <StorageInputs />
      <HeatPumpInputs />
      <StoveInputs />
    </Flex>
  );

  if (columns === 3) {
    return (
      <Flex direction="row" w="full">
        {renderFormSections}
        <CardColumnStackView>
          <CardStackView>{column1}</CardStackView>
          <CardStackView>{column2}</CardStackView>
        </CardColumnStackView>
      </Flex>
    );
  } else if (columns === 2) {
    return (
      <Flex direction="row" w="full">
        {renderFormSections}
        <CardColumnStackView>
          <CardStackView>{column1}</CardStackView>
        </CardColumnStackView>
      </Flex>
    );
  } else {
    return (
      <VStack gap="20px" w="full">
        <Heading textAlign={"center"}>The Cost of Electrifying</Heading>
        {renderFormSections}
        {column1}
      </VStack>
    );
  }
};

export default MainView;