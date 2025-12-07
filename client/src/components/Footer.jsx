import React from 'react';
import { Link } from 'react-router-dom';
import { states } from '../statesConfig';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                {/* Top Section: Brand, Resources, Legal */}
                <div style={styles.topSection}>
                    <div style={styles.brandColumn}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', textDecoration: 'none' }}>
                            <img src="/mywild-logo.png" alt="MyWild - Home" style={{ height: '40px', marginRight: '0.5rem', cursor: 'pointer' }} />
                        </Link>
                        <p style={styles.brandText}>
                            Empowering you with real-time tick activity forecasts to stay safe outdoors.
                        </p>
                    </div>

                    <div style={styles.linkColumn}>
                        <h4 style={styles.columnTitle}>Resources</h4>
                        <div style={styles.links}>
                            <Link to="/tick-forecast-2026" style={styles.link}>2026 Annual Forecast</Link>
                        </div>
                    </div>

                    <div style={styles.linkColumn}>
                        <h4 style={styles.columnTitle}>Legal</h4>
                        <div style={styles.links}>
                            <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
                            <Link to="/terms" style={styles.link}>Terms of Service</Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={styles.divider}></div>

                {/* Middle Section: State Links */}
                <div style={styles.middleSection}>
                    <h5 style={styles.subTitle}>State Forecasts</h5>
                    <div style={styles.stateList}>
                        {[...states].sort((a, b) => a.name.localeCompare(b.name)).map((state, index) => (
                            <React.Fragment key={state.slug}>
                                <Link to={`/tick-forecast-${state.slug}`} style={styles.stateLink}>
                                    {state.name}
                                </Link>
                                {index < states.length - 1 && <span style={styles.separator}>, </span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div style={styles.divider}></div>

                {/* Bottom Section: Copyright */}
                <div style={styles.copyright}>
                    &copy; {new Date().getFullYear()} MyWild. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#064e3b', // Deep Emerald
        color: '#ecfdf5', // Light Mint
        padding: '60px 0 30px',
        marginTop: 'auto',
        borderTop: '1px solid #065f46',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
    },
    topSection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '40px',
    },
    brandColumn: {
        maxWidth: '350px',
    },
    brandTitle: {
        fontFamily: '"Outfit", sans-serif',
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '1rem',
    },
    brandText: {
        color: '#d1fae5',
        lineHeight: '1.6',
        fontSize: '0.95rem',
    },
    columnTitle: {
        fontFamily: '"Outfit", sans-serif',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '1.25rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    link: {
        color: '#d1fae5',
        textDecoration: 'none',
        fontSize: '0.95rem',
        transition: 'color 0.2s',
    },
    divider: {
        height: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        margin: '30px 0',
    },
    middleSection: {
        marginBottom: '10px',
    },
    subTitle: {
        fontFamily: '"Outfit", sans-serif',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#6ee7b7', // Emerald 300
        marginBottom: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    stateList: {
        lineHeight: '1.8',
        fontSize: '0.9rem',
        color: '#d1fae5',
    },
    stateLink: {
        color: '#ffffff',
        textDecoration: 'none',
        transition: 'color 0.2s',
        fontWeight: '500',
    },
    separator: {
        color: '#6ee7b7',
        marginRight: '6px',
    },
    copyright: {
        textAlign: 'center',
        color: '#6ee7b7',
        fontSize: '0.85rem',
        paddingTop: '10px',
    },
};

export default Footer;
