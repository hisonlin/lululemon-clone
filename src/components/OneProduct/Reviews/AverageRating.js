import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarEmpty, faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import './AverageRating.css';

const AverageRating = ({averageRating, totalReviews}) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= averageRating) {
                // Full star
                stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'black' }} />);
            } else if (i - averageRating <= 0.5) {
                // Half star
                stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} style={{ color: 'black' }} />);
            } else {
                // Empty star
                stars.push(<FontAwesomeIcon key={i} icon={faStarEmpty} style={{ color: '#d3d5d7' }} />);
            }
        }
        return stars;
    };
    return (
        <div>
            <div className={'averageRating'}>
                <div style={{fontSize:'35px', fontWeight:'700'}}>{averageRating}</div>
                <div>{renderStars()}</div>
            </div>
            <div className={'totalReviews'}>
                Based on {totalReviews} reviews
            </div>
        </div>
    );
};

export default AverageRating;