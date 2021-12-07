import { Card, Tabs, Page, Button } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import Dashboard from "./Dashboard";
import Plan from "./Plan";
import Products from "./Products";
import Settings from "./Settings";

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
            content: "Settings",
            panelID: "repeat-customers-content-1",
        },
        {
            id: "prospects-1",
            content: "Plan",
            panelID: "prospects-content-1",
        },
    ];

    console.log(selected);
    return (
        <Page title="Example app">
            <Card>
                <Tabs
                    tabs={tabs}
                    selected={selected}
                    onSelect={handleTabChange}
                    disclosureText="More views"
                    fitted={true}
                >
                    <Card.Section>
                        {selected == 0 ? (
                            <Dashboard />
                        ) : selected == 1 ? (
                            <Products />
                        ) : selected == 2 ? (
                            <Settings />
                        ) : selected == 3 ? (
                            <Plan />
                        ) : null}
                    </Card.Section>
                </Tabs>
            </Card>
        </Page>
    );
}

export default Top;
