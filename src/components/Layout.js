import * as React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/Layout.module.css'
import logo from '../assets/images/logo.jpg'

const Layout = () => {
    return (
        <>
        <header className={styles.flexRow}>
        <div className={styles.title}>
            <img src={logo} alt="Logo" className={styles.logo}/>
            <h1 style={{color: '#708238'}}>HRnet</h1>
        </div>
        <div>
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
        <footer className={styles.footer}>

        </footer>
        </>
    )
}
export default Layout;