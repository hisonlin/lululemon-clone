import React, {useEffect, useState} from 'react';
import './ReviewsContainer.css';
import AverageRating from "./AverageRating";
import RatingSummary from "./RatingSummary";
import WriteAReviewBtn from "./WriteAReviewBtn";
import ReviewCard from "./ReviewCard";
import LoadMoreReviewsBtn from "./LoadMoreReviewsBtn";
import WriteAReview from "../WriteAReview/WriteAReview";
import reviewsAction from "../../../actions/reviewsAction";
import {useDispatch, useSelector} from "react-redux";
import ReviewSortList from "./ReviewSortList";

const ReviewsContainer = ({productId}) => {
    const dispatch = useDispatch();
    const [openWriteReview, setOpenWriteReview] = useState(false);
    // console.log('openWriteReview', openWriteReview)

    useEffect(() => {
        dispatch(reviewsAction.getReviewsByProductId(productId));
    }, [dispatch, productId]);

    const reviews = useSelector(state => state.reviewsReducer.filteredReviews);

    const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);
    const totalReviews = reviews.length;

    const fiveStarReviewsNum = reviews.filter(review => review.rating === 5).length;
    const fourStarReviewsNum = reviews.filter(review => review.rating === 4).length;
    const threeStarReviewsNum = reviews.filter(review => review.rating === 3).length;
    const twoStarReviewsNum = reviews.filter(review => review.rating === 2).length;
    const oneStarReviewsNum = reviews.filter(review => review.rating === 1).length;

    const fiveStarReviewsPercentage = Math.round((fiveStarReviewsNum / totalReviews) * 100);
    const fourStarReviewsPercentage = Math.round((fourStarReviewsNum / totalReviews) * 100);
    const threeStarReviewsPercentage = Math.round((threeStarReviewsNum / totalReviews) * 100);
    const twoStarReviewsPercentage = Math.round((twoStarReviewsNum / totalReviews) * 100);
    const oneStarReviewsPercentage = Math.round((oneStarReviewsNum / totalReviews) * 100);

    const [filter, setFilter] = useState('');
    // console.log(filter)
    const [reviewsToShow, setReviewsToShow] = useState(16); // Initialize with 16 reviews


    const sortByDateReviews = reviews.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    const handleLoadMore = () => {
        setReviewsToShow(prev => prev + 16); // Increase the number of reviews by 16
    };

    const handleOpenWriteReview = () => {
        setOpenWriteReview(true);
    }

    const handleCloseWriteReview = () => {
        setOpenWriteReview(false);
    }

    const submitReviewHandler = () => {
        dispatch(reviewsAction.getReviewsByProductId(productId));
        // setOpenWriteReview(false); // Close the review modal
    }
    const [sortType, setSortedType] = useState('Most Recent');
    const [sortedReviews, setSortedReviews] = useState(sortByDateReviews);

    const getSortType = (type) => {
        setSortedType(type);
    }

    useEffect(() => {
        let sorted = [...reviews];

        if (sortType === 'Most Recent') {
            sorted = sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortType === 'Highest to Lowest Rating') {
            sorted = sorted.sort((a, b) => b.rating - a.rating);
        } else if (sortType === 'Lowest to Highest Rating') {
            sorted = sorted.sort((a, b) => a.rating - b.rating);
        }

        sorted = filterReviews(sorted, filter);

        setSortedReviews(sorted);
    }, [reviews, sortType, filter]);

    // Filtering function
    const filterReviews = (reviews, filter) => {
        if (!filter) return reviews;
        return reviews.filter(review =>
            review.title.toLowerCase().includes(filter.toLowerCase()) ||
            review.review.toLowerCase().includes(filter.toLowerCase())
        );
    };


    return (
        <div className={'reviews'}>
            <div className="reviewsHeader">
                Reviews
            </div>
            {reviews.length>0?<div>
                <div className={'reviewsTop'}>
                    <div className="reviewsTopLeft">
                        <AverageRating averageRating={averageRating} totalReviews={totalReviews}/>
                    </div>

                    <div className="reviewsTopCenter">
                        <RatingSummary five={fiveStarReviewsPercentage}
                                       four={fourStarReviewsPercentage}
                                       three={threeStarReviewsPercentage}
                                       two={twoStarReviewsPercentage}
                                       one={oneStarReviewsPercentage}/>
                    </div>
                    <div className="reviewsTopRight">
                        <div onClick={handleOpenWriteReview}>
                            <WriteAReviewBtn/>
                        </div>
                    </div>
                </div>
                <div className="reviewsBottom">
                    <div className="reviewsBottomLeft">
                        <div style={{fontWeight: '700'}}>Filter Reviews</div>
                        <input type="text"
                               id="filter"
                               name="filter"
                               value={filter}
                               onChange={(e) => setFilter(e.target.value)}
                               placeholder='Search Reviews'
                               style={{width: '90%', padding: '1rem 0 1rem 3rem'}}/>
                    </div>
                    <div className="reviewsBottomRight">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{
                                fontWeight: '700',
                                fontSize: '14px'
                            }}>Showing {Math.min(reviewsToShow, sortedReviews.length)} of {sortedReviews.length} results
                            </div>
                            <ReviewSortList getSortType={getSortType}/>
                        </div>
                        <div className="reviewCards">
                            {sortedReviews.slice(0, reviewsToShow).map((review, index) => (
                                <div key={index} className="review">
                                    <ReviewCard review={review}/>
                                </div>
                            ))}
                            {reviewsToShow < totalReviews && (
                                <div onClick={handleLoadMore}>
                                    <LoadMoreReviewsBtn/>
                                </div>
                            )}
                            <div
                                style={{color: 'rgba(142,142,142,0.7)'}}>Viewing {Math.min(reviewsToShow, sortedReviews.length)} of {sortedReviews.length}</div>
                        </div>
                    </div>
                </div>
            </div>:
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                    <div style={{fontSize: '24px', fontWeight: '700'}}>No Reviews Yet</div>
                </div>}

            {openWriteReview &&
                <WriteAReview closeWriteReview={handleCloseWriteReview} submitReview={submitReviewHandler}/>}
        </div>
    );
};

export default ReviewsContainer;
