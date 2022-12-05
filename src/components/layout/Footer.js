import classes from '../../styles/Footer.module.css';

const Footer = () => (
  <div className='footer'>
    <div className={classes.Footer}>
      <span className={classes.FooterText}>
        &copy; Copyright {new Date().getFullYear()} Adolf Schmuck
      </span>
    </div>
  </div>
);

export default Footer;
