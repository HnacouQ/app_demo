import { Button, Card, Collapsible, Icon, SkeletonBodyText, SkeletonDisplayText, SkeletonThumbnail, TextContainer } from '@shopify/polaris';
import { MobileMajor,DesktopMajor,SettingsMajor,HeartMajor } from '@shopify/polaris-icons';
import React, { useCallback } from 'react';
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
    
    const [stActive,setStActive] = useState([]);
    
    const [device,setDevice] = useState('desktop');
    const [test,setTest] = useState([
        {title:'Background button whishlist',color:{r: '241',g: '19',b: '148',a: '1',}},
        {title:'Color button whishlist',color:{r: '241',g: '112',b: '19',a: '1',}},
        {title:'Background list whishlist',color:{r: '159',g: '37',b: '207',a: '1',}},
        {title:'Color list whishlist',color:{r: '255',g: '255',b: '255',a: '1',}},
        {title:'Background couter',color:{r: '255',g: '0',b: '0',a: '1',}},
        {title:'Color couter',color:{r: '255',g: '255',b: '255',a: '1',}},
    ]);
    const handleToggle = (type) => {
        let clone = _.cloneDeep(stActive)
        if(!stActive.includes(type)){
            clone.push(type)
            setStActive(clone);
        }else{
            console.log('QA');
            const st = clone.filter(data => data !== type);
            setStActive(st);
        }
        
    };
    const handleToggleAni = useCallback(() => setOpenAni((openAni) => !openAni), []);
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
        <div className="Settings" style={{position: 'relative'}}>    
            <div className="Settings__main">
                <div className="Settings__main-header">
                    <span><Icon source={SettingsMajor} color="base" /></span>
                </div>
                <div className="Settings__main-item" style={{padding:'5px'}}>
                    <Button fullWidth={true} onClick={() => handleToggle('color')} ariaExpanded={stActive.includes('color')} ariaControls="basic-collapsible">Colors</Button>
                </div>
                <Collapsible open={stActive.includes('color')} id="basic-collapsible" transition={{duration: '500ms', timingFunction: 'ease-in-out'}} expandOnPrint>
                    <TextContainer>
                        <div className="Settings__main-content" style={{display: 'flex', flexDirection: 'column'}}>
                            {test.map((data,index) => (<ColorPker key={index} index={index} color={data.color} title={data.title} handleChangeColor={handleChangeColor} />))}
                        </div>
                    </TextContainer>
                </Collapsible>
                <div className="Settings__main-item" style={{padding:'5px'}}>
                    <Button fullWidth={true} onClick={() => handleToggle('animation')} ariaExpanded={stActive.includes('animation')} ariaControls="basic-collapsible">Animations</Button>
                </div>
                <Collapsible open={stActive.includes('animation')} id="basic-collapsible" transition={{duration: '500ms', timingFunction: 'ease-in-out'}} expandOnPrint>
                    <TextContainer>
                        Animation
                    </TextContainer>
                </Collapsible>
                <div className="Settings__main-item" style={{padding:'5px'}}>
                    <Button fullWidth={true} onClick={() => handleToggle('translates')} ariaExpanded={stActive.includes('translates')} ariaControls="basic-collapsible">Translates</Button>
                </div>
                <Collapsible open={stActive.includes('translates')} id="basic-collapsible" transition={{duration: '500ms', timingFunction: 'ease-in-out'}} expandOnPrint>
                    <TextContainer>
                        Animation
                    </TextContainer>
                </Collapsible>

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
            <div className="btn-list-wl" style={{position:'absolute',bottom:'10px', right:'10px',cursor:'pointer'}}>
                <div className="btn-list-icon" style={{padding:'10px', borderRadius:'100%', background: `rgba(${ test[2].color.r }, ${ test[2].color.g }, ${ test[2].color.b }, ${ test[2].color.a })`}}>
                    <span className="Polaris-Icon Polaris-Icon--colorBase Polaris-Icon--applyColor"><span className="Polaris-VisuallyHidden">
                        </span><svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true" style={{fill:`rgba(${ test[3].color.r }, ${ test[3].color.g }, ${ test[3].color.b }, ${ test[3].color.a })`}}>
                            <path d="M6 1a5 5 0 0 0-5 5v.448c0 5.335 2.955 9.647 8.598 12.457a.902.902 0 0 0 .804 0C16.046 16.095 19 11.783 19 6.448V6a5 5 0 0 0-9-3 4.992 4.992 0 0 0-4-2z">
                            </path>
                        </svg>
                    </span>
                </div>
                <div className="btn-list-number" style={{position:'absolute',top:'-12px',right:'0', background: `rgba(${ test[4].color.r }, ${ test[4].color.g }, ${ test[4].color.b }, ${ test[4].color.a })`,padding:'4px',borderRadius:'100%', width:'20px',height:'20px',display:'flex',alignItems: 'center',justifyContent: 'center',fontSize:'11px',color:`rgba(${ test[5].color.r }, ${ test[5].color.g }, ${ test[5].color.b }, ${ test[5].color.a })`,justifyContent: 'center'}}><span>0</span></div>
            </div>
        </div>
    );
}

export default Settings;