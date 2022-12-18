import React from 'react';
import spinner from '../../assets/img/spinner.gif';

const Spinner = () => (
  <img
    src={spinner}
    alt='Loading...'
    // style={{ width: '35px', height: 'auto', margin: 'auto', display: 'block' }}
    style={{
      width: '35px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      margin: 'auto',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
    }}
  />
);

export default Spinner;
