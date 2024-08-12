import { Container } from "@chakra-ui/react";
import React from "react";
import { useAtomValue } from "jotai";
import { welcomeFormHasBeenSubmitAtom } from "../app-state/config-state";
import { WelcomeScreenView } from "./welcome-screen-view";
import MainView from "../views/main-view";

export const CalculatorAppView: React.FC<{}> = () => {
  const welcomeFormHasBeenSubmit = useAtomValue(welcomeFormHasBeenSubmitAtom);

  return (
    <Container
      maxW="1600px"
      minH="100vh"
      display="flex"
      padding={{ base: "10px", md: 0 }}
    >
       <MainView />
       {/* <InstallationCostPage /> */}
      {/* {welcomeFormHasBeenSubmit ? <CalculatorView /> : <WelcomeScreenView />} */}
    </Container>
  );
};
