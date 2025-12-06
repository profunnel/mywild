import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, ComposedChart, Bar, Scatter } from 'recharts';
import 'leaflet/dist/leaflet.css';
import './ResultsPage.css';
import { supabase } from '../lib/supabase';
import SeoMeta from '../components/SeoMeta';

// Helper to update map view
function MapUpdater({ center }) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
}

function ResultsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const radius = searchParams.get('radius') || 10;


    const [forecast, setForecast] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [futureData, setFutureData] = useState([]);
    const [trendData, setTrendData] = useState([]);
    const [longTermDrivers, setLongTermDrivers] = useState([]);
    const [heatmap, setHeatmap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summaryText, setSummaryText] = useState(null);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [bannerDismissed, setBannerDismissed] = useState(false);
    const [email, setEmail] = useState('');

    // Detect window width for responsive legend labels
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Responsive legend labels based on screen width
    const isMobile = windowWidth <= 768;
    const isVerySmall = windowWidth <= 480;

    const legendLabels = useMemo(() => {
        if (isVerySmall) {
            return {
                observedRisk: "Historical",
                actualForecast: "Forecast",
                seasonalTrends: "Seasonal",
                today: "Today",
                observedTemp: "Historical",
                tempForecast: "Forecast",
                tempSeasonal: "Seasonal"
            };
        } else if (isMobile) {
            return {
                observedRisk: "Observed Historical",
                actualForecast: "Weather Forecast",
                seasonalTrends: "Seasonal Trends",
                today: "Today",
                observedTemp: "Observed Historical",
                tempForecast: "Forecast",
                tempSeasonal: "Seasonal Trends"
            };
        } else {
            return {
                observedRisk: "Observed Historical Risk",
                actualForecast: "Actual Risk Based on Weather Forecast",
                seasonalTrends: "Predicted Risk Based on Seasonal Trends",
                today: "Today",
                observedTemp: "Observed Historical Temperature",
                tempForecast: "Temperature Forecast",
                tempSeasonal: "Predicted Temperature Based on Seasonal Trends"
            };
        }
    }, [isMobile, isVerySmall]);

    // Scroll detection for sticky banner
    useEffect(() => {
        const handleScroll = () => {
            if (bannerDismissed) return;

            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercentage = scrollPosition / (documentHeight - windowHeight);

            // Show banner when scrolled 25% down the page
            if (scrollPercentage > 0.25) {
                setShowBanner(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [bannerDismissed]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get zipcode from URL params if available
            const zipcode = searchParams.get('zipcode') || searchParams.get('zip') || null;

            // Insert email subscription into Supabase
            const { data, error } = await supabase
                .from('email_subscriptions')
                .insert([
                    {
                        email: email,
                        zipcode: zipcode,
                        state: state,
                        city: city
                    }
                ])
                .select();

            if (error) {
                // Check if it's a duplicate email error
                if (error.code === '23505') {
                    alert(`You're already subscribed! We'll send tick risk updates to ${email}`);
                } else {
                    console.error('Supabase error:', error);
                    alert('Oops! Something went wrong. Please try again later.');
                }
            } else {
                // Success!
                alert(`Thanks! We'll send tick risk updates to ${email} for ${city}, ${state}.`);
                console.log('Email subscription saved:', data);
            }

            // Close banner after submission attempt
            setBannerDismissed(true);
            setShowBanner(false);
            setEmail(''); // Clear email input

        } catch (err) {
            console.error('Error submitting email:', err);
            alert('Oops! Something went wrong. Please try again later.');
        }
    };

    useEffect(() => {
        if (!lat || !lon) {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("Fetching data for:", lat, lon);
                const [forecastRes, historyRes, heatmapRes] = await Promise.all([
                    axios.get(`http://localhost:3002/api/forecast?lat=${lat}&lon=${lon}&state=${state}`),
                    axios.get(`http://localhost:3002/api/history?lat=${lat}&lon=${lon}&state=${state}`),
                    axios.get(`http://localhost:3002/api/heatmap?lat=${lat}&lon=${lon}&radius=${radius}`),
                    new Promise(resolve => setTimeout(resolve, 1500)) // Enforce minimum 1.5s loading time
                ]);

                console.log("Forecast Data:", forecastRes.data);
                console.log("History Data:", historyRes.data);

                setForecast(forecastRes.data);
                setHistoryData(historyRes.data.history || []);
                setFutureData(historyRes.data.forecast || []);
                setTrendData(historyRes.data.trendData || []);
                setLongTermDrivers(historyRes.data.longTermDrivers);
                setHeatmap(heatmapRes.data);

                // Reset summary loading state for the new data
                setIsSummaryLoading(true);
            } catch (error) {
                console.error("Error loading data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [lat, lon, radius, navigate, state]);

    const getRiskColor = (score) => {
        // Gradient from Green (0) -> Yellow (4) -> Orange (6) -> Red (8+)
        // Simple linear interpolation
        const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

        // Helper to mix colors
        const mix = (c1, c2, weight) => {
            const r = Math.round(c1[0] * (1 - weight) + c2[0] * weight);
            const g = Math.round(c1[1] * (1 - weight) + c2[1] * weight);
            const b = Math.round(c1[2] * (1 - weight) + c2[2] * weight);
            return `rgb(${r}, ${g}, ${b})`;
        };

        const green = [76, 175, 80];   // #4caf50
        const yellow = [255, 235, 59]; // #ffeb3b
        const orange = [255, 152, 0];  // #ff9800
        const red = [244, 67, 54];     // #f44336

        if (score < 4) {
            return mix(green, yellow, clamp(score / 4, 0, 1));
        } else if (score < 6) {
            return mix(yellow, orange, clamp((score - 4) / 2, 0, 1));
        } else {
            return mix(orange, red, clamp((score - 6) / 2, 0, 1));
        }
    };

    const riskLevelFormatter = (value) => {
        if (value >= 8) return "Very High";
        if (value >= 6) return "High";
        if (value >= 4) return "Moderate";
        if (value >= 2) return "Low";
        return "Very Low";
    };


    // Combine short-term and long-term factors
    const allFactorsRaw = useMemo(() => [
        ...(forecast?.risk?.factors || []),
        ...(longTermDrivers || [])
    ], [forecast, longTermDrivers]);

    // Calculate "Today" using the user's local date
    // This ensures the "Today" marker always shows at the correct date for the user's timezone
    const todayDate = useMemo(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }, []);

    // Prepare data with "Today" marker for ComposedChart
    const chartData = useMemo(() => {
        const sourceData = trendData.length > 0 ? trendData : futureData;

        // Deduplicate by date to fix "double line" issue and merge history/forecast
        const uniqueDataMap = new Map();
        sourceData.forEach(d => {
            if (uniqueDataMap.has(d.date)) {
                // Merge carefully: preserve non-null values from both entries
                const existing = uniqueDataMap.get(d.date);
                uniqueDataMap.set(d.date, {
                    ...existing,
                    ...d,
                    // Explicitly preserve non-null risk values (for bridge point)
                    riskHistory: d.riskHistory ?? existing.riskHistory,
                    riskForecast: d.riskForecast ?? existing.riskForecast,
                    riskSeasonal: d.riskSeasonal ?? existing.riskSeasonal
                });
            } else {
                uniqueDataMap.set(d.date, d);
            }
        });

        // Ensure there's a data point at "Today" for line convergence
        const currentRisk = forecast ? forecast.risk.score : null;
        if (currentRisk !== null && !uniqueDataMap.has(todayDate)) {
            // Find the closest data point to estimate tempMax
            const dates = Array.from(uniqueDataMap.keys()).sort();
            const closestDate = dates.reduce((prev, curr) => {
                return Math.abs(new Date(curr) - new Date(todayDate)) < Math.abs(new Date(prev) - new Date(todayDate)) ? curr : prev;
            });
            const closestPoint = uniqueDataMap.get(closestDate);

            // Inject a bridge point at Today's date
            uniqueDataMap.set(todayDate, {
                date: todayDate,
                riskHistory: currentRisk,
                riskForecast: currentRisk,
                riskSeasonal: null,
                tempMax: closestPoint?.tempMax || null
            });
        }

        const uniqueData = Array.from(uniqueDataMap.values()).sort((a, b) => a.date.localeCompare(b.date));

        const processed = uniqueData.map(d => {
            const isToday = d.date === todayDate;
            const isAfterToday = d.date > todayDate;

            // Determine which temperature field to populate based on risk data
            let tempHistory = d.riskHistory !== null && !isAfterToday ? d.tempMax : null;
            let tempForecast = d.riskForecast !== null ? d.tempMax : null;
            const tempSeasonal = d.riskSeasonal !== null ? d.tempMax : null;

            // At "Today", ensure both tempHistory and tempForecast are set so lines converge
            if (isToday && d.tempMax !== null) {
                tempHistory = d.tempMax;
                tempForecast = d.tempMax;
            }

            return {
                ...d,
                // At "Today", ensure both history and forecast are set to current risk
                // After "Today", clear history so the grey line stops at Today
                riskHistory: isAfterToday ? null : (isToday && currentRisk !== null ? currentRisk : d.riskHistory),
                riskForecast: isToday && currentRisk !== null ? currentRisk : d.riskForecast,
                // Temperature fields matching risk structure
                tempHistory: isAfterToday ? null : tempHistory,
                tempForecast,
                tempSeasonal,
                // For the "Today" marker dot
                todayRiskPoint: isToday ? currentRisk : null,
                todayTempPoint: isToday ? d.tempMax : null
            };
        });

        console.log("DEBUG CHART DATA:", {
            todayDate,
            todayPoint: processed.find(d => d.date === todayDate),
            bridgePoint: processed.find(d => d.riskHistory !== null && d.riskForecast !== null)
        });

        return processed;
    }, [trendData, futureData, todayDate, forecast]);

    // Add Today marker to history data
    const historyDataWithToday = useMemo(() => {
        if (!historyData || historyData.length === 0) return historyData;

        const currentRisk = forecast ? forecast.risk.score : null;
        if (currentRisk === null) return historyData;

        // Check if today already exists in the data
        const todayExists = historyData.some(d => d.date === todayDate);

        if (todayExists) {
            // Add todayMarker field to the existing today point
            return historyData.map(d => {
                if (d.date === todayDate) {
                    return {
                        ...d,
                        todayMarker: currentRisk
                    };
                }
                return d;
            });
        }

        // Add today's data point if it doesn't exist
        const dataWithToday = [...historyData, {
            date: todayDate,
            risk: currentRisk,
            todayMarker: currentRisk // Special field for the Today scatter point
        }];

        // Sort by date
        return dataWithToday.sort((a, b) => a.date.localeCompare(b.date));
    }, [historyData, todayDate, forecast]);

    useEffect(() => {
        if (forecast && allFactorsRaw.length > 0) {
            // Deduplicate for the API call
            const factors = allFactorsRaw.filter((v, i, a) => a.findIndex(t => (t.desc === v.desc)) === i);

            const fetchSummary = async () => {
                // Note: We don't set loading to true here because it should already be true 
                // from the data fetching phase or initialization, to prevent flashing.
                // But we can ensure it's true just in case.
                setIsSummaryLoading(true);
                try {
                    const res = await axios.post('http://localhost:3002/api/summary', {
                        status: forecast.risk.status,
                        factors: factors,
                        weather: forecast.weather
                    });
                    if (res.data.summary) {
                        setSummaryText(res.data.summary);
                    }
                } catch (err) {
                    console.error("Error fetching summary", err);
                } finally {
                    setIsSummaryLoading(false);
                }
            };
            fetchSummary();
        } else if (forecast) {
            // If we have a forecast but no factors to summarize, stop loading
            setIsSummaryLoading(false);
        }
    }, [forecast, allFactorsRaw]); // Depend on raw factors or memoized factors

    if (loading) {
        return (
            <div className="loading-overlay">
                <div className="spinner"></div>
                <div className="loading-text">Generating Tick Risk Report...</div>
            </div>
        );
    }
    if (!forecast) {
        console.log("Rendering Error State");
        return <div className="error-container" style={{ padding: '40px', textAlign: 'center', color: '#f44336' }}>
            <h2>Error Loading Forecast</h2>
            <p>Could not retrieve data for this location.</p>
            <p style={{ fontSize: '0.9em', color: '#888', marginTop: '10px' }}>
                {/* Display error details if available, otherwise generic message */}
                Technical Details: {typeof forecast === 'undefined' ? "Connection Failed" : "Data Missing"}
            </p>
            <button onClick={() => navigate('/')} className="back-btn" style={{ marginTop: '20px' }}>Return Home</button>
        </div>;
    }

    // Combine short-term and long-term factors
    // Deduplicate by description to ensure unique factors
    const allFactors = allFactorsRaw.filter((v, i, a) => a.findIndex(t => (t.desc === v.desc)) === i);

    const getDynamicSummary = (status, factors, weather) => {
        try {
            // Helper to clean up factor descriptions for sentence integration
            const cleanFactor = (str) => {
                if (!str) return "";
                // Remove trailing period
                let cleaned = str.endsWith('.') ? str.slice(0, -1) : str;
                // Lowercase first letter unless it looks like a proper noun (simple heuristic)
                // For "Harsh winter...", we want "harsh winter..."
                // We'll just lowercase the first letter for now as most factors are common nouns/adjectives
                cleaned = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
                return cleaned;
            };

            const upFactors = factors.filter(f => f.direction === 'up').map(f => cleanFactor(f.desc || f.name));
            const downFactors = factors.filter(f => f.direction === 'down').map(f => cleanFactor(f.desc || f.name));

            let summary = "";

            if (status.includes('HIGH')) {
                if (upFactors.length > 0) {
                    summary = `Dangerous conditions driven by ${upFactors.slice(0, 2).join(' and ')}.`;
                } else {
                    summary = "Dangerous conditions. Ticks are actively questing.";
                }
            } else if (status === 'MODERATE') {
                if (upFactors.length > 0 && downFactors.length > 0) {
                    summary = `Ticks are active. Risk increased by ${upFactors[0]} but limited by ${downFactors[0]}.`;
                } else if (upFactors.length > 0) {
                    summary = `Ticks are active, driven by ${upFactors[0]}.`;
                } else {
                    summary = "Ticks are active in moist, shaded areas.";
                }
            } else { // LOW / VERY LOW
                if (downFactors.length > 0) {
                    summary = `Low activity expected due to ${downFactors.slice(0, 2).join(' and ')}.`;
                } else {
                    summary = "Low activity expected due to weather conditions.";
                }
            }

            if (weather) {
                summary += ` Current conditions: ${weather.tempF}°F, ${weather.humidity}% Humidity.`;
            }

            return summary;
        } catch (e) {
            console.error("Error in getDynamicSummary:", e);
            return "Risk analysis unavailable.";
        }
    };

    console.log("Rendering ResultsPage");

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            // At the "Today" date, only show the "Today" marker value, not the bridge point values
            const isToday = label === todayDate;

            const filteredPayload = payload.filter(p => {
                // Always filter out the "Today" marker from the list (it's shown as a dot, not in tooltip)
                if (p.name === "Today") return false;

                // At the "Today" date, hide Historical and Forecast values (bridge point)
                // to avoid confusion - the actual current risk is shown in the top gauge
                if (isToday && (p.name === "Historical (Observed)" || p.name === "10-Day Forecast (NWS)")) {
                    return false;
                }

                return true;
            });

            if (filteredPayload.length === 0) return null;

            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    <p className="label" style={{ color: '#333', margin: 0, fontWeight: 'bold' }}>{label}</p>
                    {filteredPayload.map((p, i) => (
                        <p key={i} style={{ color: p.color, margin: 0 }}>
                            {p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="results-container">
            <SeoMeta
                title={`Tick Risk for ${city}, ${state} | Today's Forecast - FieldKind`}
                description={`Current tick activity and Lyme disease risk for ${city}, ${state}. Check today's conditions, 7-day forecast, and personalized prevention tips.`}
                robots="noindex, follow"
            />
            <header className="results-header">
                <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
                <h1>Tick Risk Report for {city}, {state}</h1>
            </header>

            {/* FULL WIDTH: Risk Gauge */}
            <div className="card gauge-card full-width-header" style={{ borderColor: getRiskColor(forecast.risk.score) }}>
                <div className="gauge-content">
                    <div className="gauge-main">
                        <h2>Current Tick Risk</h2>
                        <div className="score-display" style={{ color: getRiskColor(forecast.risk.score) }}>
                            {forecast.risk.score}/10
                        </div>
                        <div className="status-badge" style={{ backgroundColor: getRiskColor(forecast.risk.score), color: '#000' }}>
                            {forecast.risk.status}
                        </div>
                    </div>
                    <div className="gauge-details">
                        <p className="risk-summary">
                            {isSummaryLoading ? "Analyzing risk details..." : (summaryText || getDynamicSummary(forecast.risk.status, allFactors, forecast.weather))}
                        </p>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">

                {/* LEFT COLUMN: Unified Factors Table */}
                <div className="col-left">
                    <div className="card">
                        <h3>Risk Drivers</h3>
                        <table className="factors-table">
                            <thead>
                                <tr>
                                    <th>Factor Description</th>
                                    <th>Current Data</th>
                                    <th>Impact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFactors.map((f, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div>{f.desc || f.name}</div>
                                            <div className="factor-source">{f.source || "Historical Analysis"}</div>
                                        </td>
                                        <td className="factor-value">
                                            {(() => {
                                                const value = f.value || "-";
                                                // Split value and context (text in parentheses)
                                                const match = value.match(/^(.+?)\s*(\(.+\))$/);
                                                if (match) {
                                                    return (
                                                        <>
                                                            <strong>{match[1]}</strong>
                                                            <br />
                                                            <small style={{ fontSize: '0.8em', color: '#888' }}>{match[2]}</small>
                                                        </>
                                                    );
                                                }
                                                return <strong>{value}</strong>;
                                            })()}
                                        </td>
                                        <td>
                                            <span className={`factor-impact ${f.direction}`}>
                                                {f.direction === 'up' ? '▲ Increases' :
                                                    f.direction === 'down' ? '▼ Decreases' : '● Neutral'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT COLUMN: Map */}
                <div className="col-right">
                    <div className="card">
                        <div className="map-header">
                            <h3>Regional Risk Map</h3>
                            <select value={radius} onChange={(e) => {
                                const newRadius = e.target.value;
                                setSearchParams({ lat, lon, city, state, radius: newRadius });
                            }}>
                                <option value={5}>5 Miles</option>
                                <option value={10}>10 Miles</option>
                                <option value={25}>25 Miles</option>
                                <option value={50}>50 Miles</option>
                                <option value={100}>100 Miles</option>
                                <option value={500}>500 Miles</option>
                            </select>
                        </div>
                        <div className="map-wrapper">
                            <MapContainer center={[parseFloat(lat), parseFloat(lon)]} zoom={radius > 50 ? 6 : 10} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                                />
                                <MapUpdater center={[parseFloat(lat), parseFloat(lon)]} />
                                {heatmap.map((pt, i) => (
                                    <Circle
                                        key={i}
                                        center={[pt.lat, pt.lon]}
                                        radius={radius * 25} // Reduced size: 10mi -> 250m, 500mi -> 12.5km
                                        pathOptions={{
                                            color: getRiskColor(pt.risk),
                                            fillColor: getRiskColor(pt.risk),
                                            fillOpacity: 0.6,
                                            stroke: false
                                        }}
                                    />
                                ))}
                                <Circle
                                    center={[parseFloat(lat), parseFloat(lon)]}
                                    radius={200}
                                    pathOptions={{ color: 'white', fillColor: 'blue', fillOpacity: 1 }}
                                />
                            </MapContainer>
                        </div>
                    </div>
                </div>

                {/* FULL WIDTH: Charts */}
                <div className="full-width">
                    {/* Split Future Forecast */}
                    <div className="card">
                        <h3>Risk Forecast</h3>
                        <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr', gap: '30px' }}>

                            {/* Chart 1: Risk Score */}
                            <div className="chart-wrapper">
                                <h4>Projected Risk Score</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ComposedChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666' }} tickFormatter={(str) => str ? String(str).slice(5) : ''} />
                                        <YAxis stroke="#666" tick={{ fill: '#666' }} domain={[0, 10]} ticks={[0, 2, 4, 6, 8]} tickFormatter={riskLevelFormatter} width={80} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#333' }} />

                                        {/* Historical Data (Solid, Grey) */}
                                        <Line type="monotone" dataKey="riskHistory" stroke="#b0bec5" dot={false} name={legendLabels.observedRisk} strokeWidth={2} connectNulls={true} />

                                        {/* Today Marker (Point) */}
                                        <Scatter dataKey="todayRiskPoint" fill="#333" name={legendLabels.today} shape="circle" r={6} isAnimationActive={false} />

                                        {/* Forecast Data (Solid, Green) */}
                                        <Line type="monotone" dataKey="riskForecast" stroke="#2e7d32" dot={false} name={legendLabels.actualForecast} strokeWidth={4} connectNulls={true} />

                                        {/* Seasonal Trend (Dotted, Purple) */}
                                        <Line type="monotone" dataKey="riskSeasonal" stroke="#9c27b0" strokeDasharray="5 5" dot={false} name={legendLabels.seasonalTrends} strokeWidth={2} connectNulls={true} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Chart 2: Temperature */}
                            <div className="chart-wrapper">
                                <h4>Daily High Temperature Chart</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ComposedChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666' }} tickFormatter={(str) => str ? String(str).slice(5) : ''} />
                                        <YAxis stroke="#666" tick={{ fill: '#666' }} domain={[dataMin => Math.min(dataMin, 40), 'auto']} tickFormatter={(val) => val ? val.toFixed(1) : ''} />
                                        <Tooltip
                                            content={<CustomTooltip />}
                                            formatter={(value) => typeof value === 'number' ? value.toFixed(1) + '°F' : value}
                                        />
                                        <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#333' }} />
                                        <ReferenceLine y={45} stroke="#d32f2f" strokeDasharray="3 3" label={{ value: "Typical Tick Activity Threshold (45°F)", fill: '#d32f2f', fontSize: 12 }} />

                                        {/* Historical Temperature (Solid, Grey) */}
                                        <Line type="monotone" dataKey="tempHistory" stroke="#b0bec5" dot={false} name={legendLabels.observedTemp} strokeWidth={2} connectNulls={true} />

                                        {/* Today Marker (Point) */}
                                        <Scatter dataKey="todayTempPoint" fill="#333" name={legendLabels.today} shape="circle" r={6} isAnimationActive={false} />

                                        {/* Forecast Temperature (Solid, Green) */}
                                        <Line type="monotone" dataKey="tempForecast" stroke="#2e7d32" dot={false} name={legendLabels.tempForecast} strokeWidth={4} connectNulls={true} />

                                        {/* Seasonal Temperature (Dotted, Purple) */}
                                        <Line type="monotone" dataKey="tempSeasonal" stroke="#9c27b0" strokeDasharray="5 5" dot={false} name={legendLabels.tempSeasonal} strokeWidth={2} connectNulls={true} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>

                        </div>
                    </div>

                    <div className="card">
                        <h3>Historical Risk Level (Last 12 Months)</h3>
                        <p className="chart-subtitle">(Weekly Average)</p>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={400}>
                                <ComposedChart data={historyDataWithToday}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666' }} tickFormatter={(str) => str ? String(str).slice(5) : ''} minTickGap={30} />
                                    <YAxis stroke="#666" tick={{ fill: '#666' }} domain={[0, 10]} ticks={[0, 2, 4, 6, 8]} tickFormatter={riskLevelFormatter} width={80} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', color: '#333' }} itemStyle={{ color: '#333' }} labelStyle={{ color: '#333' }} />
                                    <Legend wrapperStyle={{ color: '#333' }} />
                                    <Line type="monotone" dataKey="risk" stroke="#d32f2f" dot={false} name="Avg Risk Score" strokeWidth={3} />
                                    <Scatter dataKey="todayMarker" fill="#333" name="Today" shape="circle" r={8} isAnimationActive={false} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* FULL WIDTH: Transparency */}
                <div className="full-width card">
                    <h3>About This Forecast</h3>
                    <div className="transparency-grid">
                        <div className="explainer-box">
                            <h4>How We Calculate Risk</h4>
                            <p>
                                Our <strong>Multi-Timescale Risk Model</strong> analyzes 6 layers of environmental and biological data to estimate tick activity:
                            </p>
                            <p>
                                1. <strong>Current Conditions:</strong> Temperature spikes and humidity levels that trigger immediate questing.<br />
                                2. <strong>Short-Term Trends (7 Days):</strong> Sustained warmth that wakes ticks from dormancy, or persistent freezing that locks them down.<br />
                                3. <strong>Medium-Term Habitat (30 Days):</strong> Rainfall and moisture levels that keep the leaf litter habitable.<br />
                                4. <strong>Seasonal Patterns:</strong> Baseline activity curves derived from <strong>CDC Emergency Department Visit data</strong> for tick bites.<br />
                                5. <strong>Winter Severity:</strong> The "baseline" population health determined by the harshness of the previous winter.<br />
                                6. <strong>Regional Prevalence:</strong> Baseline risk adjustments based on <strong>CDC state-level Lyme disease incidence rates</strong>.
                            </p>
                        </div>
                        <div className="sources-grid">
                            <h4>Data Sources</h4>
                            <div className="source-card">
                                <span className="source-name">National Weather Service (NWS)</span>
                                <span className="source-desc">Real-time hourly & daily forecasts.</span>
                            </div>
                            <div className="source-card">
                                <span className="source-name">Open-Meteo</span>
                                <span className="source-desc">Historical weather archives & climatology.</span>
                            </div>
                            <div className="source-card">
                                <span className="source-name">CDC Surveillance</span>
                                <span className="source-desc">Regional Incidence & Seasonality Data.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Email Collection Banner */}
            {showBanner && !bannerDismissed && (
                <div className="email-banner-mobile" style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
                    padding: '1.25rem 1.5rem',
                    zIndex: 1000,
                    animation: 'slideUp 0.4s ease-out',
                    borderTop: '2px solid rgba(16, 185, 129, 0.3)'
                }}>
                    <style>{`
                        @keyframes slideUp {
                            from {
                                transform: translateY(100%);
                                opacity: 0;
                            }
                            to {
                                transform: translateY(0);
                                opacity: 1;
                            }
                        }
                        
                        @media (max-width: 768px) {
                            .email-banner-mobile {
                                padding: 0.75rem 1rem 0.85rem 1rem !important;
                            }
                            
                            .banner-wrapper {
                                flex-direction: column !important;
                                align-items: center !important;
                                gap: 0.75rem !important;
                            }
                            
                            .banner-content {
                                flex: 1 1 100% !important;
                                text-align: center !important;
                            }
                            
                            .banner-heading {
                                flex-direction: row !important;
                                justify-content: center !important;
                                align-items: center !important;
                                gap: 0.5rem !important;
                                margin-bottom: 0.4rem !important;
                            }
                            
                            .banner-heading span {
                                font-size: 1.25rem !important;
                            }
                            
                            .banner-heading h3 {
                                font-size: 1rem !important;
                            }
                            
                            .banner-description {
                                font-size: 0.8rem !important;
                                line-height: 1.3 !important;
                                margin: 0 !important;
                            }
                            
                            .banner-form {
                                flex: 1 1 100% !important;
                                max-width: 100% !important;
                                flex-direction: column !important;
                                align-items: center !important;
                                gap: 0.5rem !important;
                            }
                            
                            .banner-form input {
                                width: 100% !important;
                                padding: 0.6rem 0.85rem !important;
                                font-size: 0.9rem !important;
                            }
                            
                            .banner-form button {
                                width: 100% !important;
                                padding: 0.6rem 1rem !important;
                                font-size: 0.9rem !important;
                            }
                        }
                    `}</style>

                    <div className="banner-wrapper" style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}>
                        {/* CTA Text */}
                        <div className="banner-content" style={{ flex: '1 1 300px' }}>
                            <div className="banner-heading" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                marginBottom: '0.5rem'
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>📬</span>
                                <h3 style={{
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    margin: 0
                                }}>
                                    Stay Protected in 2026
                                </h3>
                            </div>
                            <p className="banner-description" style={{
                                color: '#d1fae5',
                                fontSize: '0.95rem',
                                margin: 0,
                                lineHeight: '1.5'
                            }}>
                                Get weekly tick activity alerts and prevention tips sent directly to your inbox for {city}, {state}.
                            </p>
                        </div>

                        {/* Email Form */}
                        <form onSubmit={handleEmailSubmit} className="banner-form" style={{
                            display: 'flex',
                            gap: '0.75rem',
                            flex: '1 1 350px',
                            maxWidth: '500px'
                        }}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                style={{
                                    flex: 1,
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.5rem',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    background: 'rgba(255,255,255,0.95)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    color: '#1f2937'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#10b981';
                                    e.target.style.background = 'white';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                    e.target.style.background = 'rgba(255,255,255,0.95)';
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    padding: '0.75rem 1.75rem',
                                    background: 'white',
                                    color: '#047857',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                                }}
                            >
                                Subscribe →
                            </button>
                        </form>

                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setBannerDismissed(true);
                                setShowBanner(false);
                            }}
                            style={{
                                position: 'absolute',
                                top: '0.75rem',
                                right: '0.75rem',
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                lineHeight: '1',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.2)';
                            }}
                            aria-label="Close banner"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultsPage;
