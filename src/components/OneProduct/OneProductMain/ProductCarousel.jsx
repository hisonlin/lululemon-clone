import React, {useState, useEffect} from "react";
import {Grid, IconButton, Box} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import "./ProductCarousel.scss";
import Tag from "../../../icons/Tag.jsx";
import HeartIcon from "../../../icons/HeartIcon.jsx";
import {useSelector} from "react-redux";
import FullScreenProduct from "../FullScreenProduct/FullScreenProduct";

const ProductCarousel = ({
                             imagesArray,
                             initialColorIndex,
                             onThumbnailClick,
                         }) => {
    // console.log("ProductCarousel imagesArray:", imagesArray);
    // console.log("ProductCarousel initialColorIndex:", initialColorIndex);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        //Reset activeIndex to 0 when initialColorIndex changes
        setActiveIndex(0);
    }, [initialColorIndex]);

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
        if (onThumbnailClick) {
            onThumbnailClick(index);
        }
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? imagesArray[initialColorIndex].length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === imagesArray[initialColorIndex].length - 1 ? 0 : prevIndex + 1
        );
    };

    const reduxSelectedItem = useSelector(state => state.oneProductReducer.selectedItem);
    // console.log("ProductCarousel reduxSelectedItem:", reduxSelectedItem);

    const [fullScreen, setFullScreen] = useState(false);

    const handleFullScreen = () => {
        setFullScreen(true);
    }

    const handleCloseFullScreen = () => {
        setFullScreen(false);
    }

    return (
        <>
            <Grid item xs={12} md={6} lg={5}>
                <div className="product-carousel">
                    <div className="carousel-container">
                        <IconButton
                            className="carousel-button prev"
                            sx={{borderRadius: "5px", padding: "0.8rem"}}
                            onClick={handlePrev}
                        >
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                        <div className="carousel-image">
                            {imagesArray.length > 0 && imagesArray[reduxSelectedItem.color] && (
                                <>
                                    <img
                                        src={imagesArray[reduxSelectedItem.color][activeIndex]}
                                        alt={`Product ${activeIndex + 1}`}
                                    />
                                    <IconButton className="carousel-icon heart">
                                        <HeartIcon/>
                                    </IconButton>
                                    <IconButton
                                        className="carousel-icon zoom"
                                        sx={{borderRadius: "5px", padding: "0.8rem"}}
                                        onClick={handleFullScreen}
                                    >
                                        <ZoomInIcon/>
                                    </IconButton>
                                </>
                            )}
                        </div>
                        <IconButton
                            className="carousel-button next"
                            sx={{borderRadius: "5px", padding: "0.8rem"}}
                            onClick={handleNext}
                        >
                            <ArrowForwardIosIcon/>
                        </IconButton>
                    </div>
                    {/* start of carousel thumbnails */}
                    <Box className="carousel-thumbnails">
                        {imagesArray.length > 0 &&
                            imagesArray[reduxSelectedItem.color] &&
                            imagesArray[reduxSelectedItem.color].map((image, index) => (
                                <Box
                                    className={`thumbnail ${
                                        index === activeIndex ? "active" : ""
                                    }`}
                                    key={index}
                                    onClick={() => handleThumbnailClick(index)}
                                    sx={{
                                        "&:hover .thumbnail-border": {
                                            borderBottom:
                                                index === activeIndex ? "3px solid black" : "3px solid darkgrey",
                                        },
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                    />
                                    <Box
                                        className="thumbnail-border"
                                        sx={{
                                            width: "100%",
                                            borderBottom:
                                                index === activeIndex ? "3px solid black" : "3px solid transparent",
                                        }}
                                    ></Box>
                                </Box>
                            ))}
                        <div className="tag">
                            <Tag/>
                        </div>
                    </Box>
                </div>
            </Grid>
            {fullScreen && <FullScreenProduct close={handleCloseFullScreen}/>}
        </>
    );
};

export default ProductCarousel;
