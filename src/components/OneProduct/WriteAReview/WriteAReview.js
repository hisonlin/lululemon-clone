import React, {useEffect, useState} from 'react';
import './WriteAReview.css';
import {useDispatch, useSelector} from "react-redux";
import reviewsAction from "../../../actions/reviewsAction";

const WriteAReview = ({closeWriteReview, submitReview}) => {
    const product = useSelector(state => state.oneProductReducer.product);
    console.log(product)
    const dispatch = useDispatch();

    const handleBackgroundClick = (e) => {
        // If the clicked element is the container, close the modal
        if (e.target.className === 'WriteReviewMain') {
            closeWriteReview();
        }
    };

    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the form from submitting traditionally

        const reviewObject = {
            productId: product.productId,
            name: name,
            rating: parseInt(rating, 10),
            title: title,
            review: review,
            date: new Date().toISOString().split('T')[0],
        };
        console.log(reviewObject);

        dispatch(reviewsAction.addReview(reviewObject));
        submitReview();
        closeWriteReview();
    };

   const reduxSelectedItem = useSelector(state => state.oneProductReducer.selectedItem);

   const[imagesArray, setImagesArray] = useState([]);
   // console.log('WriteAReview imagesArray:', imagesArray);

    useEffect(() => {
        if (product && product.images) {
            const images = product.images.map(imageObj => {
                const images = imageObj.mainCarousel.media;
                return images.split('|').map(image => image.trim());
            });
            setImagesArray(images);
        }
    }, [product]);

    return (
      <div className={'WriteReviewMain'} onClick={handleBackgroundClick}>
          <form onSubmit={handleSubmit}>
              <div className="WriteReviewContainer">
                  {imagesArray.length>0 && <div className='WriteReviewImgEle'>
                      <img
                          src= {imagesArray[reduxSelectedItem.color][0]}
                          alt=""/>
                  </div>}
                  <div className='WriteReviewFormEle'>
                      <div className='WriteReviewHeader'>
                          <h2>Write a review for</h2>
                          <h2>{product.name} - {product.swatches[reduxSelectedItem.color].swatchAlt}</h2>
                      </div>
                      <div>
                          <div className='WriteReviewLabel'><label htmlFor="">Nickname(name displayed)</label></div>
                          <input
                              style={{width: '320px', height: '30px'}}
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required={true}
                          />
                      </div>
                      <div>
                          <div>
                              <div className='WriteReviewLabel'><label>Your overall rating</label></div>
                              <div>
                                  {[1, 2, 3, 4, 5].map((value) => (
                                      <label key={value}>
                                          <input
                                              type="radio" // Change to radio button
                                              name="rating" // Add name attribute to group the radio buttons
                                              value={value}
                                              checked={rating === value}
                                              onChange={() => handleRatingChange(value)}
                                              required={true}
                                          />
                                          {value}
                                      </label>
                                  ))}
                              </div>
                          </div>
                      </div>
                      <div>
                          <div className='WriteReviewLabel'><label htmlFor="">Review Title</label></div>
                          <input
                              style={{width: '320px', height: '30px'}}
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              required={true}
                          />
                      </div>
                      <div>
                          <div className='WriteReviewLabel'><label htmlFor="">Review</label></div>
                          <input
                              style={{width: '320px', height: '50px'}}
                              type="text"
                              value={review}
                              onChange={(e) => setReview(e.target.value)}
                                required={true}
                          />
                      </div>
                      {/*<div>*/}
                      {/*    <div className='WriteReviewLabel'><label htmlFor="">What is your usual size?</label></div>*/}
                      {/*    <input style={{width: '320px', height: '30px'}} type="text"/>*/}
                      {/*</div>*/}
                      {/*<div>*/}
                      {/*    <div className='WriteReviewLabel'><label htmlFor="">What size did you purchase?</label></div>*/}
                      {/*    <input style={{width: '320px', height: '30px'}} type="text"/>*/}

                      {/*</div>*/}

                      <div className='WriteReviewButton'>
                          <button type='submit'>SUBMIT REVIEW</button>
                      </div>


                  </div>
              </div>
          </form>
      </div>
    );
};

export default WriteAReview;