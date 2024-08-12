import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { Text, Flex, FormLabel, Input, Box } from "@chakra-ui/react";
import { zipCodeAtom } from "../../app-state/inputs/input-state";
import { climateZoneAtom, zipCodeToClimateZoneAtom } from "../../app-state/outputs/climatezone-state"
import { zipCodeToClimateZone } from "../../app-state/outputs/climatezone-state"
import { useLoadZipCodeToClimateZone } from "../../hooks/useLoadZipCodeToClimateZone";

const ZipCodeInput: React.FC = () => {
  const [zipCode, setZipCode] = useAtom(zipCodeAtom);
  const [climateZone, setClimateZone] = useAtom(climateZoneAtom);
  const [zipCodeToClimateZone] = useAtom(zipCodeToClimateZoneAtom);
  const zipCodeInputRef = useRef<HTMLInputElement | null>(null);

  useLoadZipCodeToClimateZone();
  // zipCodeToClimateZone();

  useEffect(() => {
    if (!zipCode) {
      zipCodeInputRef.current?.focus();
    }
  }, [zipCode]);

  useEffect(() => {
    if (zipCode && zipCode.length === 5) {
      console.log("Reached 5 digits in zip code:", zipCode);

      const sanitizedZipCode = zipCode.trim();
      console.log("Sanitized zip code:", sanitizedZipCode);

    const keys = Object.keys(zipCodeToClimateZone);
      console.log("Keys in zipCodeToClimateZone:", keys.slice(0, 10)); // Log first 10 keys

      const climateZone = zipCodeToClimateZone[sanitizedZipCode] || "Unknown";
      setClimateZone(climateZone);
      console.log(`Climate Zone for ${sanitizedZipCode}: ${climateZone}`);
    }
  }, [zipCode, zipCodeToClimateZone, setClimateZone]);

  useEffect(() => {
    if (Object.keys(zipCodeToClimateZone).length > 0) {
      const firstFiveEntries = Object.entries(zipCodeToClimateZone).slice(0, 5);
      console.log("First 5 entries in zipCodeToClimateZone:", firstFiveEntries);
    }
  }, [zipCodeToClimateZone]);

  return (
    <div>
      <FormLabel htmlFor="zipcode">ZIP Code</FormLabel>
      <Flex align="center">
        <Input
          id="zipcode"
          placeholder="94708"
          value={zipCode ?? ""}
          onChange={(ev) => {
            const value = ev.currentTarget.value;
            console.log(`ZIP code input changed to: ${value}`);
            setZipCode(value);
          }}
          ref={zipCodeInputRef}
          width="100%"
        />
        <Flex width="50%" ml={4}>
          <Text fontSize="lg" fontWeight="bold">Climate: </Text>
          <Text fontSize="lg" ml={2} color={climateZone === "Unknown" ? "red.500" : "green.500"}>
            {climateZone}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default ZipCodeInput;
