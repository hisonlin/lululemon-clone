import React from 'react';
import './EditItem.css';
import ColorOption from "../../OneProduct/OneProductMain/ColorOption";
import SizeOption from "../../OneProduct/OneProductMain/SizeOption";
import '../../OneProduct/OneProductMain/ProductInfo.scss';
import EditItemCarousel from "../EditItemCarousel/EditItemCarousel";
import {useDispatch} from "react-redux";
import bagAction from "../../../actions/bagAction";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom";

const EditItem = ({item, handleShowEdit, updateBag}) => {
    // console.log('item:', item);
    const [selectedSize, setSelectedSize] = React.useState(item.size);
    const [selectedColor, setSelectedColor] = React.useState(item.colorName);
    const [selectedColorIndex, setSelectedColorIndex] = React.useState(item.color);

    const [selectedItem, setSelectedItem] = React.useState(item);

    const handleColorSelection = (index) => {
        setSelectedColor(item.colorNamesArray[index]);
        setSelectedColorIndex(index);
        setSelectedItem(prev => ({
            ...prev,   // Preserve the current state
            color: index,  // Update only the color
            colorName: item.colorNamesArray[index],
            image: item.productImages[index][0],
        }));
    }

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
        setSelectedItem(prev => ({
            ...prev,   // Preserve the current state
            size: size      // Update only the size
        }));
    }

    const dispatch = useDispatch();
    const handleUpdateItem = () => {
        // console.log('selectedItem:', selectedItem);
        dispatch(bagAction.modifyColorAndSize(item, selectedItem));
        let currentBag = JSON.parse(localStorage.getItem('bag')) || [];
        let newBag = currentBag.filter((i) => i.productId !== item.productId || i.color !== item.color || i.size !== item.size);
        newBag.push(selectedItem);
        updateBag(newBag);
        handleShowEdit();
    }

    const navigate = useNavigate();
    const colorName = item.colorNamesArray[selectedColorIndex];
    const navigateToProduct = () => {
        navigate(`/product/${item.productId}/${colorName}`);
    }

    const handleBackgroundClick = (e) => {
        // If the clicked element is the container, close the modal
        if (e.target.className === 'editItemBackground') {
            handleShowEdit();
        }
    };



    return (
        <div className={'editItemBackground'} onClick={handleBackgroundClick}>
            <div className={'editItemContainer'}>
                <div className={'editItemLeft'}>
                    <EditItemCarousel images={item.productImages[selectedColorIndex]}/>
                    <CloseIcon id='smallCloseBtn'  onClick={handleShowEdit}/>
                </div>
                <div className={'editItemRight'}>
                    <div style={{fontWeight: '700', fontSize: '1.5rem'}}>{item.name}</div>
                    <div style={{margin: '1rem 0'}}>${item.price}</div>
                    <div>
                        Color: {selectedColor}
                        <ColorOption images={item.colorImagesArray} handleColorSelection={handleColorSelection}
                                     selectedItem={selectedItem}/>
                    </div>
                    <div>
                        Size: {selectedSize}
                        <SizeOption sizeArray={item.sizeArray} handleSizeSelection={handleSizeSelection}
                                    selectedItem={selectedItem}/>
                    </div>
                    <button style={{
                        width: '100%',
                        padding: '1rem',
                        background: '#c8102e',
                        color: 'white',
                        fontWeight: '700',
                        borderRadius: '0.25rem',
                        border: 'none',
                        cursor: 'pointer',
                        margin: '1rem 0'
                    }}
                            onClick={handleUpdateItem}>UPDATE ITEM
                    </button>
                    <div className={'textButton'} onClick={navigateToProduct}>View product details</div>
                    <CloseIcon id='bigCloseBtn' onClick={handleShowEdit}/>
                </div>

            </div>
        </div>
    );
};

export default EditItem;