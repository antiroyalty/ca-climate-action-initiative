import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { 
  zipCodeAtom,
  floorSpaceSqFtAtom
 } from "../app-state/inputs/input-state"
import {
  welcomeFormHasBeenSubmitAtom,
} from "../app-state/config-state";
import { locationInfoAtom } from "../app-state/ca-weather-state";
import { buildingGeometryAtom } from "../app-state/loads-state";
import { FormSectionView, FormRow } from "./forms";
import {
  HomeHeatingTypeSelect,
  OtherGasAppliancesSelect,
} from "./inputs/inputs";

import {
  ZipCodeInput
} from "../views/inputs/zipcode"

const WelcomeFormView: React.FC = () => {
  const setWelcomeFormHasBeenSubmit = useSetAtom(welcomeFormHasBeenSubmitAtom);
  const locationInfo = useAtomValue(locationInfoAtom);
  const buildingGeometry = useAtomValue(buildingGeometryAtom);

  console.log("locationInfo:", locationInfo);
  console.log("buildingGeometry:", buildingGeometry);

  return (
    <Box maxW="1280px" p={{ base: 0, md: "20px" }} borderRadius="md">
      <Stack spacing={"20px"}>
        <FormSectionView title="About your home">
          <FormRow>
            {/* <ZipCodeInput /> */}
            {/* <FloorSpaceInput /> */}
          </FormRow>
          <HomeHeatingTypeSelect
            label="My home is heated with"
            tooltip={
              <Stack>
                <p>
                  We'll compare the costs for a heatpump against the costs for
                  replacing the equipment you already have with something
                  similar.
                </p>
                <p>
                  If you have a gas furnace, choose "gas". If you have baseboard
                  heaters or an electric furnace, choose "electricity".
                </p>
              </Stack>
            }
          />
          <OtherGasAppliancesSelect />
        </FormSectionView>
        <Button
          colorScheme="blue"
          w="full"
          mt="4"
          isDisabled={locationInfo == null || buildingGeometry == null}
          onClick={() => {
            trackEvent("welcomeForm__submit");
            console.log(`Button clicked: Estimate Costs & Emissions`);
            console.log(`locationInfo: ${JSON.stringify(locationInfo)}`);
            console.log(`zipzip: ${locationInfo.zipcode}`)
            console.log(`zipCode: ${locationInfo.zipCode}`); // Log the zip code
            console.log(`buildingGeometry: ${buildingGeometry}`);
            setWelcomeFormHasBeenSubmit(true);
            setWelcomeFormHasBeenSubmit(true);
          }}
        >
          Estimate Costs & Emissions
        </Button>
      </Stack>
    </Box>
  );
};

const LocationLink: React.FC<{
  postalCode: string;
  placeName: string;
}> = (props) => {
  const setPostalCode = useSetAtom(zipCodeAtom);
  const setFloorSpaceSqFt = useSetAtom(floorSpaceSqFtAtom);
  const setWelcomeFormHasBeenSubmit = useSetAtom(welcomeFormHasBeenSubmitAtom);

  const onClick: React.EventHandler<React.MouseEvent> = (ev) => {
    setPostalCode(props.postalCode);
    setFloorSpaceSqFt(2000);
    setWelcomeFormHasBeenSubmit(true);
    ev.preventDefault();
  };

  return (
    <Box as="a" href="#" onClick={onClick} textDecoration={"underline"}>
      {props.placeName} ({props.postalCode})
    </Box>
  );
};

const WelcomeMessage: React.FC<{}> = () => {
  return (
    <Center h="full">
      <Stack spacing={"30px"} maxW="400px">
        <p>
          This is an interactive tool to help you understand costs of electrifying your home in California.
        </p>
        <p>
          <strong>
            Enter your home’s information to get an instant cost estimate.
          </strong>
        </p>
      </Stack>
    </Center>
  );
};

export const WelcomeScreenView: React.FC<{}> = () => {
  return (
    <Center h="100vh" w="full">
      <Flex direction={{ base: "column", md: "row" }} gap={"40px"}>
        <Stack>
          <Heading textAlign={"center"}>The Cost of Electrifying ⚡</Heading>
          <WelcomeFormView />
        </Stack>
        <WelcomeMessage />
      </Flex>
    </Center>
  );
};
