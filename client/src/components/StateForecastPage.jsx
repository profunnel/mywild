import React, { useState, useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { states } from '../statesConfig';
import SeoMeta from './SeoMeta';
import ZipInput from './ZipInput';
import { Hero, StickyNav, Section, ContentBlock, FeatureGrid, StatCard, Accordion, Timeline } from './ui';
import { seoMetadata, tickBiology, tickDiseases, prevention, tickRemoval } from '../content/pageContent';
import { stateDetails } from '../content/stateContent';
import tickSpecies from '../data/tickSpecies';
import stateTickMapping from '../data/stateTickMapping';

const StateForecastPage = ({ slug }) => {
    const [activeDisease, setActiveDisease] = useState(0);
    const [showAllTicks, setShowAllTicks] = useState(false);

    // Carousel Drag Logic
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
        const walk = (x - startX) * 2; // Scroll-fast
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    // Prevention Carousel Drag Logic
    const preventionSliderRef = useRef(null);
    let isPreventionDown = false;
    let startPreventionX;
    let scrollPreventionLeft;

    const handlePreventionMouseDown = (e) => {
        isPreventionDown = true;
        preventionSliderRef.current.classList.add('active');
        startPreventionX = e.pageX - preventionSliderRef.current.offsetLeft;
        scrollPreventionLeft = preventionSliderRef.current.scrollLeft;
    };

    const handlePreventionMouseLeave = () => {
        isPreventionDown = false;
        if (preventionSliderRef.current) preventionSliderRef.current.classList.remove('active');
    };

    const handlePreventionMouseUp = () => {
        isPreventionDown = false;
        if (preventionSliderRef.current) preventionSliderRef.current.classList.remove('active');
    };

    const handlePreventionMouseMove = (e) => {
        if (!isPreventionDown) return;
        e.preventDefault();
        const x = e.pageX - preventionSliderRef.current.offsetLeft;
        const walk = (x - startPreventionX) * 2;
        preventionSliderRef.current.scrollLeft = scrollPreventionLeft - walk;
    };

    const params = useParams();
    const stateSlug = slug || params.stateSlug;
    const stateConfig = states.find(s => s.slug === stateSlug);
    const content = stateDetails[stateSlug];

    // If state not found, redirect to home or 404
    if (!stateConfig || !content) {
        return <Navigate to="/" replace />;
    }

    // StickyNav links
    const navLinks = [
        { label: 'Summary', href: '#summary' },
        { label: 'Habitat', href: '#habitat' },
        { label: 'Season', href: '#seasonality' },
        { label: 'Biology', href: '#biology' },
        { label: 'Diseases', href: '#diseases' },
        { label: 'Prevention', href: '#prevention' },
        { label: 'Removal', href: '#removal' }
    ];

    // Generate SEO metadata
    const pageTitle = seoMetadata.state.titleTemplate(stateConfig.name);
    const pageDescription = seoMetadata.state.descriptionTemplate(stateConfig.name);

    // Determine risk level based on annual cases
    const getRiskLevel = () => {
        const cases = content.lymeStats?.annualCases || '';
        if (cases.includes('5,500') || cases.includes('4,000')) return 'Very High';
        if (cases.includes('2,000') || cases.includes('1,500') || cases.includes('1,000') || cases.includes('900')) return 'High';
        return 'Moderate to High';
    };

    // Extract peak nymph season from seasonality
    const getPeakActivity = () => {
        if (content.seasonality?.includes('June-July') || content.seasonality?.includes('June through July')) {
            return 'June - July';
        }
        return 'May - July';
    };

    // Mock timeline data (in production, this would come from state-specific data)
    const timelineData = [
        { month: 1, larva: 0, nymph: 0, adult: 20 },
        { month: 2, larva: 0, nymph: 0, adult: 15 },
        { month: 3, larva: 0, nymph: 5, adult: 40 },
        { month: 4, larva: 0, nymph: 30, adult: 50 },
        { month: 5, larva: 10, nymph: 80, adult: 30 },
        { month: 6, larva: 20, nymph: 100, adult: 20 },
        { month: 7, larva: 30, nymph: 70, adult: 10 },
        { month: 8, larva: 80, nymph: 30, adult: 5 },
        { month: 9, larva: 60, nymph: 10, adult: 20 },
        { month: 10, larva: 20, nymph: 5, adult: 80 },
        { month: 11, larva: 5, nymph: 0, adult: 60 },
        { month: 12, larva: 0, nymph: 0, adult: 30 }
    ];

    return (
        <div className="landing-container light-mode">
            <SeoMeta
                title={pageTitle}
                description={pageDescription}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": `${stateConfig.name} Tick Forecast 2026`,
                    "description": pageDescription,
                    "author": {
                        "@type": "Organization",
                        "name": "TickRisk"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "TickRisk",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://tickrisk.com/logo.png"
                        }
                    },
                    "datePublished": "2026-01-01",
                    "dateModified": new Date().toISOString().split('T')[0],
                    "about": {
                        "@type": "MedicalCondition",
                        "name": "Lyme Disease"
                    }
                }}
            />

            {/* Hero Section */}
            <Hero
                title={`Today’s Tick Risk in ${stateConfig.name} – Real-Time Forecast & Activity Map`}
                subtitle="Check your ZIP code for local tick activity, real-time risk levels, and prevention insights."
                bgImage={stateConfig.heroImage || "/images/hero-bg.jpg"}
            >
                <div style={{ marginTop: '2rem' }}>
                    <ZipInput buttonText="Check Tick Risk Now" />
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.875rem',
                        marginTop: '1rem',
                        fontWeight: '500'
                    }}>
                        Powered by real-time CDC and NOAA data
                    </p>
                </div>
            </Hero>

            {/* Sticky Navigation */}
            <StickyNav links={navLinks} stateName={stateConfig.name} />

            {/* Surveillance Insights Section (Full Bleed) */}
            {content.lymeStats && (
                <Section id="surveillance" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', color: 'white', padding: '4rem 0' }}>
                    <div className="insights-header" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '3rem',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: '1.5rem'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>📊</span>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: 'white',
                            margin: 0
                        }}>
                            Surveillance Insights
                        </h3>
                    </div>

                    <div className="insights-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2rem'
                    }}>
                        <style>{`
                            @media (max-width: 900px) {
                                .insights-grid {
                                    grid-template-columns: 1fr !important;
                                    gap: 2rem !important;
                                }
                                .insights-header {
                                    justify-content: center !important;
                                }
                                .insights-grid > div {
                                    align-items: center !important;
                                    text-align: center !important;
                                    border-left: none !important;
                                    padding-left: 0 !important;
                                    border-bottom: 1px solid rgba(255,255,255,0.1);
                                    padding-bottom: 2rem;
                                }
                                .insights-grid > div:last-child {
                                    border-bottom: none;
                                    padding-bottom: 0;
                                }
                            }
                        `}</style>

                        {/* Annual Cases */}
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <h4 style={{
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                marginBottom: '0.75rem'
                            }}>
                                Annual Lyme Cases
                            </h4>
                            <div style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: 'white',
                                lineHeight: '1.3',
                                marginBottom: '0.5rem',
                                fontFamily: 'Outfit, sans-serif'
                            }}>
                                {content.lymeStats.annualCases.split('(')[0]}
                            </div>
                            {content.lymeStats.annualCases.includes('(') && (
                                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', marginBottom: '1rem' }}>
                                    {content.lymeStats.annualCases.split('(')[1].replace(')', '')}
                                </p>
                            )}
                            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: 'auto' }}>
                                Based on CDC surveillance data
                            </p>
                        </div>

                        {/* Trend */}
                        <div style={{
                            borderLeft: '1px solid rgba(255,255,255,0.1)',
                            paddingLeft: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }} className="border-l-0 md:border-l">
                            <h4 style={{
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                marginBottom: '0.75rem'
                            }}>
                                Long-Term Trend
                            </h4>
                            <div style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: 'white',
                                lineHeight: '1.4',
                                marginBottom: '1rem'
                            }}>
                                {content.lymeStats.trend}
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: 'auto' }}>
                                Based on CDC surveillance data
                            </p>
                        </div>

                        {/* High Risk Areas */}
                        <div style={{
                            borderLeft: '1px solid rgba(255,255,255,0.1)',
                            paddingLeft: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }} className="border-l-0 md:border-l">
                            <h4 style={{
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                marginBottom: '0.75rem'
                            }}>
                                High Risk Zones
                            </h4>
                            <div style={{
                                fontSize: '1rem',
                                color: 'rgba(255,255,255,0.9)',
                                lineHeight: '1.6'
                            }}>
                                {content.hotspots && content.hotspots.slice(0, 8).map(h => h.split('(')[0].replace(' County', '').trim()).join(', ')}
                            </div>
                        </div>
                    </div>
                </Section>
            )}

            {/* Summary Section */}
            <Section id="summary" variant="white" style={{ paddingBottom: '1rem' }}>
                <div className="summary-layout" style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 0.8fr',
                    gap: '4rem',
                    alignItems: 'center',
                    marginTop: '4rem',
                    marginBottom: '4rem'
                }}>
                    <style>{`
                        @media (max-width: 1024px) {
                            .summary-layout {
                                grid-template-columns: 1fr !important;
                                gap: 3rem !important;
                            }
                            .summary-text-content {
                                text-align: center !important;
                                display: flex;
                                flex-direction: column;
                                alignItems: center;
                            }
                            .summary-text-content p {
                                max-width: 600px;
                                margin-left: auto;
                                margin-right: auto;
                            }
                        }
                    `}</style>

                    {/* Left Column: Text */}
                    <div className="summary-text-content" style={{ textAlign: 'left' }}>
                        <span className="badge badge-info mb-6" style={{ display: 'inline-block' }}>Forecast Updated: {new Date().toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: 'var(--color-primary)',
                            marginBottom: '1.5rem',
                            lineHeight: '1.2'
                        }}>
                            Current Situation in {stateConfig.name}
                        </h2>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            {content.overview}
                        </p>
                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--text-secondary)',
                            fontStyle: 'italic',
                            borderLeft: '3px solid var(--color-primary)',
                            paddingLeft: '1rem',
                            margin: 0
                        }}>
                            Snapshot of the current tick situation in {stateConfig.name}, based on regional surveillance data and seasonal activity patterns.
                        </p>
                    </div>

                    {/* Right Column: Cards (Vertical Stack) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {/* Risk Level Card */}
                        <div className="premium-card hover-lift" style={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '1rem',
                            padding: '1.25rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{
                                fontSize: '2rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                width: '3.5rem',
                                height: '3.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '0.75rem'
                            }}>⚠️</div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Risk Level</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)' }}>{getRiskLevel()}</div>
                            </div>
                        </div>

                        {/* Peak Activity Card */}
                        <div className="premium-card hover-lift" style={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '1rem',
                            padding: '1.25rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{
                                fontSize: '2rem',
                                background: 'rgba(245, 158, 11, 0.1)',
                                width: '3.5rem',
                                height: '3.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '0.75rem'
                            }}>📅</div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Peak Activity</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)' }}>{getPeakActivity()}</div>
                            </div>
                        </div>

                        {/* Dominant Tick Card */}
                        <div className="premium-card hover-lift" style={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '1rem',
                            padding: '1.25rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{
                                fontSize: '2rem',
                                background: 'rgba(16, 185, 129, 0.1)',
                                width: '3.5rem',
                                height: '3.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '0.75rem'
                            }}>🕷️</div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Dominant Vector</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)' }}>{content.dominantTick || 'Deer Tick'}</div>
                            </div>
                        </div>
                    </div>
                </div>



            </Section >

            {/* State Habitat Profile */}
            < Section variant="white" id="habitat" style={{ padding: '0' }}>
                <div style={{
                    position: 'relative',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    minHeight: '600px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.15)'
                }}>
                    {/* Background Image */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(/images/tick-habitat.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}></div>

                    {/* Overlay Gradient for readability */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)'
                    }}></div>

                    {/* Overlay Card */}
                    <div className="premium-card" style={{
                        position: 'relative',
                        maxWidth: '700px',
                        width: '90%',
                        margin: '2rem',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(12px)',
                        border: 'var(--glass-border)',
                        padding: '3rem',
                        zIndex: 10,
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
                        textAlign: 'center'
                    }}>
                        <style>{`
                            @media (max-width: 768px) {
                                .premium-card {
                                    margin: 1rem !important;
                                    padding: 2.5rem 1.5rem !important;
                                    width: 95% !important;
                                }
                            }
                        `}</style>
                        <span style={{
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            color: 'var(--color-emerald-700)',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            marginBottom: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>🌲</span> Habitat Analysis
                        </span>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            color: 'var(--color-primary)',
                            marginBottom: '1.5rem',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em'
                        }}>
                            Where Ticks Hide in {stateConfig.name}
                        </h2>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: '1.8',
                            color: 'var(--text-secondary)'
                        }}>
                            {content.habitat}
                        </p>
                    </div>
                </div>
            </Section >

            {/* Seasonal Timeline */}
            < Section variant="subtle" id="seasonality" style={{ paddingTop: '1rem' }}>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="section-title">Seasonal Activity Pattern</h2>
                    <p className="text-lg text-secondary">
                        {content.seasonality}
                    </p>
                </div>

                <div className="premium-card p-8 shadow-lg">
                    <Timeline data={timelineData} />
                </div>
            </Section >

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
                        Check Your Local Tick Risk
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

            {/* Know Your Enemy - Biology */}
            < Section variant="sage" id="biology" >
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="section-title">Local Vector Analysis</h2>
                    <p className="text-lg text-secondary">
                        Understanding which ticks are active in {stateConfig.name} helps you identify threats and take appropriate precautions.
                    </p>
                </div>

                {/* Alaska Special Notice */}
                {stateConfig.abbreviation === 'AK' && (
                    <div className="premium-card mb-8" style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        padding: '2rem',
                        borderRadius: '1rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Good News for Alaska!</h3>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                            Alaska has no established populations of disease-carrying tick species. The native <em>Ixodes angustus</em> poses minimal health risk to humans.
                        </p>
                        <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                            <strong>Traveler Advisory:</strong> Check pets and gear after visiting tick-endemic states before returning to Alaska.
                        </p>
                    </div>
                )}

                {/* State-specific ticks */}
                {(() => {
                    const stateAbbrev = stateConfig.abbreviation;
                    const stateTicks = stateTickMapping[stateAbbrev];

                    if (!stateTicks) return null;

                    // Gather all tick IDs
                    const allTickIds = [
                        ...(stateTicks.primary || []),
                        ...(stateTicks.secondary || []),
                        ...(stateTicks.emerging || []),
                        ...(stateTicks.specialty || [])
                    ];

                    // Convert to tick objects and sort by priority
                    const allTicks = allTickIds
                        .map(id => ({
                            ...tickSpecies[id],
                            category: stateTicks.primary?.includes(id) ? 'primary' :
                                stateTicks.secondary?.includes(id) ? 'secondary' :
                                    stateTicks.emerging?.includes(id) ? 'emerging' : 'specialty'
                        }))
                        .filter(Boolean)
                        .sort((a, b) => a.priority - b.priority);

                    // Show only top 3 unless expanded
                    const ticksToDisplay = showAllTicks ? allTicks : allTicks.slice(0, 3);
                    const hasMoreTicks = allTicks.length > 3;

                    const getBorderColor = (category, tickType) => {
                        if (category === 'emerging') return '#f59e0b'; // Orange for invasive
                        if (tickType === 'soft') return '#a855f7'; // Purple for soft ticks
                        if (category === 'primary') return '#ef4444'; // Red for primary
                        if (category === 'secondary') return '#fb923c'; // Light orange
                        return '#10b981'; // Green default
                    };

                    return (
                        <>

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
                                    {ticksToDisplay.map((tick, idx) => (
                                        <div key={idx} className="premium-card hover-lift h-full flex flex-col vector-card" style={{
                                            padding: '0',
                                            borderTop: `4px solid ${getBorderColor(tick.category, tick.tickType)}`,
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
                                                {tick.category === 'primary' && (
                                                    <span style={{
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '700',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                    }}>PRIMARY THREAT</span>
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

                                {/* View More Button */}
                                {hasMoreTicks && (
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                        <button
                                            onClick={() => setShowAllTicks(!showAllTicks)}
                                            className="premium-card hover-lift"
                                            style={{
                                                padding: '1rem 2.5rem',
                                                background: showAllTicks ? '#f1f5f9' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                color: showAllTicks ? '#334155' : 'white',
                                                border: 'none',
                                                borderRadius: '9999px',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                            }}
                                        >
                                            {showAllTicks ? (
                                                <>Show Less ↑</>
                                            ) : (
                                                <>View {allTicks.length - 3} More Tick Species →</>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    );
                })()}
            </Section>

            {/* Disease Surveillance Section */}
            <Section variant="white" id="diseases" style={{ padding: 0, background: 'transparent' }}>
                {/* Rounded Transition Container */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    background: '#f8fafc',
                    marginTop: '-3rem', // Pull up into previous section
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
                            min-height: 300px; /* Minimum height for mobile */
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
                            top: 150px; /* Center on mobile image (300px height) */
                            transform: translateY(-50%);
                            z-index: 30;
                            width: 4rem; /* Larger buttons */
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
                                flex-direction: column; /* Stacked layout: Image Top / Content Bottom */
                                height: auto;
                            }
                            .disease-image-side {
                                width: 100%;
                                height: 500px; /* Landscape aspect ratio */
                            }
                            .disease-content-side {
                                width: 100%;
                                padding: 3rem 4rem;
                                display: grid;
                                grid-template-columns: 1.2fr 1fr; /* 2-column layout: Content | Symptoms */
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
                            /* Adjust button position to be centered on the seam (500px) */
                            .disease-nav-btn {
                                top: 500px;
                            }
                        }
                    `}</style>

                    {/* Section Header Badge */}
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
                            Tick-Borne Disease Monitor
                        </span>
                    </div>

                    {/* Navigation Buttons */}
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

                    {/* Carousel Content */}
                    <div className="disease-carousel-container">

                        {/* Image Side (Left) */}
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
                                alt={`Doctor examining patient for ${tickDiseases.diseases[activeDisease].name}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    inset: 0,
                                    transition: 'opacity 0.5s ease-in-out'
                                }}
                            />

                            {/* Mobile Title Overlay (Now Below Image) */}
                            <div className="disease-title-mobile">
                                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem 0', lineHeight: 1.1, color: '#0f172a' }}>
                                    {tickDiseases.diseases[activeDisease].name}
                                </h2>
                                <p style={{ color: '#059669', fontSize: '0.95rem', fontWeight: '600', margin: 0 }}>
                                    Vector: {tickDiseases.diseases[activeDisease].vector}
                                </p>
                            </div>
                        </div>

                        {/* Content Side (Right) */}
                        <div className="disease-content-side">

                            {/* Left Column: Title, Vector, Description */}
                            <div className="disease-info-left">
                                {/* Desktop Title */}
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

                                {/* Description */}
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

                            {/* Info Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>

                                {/* Early Warning Signs */}
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

                                {/* Late/Severe Symptoms */}
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

                            {/* Pagination Dots */}
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

            {/* Prevention Strategy */}
            <Section variant="subtle" id="prevention">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="section-title">Prevention Strategies</h2>
                    <p className="text-lg text-secondary">
                        {prevention.overview.intro}
                    </p>
                </div>

                <div className="prevention-grid-container">
                    <style>{`
                        .prevention-grid {
                            display: grid;
                            grid-template-columns: repeat(4, 1fr);
                            gap: 2rem;
                        }

                        @media (max-width: 768px) {
                            .prevention-grid {
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

                            .prevention-grid.active {
                                cursor: grabbing;
                                cursor: -webkit-grabbing;
                                scroll-snap-type: none;
                            }

                            /* Hide scrollbar */
                            .prevention-grid::-webkit-scrollbar {
                                display: none;
                            }
                            .prevention-grid {
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }

                            .prevention-card {
                                min-width: 80vw;
                                scroll-snap-align: center;
                            }
                        }
                    `}</style>

                    <div className="scroll-indicator">
                        Swipe to explore →
                    </div>

                    <div
                        className="prevention-grid"
                        ref={preventionSliderRef}
                        onMouseDown={handlePreventionMouseDown}
                        onMouseLeave={handlePreventionMouseLeave}
                        onMouseUp={handlePreventionMouseUp}
                        onMouseMove={handlePreventionMouseMove}
                    >
                        {prevention.strategies.slice(0, 4).map((strategy, idx) => (
                            <div key={idx} className="premium-card hover-lift h-full prevention-card" style={{
                                padding: '1.5rem',
                                borderLeft: strategy.priority === 'CRITICAL' ? '4px solid var(--color-red-500)' :
                                    strategy.priority === 'HIGH' ? '4px solid var(--color-amber-500)' :
                                        '4px solid var(--color-emerald-500)',
                                display: 'flex',
                                flexDirection: 'column',
                                background: 'white'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <span className={`badge ${strategy.priority === 'CRITICAL' ? 'badge-danger' :
                                        strategy.priority === 'HIGH' ? 'badge-warning' : 'badge-success'
                                        }`}>
                                        {strategy.priority} Priority
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-primary)' }}>{strategy.title}</h3>

                                <p className="text-sm text-secondary mb-4 flex-grow">
                                    {strategy.description}
                                </p>

                                <div style={{
                                    background: 'var(--bg-secondary)',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem'
                                }}>
                                    <div style={{ marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-primary)' }}>
                                        🛡️ Effectiveness: <span style={{ fontWeight: '400', color: 'var(--text-secondary)' }}>{strategy.effectiveness}</span>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                        "{strategy.whyItWorks}"
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

            {/* Footer CTA */}
            <Section variant="dark" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' }}>
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="section-title text-white mb-4">
                        Stay Safe in {stateConfig.name}
                    </h2>
                    <p className="text-white/90 mb-8 text-lg">
                        Get personalized tick forecasts and prevention tips for your area
                    </p>
                    <ZipInput />


                </div>
            </Section>
        </div>
    );
};

export default StateForecastPage;

