import { actionType } from '../const';

const getReviewsByProductId = (productId) => {
    return(
        {
            type: actionType.GET_REVIEWS,
            productId
        }
    )
}

const addReview = (review) => {
    return(
        {
            type: actionType.ADD_REVIEW,
            review
        }
    )

}

const setSortedReviews = (reviews) => {
    return(
        {
            type: actionType.SET_SORTED_REVIEWS,
            reviews
        }
    )
}

export default {
    getReviewsByProductId,
    addReview,
    setSortedReviews
}