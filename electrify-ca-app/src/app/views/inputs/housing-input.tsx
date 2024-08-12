import React from "react";
import { useAtom } from "jotai";
import { FormLabel, Select, Box } from "@chakra-ui/react";
import { housingAtom } from "../../app-state/inputs/input-state";

const HousingInput: React.FC = () => {
    const [housing, setHousing] = useAtom(housingAtom);
  
    return (
      <Box mb={4}>
        <FormLabel htmlFor="housing">Housing Type</FormLabel>
        <Select id="housing" value={housing ?? ""} onChange={(e) => setHousing(e.target.value)}>
          <option value="single_family_detached">Single Family Detached</option>
        </Select>
      </Box>
    );
};

export default HousingInput;

  