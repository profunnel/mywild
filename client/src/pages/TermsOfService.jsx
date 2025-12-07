import React from 'react';
import SeoMeta from '../components/SeoMeta';

const TermsOfService = () => {
    return (
        <div style={styles.container}>
            <SeoMeta
                title="Terms of Service - MyWild"
                description="MyWild terms of service. Review the terms and conditions for using our tick forecast and Lyme disease risk services."
                robots="noindex, follow"
            />
            <h1 style={styles.heading}>Terms of Service</h1>
            <p style={styles.date}>Last Updated: {new Date().toLocaleDateString()}</p>

            <section style={styles.section}>
                <h2 style={styles.subheading}>1. Acceptance of Terms</h2>
                <p style={styles.text}>
                    By accessing and using MyWild, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>2. Disclaimer</h2>
                <p style={styles.text}>
                    The materials on MyWild's website are provided on an 'as is' basis. MyWild makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p style={styles.text}>
                    Further, MyWild does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. The tick activity forecasts are estimates based on environmental models and should not be used as a substitute for professional medical advice or common sense safety precautions.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>3. Limitations</h2>
                <p style={styles.text}>
                    In no event shall MyWild or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MyWild's website, even if MyWild or a MyWild authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>4. Accuracy of Materials</h2>
                <p style={styles.text}>
                    The materials appearing on MyWild's website could include technical, typographical, or photographic errors. MyWild does not warrant that any of the materials on its website are accurate, complete or current. MyWild may make changes to the materials contained on its website at any time without notice.
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
        color: '#333',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '10px',
        color: '#064e3b',
    },
    date: {
        color: '#666',
        marginBottom: '40px',
    },
    section: {
        marginBottom: '30px',
    },
    subheading: {
        fontSize: '1.5rem',
        marginBottom: '15px',
        color: '#065f46',
    },
    text: {
        lineHeight: '1.6',
        color: '#444',
        marginBottom: '15px',
    },
};

export default TermsOfService;
