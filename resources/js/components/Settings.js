import { Button, Card, Icon, SkeletonBodyText, SkeletonDisplayText, SkeletonThumbnail } from '@shopify/polaris';
import { MobileMajor,DesktopMajor,SettingsMajor } from '@shopify/polaris-icons';
import React from 'react';
import { useState } from 'react';
import ColorPker from './ColorPker';

function Settings(props) {

    const [settings,setSettings] = useState({
        'bg_whishlist':'#fff',
        'color_whishlist':'#000',
        'bg_listWl':'#000',
        'color_listWl':'#fff',
    });
    const [device,setDevice] = useState('desktop');

    const handleChangeDevice = (device) => {
        setDevice(device);
    }


    return (
        <div className="Settings">    
            <div className="Settings__main">
                <div className="Settings__main-header">
                    <span><Icon source={SettingsMajor} color="base" /></span>
                </div>
                <div className="Settings__main-content">
                    <ColorPker></ColorPker>
                </div>
            </div>
            <div className="Settings__preview">
            <div className="Settings__preview-header">
                <span className="Settings__preview-icon">
                    <ul>
                        <li onClick={() =>{handleChangeDevice('mobile')}} className={device == 'mobile' ? 'active' : null}>
                            <Icon source={MobileMajor} color="base"/>
                        </li>
                        <li onClick={() =>{handleChangeDevice('desktop')}} className={device == 'desktop' ? 'active' : null}>
                            <Icon source={DesktopMajor} color="base"/>
                        </li>
                    </ul>
                </span>
            </div>
                <div className={`Settings__preview-content ${device == "mobile" ? 'mobile' : 'desktop'}`} style={{padding:'20px', display: 'flex',justifyContent:'center',border:'1px solid #ccc', marginLeft:'-1px'}}>
                    <div style={{display: 'flex',width: device == 'desktop' ? '100%' : '50%', flexDirection:device == 'mobile' ? 'column' : 'row'}}>
                        <div className="Settings__preview-col-5">
                                <SkeletonThumbnail size="large" />
                        </div>
                        <div className="Settings__preview-col-5">
                            <SkeletonDisplayText size="medium" />
                            <SkeletonBodyText />
                            <button style={{width:'100%', display: 'flex',justifyContent:'center', padding:'10px'}}>Add to whishlist</button>
                            <button style={{width:'100%', display: 'flex',justifyContent:'center', padding:'10px'}}>Add to cart</button> 
                        </div>
                    </div>
                        
                        
                    
                </div>
            </div>
        </div>
    );
}

export default Settings;