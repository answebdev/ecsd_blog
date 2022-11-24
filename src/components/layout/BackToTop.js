import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

// See comment section: https://dev.to/silviaespanagil/how-to-create-a-scroll-to-top-button-with-react-17do

const BackToTop = () => {
  const [, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 50);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton);
  }, []);

  return (
    <div onClick={handleScrollUp}>
      <Button variant='text'>back to top</Button>
    </div>
  );
};

export default BackToTop;
