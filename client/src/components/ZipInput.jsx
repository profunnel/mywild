import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/LandingPage.css';

const ZipInput = () => {
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <div className="loading-text">Analyzing Local Risk Factors...</div>
                </div>
            )}
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
        </>
    );
};

export default ZipInput;
