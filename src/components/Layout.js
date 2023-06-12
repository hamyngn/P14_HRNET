import * as React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styles from '../assets/styles/Layout.module.css'
import logo from '../assets/images/logo.png'
import logoSmall from '../assets/images/logo-small.png'

const Layout = () => {
    return (
        <>
        <header className={styles.flexRow}>
        <div className={styles.title}>
            <img src={logo} alt="Logo" srcset={`${logoSmall} 480w, ${logo} 1080w`} sizes="50vw" className={styles.logo}/>
            <h1 style={{color: '#4F5A26'}}>HRnet</h1>
        </div>
        <div className={styles.navContainer}>
        <NavLink to="/" className={styles.nav}>
            Home
        </NavLink>
        <NavLink to="/employee-list" className={styles.nav}>
            Employees
        </NavLink>
        </div>
        </header>
        <main>
          <Outlet />
        </main>
        </>
    )
}
export default Layout;