const review1={
    productId:'prod9820681',
    name:'John',
    rating:5,
    title:'Great product',
    review:'This product is amazing. I love it.',
    date:'2023-08-09'
}
const review2={
    productId:'prod9820681',
    name:'Jane',
    rating:3,
    title:'Not bad',
    review:'This product is not bad. I like it.',
    date:'2024-08-08'
}

const review3={
    productId:'prod9820681',
    name:'Mary',
    rating:4,
    title:'Great product',
    review:'This product is amazing. I love it.',
    date:'2024-08-07'
}

const review4={
    productId:'prod9820681',
    name:'Tom',
    rating:2,
    title:'Below average product',
    review:'This product is below average. I do not like it.',
    date:'2024-08-06'
}

const review5={
    productId:'prod9820681',
    name:'Sue',
    rating:1,
    title:'Poor product',
    review:'This product is Poor. I hate it.',
    date:'2024-07-05'
}

const review6={
    productId:'prod9820681',
    name:'Kay',
    rating:5,
    title:'Great product',
    review:'This product is amazing. I love it.',
    date:'2024-08-09'
}

const reviewsState={
    reviews: [
        review1,
        review2,
        review3,
        review4,
        review5,
        review6,
        review1,
        review2,
        review3,
        review4,
        review5,
        review6,
        review1,
        review2,
        review3,
        review4,
        review5,
        review6,
        review1,
        review2,
        review3,
        review4,
        review5,
        review6,
    ],
    filteredReviews: [],
    sortedReviews: []
}

export const reviewsReducer = (state = reviewsState, action) => {
    switch (action.type) {
        case 'ADD_REVIEW':
            return {
                ...state,
                reviews: [...state.reviews, action.review]
            }
        case 'GET_REVIEWS':
            return {
                ...state,
                filteredReviews: state.reviews.filter(review => review.productId === action.productId)
            }
        case 'SET_SORTED_REVIEWS':
            return {
                ...state,
                sortedReviews: action.reviews
            }
        default:
            return state
    }
}