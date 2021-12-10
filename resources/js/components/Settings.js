import {
    Card,
    FormLayout,
    Layout,
    PageActions,
    Select,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    Spinner,
    TextContainer,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import axios from "../axios";

function Settings(props) {
    const [themes, setThemes] = useState([]);
    const [themeSelected, setThemeSelected] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [toast, setToast] = useState({
        isInstall: false,
        isUnInstall: false,
    });

    const options = [
        { label: "Today", value: "today" },
        { label: "Yesterday", value: "yesterday" },
        { label: "Last 7 days", value: "lastWeek" },
    ];

    useEffect(() => {
        axios
            .get(window.App.url + "/get-themes")
            .then((res) => {
                setThemes(res.data.themes);
                setThemeSelected(res.data.theme_selected);
                setPageLoaded(true);
            })
            .catch((error) => console.log(error));
    }, []);

    const themeOptions = themes.map((theme, index) => {
        return {
            value: theme.id.toString(),
            label: theme.name + (theme.role == "main" ? " (Live theme)" : ""),
        };
    });

    const handleSelectChange = (value) => {
        setThemeSelected(value);
    };

    const handleThemeSetup = (type) => {
        const data = {
            theme_id: themeSelected,
        };

        if (type == "install") {
            setToast({
                ...toast,
                isInstall: true,
            });
            axios
                .post(window.App.url + "/install", data)
                .then(function (response) {
                    console.log(response);
                    setToast({
                        ...toast,
                        isInstall: false,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (type == "uninstall") {
            setToast({
                ...toast,
                isUnInstall: true,
            });
            axios
                .post(window.App.url + "/uninstall", data)
                .then(function (response) {
                    console.log(response);
                    setToast({
                        ...toast,
                        isUnInstall: false,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    return (
        <>
            
                {pageLoaded ? (
                    <FormLayout>
                        <Select
                            options={themeOptions}
                            value={themeSelected}
                            onChange={handleSelectChange}
                        />
                        <PageActions
                            primaryAction={{
                                content: "Install",
                                disabled: toast.isInstall || toast.isUnInstall,
                                onAction: () => handleThemeSetup("install"),
                                loading: toast.isInstall,
                            }}
                            secondaryActions={[
                                {
                                    content: "Uninstall",
                                    disabled:
                                        toast.isInstall || toast.isUnInstall,
                                    onAction: () =>
                                        handleThemeSetup("uninstall"),
                                    loading: toast.isUnInstall,
                                },
                            ]}
                        />
                    </FormLayout>
                ) : (
                    <SkeletonBodyText />
                )}
            
        </>
    );
}

export default Settings;
