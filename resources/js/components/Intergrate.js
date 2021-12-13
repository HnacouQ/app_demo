import {
    Button,
    Card,
    FormLayout,
    Frame,
    Layout,
    PageActions,
    Select,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    Spinner,
    TextContainer,
    Toast,
} from "@shopify/polaris";

import React, { useEffect, useState } from "react";
import axios from "../axios";

function Intergrate(props) {
    const [themes, setThemes] = useState([]);
    const [themeSelected, setThemeSelected] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [toast, setToast] = useState({
        isInstall: false,
        isUnInstall: false,
        active:false,
        message:'',
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
                        active:true,
                        message: 'App installed'
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
                        active:true,
                        message: 'App Uninstalled'
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const toastMarkup = toast.active ? (
        <Toast
          onDismiss={() => {
            setToast({
              active: false,
              message: "",
            });
          }}
          content={toast.message}
          duration={3000}
        />
      ) : null;

    return (
        <>
            
                {pageLoaded ? (
                    <FormLayout>
                        <div className="Intergrate" style={{display: 'flex'}}>
                            <div className="Intergrate-select" style={{flex:'1'}}>
                                <Select
                                    options={themeOptions}
                                    value={themeSelected}
                                    onChange={handleSelectChange}
                                />
                            </div>
                            <div className="Intergrate-action">
                                <Button destructive onClick={()=>{handleThemeSetup("uninstall")}} disabled={toast.isInstall || toast.isUnInstall} loading={toast.isUnInstall}>Uninstall</Button>
                                <Button primary onClick={()=>{handleThemeSetup("install")}} disabled={toast.isInstall || toast.isUnInstall} loading={toast.isInstall}>Install</Button>
                            </div>
                            
                        </div>
                        
                        {/* <PageActions
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
                        /> */}
                    </FormLayout>
                ) : (
                    <SkeletonBodyText />
                )}
                {toastMarkup}
        </>
    );
}

export default Intergrate;
