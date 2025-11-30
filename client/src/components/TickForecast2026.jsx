import React from 'react';
import { Link } from 'react-router-dom';
import { states } from '../statesConfig';
import SeoMeta from './SeoMeta';
import ZipInput from './ZipInput';
import { sharedContent } from '../content/pageContent';
import '../pages/LandingPage.css'; // Reuse styles

const TickForecast2026 = () => {
    return (
        <div className="landing-container light-mode">
            <SeoMeta
                title="2026 Tick Forecast | Annual Outlook & Risk Predictions"
                description="Read the 2026 Tick Forecast. Expert analysis on Lyme disease risk, tick population trends, and regional outlooks for the upcoming season."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "MedicalWebPage",
                    "name": "2026 Tick Forecast",
                    "description": "Annual tick activity and Lyme disease risk forecast for 2026.",
                    "about": {
                        "@type": "MedicalCondition",
                        "name": "Lyme Disease"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "TickRisk"
                    }
                }}
            />

            {/* Hero Section */}
            <section className="hero-section" style={{ minHeight: '70vh', background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/images/hero-forest.jpg) center/cover no-repeat' }}>
                <div className="hero-content fade-in-up">
                    <h1 className="hero-title">
                        Tick Forecast 2026: National and Regional Outlook
                    </h1>
                    <p className="hero-subtitle">
                        Comprehensive analysis of tick activity trends and Lyme disease risk for the 2026 season.
                    </p>
                    <ZipInput />
                </div>
            </section>

            {/* National Overview Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">{sharedContent.intro.title}</h2>
                        <p className="section-desc">
                            {sharedContent.intro.body}
                        </p>
                    </div>
                    <div style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
                        <p>
                            In 2026, warmer winters and wetter springs are expected to drive higher tick activity across the Northeast.
                            Early indicators suggest that nymphal tick populations will be particularly robust, increasing the risk of Lyme disease transmission in late spring and early summer.
                        </p>
                    </div>
                    {/* Vector Map Placeholder */}
                    <div style={{
                        margin: '40px auto',
                        maxWidth: '600px',
                        height: '300px',
                        background: '#f0f4f8',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px dashed #cbd5e1'
                    }}>
                        <span style={{ color: '#64748b', fontWeight: '500' }}>National Risk Map Infographic Placeholder</span>
                    </div>
                </div>
            </section>

            {/* Regional Links Section */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Explore Forecasts by State</h2>
                        <p className="section-desc">
                            Select your state for a detailed local forecast and risk assessment.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        marginTop: '40px'
                    }}>
                        {states.map((state) => (
                            <Link
                                key={state.slug}
                                to={`/tick-forecast-${state.slug}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                <div className="card-light" style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}>
                                    <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>{state.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>View 2026 Forecast &rarr;</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prevention Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">{sharedContent.prevention.title}</h2>
                        <div className="text-left" style={{ maxWidth: '800px', margin: '0 auto', whiteSpace: 'pre-line' }}>
                            {sharedContent.prevention.body}
                        </div>
                    </div>
                </div>
            </section>

            {/* Lyme Awareness Section */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">{sharedContent.lymeAwareness.title}</h2>
                        <p className="section-desc">
                            {sharedContent.lymeAwareness.body}
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="section bg-dark text-white" style={{ textAlign: 'center' }}>
                <div className="container">
                    <h2 className="section-title" style={{ color: '#fff' }}>{sharedContent.footerCTA.title}</h2>
                    <p className="section-desc" style={{ color: '#ccc' }}>
                        {sharedContent.footerCTA.body}
                    </p>
                    <div style={{ marginTop: '30px' }}>
                        <ZipInput />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TickForecast2026;
