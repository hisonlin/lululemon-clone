import React from 'react';
import {Box, Radio} from "@mui/material";
import './ColorOption.css';

const ColorOption = ({images, handleColorSelection, selectedItem}) => {
  return (
      <Box className="colorOptions"  sx={{mb: '1rem'}}>
        {images.map((color, index) => (
            <Radio
                key={index}
                checked={selectedItem.color === index}
                onChange={() => handleColorSelection(index)}
                value={index}
                name="color-radio-btn"
                inputProps={{'aria-label': color}}
                icon={<img src={color} alt=""/>}
                checkedIcon={
                  <div className="checkedIcon">
                    <img src={color} alt=""/>
                  </div>
                }
            />
        ))}
      </Box>
  );
};

export default ColorOption;