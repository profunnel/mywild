import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { states } from '../statesConfig';
import SeoMeta from './SeoMeta';
import ZipInput from './ZipInput';
import { sharedContent, tickDiseases, tickRemoval } from '../content/pageContent';
import { Section } from './ui';
import forecast2026 from '../content/forecast2026Content';
import tickSpecies from '../data/tickSpecies';
import stateTickMapping from '../data/stateTickMapping';
import '../pages/LandingPage.css';

const TickForecast2026 = () => {
    const [activeDisease, setActiveDisease] = useState(0);
    const [activeRegion, setActiveRegion] = useState('northeast');
    const [activeTimelineMonth, setActiveTimelineMonth] = useState(4); // May (index 4)
    const [showAllTicks, setShowAllTicks] = useState(false);

    // Carousel Drag Logic for tick species
    const sliderRef = useRef(null);
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDown = true;
        sliderRef.current.classList.add('active');
        startX = e.pageX - sliderRef.current.offsetLeft;
        scrollLeft = sliderRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
        if (sliderRef.current) sliderRef.current.classList.remove('active');
    };

    const handleMouseUp = () => {
        isDown = false;
        if (sliderRef.current) sliderRef.current.classList.remove('active');
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const regions = Object.values(forecast2026.regionalOutlook);

    return (
        <div className="landing-container light-mode">
            <SeoMeta
                title="2026 Tick & Vector Risk Outlook | National Forecast & Disease Trends"
                description="Get the 2026 tick and mosquito risk forecast. Explore national predictions, regional trends, and data-driven insights on tick-borne disease and climate impacts."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "2026 Tick & Vector Risk Outlook",
                    "description": "Comprehensive 2026 tick and mosquito activity forecast based on weather patterns, habitat data, and disease surveillance.",
                    "datePublished": "2024-12-01",
                    "dateModified": "2024-12-06",
                    "author": {
                        "@type": "Organization",
                        "name": "TickRisk"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "TickRisk"
                    },
                    "about": [
                        {
                            "@type": "MedicalCondition",
                            "name": "Lyme Disease"
                        },
                        {
                            "@type": "Thing",
                            "name": "Tick-borne diseases"
                        }
                    ]
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
                            Powered by real-time CDC and NOAA data
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
                            The <strong>2026 tick activity forecast</strong> projects higher-than-average populations nationwide. Based on <a href="https://www.cdc.gov/ticks/surveillance/index.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2e7d32', textDecoration: 'underline' }}>CDC surveillance data</a> and <a href="https://www.noaa.gov/climate" target="_blank" rel="noopener noreferrer" style={{ color: '#2e7d32', textDecoration: 'underline' }}>NOAA climate forecasts</a>, mild winter conditions and climate impacts are driving robust tick season predictions across multiple regions.
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
                            {forecast2026.nationalOverview.summary} The 2026 tick season is expected to begin earlier and last longer than historical averages in key endemic regions.
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
                                    <strong>States:</strong> {region.states.join(', ')} — <Link to={`/tick-forecast-${region.states[0].toLowerCase().replace(' ', '-')}`} style={{ color: '#2e7d32', textDecoration: 'underline' }}>View detailed state forecasts</Link>
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

            {/* Mid-Page CTA - ZIP Code Checker */}
            <section className="section" style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)',
                textAlign: 'center',
                padding: '4rem 2rem'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '1rem'
                    }}>
                        Check Your Local 2026 Tick Risk
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginBottom: '2rem',
                        lineHeight: '1.6'
                    }}>
                        Ready to see current tick activity in your area? Get today's tick forecast and personalized risk assessment for your ZIP code.
                    </p>
                    <ZipInput buttonText="Get Your Local Forecast" />
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

                    <style>{`
                        .month-tabs-container {
                            display: flex;
                            gap: 0.5rem;
                            flex-wrap: wrap;
                            justify-content: center;
                            margin-bottom: 2rem;
                            max-width: 1000px;
                            margin: 0 auto 2rem;
                        }

                        .month-tab-btn {
                            padding: 0.75rem 1.25rem;
                            background: #f8fafc;
                            color: #475569;
                            border: 2px solid #e2e8f0;
                            border-radius: 12px;
                            font-size: 0.95rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            min-width: 120px;
                            white-space: nowrap;
                        }

                        .month-tab-btn.active {
                            color: white;
                            border: none;
                        }

                        @media (max-width: 768px) {
                            .month-tabs-container {
                                gap: 0.375rem;
                                margin: 0 -0.5rem 1.5rem;
                                padding: 0 0.5rem;
                            }

                            .month-tab-btn {
                                padding: 0.5rem 0.75rem;
                                font-size: 0.85rem;
                                min-width: auto;
                                flex: 0 0 auto;
                            }
                        }
                    `}</style>

                    {/* Month Tabs */}
                    <div className="month-tabs-container">
                        {forecast2026.timeline2026.map((month, idx) => {
                            const getActivityColor = (activity) => {
                                if (activity === 'Very High') return '#dc2626';
                                if (activity.includes('High')) return '#f59e0b';
                                if (activity === 'Moderate') return '#fb923c';
                                return '#10b981';
                            };

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTimelineMonth(idx)}
                                    className={`month-tab-btn ${activeTimelineMonth === idx ? 'active' : ''}`}
                                    style={{
                                        background: activeTimelineMonth === idx ? getActivityColor(month.activity) : '#f8fafc'
                                    }}
                                >
                                    {month.month.split(' ')[0]}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Month Display */}
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {forecast2026.timeline2026.map((month, idx) => (
                            activeTimelineMonth === idx && (
                                <div key={idx} className="month-card-mobile" style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    padding: '2.5rem',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                    border: month.activity === 'Very High' ? '4px solid #dc2626' : month.activity.includes('High') ? '3px solid #f59e0b' : '2px solid #e5e7eb',
                                    position: 'relative'
                                }}>
                                    {/* Activity Badge */}
                                    <div className="activity-badge-mobile" style={{
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

                                    <style>{`
                                        @media (max-width: 768px) {
                                            .month-content-header {
                                                margin-bottom: 1.5rem !important;
                                                padding-right: 0 !important;
                                            }

                                            .month-content-header h3 {
                                                font-size: 1.75rem !important;
                                            }

                                            .month-content-header h4 {
                                                font-size: 1.125rem !important;
                                            }

                                            .month-content-header p {
                                                font-size: 1rem !important;
                                            }

                                            .activity-badge-mobile {
                                                position: static !important;
                                                display: block !important;
                                                width: fit-content !important;
                                                margin-bottom: 1rem !important;
                                            }

                                            .month-card-mobile {
                                                padding: 1.5rem !important;
                                            }
                                        }
                                    `}</style>

                                    <div className="month-content-header" style={{ marginBottom: '2rem', paddingRight: '200px' }}>
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

            {/* Disease Surveillance Section */}
            <Section variant="white" id="diseases" style={{ padding: 0, background: 'transparent' }}>
                {/* Rounded Transition Container */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    background: '#f8fafc',
                    marginTop: '-3rem',
                    borderTopLeftRadius: '2.5rem',
                    borderTopRightRadius: '2.5rem',
                    zIndex: 10,
                    boxShadow: '0 -20px 40px -10px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <style>{`
                        .disease-carousel-container * {
                            box-sizing: border-box;
                        }
                        .disease-carousel-container {
                            display: flex;
                            flex-direction: column;
                        }
                        .disease-image-side {
                            width: 100%;
                            min-height: 300px;
                            position: relative;
                            overflow: hidden;
                        }
                        .disease-content-side {
                            width: 100%;
                            padding: 2rem;
                            background: white;
                            position: relative;
                            overflow-wrap: break-word;
                            word-break: break-word;
                            max-width: 100%;
                        }
                        .disease-content-side p {
                            max-width: 100%;
                        }
                        .disease-nav-btn {
                            position: absolute;
                            top: 150px;
                            transform: translateY(-50%);
                            z-index: 30;
                            width: 4rem;
                            height: 4rem;
                            border-radius: 50%;
                            background: #065f46;
                            border: 2px solid #ffffff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            transition: all 0.2s;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                            color: white;
                        }
                        .disease-nav-btn:hover {
                            background: #047857;
                            transform: translateY(-50%) scale(1.1);
                            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
                        }
                        .disease-title-desktop {
                            display: none;
                        }
                        .disease-title-mobile {
                            display: block;
                            position: relative;
                            padding: 1.5rem 2rem 0.5rem 2rem;
                            background: white;
                            color: #0f172a;
                            z-index: 20;
                            border-bottom: 1px solid #f1f5f9;
                        }

                        @media (min-width: 768px) {
                            .disease-carousel-container {
                                flex-direction: column;
                                height: auto;
                            }
                            .disease-image-side {
                                width: 100%;
                                height: 500px;
                            }
                            .disease-content-side {
                                width: 100%;
                                padding: 3rem 4rem;
                                display: grid;
                                grid-template-columns: 1.2fr 1fr;
                                gap: 4rem;
                                align-items: start;
                            }
                            .disease-title-desktop {
                                display: flex;
                                flex-direction: column;
                                gap: 1.5rem;
                            }
                            .disease-title-mobile {
                                display: none;
                            }
                            .disease-nav-btn {
                                top: 500px;
                            }
                        }
                    `}</style>

                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 20,
                        padding: '1.5rem',
                        textAlign: 'center',
                        pointerEvents: 'none'
                    }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(4px)',
                            color: '#065f46',
                            fontSize: '0.875rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(6, 95, 70, 0.1)'
                        }}>
                            2026 Disease Surveillance Trends
                        </span>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#64748b',
                            marginTop: '0.5rem',
                            textAlign: 'center'
                        }}>
                            Based on <a href="https://www.cdc.gov/lyme/data-research/index.html" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46', textDecoration: 'underline' }}>CDC Lyme Disease Surveillance</a> data
                        </p>
                    </div>

                    <button
                        onClick={() => setActiveDisease(prev => (prev === 0 ? tickDiseases.diseases.length - 1 : prev - 1))}
                        className="disease-nav-btn"
                        style={{ left: '2rem' }}
                        aria-label="Previous disease"
                    >
                        <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button
                        onClick={() => setActiveDisease(prev => (prev === tickDiseases.diseases.length - 1 ? 0 : prev + 1))}
                        className="disease-nav-btn"
                        style={{ right: '2rem' }}
                        aria-label="Next disease"
                    >
                        <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    <div className="disease-carousel-container">
                        <div className="disease-image-side">
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to right, rgba(6, 78, 59, 0.3), transparent)',
                                zIndex: 10,
                                mixBlendMode: 'multiply'
                            }}></div>
                            <img
                                src={tickDiseases.diseases[activeDisease].image || "/images/doctor_examining_rash.png"}
                                alt={`2026 ${tickDiseases.diseases[activeDisease].name} forecast and symptoms - tick-borne disease surveillance`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    inset: 0,
                                    transition: 'opacity 0.5s ease-in-out'
                                }}
                            />

                            <div className="disease-title-mobile">
                                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem 0', lineHeight: 1.1, color: '#0f172a' }}>
                                    {tickDiseases.diseases[activeDisease].name}
                                </h2>
                                <p style={{ color: '#059669', fontSize: '0.95rem', fontWeight: '600', margin: 0 }}>
                                    Vector: {tickDiseases.diseases[activeDisease].vector}
                                </p>
                            </div>
                        </div>

                        <div className="disease-content-side">
                            <div className="disease-info-left">
                                <div className="disease-title-desktop" style={{ marginBottom: '2rem' }}>
                                    <h2 style={{
                                        fontSize: '3rem',
                                        fontWeight: '800',
                                        color: '#0f172a',
                                        marginBottom: '1rem',
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.02em'
                                    }}>
                                        {tickDiseases.diseases[activeDisease].name}
                                    </h2>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        color: '#047857',
                                        fontWeight: '600',
                                        background: '#ecfdf5',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.75rem',
                                        border: '1px solid #d1fae5'
                                    }}>
                                        <span style={{ fontSize: '1.25rem' }}>🕷️</span>
                                        <span>Vector: {tickDiseases.diseases[activeDisease].vector}</span>
                                    </div>
                                </div>

                                <p style={{
                                    fontSize: '1.125rem',
                                    color: '#475569',
                                    lineHeight: '1.8',
                                    marginBottom: '2.5rem',
                                    borderLeft: '4px solid #10b981',
                                    paddingLeft: '1.5rem'
                                }}>
                                    {tickDiseases.diseases[activeDisease].description}
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
                                <div>
                                    <h4 style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '800',
                                        color: '#64748b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '1.25rem'
                                    }}>
                                        <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.2)' }}></span>
                                        Early Warning Signs
                                    </h4>
                                    <ul style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '1rem',
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        {(
                                            tickDiseases.diseases[activeDisease].symptoms?.early ||
                                            tickDiseases.diseases[activeDisease].symptoms?.typical ||
                                            tickDiseases.diseases[activeDisease].symptoms?.initial ||
                                            []
                                        ).slice(0, 4).map((symptom, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#334155', fontWeight: '500', fontSize: '1rem' }}>
                                                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#f59e0b', flexShrink: 0, marginTop: '0.125rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                <span>{symptom}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '800',
                                        color: '#64748b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '1.25rem'
                                    }}>
                                        <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 0 4px rgba(239, 68, 68, 0.2)' }}></span>
                                        Progression & Symptoms
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {(
                                            Array.isArray(tickDiseases.diseases[activeDisease].symptoms?.late) ? tickDiseases.diseases[activeDisease].symptoms.late :
                                                Array.isArray(tickDiseases.diseases[activeDisease].symptoms?.severe) ? tickDiseases.diseases[activeDisease].symptoms.severe :
                                                    tickDiseases.diseases[activeDisease].symptoms?.severe ? [tickDiseases.diseases[activeDisease].symptoms.severe] :
                                                        []
                                        ).slice(0, 3).map((symptom, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}>
                                                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444', flexShrink: 0, marginTop: '0.125rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>{symptom}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '3rem' }}>
                                {tickDiseases.diseases.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveDisease(idx)}
                                        style={{
                                            height: '0.5rem',
                                            borderRadius: '9999px',
                                            transition: 'all 0.3s',
                                            border: 'none',
                                            padding: 0,
                                            cursor: 'pointer',
                                            width: idx === activeDisease ? '2.5rem' : '0.5rem',
                                            background: idx === activeDisease ? '#059669' : '#cbd5e1'
                                        }}
                                        aria-label={`Go to disease ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Regional Links Section */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Explore Forecasts by State</h2>
                        <p className="section-desc">
                            Select your state for a detailed local forecast and risk assessment.
                        </p>
                    </div>

                    <style>{`
                        .state-link-card {
                            position: relative;
                            background: white;
                            border-radius: 16px;
                            padding: 1.5rem;
                            text-decoration: none;
                            color: inherit;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            border: 2px solid transparent;
                            overflow: hidden;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                        }

                        .state-link-card:hover {
                            transform: translateY(-4px);
                            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                        }

                        .state-link-card.risk-high {
                            border-color: #dc2626;
                        }

                        .state-link-card.risk-high:hover {
                            box-shadow: 0 8px 24px rgba(220, 38, 38, 0.2);
                        }

                        .state-link-card.risk-moderate {
                            border-color: #f59e0b;
                        }

                        .state-link-card.risk-moderate:hover {
                            box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2);
                        }

                        .state-link-card.risk-low {
                            border-color: #10b981;
                        }

                        .state-link-card.risk-low:hover {
                            box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2);
                        }

                        .state-link-card.risk-minimal {
                            border-color: #3b82f6;
                        }

                        .state-link-card.risk-minimal:hover {
                            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
                        }

                        .risk-badge {
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                            padding: 0.375rem 0.875rem;
                            border-radius: 9999px;
                            font-size: 0.75rem;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 0.05em;
                        }

                        .risk-badge.high {
                            background: #fef2f2;
                            color: #991b1b;
                        }

                        .risk-badge.moderate {
                            background: #fef3c7;
                            color: #92400e;
                        }

                        .risk-badge.low {
                            background: #d1fae5;
                            color: #065f46;
                        }

                        .risk-badge.minimal {
                            background: #dbeafe;
                            color: #1e40af;
                        }

                        .state-name {
                            font-size: 1.25rem;
                            font-weight: 700;
                            color: #1e293b;
                            margin-top: 0.75rem;
                        }

                        .state-link-text {
                            color: #64748b;
                            font-size: 0.875rem;
                            margin-top: 0.5rem;
                            display: flex;
                            align-items: center;
                            gap: 0.25rem;
                        }
                    `}</style>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        marginTop: '2.5rem'
                    }}>
                        {[...states].sort((a, b) => a.name.localeCompare(b.name)).map((state) => {
                            // Determine risk level based on region
                            const getRiskLevel = (region) => {
                                const regionLower = region.toLowerCase();
                                if (regionLower.includes('northeast') || regionLower.includes('mid-atlantic')) {
                                    return { level: 'high', label: 'High Risk', icon: '🔴' };
                                } else if (regionLower.includes('midwest') || regionLower.includes('southeast')) {
                                    return { level: 'moderate', label: 'Moderate', icon: '🟡' };
                                } else if (regionLower.includes('south') || regionLower.includes('west')) {
                                    return { level: 'low', label: 'Lower Risk', icon: '🟢' };
                                } else {
                                    return { level: 'minimal', label: 'Minimal', icon: '🔵' };
                                }
                            };

                            const risk = getRiskLevel(state.riskRegion);

                            return (
                                <Link
                                    key={state.slug}
                                    to={`/tick-forecast-${state.slug}`}
                                    className={`state-link-card risk-${risk.level}`}
                                >
                                    <div className={`risk-badge ${risk.level}`}>
                                        <span>{risk.icon}</span>
                                        <span>{risk.label}</span>
                                    </div>
                                    <h3 className="state-name">{state.name}</h3>
                                    <p className="state-link-text">
                                        <span>View 2026 Forecast</span>
                                        <span>→</span>
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tick Species Identification */}
            <Section variant="sage" id="biology">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="section-title">Know Your Ticks: Complete US Species Guide</h2>
                    <p className="text-lg text-secondary">
                        Understanding which ticks carry which diseases helps you identify threats and take appropriate precautions. Explore all major tick species found across the United States.
                    </p>
                </div>

                <div className="vector-grid-container">
                    <style>{`
                        .vector-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                            gap: 2rem;
                        }
                        
                        .scroll-indicator {
                            display: none;
                            text-align: right;
                            font-size: 0.875rem;
                            color: #64748b;
                            margin-bottom: 0.5rem;
                            padding-right: 1.5rem;
                            animation: pulse 2s infinite;
                            font-weight: 500;
                        }

                        @keyframes pulse {
                            0%, 100% { opacity: 0.6; }
                            50% { opacity: 1; }
                        }
                        
                        @media (max-width: 768px) {
                            .scroll-indicator {
                                display: block;
                            }

                            .vector-grid {
                                display: flex !important;
                                overflow-x: auto;
                                scroll-snap-type: x mandatory;
                                gap: 1rem !important;
                                padding-bottom: 2rem;
                                margin: 0 -1.5rem;
                                padding-left: 1.5rem;
                                padding-right: 1.5rem;
                                -webkit-overflow-scrolling: touch;
                                cursor: grab;
                            }
                            
                            .vector-grid.active {
                                cursor: grabbing;
                                cursor: -webkit-grabbing;
                                scroll-snap-type: none;
                            }
                            
                            .vector-grid::-webkit-scrollbar {
                                display: none;
                            }
                            .vector-grid {
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }

                            .vector-card {
                                min-width: 80vw;
                                scroll-snap-align: center;
                                border-radius: 1rem;
                                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                            }

                            .vector-image-container {
                                height: 260px !important;
                            }
                        }
                    `}</style>

                    <div className="scroll-indicator">
                        Swipe to explore →
                    </div>

                    <div
                        className="vector-grid"
                        ref={sliderRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {Object.values(tickSpecies).map((tick, idx) => (
                            <div key={idx} className="premium-card hover-lift h-full flex flex-col vector-card" style={{
                                padding: '0',
                                borderTop: `4px solid ${tick.invasive ? '#f59e0b' : tick.tickType === 'soft' ? '#a855f7' : '#10b981'}`,
                                overflow: 'hidden',
                                background: 'white',
                                position: 'relative'
                            }}>
                                {/* Badges */}
                                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 10, display: 'flex', gap: '0.5rem', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    {tick.invasive && (
                                        <span style={{
                                            background: '#f59e0b',
                                            color: 'white',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}>⚠️ INVASIVE</span>
                                    )}
                                    {tick.tickType === 'soft' && (
                                        <span style={{
                                            background: '#a855f7',
                                            color: 'white',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}>🏔️ Cabins/Caves</span>
                                    )}
                                </div>

                                <div className="relative shadow-sm vector-image-container" style={{ width: '100%', height: '14rem' }}>
                                    <img
                                        src={tick.imageUrl || '/images/deer_tick.png'}
                                        alt={tick.displayName}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 className="text-xl font-bold mb-2">{tick.displayName}</h3>
                                    <p className="text-sm italic text-muted mb-4">
                                        {tick.scientificName}
                                    </p>
                                    <div className="flex-grow">
                                        <p className="mb-3 text-sm">
                                            <strong>Appearance:</strong> {tick.appearance}
                                        </p>
                                        <p className="mb-3 text-sm">
                                            <strong>Peak Season:</strong> {tick.peakSeason}
                                        </p>
                                        <p className="mb-4 text-sm">
                                            <strong>Habitat:</strong> {tick.habitat}
                                        </p>
                                        <p className="text-sm text-red-600 font-medium mb-3">
                                            <strong>Diseases:</strong> {tick.diseases.join(', ')}
                                        </p>
                                        {tick.specialNote && (
                                            <p className="text-sm" style={{
                                                background: '#fef3c7',
                                                padding: '0.75rem',
                                                borderRadius: '0.5rem',
                                                borderLeft: '3px solid #f59e0b'
                                            }}>
                                                <strong>Note:</strong> {tick.specialNote}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Removal Guide - Protocol Deck Redesign */}
            <Section id="removal" className="relative overflow-hidden" style={{ background: '#0f172a', padding: '6rem 0' }}>
                {/* Background Ambient Mesh */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight" style={{ fontSize: '3rem', fontWeight: '900', color: 'white', marginBottom: '1.5rem' }}>
                            Tick Bite Protocol
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed" style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '42rem', margin: '0 auto', fontWeight: '300', lineHeight: '1.625' }}>
                            Acting quickly and correctly is your best defense against infection.
                            <span className="block mt-2 text-emerald-400 font-medium" style={{ display: 'block', marginTop: '0.5rem', color: '#34d399', fontWeight: '500' }}>Follow these 6 critical steps.</span>
                        </p>
                    </div>

                    <style>{`
                        .protocol-grid {
                            display: grid;
                            grid-template-columns: 1fr;
                            gap: 2rem;
                        }
                        @media (min-width: 768px) {
                            .protocol-grid { grid-template-columns: repeat(2, 1fr); }
                        }
                        @media (min-width: 1024px) {
                            .protocol-grid { grid-template-columns: repeat(3, 1fr); }
                        }

                        .protocol-card {
                            position: relative;
                            padding: 2rem;
                            border-radius: 1.5rem;
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            backdrop-filter: blur(12px);
                            overflow: hidden;
                            transition: all 0.5s ease;
                            display: flex;
                            flex-direction: column;
                        }

                        .protocol-card:hover {
                            background: rgba(255, 255, 255, 0.1);
                            transform: translateY(-0.5rem);
                            box-shadow: 0 25px 50px -12px rgba(6, 78, 59, 0.25);
                        }

                        .watermark-number {
                            position: absolute;
                            right: -1.5rem;
                            bottom: -2.5rem;
                            font-size: 10rem;
                            font-weight: 900;
                            color: rgba(255, 255, 255, 0.05);
                            font-family: 'Outfit', sans-serif;
                            line-height: 1;
                            pointer-events: none;
                            transition: color 0.5s ease;
                        }

                        .protocol-card:hover .watermark-number {
                            color: rgba(255, 255, 255, 0.1);
                        }

                        .card-content {
                            position: relative;
                            z-index: 10;
                        }

                        .card-title {
                            font-size: 1.5rem;
                            font-weight: 700;
                            color: white;
                            margin-bottom: 1rem;
                            transition: color 0.3s ease;
                        }

                        .protocol-card:hover .card-title {
                            color: #34d399; /* emerald-400 */
                        }

                        .card-description {
                            color: #cbd5e1; /* slate-300 */
                            margin-bottom: 2rem;
                            line-height: 1.625;
                            font-size: 1.125rem;
                            font-weight: 300;
                        }

                        .step-list {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                            display: flex;
                            flex-direction: column;
                            gap: 1rem;
                        }

                        .step-item {
                            display: flex;
                            align-items: flex-start;
                            gap: 1rem;
                            color: #94a3b8; /* slate-400 */
                            font-size: 0.875rem;
                            font-weight: 500;
                        }

                        .step-dot {
                            margin-top: 0.375rem;
                            width: 0.5rem;
                            height: 0.5rem;
                            border-radius: 50%;
                            background-color: #10b981; /* emerald-500 */
                            box-shadow: 0 0 12px rgba(16, 185, 129, 0.6);
                            flex-shrink: 0;
                            transition: transform 0.3s ease;
                        }

                        .protocol-card:hover .step-dot {
                            transform: scale(1.25);
                        }

                        .step-text {
                            transition: color 0.3s ease;
                        }

                        .protocol-card:hover .step-text {
                            color: #e2e8f0; /* slate-200 */
                        }

                        .hover-glow {
                            position: absolute;
                            inset: 0;
                            border-radius: 1.5rem;
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            pointer-events: none;
                            transition: all 0.5s ease;
                        }

                        .protocol-card:hover .hover-glow {
                            border-color: rgba(16, 185, 129, 0.5);
                        }

                        .bottom-accent {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            height: 4px;
                            background: linear-gradient(to right, #10b981, #3b82f6);
                            transform: scaleX(0);
                            transform-origin: left;
                            transition: transform 0.5s ease;
                        }

                        .protocol-card:hover .bottom-accent {
                            transform: scaleX(1);
                        }
                    `}</style>

                    <div className="protocol-grid">
                        {tickRemoval.steps.map((step, idx) => (
                            <div key={idx} className="protocol-card group">
                                {/* Watermark Number */}
                                <div className="watermark-number">
                                    {step.step}
                                </div>

                                {/* Content */}
                                <div className="card-content">
                                    <h3 className="card-title">
                                        {step.title}
                                    </h3>
                                    <p className="card-description">
                                        {step.description}
                                    </p>

                                    {/* List */}
                                    <ul className="step-list">
                                        {step.details.map((detail, i) => (
                                            <li key={i} className="step-item">
                                                <span className="step-dot"></span>
                                                <span className="step-text">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Hover Glow Border */}
                                <div className="hover-glow"></div>

                                {/* Bottom Accent Line */}
                                <div className="bottom-accent"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

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
