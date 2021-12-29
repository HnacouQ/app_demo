import React from 'react';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { useState } from 'react';

function ColorPker(props) {

    const [color,setColor] = useState(
        
           {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
            },
    )
    const [displayColorPicker,SetDisplayColorPicker] = useState(false)

    const handleClick = () => {
        SetDisplayColorPicker(!displayColorPicker);
        
    };
    
    const handleClose = () => {
        SetDisplayColorPicker(false);
        
    };
    
    const handleChange = (color) => {
        
        setColor(color.rgb);
    };

    const styles = reactCSS({
        'default': {
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
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

      console.log(color);
    return (
        <div>
            <div style={ styles.swatch } onClick={handleClick}>
            <div style={ styles.color } />
            </div>
            {displayColorPicker ? <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ handleClose }/>
            <SketchPicker color={color } onChange={ handleChange }/>
            </div> : null }

      </div>
    );
}

export default ColorPker;