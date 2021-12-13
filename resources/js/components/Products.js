import { Button, Icon, SkeletonThumbnail, Spinner, Thumbnail } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import {ViewMajor} from '@shopify/polaris-icons';
import axios from '../axios';
function Products(props) {

    const [listProducts,setListProducts] = useState([]);
    

    
    useEffect(()=>{
        axios.get(window.App.url + '/get-all-Product')
            .then(res => {
                console.log(res.data.products);
                setListProducts(res.data.products)
                
            })
            .catch(error => console.log(error));
    },[]);

    console.log(listProducts);
    return (
        <>
            { listProducts.length ? listProducts.map((product,index)=>(
                <div key={'product-' + index} className="Polaris-ResourceList__ItemWrapper">
                    <div className="Polaris-ResourceItem">
                        <div className="Polaris-ResourceItem__Container" style={{alignItems: 'center'}}>
                            <div className="Polaris-ResourceItem__Owned">
                                <div className="Polaris-ResourceItem__Media">
                                    {product.image ? <Thumbnail source={product.image.src} size="small" alt={product.title} /> : <SkeletonThumbnail size="small" />}
                                </div>
                            </div>
                            <div className="Polaris-ResourceItem__Content">
                                <h3>
                                    <span className="Polaris-TextStyle--variationStrong">{product.title}</span>
                                </h3>
                            </div>
                            <div className="Polaris-ResourceItem__Action">
                                <Button onClick={()=>{window.open(`https://${window.App.shopOrigin}/products/${product.handle}`)}}><Icon source={ViewMajor} color="base" /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            )) : <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center'}}><Spinner accessibilityLabel="Spinner example" size="large" /></div>}
        </>
    );
}

export default Products;