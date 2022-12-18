import React from 'react';
import spinner from '../../assets/img/spinner.gif';
import classes from '../../styles/Spinner.module.css';

const Spinner = () => (
  <img
    className={classes.Spinner}
    src={spinner}
    alt='Loading...'
    // style={{ width: '35px', height: 'auto', margin: 'auto', display: 'block' }}
  />
);

export default Spinner;
