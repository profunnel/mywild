import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import TickDetailModal from '../components/TickDetailModal';

import axios from 'axios';

function LandingPage() {
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        if (location.trim()) {
            setIsLoading(true);
            try {
                // Enforce a minimum loading time of 1.5 seconds for the animation to be seen
                const [res] = await Promise.all([
                    axios.get(`http://localhost:3002/api/geocode?zip=${location}`),
                    new Promise(resolve => setTimeout(resolve, 1500))
                ]);

                const { lat, lon, city, state } = res.data;
                navigate(`/results?lat=${lat}&lon=${lon}&city=${encodeURIComponent(city)}&state=${state}`);
            } catch (err) {
                console.error("Geocoding error:", err);
                setError('Invalid zip code. Please try again.');
                setIsLoading(false);
            }
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const sliderRef = React.useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const [selectedTick, setSelectedTick] = useState(null);

    const tickData = [
        {
            id: 'deer',
            commonName: 'Deer Tick',
            latinName: 'Ixodes scapularis',
            image: '/images/deer_tick.png',
            region: 'Northeast, Midwest',
            riskShort: 'Lyme Disease, Anaplasmosis, Babesiosis.',
            featureShort: 'Dark reddish-brown, black shield.',
            dangerLevel: 'High',
            habitat: 'Deciduous forests, shady moist areas, and leaf litter. They love the boundary between lawns and woods.',
            seasonality: 'Adults: Oct-May (anytime temp > 32°F). Nymphs: May-August (most dangerous time).',
            diseases: [
                { name: 'Lyme Disease', description: 'The most common vector-borne disease in the US. Causes fever, headache, fatigue, and skin rash.' },
                { name: 'Anaplasmosis', description: 'Flu-like symptoms including fever, muscle aches, and severe headache.' },
                { name: 'Babesiosis', description: 'A microscopic parasite that infects red blood cells.' },
                { name: 'Powassan Virus', description: 'Rare but serious virus that can cause encephalitis (brain inflammation).' }
            ],
            funFact: 'The "Deer Tick" is actually named the Blacklegged Tick. While they mate on deer, white-footed mice are the primary reservoir for Lyme disease bacteria.'
        },
        {
            id: 'dog',
            commonName: 'Dog Tick',
            latinName: 'Dermacentor variabilis',
            image: '/images/dog_tick.png',
            region: 'East of Rockies, Pacific Coast',
            riskShort: 'Rocky Mountain Spotted Fever, Tularemia.',
            featureShort: 'Brown with white/grey mottling.',
            dangerLevel: 'Moderate',
            habitat: 'Grassy fields, walkways, and trails. They are more tolerant of dry conditions than Deer Ticks.',
            seasonality: 'Spring and Summer are peak activity times.',
            diseases: [
                { name: 'Rocky Mountain Spotted Fever', description: 'A bacterial infection that can be fatal if not treated early. Look for a spotted rash.' },
                { name: 'Tularemia', description: 'Also known as rabbit fever, causes skin ulcers and swollen lymph glands.' }
            ],
            funFact: 'These are the largest common ticks. A female can lay up to 4,000-6,500 eggs before dying!'
        },
        {
            id: 'lonestar',
            commonName: 'Lone Star Tick',
            latinName: 'Amblyomma americanum',
            image: '/images/lone_star_tick.png',
            region: 'Southeast, Eastern US',
            riskShort: 'Ehrlichiosis, Alpha-gal (Meat Allergy).',
            featureShort: 'Distinct white dot on female\'s back.',
            dangerLevel: 'High',
            habitat: 'Woodlands with dense undergrowth and around animal resting areas.',
            seasonality: 'Active from early Spring through late Fall.',
            diseases: [
                { name: 'Ehrlichiosis', description: 'Flu-like symptoms usually appearing within 1-2 weeks of a bite.' },
                { name: 'Alpha-gal Syndrome', description: 'A unique allergy to red meat (beef, pork, lamb) triggered by a sugar molecule in the tick\'s saliva.' },
                { name: 'STARI', description: 'Southern Tick-Associated Rash Illness, similar to Lyme but milder.' }
            ],
            funFact: 'The Lone Star Tick is an aggressive hunter. Unlike others that wait for a host, they will actively pursue you if they sense your CO2 or heat.'
        },
        {
            id: 'wood',
            commonName: 'Wood Tick',
            latinName: 'Dermacentor andersoni',
            image: '/images/dog_tick.png', // Placeholder
            region: 'Rocky Mountain States',
            riskShort: 'Rocky Mountain Spotted Fever, Colorado Tick Fever.',
            featureShort: 'Similar to Dog Tick but found at higher elevations.',
            dangerLevel: 'Moderate',
            habitat: 'Shrublands, lightly wooded areas, and open grasslands at elevations of 4,000 to 10,500 feet.',
            seasonality: 'March through July.',
            diseases: [
                { name: 'Rocky Mountain Spotted Fever', description: 'The most severe rickettsial illness in the US.' },
                { name: 'Colorado Tick Fever', description: 'A viral disease causing fever, chills, and fatigue.' }
            ],
            funFact: 'Their saliva contains a neurotoxin that can cause "Tick Paralysis" in humans and pets, which usually reverses once the tick is removed.'
        }
    ];

    return (
        <div className="landing-container light-mode">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <div className="loading-text">Analyzing Local Risk Factors...</div>
                </div>
            )}
            <TickDetailModal tick={selectedTick} onClose={() => setSelectedTick(null)} />
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay-light"></div>
                <div className="hero-content fade-in-up">
                    <h1 className="hero-title">
                        Real-Time Tick Risk in Your Area
                    </h1>
                    <p className="hero-subtitle">
                        Science-driven forecasts that reveal daily tick activity and infection risk where you live.
                    </p>
                    <form onSubmit={handleSearch} className="search-form glass-panel-light">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Enter zip code"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <button type="submit" className="search-button">
                            Check Risk
                        </button>
                    </form>
                    {error && <p style={{ color: '#ff4444', marginTop: '10px', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{error}</p>}
                </div>
                <div className="scroll-indicator dark-text fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <div className="arrow-down dark-border"></div>
                </div>
            </section>

            {/* The Science / Model Deep Dive */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">The Science of Prediction</h2>
                        <p className="section-desc">
                            Ticks are biological machines driven by environmental triggers.
                            Our <strong>Multi-Timescale Risk Model</strong> decodes these triggers.
                        </p>
                    </div>
                    <div className="model-grid">
                        <div className="model-card card-light">
                            <div className="icon">🌡️</div>
                            <h3>Micro-Climate</h3>
                            <p>Real-time temp & humidity analysis to detect immediate questing conditions.</p>
                        </div>
                        <div className="model-card card-light">
                            <div className="icon">💤</div>
                            <h3>Dormancy Cycles</h3>
                            <p>Tracking "chill hours" and warm spells to predict when ticks wake up.</p>
                        </div>
                        <div className="model-card card-light">
                            <div className="icon">🍂</div>
                            <h3>Habitat Viability</h3>
                            <p>Soil moisture and leaf litter data to determine survival rates.</p>
                        </div>
                        <div className="model-card card-light">
                            <div className="icon">📊</div>
                            <h3>CDC Surveillance</h3>
                            <p>Calibrated against decades of regional disease incidence data.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Don't Panic Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Don't Panic. Be Prepared.</h2>
                        <p className="section-desc">
                            Finding a tick can be scary, but knowledge is power. Here are the facts to keep you calm.
                        </p>
                    </div>
                    <div className="reassurance-grid">
                        <div className="reassurance-card">
                            <div className="icon-large">🛡️</div>
                            <h3>Not All Ticks Carry Disease</h3>
                            <p>Depending on the region and species, infection rates vary. Many bites result in no illness at all.</p>
                        </div>
                        <div className="reassurance-card">
                            <div className="icon-large">⏱️</div>
                            <h3>Time is On Your Side</h3>
                            <p>For Lyme disease, a tick typically needs to be attached for <strong>24-36 hours</strong> to transmit the bacteria. Daily checks are your best defense.</p>
                        </div>
                        <div className="reassurance-card">
                            <div className="icon-large">💊</div>
                            <h3>Treatable if Caught Early</h3>
                            <p>Most tick-borne diseases, including Lyme, are highly treatable with antibiotics when diagnosed early.</p>
                        </div>
                    </div>
                    <div className="cta-wrapper">
                        <button onClick={scrollToTop} className="cta-button-outline">Check Your Local Risk</button>
                    </div>
                </div>
            </section>

            {/* Know Your Enemy (Tick ID) */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Know Your Enemy</h2>
                        <p className="section-desc">
                            Identification is key. Different ticks carry different risks.
                            <br /><span style={{ fontSize: '0.9rem', color: '#666' }}>(Click a card for more info)</span>
                        </p>
                    </div>
                    <div
                        className="tick-grid-wrapper"
                        ref={sliderRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        <div className="tick-grid">
                            {tickData.map((tick) => (
                                <div
                                    key={tick.id}
                                    className="tick-card card-light"
                                    onClick={() => setSelectedTick(tick)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="tick-image" style={{ backgroundImage: `url('${tick.image}')` }}></div>
                                    <div className="tick-info">
                                        <h3>{tick.commonName}</h3>
                                        <span className="latin-name">{tick.latinName}</span>
                                        <p><strong>Region:</strong> {tick.region}</p>
                                        <p><strong>Risk:</strong> {tick.riskShort}</p>
                                        <p><strong>Key Feature:</strong> {tick.featureShort}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Plan (First Aid) */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">If You Are Bitten</h2>
                        <p className="section-desc">
                            Do not panic, but act quickly. Proper removal reduces the risk of disease transmission.
                        </p>
                    </div>
                    <div className="first-aid-grid">
                        <div className="first-aid-visual">
                            <img src="/images/tick_bite_rash.png" alt="Bullseye Rash Illustration" className="rash-image" />
                            <p className="caption">Typical "Bullseye" Rash (Erythema Migrans)</p>
                        </div>
                        <div className="steps-timeline light-timeline">
                            <div className="step-item">
                                <div className="step-number-light">01</div>
                                <div className="step-content">
                                    <h3>Remove Immediately</h3>
                                    <p>Use fine-tipped tweezers to grasp the tick as close to the skin's surface as possible. Pull upward with steady, even pressure. Do not twist or jerk the tick; this can cause the mouth-parts to break off and remain in the skin.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number-light">02</div>
                                <div className="step-content">
                                    <h3>Clean & Save</h3>
                                    <p>After removing the tick, thoroughly clean the bite area and your hands with rubbing alcohol or soap and water. Save the tick in a sealed bag or jar in case your doctor needs to identify it.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number-light">03</div>
                                <div className="step-content">
                                    <h3>Monitor Symptoms</h3>
                                    <p>Watch for fever, rash, or flu-like symptoms for 30 days. The "bullseye" rash is a common sign of Lyme disease, but not everyone gets it. If symptoms appear, see a doctor immediately.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pets & Ticks */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="split-layout">
                        <div className="split-image" style={{ backgroundImage: `url('/images/pets_ticks.png')` }}></div>
                        <div className="split-content">
                            <h2 className="section-title-left">Protecting Your Furry Friends</h2>
                            <p className="section-text">
                                Pets are often the first to pick up ticks and can bring them into your home. Dogs are highly susceptible to Lyme disease and Ehrlichiosis.
                            </p>
                            <ul className="check-list">
                                <li><strong>Daily Checks:</strong> Feel for bumps, especially around the ears, collar, eyelids, and between toes.</li>
                                <li><strong>Year-Round Prevention:</strong> Use vet-approved flea and tick preventatives (collars, topicals, or chews) even in winter.</li>
                                <li><strong>Vaccination:</strong> Ask your vet about the Lyme disease vaccine for dogs.</li>
                                <li><strong>Watch for Symptoms:</strong> Limping, lethargy, or loss of appetite can be signs of tick-borne illness.</li>
                            </ul>
                            <button onClick={scrollToTop} className="cta-button-solid">Check Risk for Your Area</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
