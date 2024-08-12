import React from "react";
import {
  Text,
  HStack,
  Heading,
  VStack,
  Link,
  Box,
  keyframes,
  type StackProps,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import {
  coolingSetPointCAtom,
  hasOtherGasAppliancesAtom,
  heatingSetPointCAtom,
  heatpumpBackupFuelAtom,
  statusQuoFurnaceFuelAtom,
} from "../app-state/config-state";
import { simplePlaceNameAtom } from "../app-state/ca-weather-state";

interface InfoCardViewProps {
  title: string;
  children: React.ReactNode;
}

export const InfoCardView: React.FC<InfoCardViewProps & StackProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <VStack
      w="full"
      bg="white"
      borderRadius={"10px"}
      p={{ base: "5px", md: "20px" }}
      gap={"5px"}
      align="start"
      {...props}
    >
      <Text textTransform="uppercase">{title}</Text>
      {children}
    </VStack>
  );
};

export const LoadingCardView: React.FC<{ height: number }> = (props) => {
  return (
    <InfoCardView title="">
      <Box w="full" height={`${props.height}px`} />
    </InfoCardView>
  );
};

export const CardColumnStackView: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <HStack flex="1" p="20px" bg="#E7E7E7" gap="20px" align="start">
      {props.children}
    </HStack>
  );
};

export const CardStackView: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <VStack gap="20px" flex="1">
      {props.children}
    </VStack>
  );
};

function sigDigs(num: number, digits: number = 1) {
  return num.toLocaleString("en-CA", { maximumSignificantDigits: digits });
}

function formatDollars(num: number) {
  return (num < 0 ? "-$" : "$") + sigDigs(Math.abs(num), 2);
}

// Round trip flight emissions estimated using Google Flights
const emissionsGramsCO2eRoundTripFlight = 275000 + 275000;

export const GasServiceFixedCostsCardView: React.FC = () => {
  // TODO(jlfwong): Fix loading patterns so this card doesn't show up on its own
  const naturalGasFixedCostPerMonth = useAtomValue(
    naturalGasFixedPricePerMonthAtom
  );

  const heatpumpBackupFuel = useAtomValue(heatpumpBackupFuelAtom);
  const hasOtherGasAppliances = useAtomValue(hasOtherGasAppliancesAtom);

  if (naturalGasFixedCostPerMonth == null) return null;

  const reasonsPreventingCancellation: string[] = [];

  if (heatpumpBackupFuel === "gas") {
    reasonsPreventingCancellation.push(
      "You've selected a heatpump using a gas furnace as its backup heat source"
    );
  }
  if (hasOtherGasAppliances) {
    reasonsPreventingCancellation.push("Your house has other gas appliances");
  }

  return (
    <InfoCardView title={"Annual Gas Service Fee"}>
      <Heading>
        {formatDollars(naturalGasFixedCostPerMonth * 12)} per year
      </Heading>
      <Text>
        This is how much you could save per year if you cancel your gas service
        entirely. Gas utilities in your area charge a fixed fee of around{" "}
        {formatDollars(naturalGasFixedCostPerMonth)}/month on top of usage
        charges.
      </Text>
      {reasonsPreventingCancellation.length > 0 ? (
        <>
          <Text>
            The utility bills for the heat pump shown in this calculator still
            contain this charge because…
          </Text>
          <Box as="ul" ml="2em">
            {reasonsPreventingCancellation.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </Box>
          <Text>
            If you replace all gas appliances and fully electrify your home,
            then you'd be able to cancel your gas service and benefit from these
            savings.
          </Text>
        </>
      ) : (
        <Text>
          Since you've chosen a fully electric heat pump, and your home has no
          other gas appliances, the utility bills for the heat pump shown in
          this calculator reflect the savings from cancelling this service.
        </Text>
      )}
    </InfoCardView>
  );
};