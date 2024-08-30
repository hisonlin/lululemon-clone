import React from 'react';
import './ProductTitle.css';


const ProductTitle = ({product}) => {

    const price = product.price ? product.price.split('') : [];
    const formattedPrice = price.slice(0, -4).join('');

  return (
    <div>
        <div className={'oneProductName'} >
            {product.name}
        </div>
        <div className={'oneProductPrice'} >
            {formattedPrice}
            <span style={{fontSize:'1rem', fontWeight:'700', marginLeft:'0.5rem'}}>CAD</span>
        </div>
    </div>
  );
};

export default ProductTitle;