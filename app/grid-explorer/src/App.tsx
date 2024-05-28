import { createRoot } from "react-dom/client";
import React from 'react';
import ImageGridView from './Views/ImageGridView';
import MetricCard from './Views/MetricView';
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

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
      <MetricCard />
      <ImageGridView />
    </ChakraProvider>
  );
};

function main() {
  const rootNode = document.createElement("div");
  document.body.appendChild(rootNode);
  const root = createRoot(rootNode);
  root.render(<App />);
}

export default App;