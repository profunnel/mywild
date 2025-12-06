import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { states } from '../statesConfig';
import SeoMeta from './SeoMeta';
import ZipInput from './ZipInput';
import { sharedContent } from '../content/pageContent';
import forecast2026 from '../content/forecast2026Content';
import tickSpecies from '../data/tickSpecies';
import stateTickMapping from '../data/stateTickMapping';
import '../pages/LandingPage.css';

const TickForecast2026 = () => {
    const [activeDisease, setActiveDisease] = useState(0);
    const [activeRegion, setActiveRegion] = useState('northeast');
    const [activeTimelineMonth, setActiveTimelineMonth] = useState(4); // May (index 4)

    const regions = Object.values(forecast2026.regionalOutlook);

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
            <section className="hero-section" style={{
                height: '67vh',
                minHeight: '67vh',
                maxHeight: '67vh',
                background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(/images/hero-2026.png) center/cover no-repeat'
            }}>
                <div className="hero-content fade-in-up">
                    <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                        2026 Tick & Vector Risk Outlook
                    </h1>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.95)',
                        maxWidth: '750px',
                        margin: '0 auto 2rem',
                        lineHeight: '1.6'
                    }}>
                        Explore the 2026 forecast for tick and mosquito activity across the U.S. — based on weather, habitat, and disease surveillance data.
                    </h2>
                    <div style={{ marginTop: '2rem' }}>
                        <ZipInput buttonText="Check Your Local Risk" />
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.875rem',
                            marginTop: '1rem',
                            fontWeight: '500'
                        }}>
                            Updated using CDC and NOAA data · Last updated December 2025
                        </p>
                    </div>
                </div>
            </section>

            {/* Executive Summary Cards */}
            <section className="section bg-white" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">2026 Tick Forecast: National Overview</h2>
                        <p className="section-desc" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
                            The <strong>2026 tick activity forecast</strong> projects higher-than-average populations nationwide. Mild winter conditions and climate impacts are driving robust tick season predictions across multiple regions.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        marginTop: '3rem'
                    }}>
                        {Object.values(forecast2026.executiveSummary).map((card, idx) => (
                            <div key={idx} style={{
                                background: idx === 0 ? 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)' :
                                    idx === 1 ? 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)' :
                                        'linear-gradient(135deg, #f57c00 0%, #e65100 100%)',
                                borderRadius: '20px',
                                padding: '2.5rem 2rem',
                                color: 'white',
                                boxShadow: `0 10px 30px ${idx === 0 ? 'rgba(46, 125, 50, 0.3)' : idx === 1 ? 'rgba(211, 47, 47, 0.3)' : 'rgba(245, 124, 0, 0.3)'}`,
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                border: '1px solid rgba(255,255,255,0.1)',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = `0 15px 40px ${idx === 0 ? 'rgba(46, 125, 50, 0.4)' : idx === 1 ? 'rgba(211, 47, 47, 0.4)' : 'rgba(245, 124, 0, 0.4)'}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = `0 10px 30px ${idx === 0 ? 'rgba(46, 125, 50, 0.3)' : idx === 1 ? 'rgba(211, 47, 47, 0.3)' : 'rgba(245, 124, 0, 0.3)'}`;
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                    {card.icon}
                                </div>
                                <div style={{
                                    fontSize: idx === 1 ? '2.5rem' : '3.5rem',
                                    fontWeight: '900',
                                    lineHeight: idx === 1 ? '1.2' : '1',
                                    marginBottom: '0.5rem',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                                }}>
                                    {card.metric}
                                </div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    marginBottom: '0.75rem',
                                    opacity: '0.95'
                                }}>
                                    {card.label}
                                </h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    opacity: '0.85',
                                    lineHeight: '1.5',
                                    margin: 0
                                }}>
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* National Overview Section */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">{forecast2026.nationalOverview.title}</h2>
                    </div>
                    <div style={{ maxWidth: '900px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
                        <p style={{ marginBottom: '2rem' }}>
                            {forecast2026.nationalOverview.summary}
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '2rem',
                            marginTop: '2rem'
                        }}>
                            {forecast2026.nationalOverview.keyFactors.map((factor, idx) => (
                                <div key={idx} style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    border: `2px solid ${idx === 0 ? '#e8f5e9' : idx === 1 ? '#fff3e0' : '#e3f2fd'}`,
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                                    }}
                                >
                                    <h3 style={{
                                        fontSize: '1.3rem',
                                        fontWeight: '700',
                                        marginBottom: '1.25rem',
                                        color: idx === 0 ? '#2e7d32' : idx === 1 ? '#f57c00' : '#1976d2',
                                        borderBottom: `3px solid ${idx === 0 ? '#2e7d32' : idx === 1 ? '#f57c00' : '#1976d2'}`,
                                        paddingBottom: '0.75rem'
                                    }}>
                                        {factor.title}
                                    </h3>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0,
                                        fontSize: '0.95rem',
                                        lineHeight: '1.7',
                                        color: '#444'
                                    }}>
                                        {factor.points.map((point, i) => (
                                            <li key={i} style={{
                                                marginBottom: '0.75rem',
                                                paddingLeft: '1.5rem',
                                                position: 'relative'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    color: idx === 0 ? '#2e7d32' : idx === 1 ? '#f57c00' : '#1976d2',
                                                    fontWeight: '600'
                                                }}>•</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <style>{`
                            @media (max-width: 900px) {
                                div[style*="grid-template-columns: repeat(3, 1fr)"] {
                                    grid-template-columns: 1fr !important;
                                }
                            }
                        `}</style>
                    </div>
                </div>
            </section>

            {/* Regional Outlook Breakdown */}
            <section id="regions" className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Regional Risk Breakdown for 2026</h2>
                        <p className="section-desc">
                            Select your region to see detailed tick activity forecasts and recommendations
                        </p>
                    </div>

                    {/* Region Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
                        {regions.map((region) => (
                            <button
                                key={region.name}
                                onClick={() => setActiveRegion(region.name.toLowerCase().replace(' ', ''))}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: activeRegion === region.name.toLowerCase().replace(' ', '') ? region.riskColor : '#f1f5f9',
                                    color: activeRegion === region.name.toLowerCase().replace(' ', '') ? 'white' : '#334155',
                                    border: 'none',
                                    borderRadius: '9999px',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {region.name}
                            </button>
                        ))}
                    </div>

                    {/* Active Region Content */}
                    {regions.map((region) => (
                        activeRegion === region.name.toLowerCase().replace(' ', '') && (
                            <div key={region.name} className="card-light" style={{ padding: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{region.name}</h3>
                                    <span style={{
                                        background: region.riskColor,
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600'
                                    }}>
                                        {region.riskLevel} Risk
                                    </span>
                                </div>

                                <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                                    <strong>States:</strong> {region.states.join(', ')}
                                </div>

                                <div style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#2e7d32' }}>2026 Outlook:</h4>
                                    <p>{region.outlook}</p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem' }}>
                                            Primary Threat
                                        </h4>
                                        <p style={{ fontSize: '1rem', fontWeight: '500' }}>{region.primaryThreat}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem' }}>
                                            Primary Disease
                                        </h4>
                                        <p style={{ fontSize: '1rem', fontWeight: '500', color: '#dc2626' }}>{region.primaryDisease}</p>
                                    </div>
                                </div>

                                <div style={{ padding: '1rem', background: '#f0f9ff', borderLeft: '4px solid #3b82f6', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                                    <strong style={{ color: '#1e40af' }}>Recommendation:</strong>{' '}
                                    <span>{region.recommendation}</span>
                                </div>

                                {region.specialNote && (
                                    <div style={{ padding: '1rem', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '0.5rem', fontSize: '0.95rem' }}>
                                        <strong>⚠️ Special Note:</strong>{' '}
                                        <span>{region.specialNote}</span>
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                </div>
            </section>

            {/* Month-by-Month Timeline */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">2026 Monthly Activity Timeline</h2>
                        <p className="section-desc">
                            Click through each month to see activity levels and prevention actions
                        </p>
                    </div>

                    {/* Month Tabs */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                        maxWidth: '1000px',
                        margin: '0 auto 2rem'
                    }}>
                        {forecast2026.timeline2026.map((month, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTimelineMonth(idx)}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    background: activeTimelineMonth === idx ? (month.activity === 'Very High' ? '#dc2626' : month.activity.includes('High') ? '#f59e0b' : '#10b981') : '#f8fafc',
                                    color: activeTimelineMonth === idx ? 'white' : '#475569',
                                    border: activeTimelineMonth === idx ? 'none' : '2px solid #e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    minWidth: '120px'
                                }}
                            >
                                {month.month.split(' ')[0]}
                            </button>
                        ))}
                    </div>

                    {/* Active Month Display */}
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {forecast2026.timeline2026.map((month, idx) => (
                            activeTimelineMonth === idx && (
                                <div key={idx} style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    padding: '2.5rem',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                    border: month.activity === 'Very High' ? '4px solid #dc2626' : month.activity.includes('High') ? '3px solid #f59e0b' : '2px solid #e5e7eb',
                                    position: 'relative'
                                }}>
                                    {/* Activity Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        background: month.activity === 'Very High' ? '#dc2626' :
                                            month.activity.includes('High') ? '#f59e0b' :
                                                month.activity === 'Moderate' ? '#fb923c' : '#10b981',
                                        color: 'white'
                                    }}>
                                        {month.activity} Activity
                                    </div>

                                    <div style={{ marginBottom: '2rem', paddingRight: '200px' }}>
                                        <h3 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem', color: '#1e293b' }}>
                                            {month.month}
                                        </h3>
                                        <h4 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#2e7d32', marginBottom: '1rem' }}>
                                            {month.title}
                                        </h4>
                                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#475569' }}>
                                            {month.description}
                                        </p>
                                    </div>

                                    <div style={{ paddingTop: '1.5rem', borderTop: '3px solid #f1f5f9' }}>
                                        <h5 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f766e', marginBottom: '1rem', textTransform: 'uppercase' }}>
                                            ✓ Recommended Actions:
                                        </h5>
                                        <ul style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                            gap: '1rem',
                                            listStyle: 'none',
                                            padding: 0,
                                            margin: 0
                                        }}>
                                            {month.actions.map((action, i) => (
                                                <li key={i} style={{
                                                    padding: '1rem 1.25rem',
                                                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                                                    borderRadius: '12px',
                                                    fontSize: '0.95rem',
                                                    display: 'flex',
                                                    alignItems: 'start',
                                                    gap: '0.75rem',
                                                    border: '1px solid #bae6fd',
                                                    lineHeight: '1.6'
                                                }}>
                                                    <span style={{ color: '#0f766e', fontWeight: '700', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                                                    <span style={{ color: '#0c4a6e' }}>{action}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Navigation */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px solid #f1f5f9' }}>
                                        <button
                                            onClick={() => setActiveTimelineMonth(Math.max(0, idx - 1))}
                                            disabled={idx === 0}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                background: idx === 0 ? '#e5e7eb' : '#3b82f6',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '9999px',
                                                fontSize: '0.95rem',
                                                fontWeight: '600',
                                                cursor: idx === 0 ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            ← Previous
                                        </button>
                                        <button
                                            onClick={() => setActiveTimelineMonth(Math.min(11, idx + 1))}
                                            disabled={idx === 11}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                background: idx === 11 ? '#e5e7eb' : '#3b82f6',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '9999px',
                                                fontSize: '0.95rem',
                                                fontWeight: '600',
                                                cursor: idx === 11 ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </section>

            {/* Disease Surveillance & Projections */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">2026 Disease Surveillance Trends</h2>
                        <p className="section-desc">
                            Projected case numbers and risk trends for major tick-borne diseases
                        </p>
                    </div>

                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        {Object.values(forecast2026.diseaseProjections).map((disease, idx) => (
                            <div key={idx} style={{
                                background: 'linear-gradient(to right, #ffffff 0%, #fef3c7 100%)',
                                borderRadius: '16px',
                                padding: '2rem',
                                marginBottom: '1.5rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                border: '2px solid #fbbf24',
                                position: 'relative'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
                                            {disease.name}
                                        </h3>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b' }}>
                                            <strong>2024 Cases:</strong> {disease.cases2024}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: '#dc2626',
                                        color: 'white',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        textAlign: 'center'
                                    }}>
                                        {disease.projection2026}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1.25rem' }}>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#0f766e', marginBottom: '0.5rem' }}>
                                        Why This Projection?
                                    </h4>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#475569' }}>
                                        {disease.reasoning}
                                    </p>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.8)',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem'
                                }}>
                                    <div>
                                        <strong style={{ color: '#0f766e', display: 'block', marginBottom: '0.25rem' }}>Symptoms:</strong>
                                        <span style={{ color: '#475569' }}>{disease.symptoms}</span>
                                    </div>
                                    <div>
                                        <strong style={{ color: '#0f766e', display: 'block', marginBottom: '0.25rem' }}>Peak Risk:</strong>
                                        <span style={{ color: '#475569' }}>{disease.peakRisk}</span>
                                    </div>
                                    <div>
                                        <strong style={{ color: '#0f766e', display: 'block', marginBottom: '0.25rem' }}>Prevention:</strong>
                                        <span style={{ color: '#475569' }}>{disease.prevention}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        maxWidth: '800px',
                        margin: '3rem auto 0',
                        padding: '2rem',
                        background: '#fef2f2',
                        borderLeft: '6px solid #dc2626',
                        borderRadius: '12px'
                    }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#991b1b', marginBottom: '1rem' }}>
                            ⚠️ Early Detection is Critical
                        </h3>
                        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#7f1d1d', marginBottom: '1rem' }}>
                            Most tick-borne diseases are treatable when caught early. If you develop fever, rash, or flu-like symptoms
                            within 30 days of a tick bite or outdoor activity in tick habitat, seek medical attention immediately.
                        </p>
                        <p style={{ fontSize: '0.95rem', fontWeight: '600', color: '#991b1b' }}>
                            Tell your doctor about potential tick exposure — it can guide faster diagnosis and treatment.
                        </p>
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

            {/* Tick Species Identification */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Know Your Ticks: Species Identification Guide</h2>
                        <p className="section-desc">
                            Learn to identify the most common tick species in the United States — critical for assessing disease risk
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {Object.values(tickSpecies).slice(0, 10).map((tick, idx) => (
                            <div key={idx} style={{
                                background: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                border: '2px solid #e5e7eb'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                                }}
                            >
                                <div style={{
                                    height: '220px',
                                    background: '#f8fafc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '1rem'
                                }}>
                                    {tick.imagePath ? (
                                        <img
                                            src={tick.imagePath}
                                            alt={tick.name}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    ) : (
                                        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Image unavailable</div>
                                    )}
                                </div>

                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: '700',
                                        color: '#1e293b',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {tick.name}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.85rem',
                                        fontStyle: 'italic',
                                        color: '#64748b',
                                        marginBottom: '0.75rem'
                                    }}>
                                        {tick.scientificName}
                                    </p>

                                    {tick.diseases && tick.diseases.length > 0 && (
                                        <div style={{ marginBottom: '1rem' }}>
                                            <strong style={{ fontSize: '0.85rem', color: '#dc2626', display: 'block', marginBottom: '0.5rem' }}>
                                                Transmits:
                                            </strong>
                                            <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#475569' }}>
                                                {tick.diseases.join(', ')}
                                            </div>
                                        </div>
                                    )}

                                    {tick.regions && tick.regions.length > 0 && (
                                        <div>
                                            <strong style={{ fontSize: '0.85rem', color: '#0f766e', display: 'block', marginBottom: '0.5rem' }}>
                                                Found in:
                                            </strong>
                                            <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                                                {tick.regions.join(', ')}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        maxWidth: '800px',
                        margin: '3rem auto 0',
                        padding: '2rem',
                        background: '#eff6ff',
                        borderRadius: '16px',
                        border: '2px solid #3b82f6'
                    }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e40af', marginBottom: '1rem' }}>
                            💡 Identification Tip
                        </h3>
                        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#1e3a8a' }}>
                            Tick size varies dramatically by life stage and feeding status. Nymphs (adolescent ticks) are the size of
                            a poppy seed and responsible for most Lyme disease transmission. Adult ticks are easier to spot but still
                            dangerous. Always check carefully after outdoor activities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Prevention Best Practices */}
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

            {/* Footer CTA - 2026 Specific */}
            <section className="section" style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url(/images/footer-cta-background.png) center/cover',
                    opacity: 0.1
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '1rem',
                        textShadow: '0 2px 20px rgba(0,0,0,0.3)'
                    }}>
                        Get Your Personalized 2026 Tick Risk Forecast
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginBottom: '2.5rem',
                        maxWidth: '700px',
                        margin: '0 auto 2.5rem',
                        lineHeight: '1.6'
                    }}>
                        Enter your ZIP code to receive a detailed local forecast powered by weather data,
                        tick surveillance, and disease tracking for your specific area.
                    </p>
                    <div style={{ marginTop: '30px' }}>
                        <ZipInput buttonText="Check My Local 2026 Risk" />
                    </div>
                    <p style={{
                        marginTop: '2rem',
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontWeight: '500'
                    }}>
                        Join thousands staying informed • Updated monthly • 100% Free
                    </p>
                </div>
            </section>
        </div>
    );
};

export default TickForecast2026;
