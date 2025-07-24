import React, { useState } from 'react';

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import MapView from './views/MapView';
import ZipcodeView from './views/ZipcodeView';

const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontSize: "12px",
      },
    },
  },
});

const App: React.FC<{}> = (props) => {
  const [zipcode, setZipcode] = useState<string | null>(null);

  return (
    <ChakraProvider theme={theme}>
      {zipcode ? <MapView zipcode={zipcode} /> : <ZipcodeView setZipcode={setZipcode} />}
    </ChakraProvider>
  );
};

export default App;
