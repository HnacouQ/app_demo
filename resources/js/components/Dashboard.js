import { Banner } from '@shopify/polaris';
import React from 'react';
import BlockDashBoard from './BlockDashBoard';

function Dashboard(props) {
    return (
        <>
            <Banner
                title="USPS has updated their rates"
                action={{content: 'Update rates', url: ''}}
                secondaryAction={{content: 'Learn more'}}
                status="info"
                onDismiss={() => {}}
                >
                <p>Make sure you know how these changes affect your store.</p>
            </Banner>
            <div style={{display: 'flex',justifyContent:'space-between', marginTop:'20px'}}>
                <BlockDashBoard title="Customer" number={0} />
                <BlockDashBoard title="Products" number={0} />
            </div>
        </>
        
    );
}

export default Dashboard;