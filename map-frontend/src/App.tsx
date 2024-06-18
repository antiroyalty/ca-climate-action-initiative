import { createRoot } from "react-dom/client";
import React from 'react';

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import ImageGridView from './views/ImageGridView';
import MetricCard from './views/MetricView';
import MapView from './views/MapView';

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
  return (
    <ChakraProvider theme={theme}>
      {/* <MetricCard /> */}
      { <MapView /> }
      {/* <ZipcodeMapView /> */}
      {/* <ImageGridView /> */}
    </ChakraProvider>
  );
};

export default App;