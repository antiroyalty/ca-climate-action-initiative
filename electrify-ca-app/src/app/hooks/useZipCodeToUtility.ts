import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { zipCodeToUtilityAtom } from "../app-state/outputs/utility-state";

export const useZipCodeToUtility = (zipCode: string) => {
  const setZipCodeToUtility = useSetAtom(zipCodeToUtilityAtom);
  const [utilityName, setUtilityName] = useState("PGE");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadZipCodeToUtility = async () => {
      try {
        console.log("Trying to load utility data");
        const response = await fetch("/data/zip-to-utility.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Data loaded:", data);
        setZipCodeToUtility(data);
        if (data[zipCode]) {
            console.log("Zipcode found! ", data[zipCode])
         console.log(utilityName);
          setUtilityName(data[zipCode]);
          console.log(utilityName);
          console.log("Shoulda set it")
        } else {
            console.log("Unknown")
          setUtilityName("Unknown");
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load zip code to utility data:", error);
        setLoading(false);
      }
    };

    loadZipCodeToUtility();
  }, [zipCode, setZipCodeToUtility]);

  return { utilityName, loading };
};
