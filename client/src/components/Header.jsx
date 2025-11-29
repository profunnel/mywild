
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

    // Don't render the global header on the results page or landing page
    if (location.pathname === '/' || location.pathname.startsWith('/results')) {
        return null;
    }

    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                <Link to="/" style={styles.link}>Home</Link>
            </nav>
        </header>
    );
}

const styles = {
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '20px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent
        zIndex: 1000,
        boxSizing: 'border-box',
    },
    nav: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'opacity 0.2s',
        textShadow: '0 1px 3px rgba(0,0,0,0.5)', // Better readability on images
    },
};

export default Header;
