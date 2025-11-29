import React from 'react';

const TermsOfService = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Terms of Service</h1>
            <p style={styles.date}>Last Updated: {new Date().toLocaleDateString()}</p>

            <section style={styles.section}>
                <h2 style={styles.subheading}>1. Acceptance of Terms</h2>
                <p style={styles.text}>
                    By accessing and using Tick Forecast, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>2. Disclaimer</h2>
                <p style={styles.text}>
                    The materials on Tick Forecast's website are provided on an 'as is' basis. Tick Forecast makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p style={styles.text}>
                    Further, Tick Forecast does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. The tick activity forecasts are estimates based on environmental models and should not be used as a substitute for professional medical advice or common sense safety precautions.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>3. Limitations</h2>
                <p style={styles.text}>
                    In no event shall Tick Forecast or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tick Forecast's website, even if Tick Forecast or a Tick Forecast authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>4. Accuracy of Materials</h2>
                <p style={styles.text}>
                    The materials appearing on Tick Forecast's website could include technical, typographical, or photographic errors. Tick Forecast does not warrant that any of the materials on its website are accurate, complete or current. Tick Forecast may make changes to the materials contained on its website at any time without notice.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>5. Governing Law</h2>
                <p style={styles.text}>
                    These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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
};

export default TermsOfService;
