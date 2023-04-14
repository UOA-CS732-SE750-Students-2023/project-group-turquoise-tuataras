import React from 'react';
import styles from './Navbar.module.css';
import icon from './images/icon.png'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src={icon} alt="icon" className={styles.navbar__icon} />
      <form className={styles.navbar__form}>
        <input type="text" placeholder="Search" className={styles.navbar__input} />
        <button type="submit" className={styles.navbar__button}>Search</button>
      </form>
      <div>
        <button className={styles.login__button}>Login</button>
        <button className={styles.signup__button}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
