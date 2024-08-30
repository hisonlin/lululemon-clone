import React from 'react';
import {Box, Button} from "@mui/material";
import './SizeOption.css';

const SizeOption = ({sizeArray, handleSizeSelection, selectedItem}) => {


  return (
      <Box className="sizeChart">
          {sizeArray.length > 0 ? (
              sizeArray.map((size, index) => (
                  <Button
                      key={index}
                      variant={'contained'}
                      onClick={() => handleSizeSelection(size)}
                      sx={{
                          backgroundColor: selectedItem.size === size ? 'black' : 'white',
                          color: selectedItem.size === size ? 'white' : 'black',
                          borderColor: 'black',
                          '&:hover': {
                              backgroundColor: selectedItem.size === size ? 'black' : 'rgba(0, 0, 0, 0.08)',
                          }
                      }}
                  >
                      {size}
                  </Button>
              ))
          ) : (
              <Button
                  variant={'contained'}
                  onClick={() => handleSizeSelection('One Size')}
                  sx={{
                      backgroundColor: selectedItem.size === 'One Size' ? 'black' : 'white',
                      color: selectedItem.size === 'One Size' ? 'white' : 'black',
                      borderColor: 'black',
                      '&:hover': {
                          backgroundColor: selectedItem.size === 'One Size' ? 'black' : 'rgba(0, 0, 0, 0.08)',
                      }
                  }}
              >
                  One Size
              </Button>
          )}
      </Box>
  );
};

export default SizeOption;