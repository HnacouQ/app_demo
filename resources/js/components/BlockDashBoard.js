import { Card } from '@shopify/polaris';
import React from 'react';

function BlockDashBoard(props) {
    return (
        <div className="block-dashboard" style={{}}>
            <div className="block-dashboard-header"> 
                <div className="block-dashboard__title">{props.title}</div>
            </div>
            <div className="block-dashboard-main">
                <div className="block-dashboard__number">{props.number}</div>
            </div>
            <div className="block-dashboard-footer">
                <div className="block-dashboard__action">View</div> 
            </div>  
        </div>
    );
}

export default BlockDashBoard;