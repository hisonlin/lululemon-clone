import React from 'react';
import './RatingSummary.css';
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RatingSummary = ({five, four, three, two, one}) => {
  return (
      <div>
          <div style={{fontWeight:'500', marginBottom:'2rem'}}>Rating Summary</div>
          <div className={'ratingSummary'}>
              <div className={'rating'}>
                  <div className={'stars'}>5 <FontAwesomeIcon icon={faStar} style={{ color: 'black' }} /></div>
                  <div className={'ratingBar'}>
                      <div className={'ratingBarFill'}
                           style={{width: `${five}%`}}>
                      </div>
                      <div className={'remaining'}
                           style={{width: `${100 - five}%`}}>
                      </div>
                  </div>
                  <div className={'percentage'}>{five}%</div>
              </div>
              <div className={'rating'}>
                  <div className={'stars'}>4 <FontAwesomeIcon icon={faStar} style={{ color: 'black' }} /></div>
                  <div className="ratingBar">
                      <div className={'ratingBarFill'}
                           style={{width: `${four}%`}}>
                      </div>
                      <div className={'remaining'}
                           style={{width: `${100 - four}%`}}>
                      </div>
                  </div>
                  <div className={'percentage'}>{four}%</div>
              </div>
              <div className={'rating'}>
                  <div className={'stars'}>3 <FontAwesomeIcon icon={faStar} style={{ color: 'black' }} /></div>
                  <div className="ratingBar">
                      <div className={'ratingBarFill'}
                           style={{width: `${three}%`}}>
                      </div>
                      <div className={'remaining'}
                           style={{width: `${100 - three}%`}}>
                      </div>
                  </div>
                  <div className={'percentage'}>{three}%</div>
              </div>
              <div className={'rating'}>
                  <div className={'stars'}>2 <FontAwesomeIcon icon={faStar} style={{ color: 'black' }} /></div>
                  <div className="ratingBar">
                      <div className={'ratingBarFill'}
                           style={{width: `${two}%`}}>
                      </div>
                      <div className={'remaining'}
                           style={{width: `${100 - two}%`}}>
                      </div>
                  </div>
                  <div className={'percentage'}>{two}%</div>
              </div>
              <div className={'rating'}>
                  <div className={'stars'}>1 <FontAwesomeIcon icon={faStar} style={{ color: 'black' }} /></div>
                  <div className="ratingBar">
                      <div className={'ratingBarFill'}
                           style={{width: `${one}%`}}>
                      </div>
                      <div className={'remaining'}
                           style={{width: `${100 - one}%`}}>
                      </div>
                  </div>
                  <div className={'percentage'}>{one}%</div>
              </div>
          </div>
      </div>
  );
};

export default RatingSummary;