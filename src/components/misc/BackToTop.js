import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

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
