import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Privacy Policy</h1>
            <p style={styles.date}>Last Updated: {new Date().toLocaleDateString()}</p>

            <section style={styles.section}>
                <h2 style={styles.subheading}>1. Introduction</h2>
                <p style={styles.text}>
                    Welcome to Tick Forecast. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>2. Data We Collect</h2>
                <p style={styles.text}>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                </p>
                <ul style={styles.list}>
                    <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>3. How We Use Your Data</h2>
                <p style={styles.text}>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul style={styles.list}>
                    <li>To provide and maintain our Service.</li>
                    <li>To improve our Service.</li>
                    <li>To monitor the usage of our Service.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>4. Cookies</h2>
                <p style={styles.text}>
                    We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>5. Contact Us</h2>
                <p style={styles.text}>
                    If you have any questions about this Privacy Policy, please contact us.
                </p>
            </section>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '100px 20px 40px',
        color: '#e0e0e0',
        fontFamily: 'Inter, sans-serif',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '10px',
        color: '#fff',
    },
    date: {
        color: '#888',
        marginBottom: '40px',
    },
    section: {
        marginBottom: '30px',
    },
    subheading: {
        fontSize: '1.5rem',
        marginBottom: '15px',
        color: '#4caf50',
    },
    text: {
        lineHeight: '1.6',
        color: '#ccc',
        marginBottom: '15px',
    },
    list: {
        paddingLeft: '20px',
        color: '#ccc',
        lineHeight: '1.6',
    },
};

export default PrivacyPolicy;
