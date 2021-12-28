import { Button, Card, Icon, SkeletonBodyText, SkeletonDisplayText, SkeletonThumbnail } from '@shopify/polaris';
import { MobileMajor,DesktopMajor } from '@shopify/polaris-icons';
import React from 'react';
import { useState } from 'react';

function Settings(props) {

    const [settings,setSettings] = useState({
        'bg_whishlist':'#fff',
        'color_whishlist':'#000',
        'bg_listWl':'#000',
        'color_listWl':'#fff',
    });


    return (
        <div className="Settings">    
            <div className="Settings__main">
                <div className="Settings__main-header">
                    <span>Settings</span>
                </div>
                <div className="Settings__main-content">

                </div>
            </div>
            <div className="Settings__preview">
            <div className="Settings__preview-header">
                <span className="Settings__preview-icon">
                    <ul>
                        <li className="active">
                            <Icon source={DesktopMajor}/>
                        </li>
                        <li>
                            <Icon source={MobileMajor}/>
                        </li>
                    </ul>
                </span>
            </div>
                <div className="Settings__preview-content" style={{padding:'10px', display: 'flex'}}>
                    
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
    );
}

export default Settings;