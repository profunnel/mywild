```
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <img src="/images/app_logo.png" alt="Tick Forecast Logo" style={styles.logo} />
                <h1 style={styles.title}>Tick Forecast</h1>
            </div>
            <nav>
                <Link to="/" style={styles.link}>Home</Link>
            </nav>
        </header>
    );
}

const styles = {
    header: {
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        color: '#4caf50',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
    nav: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        color: '#e0e0e0',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'color 0.2s',
    },
};

export default Header;
