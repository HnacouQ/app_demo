import React from 'react';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { useState } from 'react';

function ColorPker({color,handleChangeColor,title,index}) {

    const [displayColorPicker,SetDisplayColorPicker] = useState(false)
    

    const handleClick = () => {
        SetDisplayColorPicker(!displayColorPicker);
        
    };
    
    const handleClose = () => {
        SetDisplayColorPicker(false);
        
    };

    const styles = reactCSS({
        'default': {
          color: {
            width: '36px',
            height: '25px',
            border:'1px solid #ccc',
            borderRadius: '2px',
            background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
            marginRight:'10px'
          },
          swatch: {
            padding: '10px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'flex',
            cursor: 'pointer',
            alignItems:'center',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        },
      });
    return (
        <div>
            <div style={ styles.swatch } onClick={handleClick}>
                <div style={ styles.color } />
                <div><span>{title}</span></div>
            </div>
            {displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ handleClose }/>
                <SketchPicker color={color } onChange={ (color) => {handleChangeColor(color,index);} } />
            </div> : null }

      </div>
    );
}

export default ColorPker;