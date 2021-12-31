import { Button, Card, Icon, SkeletonBodyText, SkeletonDisplayText, SkeletonThumbnail } from '@shopify/polaris';
import { MobileMajor,DesktopMajor,SettingsMajor } from '@shopify/polaris-icons';
import React from 'react';
import { useState } from 'react';
import ColorPker from './ColorPker';
import _ from 'lodash';

function Settings(props) {

    const [settings,setSettings] = useState({
        'bg_whishlist':'#fff',
        'color_whishlist':'#000',
        'bg_listWl':'#000',
        'color_listWl':'#fff',
    });
    const [device,setDevice] = useState('desktop');

    const [test,setTest] = useState([
        {title:'Background button whishlist',color:{r: '241',g: '19',b: '148',a: '1',}},
        {title:'Color button whishlist',color:{r: '241',g: '112',b: '19',a: '1',}}
    ]);

    const handleChangeDevice = (device) => {
        setDevice(device);
    }


    const handleChangeColor = (color,index) => {
        var Clone = _.cloneDeep(test);
        let result = Clone.filter((data,i) => i === index);
        result[0].color = color.rgb;

        setTest(Clone);

    }


    return (
        <div className="Settings">    
            <div className="Settings__main">
                <div className="Settings__main-header">
                    <span><Icon source={SettingsMajor} color="base" /></span>
                </div>
                <div className="Settings__main-content" style={{display: 'flex', flexDirection: 'column'}}>
                    {test.map((data,index) => (<ColorPker key={index} index={index} color={data.color} title={data.title} handleChangeColor={handleChangeColor} />))}
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
                <div className={`Settings__preview-content ${device == "mobile" ? 'mobile' : 'desktop'}`} style={{padding:'20px', display: 'flex',justifyContent:'center',borderLeft:'1px solid #ccc', marginLeft:'-1px'}}>
                    <div style={{display: 'flex',width: device == 'desktop' ? '100%' : '50%', flexDirection:device == 'mobile' ? 'column' : 'row'}}>
                        <div className="Settings__preview-col-5">
                                <SkeletonThumbnail size="large" />
                        </div>
                        <div className="Settings__preview-col-5">
                            <SkeletonDisplayText size="medium" />
                            <SkeletonBodyText />
                            <button style={{width:'100%', display: 'flex',justifyContent:'center', padding:'10px',background:`rgba(${ test[0].color.r }, ${ test[0].color.g }, ${ test[0].color.b }, ${ test[0].color.a })`,color:`rgba(${ test[1].color.r }, ${ test[1].color.g }, ${ test[1].color.b }, ${ test[1].color.a })`}}>Add to whishlist</button>
                            <button style={{width:'100%', display: 'flex',justifyContent:'center', padding:'10px'}}>Add to cart</button> 
                        </div>
                    </div>
                        
                        
                    
                </div>
            </div>
        </div>
    );
}

export default Settings;