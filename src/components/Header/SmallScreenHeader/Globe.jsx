import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

const Globe = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 23 16">
      <path d="M8.5,0.1c-0.2,0-0.3,0-0.5,0c-0.2,0-0.3,0-0.5,0C3.3,0.3,0.1,3.8,0.1,8c0,4.1,3.1,7.5,7.1,7.9h0c0.3,0,0.5,0,0.8,0 c0.3,0,0.6,0,0.8,0c4-0.4,7.1-3.8,7.1-7.9C15.9,3.8,12.7,0.3,8.5,0.1z M5.2,1.6C4.2,3,3.6,5,3.5,7.4H1.1C1.3,4.8,3,2.6,5.2,1.6z M1.1,8.6h2.4c0.1,2.3,0.7,4.4,1.7,5.7C2.9,13.3,1.3,11.2,1.1,8.6z M7.4,14.7c-1.5-0.5-2.6-3.1-2.7-6.1h2.7V14.7z M7.4,7.4H4.7 c0.1-3,1.3-5.5,2.7-6.1V7.4z M14.9,7.4h-2.4C12.4,5,11.8,3,10.8,1.6C13.1,2.6,14.7,4.8,14.9,7.4z M8.6,1.3c1.4,0.5,2.6,3.1,2.7,6.1 H8.6V1.3z M8.6,14.7V8.6h2.7C11.2,11.6,10.1,14.2,8.6,14.7z M10.8,14.3c1-1.4,1.6-3.4,1.7-5.7h2.4C14.7,11.1,13.1,13.3,10.8,14.3z" />
    </SvgIcon>
  );
};

export default Globe;