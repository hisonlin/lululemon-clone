import React, {useState} from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ReviewSortList = ({getSortType}) => {
    const [selectedSort, setSelectedSort] = useState('Most Recent');
    const [isOpened, setIsOpened] = useState(false);

    const handleSortItemClick = (sort) => {
        setSelectedSort(sort);
        if (sort === 'Most Recent') {
            getSortType('Most Recent');

        } else if (sort === 'Highest to Lowest Rating') {
            getSortType('Highest to Lowest Rating');

        } else if (sort === 'Lowest to Highest Rating') {
            getSortType('Lowest to Highest Rating');
        }
        setIsOpened(false);
    }

    const handleSortListClick = () => {
        setIsOpened(!isOpened);
    }

    return (
        <div className={'sortListContainer'}>
            <div className={'sortListTitle'}>
                <div style={{fontSize:'14px'}}>Sort by</div>
                <div className={'sortListMainBtn'} style={{fontSize:'14px', fontWeight:'700'}} onClick={handleSortListClick}>
                    <div>{selectedSort}</div>
                    <KeyboardArrowDownIcon/>
                </div>
            </div>
            {isOpened && <div className={'sortList'}>
                <div className={'sortItem'} onClick={() => handleSortItemClick('Most Recent')}>Most Recent</div>
                <div className={'sortItem'} onClick={() => handleSortItemClick('Highest to Lowest Rating')}>Highest to
                    Lowest Rating
                </div>
                <div className={'sortItem'} onClick={() => handleSortItemClick('Lowest to Highest Rating')}>Lowest to
                    Highest Rating
                </div>
            </div>}


        </div>
    );
};

export default ReviewSortList;