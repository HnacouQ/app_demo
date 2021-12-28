import { Card, Tabs, Page, Button } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Products from "./Products";
import Intergrate from "./Intergrate";
import Customers from "./Customers";

function Top(props) {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-customers-1",
      content: "Dashboard",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "accepts-marketing-1",
      content: "Products",
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "repeat-customers-1",
      content: "Intergrate",
      panelID: "repeat-customers-content-1",
    },
    {
      id: "prospects-1",
      content: "Settings",
      panelID: "prospects-content-1",
    },
    {
      id: "customers",
      content: "Customers",
      panelID: "customers",
    },
  ];

  return (
    <Page title="WhishList App of HnacouQ">
      <Card>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={handleTabChange}
          disclosureText="More views"
          fitted={true}
        >
          <Card.Section>
            
            {selected == 0 ? <Dashboard/> : selected == 1 ? <Products/> : selected == 2 ? <Intergrate/> : selected == 3 ? <Settings/> : selected == 4 ? <Customers/> : null}
          </Card.Section>
        </Tabs>
      </Card>
    </Page>
  );
}

export default Top;
