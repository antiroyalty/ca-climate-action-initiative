import React from "react";
import { useAtom } from "jotai";
import { FormLabel, Select, Box } from "@chakra-ui/react";
import { seasonAtom } from "../../app-state/inputs/input-state";

const SeasonInput: React.FC = () => {
  const [season, setSeason] = useAtom(seasonAtom);

  return (
    <Box mb={4}>
      <FormLabel htmlFor="season">Season</FormLabel>
      <Select id="season" value={season ?? ""} onChange={(e) => setSeason(e.target.value)}>
        <option value="summer">Summer</option>
        <option value="winter">Winter</option>
      </Select>
    </Box>
  );
};

export default SeasonInput;