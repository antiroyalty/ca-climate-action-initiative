import { createRoot } from "react-dom/client";
import React, { useState } from 'react';

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import ImageGridView from './views/ImageGridView';
import MetricCard from './views/MetricView';
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
