// import logo from './logo.svg';
// import logo from '../../../public/logo.svg';
import logo from '../../logo.svg';
import classes from '../../styles/Error.module.css';

const Error = () => {
  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <img src={logo} className={classes.AppLogo} alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={classes.AppLink}
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Error;
