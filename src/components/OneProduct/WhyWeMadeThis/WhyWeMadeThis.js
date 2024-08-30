import React, {useEffect, useState} from 'react';
import './WhyWeMadeThis.css'

const WhyWeMadeThis = ({product,initialColorIndex}) => {
    // console.log('product:', product);
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    // console.log('images:', images);
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        if(product && product.images){
            const title = product.whyWeMadeThis;
            const images=[];
            product.images[initialColorIndex].whyWeMadeThis?.map(img=>(
                images.push(img)
            ));
            setTitle(title);
            setImages(images);
            if (images.length>0 && window.innerWidth < 985){
                setBackgroundImage(images[0]);
            } else {
                setBackgroundImage('');
            }
        }
    }, [product,initialColorIndex]);

    return (
        <div className={'whyWeMadeThisContainer'} style={{
            backgroundImage: window.innerWidth < 985 ?
                `linear-gradient(to bottom, rgba(255,255,255,0),white), url(${backgroundImage})` : 'none'}}>
            <div className={'leftTextContainer'}>
                <h2> Why we <br/>
                    <span style={{textDecoration:'underline', textDecorationColor:'#c8102e'}}>m</span>ade this
                </h2>
                <div style={{fontSize:'20px'}}>
                    {title}
                </div>
            </div>
            <div className={'rightImgContainer'}>
                {images.length>0&&images.map((image,index)=>(
                    <img key={index} src={image} alt="" />
                ))}
            </div>
        </div>
    );
};

export default WhyWeMadeThis;