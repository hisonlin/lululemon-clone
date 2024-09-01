import React from 'react';
import './ReviewCard.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarEmpty, faStar} from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({review}) => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const reviewDate = review.date;
    const reviewDateArray = reviewDate.split('-');
    const todayArray = todayString.split('-');
    let daysAgo = 0;
    if (reviewDate === todayString) {
        daysAgo = 'Today';
    } else {
        for (let i = 0; i < 3; i++) {
            if (todayArray[i] > reviewDateArray[i]) {
                if (i === 0) {
                    daysAgo = todayArray[i] - reviewDateArray[i] + ' years ago';
                    break;
                } else if (i === 1) {
                    daysAgo = todayArray[i] - reviewDateArray[i] + ' months ago';
                    break;
                } else if (i === 2) {
                    daysAgo = todayArray[i] - reviewDateArray[i] + ' days ago';
                    break;
                }
            } else if (todayArray[i] < reviewDateArray[i]) {
                if (i === 0) {
                    daysAgo = reviewDateArray[i] - todayArray[i] + ' years from now';
                    break;
                } else if (i === 1) {
                    daysAgo = reviewDateArray[i] - todayArray[i] + ' months from now';
                    break;
                } else if (i === 2) {
                    daysAgo = reviewDateArray[i] - todayArray[i] + ' days from now';
                    break;
                }
            }
        }
    }

    const renderStarsForRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                // Full star
                stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'black' }} />);
            } else {
                // Empty star
                stars.push(<FontAwesomeIcon key={i} icon={faStarEmpty} style={{ color: '#d3d5d7' }} />);
            }
        }
        return stars;
    };

    return (
        <div className={'reviewCardContainer'}>
            <div className={'reviewCardTitle'}>
                <div className={'logo'}>
                    {review.name[0]}
                </div>
                <div style={{fontSize:'10px', fontWeight:'700'}}>{review.name}</div>
                <div style={{fontSize:'10px', color:'rgba(142,142,142,0.7)'}}>{daysAgo}</div>
            </div>
            <div className={'reviewCardRating'} style={{fontSize:'13px'}}>
                {renderStarsForRating()}
            </div>
            <div style={{fontSize:'20px', fontWeight:"700"}}>{review.title}</div>
            <div style={{fontWeight:'500'}}>{review.review}</div>
        </div>
    );
};

export default ReviewCard;