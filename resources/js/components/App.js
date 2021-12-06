import React from "react";
import { AppProvider, Page, Card, Button, TopBar } from "@shopify/polaris";
import Top from "./Top";

function App(props) {
  return (
    <>
      <Top></Top>
      {/* <Page title="Example app">
        <Card sectioned>
         
          <Button onClick={() => alert("Button clicked!")}>
            Example button
          </Button>
        </Card>
      </Page> */}
    </>
  );
}

export default App;
