import React from 'react';
import { Link } from 'react-router-dom';
import { states } from '../statesConfig';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.section}>
                    <h4 style={styles.title}>Tick Forecast</h4>
                    <p style={styles.text}>
                        Empowering you with real-time tick activity forecasts to stay safe outdoors.
                    </p>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.title}>Forecasts</h4>
                    <div style={styles.links}>
                        <Link to="/tick-forecast-2026" style={styles.link}>2026 Annual Forecast</Link>
                        {states.map(state => (
                            <Link key={state.slug} to={`/tick-forecast-${state.slug}`} style={styles.link}>
                                {state.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.title}>Legal</h4>
                    <div style={styles.links}>
                        <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
                        <Link to="/terms" style={styles.link}>Terms of Service</Link>
                    </div>
                </div>
            </div>
            <div style={styles.copyright}>
                &copy; {new Date().getFullYear()} Tick Forecast. All rights reserved.
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#111',
        borderTop: '1px solid #222',
        padding: '40px 0 20px',
        marginTop: 'auto', // Push to bottom if flex container
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        marginBottom: '40px',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    title: {
        color: '#fff',
        fontSize: '1.1rem',
        margin: 0,
    },
    text: {
        color: '#888',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        margin: 0,
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    link: {
        color: '#888',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.2s',
    },
    copyright: {
        textAlign: 'center',
        color: '#555',
        fontSize: '0.85rem',
        paddingTop: '20px',
        borderTop: '1px solid #222',
    },
};

export default Footer;
