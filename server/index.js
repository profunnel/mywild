require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3002;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

app.use(cors());
app.use(express.json());

// --- Helper Functions ---

function getRegionRisk(state) {
    if (!state) return null;
    const s = state.toUpperCase();

    // CDC-defined regions based on Emergency Department Visits for Tick Bites data (2025)
    // Incidence rates per 100,000 ED visits
    const regions = {
        northeast: {
            states: ["CT", "ME", "MA", "NH", "NJ", "NY", "PA", "RI", "VT"],
            incidence: 115  // Highest
        },
        midwest: {
            states: ["IL", "IN", "IA", "MI", "MN", "OH", "WI"],
            incidence: 71
        },
        southeast: {
            states: ["DE", "FL", "GA", "MD", "NC", "SC", "VA", "WV", "DC"],
            incidence: 28
        },
        west: {
            states: ["AK", "CA", "CO", "ID", "MT", "NV", "OR", "UT", "WA", "WY"],
            incidence: 13
        },
        southCentral: {
            states: ["AL", "AR", "KY", "LA", "MS", "OK", "TN", "TX", "AZ", "NM", "KS", "MO", "NE", "ND", "SD"],
            incidence: 9   // Lowest
        }
    };

    // Calculate proportional risk modifiers based on CDC incidence data
    // Using Northeast (115) as baseline for highest risk
    // Formula: (region_incidence / baseline_incidence - 1) * 2.5
    // This creates a spread from ~-2.3 to +0 with Northeast as reference

    const baseline = 115; // Northeast incidence (highest)

    if (regions.northeast.states.includes(s)) {
        const scoreMod = ((regions.northeast.incidence / baseline) - 1) * 2.5; // 0
        return {
            id: 'region_ne',
            name: "Region: Northeast",
            desc: "Region: Northeast - Highest Lyme disease endemicity.",
            direction: "up",
            impact: "Very High",
            value: "Endemic (Year-round)",
            source: "CDC Surveillance",
            impactDuration: "Year-round",
            dateRange: "Permanent",
            scoreMod: 2.0,  // Highest risk
            cdcIncidence: regions.northeast.incidence
        };
    } else if (regions.midwest.states.includes(s)) {
        const scoreMod = ((regions.midwest.incidence / baseline) - 1) * 2.5; // ~-0.96
        return {
            id: 'region_mw',
            name: "Region: Midwest",
            desc: "Region: Midwest - High tick prevalence.",
            direction: "up",
            impact: "High",
            value: "High (Year-round)",
            source: "CDC Surveillance",
            impactDuration: "Year-round",
            dateRange: "Permanent",
            scoreMod: 1.2,  // High risk
            cdcIncidence: regions.midwest.incidence
        };
    } else if (regions.southeast.states.includes(s)) {
        const scoreMod = ((regions.southeast.incidence / baseline) - 1) * 2.5; // ~-1.89
        return {
            id: 'region_se',
            name: "Region: Southeast",
            desc: "Region: Southeast - Moderate tick activity.",
            direction: "neutral",
            impact: "Moderate",
            value: "Moderate (Year-round)",
            source: "CDC Surveillance",
            impactDuration: "Year-round",
            dateRange: "Permanent",
            scoreMod: 0.5,  // Moderate risk
            cdcIncidence: regions.southeast.incidence
        };
    } else if (regions.west.states.includes(s)) {
        const scoreMod = ((regions.west.incidence / baseline) - 1) * 2.5; // ~-2.22
        return {
            id: 'region_w',
            name: "Region: West",
            desc: "Region: West - Low tick density.",
            direction: "down",
            impact: "Low",
            value: "Low (Year-round)",
            source: "CDC Surveillance",
            impactDuration: "Year-round",
            dateRange: "Permanent",
            scoreMod: -0.5,  // Low risk
            cdcIncidence: regions.west.incidence
        };
    } else if (regions.southCentral.states.includes(s)) {
        const scoreMod = ((regions.southCentral.incidence / baseline) - 1) * 2.5; // ~-2.30
        return {
            id: 'region_sc',
            name: "Region: South Central",
            desc: "Region: South Central - Lowest tick activity.",
            direction: "down",
            impact: "Very Low",
            value: "Very Low (Year-round)",
            source: "CDC Surveillance",
            impactDuration: "Year-round",
            dateRange: "Permanent",
            scoreMod: -1.0,  // Lowest risk
            cdcIncidence: regions.southCentral.incidence
        };
    }
    return null;
}

/**
 * Advanced Multi-Timescale Tick Risk Model
 */
function calculateTickRisk(currentTemp, humidity, recentTemps = [], last30DaysStats = {}, month = 0, priorWinterStats = {}, regionMod = 0) {
    let riskScore = 0;
    let factors = [];

    // --- A. Same Day & Short Term (0-3 Days) - REDUCED WEIGHT ---
    if (currentTemp >= 45) {
        riskScore += 1.5;  // Reduced from 3
        factors.push({
            desc: "Temps > 45°F allows activity.",
            direction: "up",
            source: "NWS Daily Forecast",
            impact: "Medium",  // Reduced from High
            value: `${Math.round(currentTemp)}°F (Daily High)`
        });

        const recentAvg = recentTemps.length > 0 ? recentTemps.reduce((a, b) => a + b, 0) / recentTemps.length : currentTemp;
        if (recentAvg < 40) {
            riskScore += 0.75;  // Reduced from 1.5
            factors.push({
                desc: "Warm spike after cold spell.",
                direction: "up",
                source: "NWS & Historical Trend",
                impact: "Low",  // Reduced from Medium
                value: `+${Math.round(currentTemp - recentAvg)}°F Spike (Daily High)`
            });
        }
    } else if (currentTemp >= 35) {
        riskScore += 0.5;  // Reduced from 1
        factors.push({
            desc: "Temps allow limited activity.",
            direction: "down",
            source: "NWS Daily Forecast",
            impact: "Low",
            value: `${Math.round(currentTemp)}°F (Daily High)`
        });
    } else {
        riskScore -= 0.5;  // Added penalty for cold temps
        factors.push({
            desc: "Temps near/below freezing.",
            direction: "down",
            source: "NWS Daily Forecast",
            impact: "High",
            value: `${Math.round(currentTemp)}°F (Daily High)`
        });
    }

    // Humidity - REDUCED WEIGHT
    if (humidity >= 80) {
        riskScore += 1;  // Reduced from 2
        factors.push({
            desc: "High humidity favors questing.",
            direction: "up",
            source: "NWS Hourly Forecast",
            impact: "Low",  // Reduced from Medium
            value: `${Math.round(humidity)}% (Current)`
        });
    } else if (humidity < 45) {
        riskScore -= 0.5;  // Reduced from -1
        factors.push({
            desc: "Dry air limits activity.",
            direction: "down",
            source: "NWS Hourly Forecast",
            impact: "Low",  // Reduced from Medium
            value: `${Math.round(humidity)}% (Current)`
        });
    } else {
        factors.push({
            desc: "Humidity levels are normal.",
            direction: "neutral",
            source: "NWS Hourly Forecast",
            impact: "None",
            value: `${Math.round(humidity)}% (Current)`
        });
    }

    // --- B. Short Trailing Window (7 Days) - INCREASED IMPORTANCE ---
    const warmDays7 = recentTemps.filter(t => t >= 45).length;
    if (warmDays7 >= 5) {
        riskScore += 2.5;  // Increased from 2
        factors.push({
            desc: "Sustained warmth (last 7 days).",
            direction: "up",
            source: "Open-Meteo History (7-Day)",
            impact: "High",  // Increased from Medium
            value: `${warmDays7}/7 Days > 45°F (Last 7 Days)`
        });
    } else if (warmDays7 >= 3) {
        riskScore += 1.25;  // Increased from 1
    } else if (warmDays7 === 0) {
        riskScore -= 1;  // Penalty for no warm days
    }

    // --- C. Medium Trailing Window (30 Days) ---
    if (last30DaysStats.rainSum > 3.0) {
        riskScore += 0.75;  // Reduced from 1
        // Removed to avoid duplication with Long Term Drivers
    } else if (last30DaysStats.rainSum < 1.0) {
        riskScore -= 0.75;  // Reduced from -1
        // Removed to avoid duplication with Long Term Drivers
    }

    // --- D. Seasonal Pattern (Based on CDC ED Visit Data) ---
    // CDC Emergency Department Visits for Tick Bites by Month (per 100,000 ED visits, 2025)
    const cdcMonthlyIncidence = [5, 5, 25, 70, 135, 115, 68, 30, 18, 58, 52, 8]; // Jan-Dec
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentMonthIncidence = cdcMonthlyIncidence[month];
    const peakIncidence = Math.max(...cdcMonthlyIncidence); // 135 (May)
    const avgIncidence = cdcMonthlyIncidence.reduce((a, b) => a + b, 0) / 12; // ~52

    // Calculate seasonal modifier - REDUCED MULTIPLIER
    // Formula: ((current - average) / average) * 2.5 (increased from 1.5)
    let seasonalModifier = ((currentMonthIncidence - avgIncidence) / avgIncidence) * 2.5;

    // Cap negative seasonal modifier to prevent winter washout
    // Don't let it go below -1.0 (previously could go to -2.0+)
    if (seasonalModifier < -1.0) seasonalModifier = -1.0;

    riskScore += seasonalModifier;

    // Add factor with appropriate description based on incidence level
    if (currentMonthIncidence >= 100) {
        // Peak season (May, June)
        factors.push({
            desc: "Peak tick season.",
            direction: "up",
            source: "CDC Surveillance",
            impact: "Very High",
            value: `${monthNames[month]} (Peak Season)`,
            cdcIncidence: currentMonthIncidence
        });
    } else if (currentMonthIncidence >= 60) {
        // High season (April, July)
        factors.push({
            desc: "High tick activity season.",
            direction: "up",
            source: "CDC Surveillance",
            impact: "High",
            value: `${monthNames[month]} (High Activity)`,
            cdcIncidence: currentMonthIncidence
        });
    } else if (currentMonthIncidence >= 25) {
        // Moderate season (March, August, October, November)
        factors.push({
            desc: "Moderate seasonal activity.",
            direction: "neutral",
            source: "CDC Surveillance",
            impact: "Medium",
            value: `${monthNames[month]} (Moderate Activity)`,
            cdcIncidence: currentMonthIncidence
        });
    } else if (currentMonthIncidence >= 15) {
        // Low season (September)
        factors.push({
            desc: "Low tick activity season.",
            direction: "down",
            source: "CDC Surveillance",
            impact: "Low",
            value: `${monthNames[month]} (Low Activity)`,
            cdcIncidence: currentMonthIncidence
        });
    } else {
        // Very low season (January, February, December)
        factors.push({
            desc: "Winter season (Dormant).",
            direction: "down",
            source: "CDC Surveillance",
            impact: "High",
            value: `${monthNames[month]} (Dormant)`,
            cdcIncidence: currentMonthIncidence
        });
    }

    // --- E. Prior Winter Severity ---
    if (priorWinterStats.avgTemp) {
        if (priorWinterStats.avgTemp > 35) {
            riskScore += 0.5;  // Reduced from 1
            // Removed to avoid duplication with Long Term Drivers
        } else if (priorWinterStats.avgTemp < 28) {
            riskScore -= 0.5;  // Reduced from -1
            // Removed to avoid duplication with Long Term Drivers
        }
    }

    // --- F. Regional Modifier - SCALED DOWN ---
    if (regionMod !== 0) {
        riskScore += regionMod * 0.7;  // Apply 70% of regional modifier
        // Note: We do NOT push to factors here to avoid duplication with Long Term Drivers
    }



    // --- FINAL ADJUSTMENTS ---

    // Warm Day Override: If it's warm enough for ticks, risk cannot be zero/very low
    // Ticks are opportunistic. 45F is the activation threshold.
    if (currentTemp >= 45 && riskScore < 2.0) {
        riskScore = 2.0; // Ensure at least "Low" risk, not "Very Low"
        factors.push({
            desc: "Warmth overrides seasonal lull.",
            direction: "up",
            source: "Biological Threshold",
            impact: "High",
            value: "Active > 45°F"
        });
    }

    // Frozen Ground Lockout: If last 3 days were freezing (<32F) and today is not significantly warm (<45F)
    // Then risk is effectively zero due to dormant state.
    const freezingDays = recentTemps.slice(0, 3).filter(t => t < 32).length;
    if (freezingDays >= 3 && currentTemp < 45) {
        riskScore = 0;
        factors.push({
            desc: "Persistent freezing conditions (dormant).",
            direction: "down",
            source: "Frozen Ground Logic",
            impact: "Critical",
            value: "3+ Days < 32°F"
        });
    }

    // Clamp score between 0 and 10
    riskScore = Math.max(0, Math.min(10, riskScore));

    // --- Final Calculation with Scaling ---
    // Apply a scaling factor to compress the range and prevent easy 10/10
    let finalScore = riskScore * 0.75;

    // Hard cap: If temp < 32°F, score cannot exceed 1.0 (even with warm spell)
    if (currentTemp < 32) {
        finalScore = Math.min(1.0, finalScore);
    }

    // In dormant months (Jan, Feb, Dec), cap score at 2.0 unless sustained warmth
    if ([0, 1, 11].includes(month) && warmDays7 < 5) {
        finalScore = Math.min(2.0, finalScore);
    }

    // Ensure final score is non-negative and rounded
    finalScore = Math.max(0, finalScore);
    finalScore = Math.round(finalScore * 10) / 10;

    let status = "VERY LOW";
    if (finalScore >= 8) status = "VERY HIGH";
    else if (finalScore >= 6) status = "HIGH";
    else if (finalScore >= 4) status = "MODERATE";
    else if (finalScore >= 2) status = "LOW";

    return { score: finalScore, factors, status };
}

function generateGridPoints(lat, lon, radiusMiles) {
    const points = [];
    const milesToDegrees = 1 / 69;
    let step = radiusMiles / 3;
    if (radiusMiles > 50) step = radiusMiles / 8;
    if (radiusMiles > 200) step = radiusMiles / 15; // Increased density for large maps

    for (let dx = -radiusMiles; dx <= radiusMiles; dx += step) {
        for (let dy = -radiusMiles; dy <= radiusMiles; dy += step) {
            const newLat = lat + (dy * milesToDegrees);
            const newLon = lon + (dx * milesToDegrees / Math.cos(lat * Math.PI / 180));
            points.push({ lat: newLat, lon: newLon });
        }
    }
    return points;
}

function calculateMovingAverage(data, windowSize) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const start = Math.max(0, i - windowSize + 1);
        const subset = data.slice(start, i + 1);
        const avg = subset.reduce((a, b) => a + b, 0) / subset.length;
        result.push(avg);
    }
    return result;
}

// --- API Endpoints ---

app.get('/api/geocode', async (req, res) => {
    const { zip } = req.query;
    if (!zip) return res.status(400).json({ error: "Zip code required" });
    try {
        const response = await axios.get(`http://api.zippopotam.us/us/${zip}`);
        const place = response.data.places[0];
        res.json({
            lat: parseFloat(place.latitude),
            lon: parseFloat(place.longitude),
            city: place['place name'],
            state: place['state abbreviation']
        });
    } catch (error) {
        res.status(404).json({ error: "Zip code not found" });
    }
});

app.get('/api/forecast', async (req, res) => {
    const { lat, lon, state } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "Lat/Lon required" });

    try {
        const headers = { 'User-Agent': '(tick-forecast-app, contact@example.com)' };

        const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
        const pointsRes = await axios.get(pointsUrl, { headers });
        const forecastHourlyUrl = pointsRes.data.properties.forecastHourly;
        const hourlyRes = await axios.get(forecastHourlyUrl, { headers });

        const currentPeriod = hourlyRes.data.properties.periods[0];
        const currentTemp = currentPeriod.temperature;
        const humidity = currentPeriod.relativeHumidity.value;
        const shortForecast = currentPeriod.shortForecast;

        const forecastUrl = pointsRes.data.properties.forecast;
        const dailyRes = await axios.get(forecastUrl, { headers });
        const periods = dailyRes.data.properties.periods;

        let maxTempForRisk = currentTemp;
        const todayPeriod = periods.find(p => p.isDaytime);
        if (todayPeriod && todayPeriod.temperature > maxTempForRisk) {
            maxTempForRisk = todayPeriod.temperature;
        }

        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        const startDateStr = startDate.toISOString().split('T')[0];

        const historyUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDateStr}&end_date=${endDate}&daily=temperature_2m_mean,rain_sum&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`;
        const historyRes = await axios.get(historyUrl);

        const dailyTemps = historyRes.data.daily.temperature_2m_mean || [];
        const dailyRain = historyRes.data.daily.rain_sum || [];
        const dates = historyRes.data.daily.time || [];

        const recentTemps = dailyTemps.slice(-7);
        const last30Temps = dailyTemps.slice(-30);
        const last30Rain = dailyRain.slice(-30);
        const last30DaysStats = {
            avgTemp: last30Temps.reduce((a, b) => a + b, 0) / last30Temps.length,
            rainSum: last30Rain.reduce((a, b) => a + b, 0),
            warmDaysCount: last30Temps.filter(t => t > 45).length
        };

        let winterTemps = [];
        let freezeDays = 0;
        dates.forEach((date, i) => {
            const m = new Date(date).getMonth();
            if ([11, 0, 1].includes(m)) {
                winterTemps.push(dailyTemps[i]);
                if (dailyTemps[i] < 32) freezeDays++;
            }
        });

        const priorWinterStats = {
            avgTemp: winterTemps.length ? winterTemps.reduce((a, b) => a + b, 0) / winterTemps.length : 32,
            freezeDays: freezeDays
        };

        const currentMonth = new Date().getMonth();

        // Calculate Regional Modifier
        let regionMod = 0;
        if (state) {
            const regionRisk = getRegionRisk(state);
            if (regionRisk) {
                regionMod = regionRisk.scoreMod || 0;
            }
        }

        const riskData = calculateTickRisk(maxTempForRisk, humidity, recentTemps, last30DaysStats, currentMonth, priorWinterStats, regionMod);

        // NOTE: We do NOT push regionRisk to factors here. It is handled in /api/history as a Long Term Driver.

        res.json({
            location: { lat, lon },
            weather: { tempF: currentTemp, maxTemp: maxTempForRisk, humidity, condition: shortForecast },
            risk: riskData
        });
    } catch (error) {
        console.error("Forecast error:", error.message);
        res.status(500).json({ error: "Failed to fetch forecast" });
    }
});

app.get('/api/history', async (req, res) => {
    const { lat, lon, state } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "Lat/Lon required" });

    try {
        // Use local date instead of UTC to avoid timezone issues
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const endDate = `${year}-${month}-${day}`;

        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        const startYear = startDate.getFullYear();
        const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
        const startDay = String(startDate.getDate()).padStart(2, '0');
        const startDateStr = `${startYear}-${startMonth}-${startDay}`;

        const historyUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDateStr}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,rain_sum,relative_humidity_2m_mean&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`;
        const historyRes = await axios.get(historyUrl);

        const futureStart = new Date();
        futureStart.setFullYear(futureStart.getFullYear() - 1);
        const futureEnd = new Date();
        futureEnd.setFullYear(futureEnd.getFullYear() - 1);
        futureEnd.setMonth(futureEnd.getMonth() + 3);

        const futureStartStr = futureStart.toISOString().split('T')[0];
        const futureEndStr = futureEnd.toISOString().split('T')[0];

        const futureUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${futureStartStr}&end_date=${futureEndStr}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,rain_sum,relative_humidity_2m_mean&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`;
        const futureRes = await axios.get(futureUrl);

        const dailyTemps = historyRes.data.daily.temperature_2m_mean || [];
        const dates = historyRes.data.daily.time || [];
        let winterTemps = [];
        let freezeDays = 0;
        dates.forEach((date, i) => {
            const m = new Date(date).getMonth();
            if ([11, 0, 1].includes(m)) {
                winterTemps.push(dailyTemps[i]);
                if (dailyTemps[i] < 32) freezeDays++;
            }
        });
        const priorWinterStats = {
            avgTemp: winterTemps.length ? winterTemps.reduce((a, b) => a + b, 0) / winterTemps.length : 32,
            freezeDays: freezeDays
        };

        // Calculate Regional Modifier
        let regionMod = 0;
        if (state) {
            const regionRisk = getRegionRisk(state);
            if (regionRisk) {
                regionMod = regionRisk.scoreMod || 0;
            }
        }

        const processDaily = (data, isFuture = false) => {
            if (!data || !data.daily) return [];

            let temps = data.daily.temperature_2m_mean;
            let maxTemps = data.daily.temperature_2m_max;
            let rains = data.daily.rain_sum;

            if (isFuture) {
                temps = calculateMovingAverage(temps, 14);
                maxTemps = calculateMovingAverage(maxTemps, 14);
            }

            return data.daily.time.map((date, i) => {
                const tempMax = maxTemps[i];
                const tempMean = temps[i];
                const humidity = data.daily.relative_humidity_2m_mean ? data.daily.relative_humidity_2m_mean[i] : 60;
                const rain = rains[i];

                const startIdx7 = Math.max(0, i - 6);
                const recentTemps = temps.slice(startIdx7, i + 1);

                const startIdx30 = Math.max(0, i - 29);
                const last30Temps = temps.slice(startIdx30, i + 1);
                const last30Rain = rains.slice(startIdx30, i + 1);
                const last30Stats = {
                    avgTemp: last30Temps.reduce((a, b) => a + b, 0) / last30Temps.length,
                    rainSum: last30Rain.reduce((a, b) => a + b, 0),
                    warmDaysCount: last30Temps.filter(t => t > 45).length
                };

                let displayDate = date;
                let month = new Date(date).getMonth();

                if (isFuture) {
                    // For future data, we fetch last year's climate data
                    // but display it as next year for the forecast
                    const d = new Date(date);
                    d.setFullYear(d.getFullYear() + 1);
                    displayDate = d.toISOString().split('T')[0];
                    // Use the FUTURE month for risk calculation (e.g., Nov 2025, not Nov 2024)
                    month = d.getMonth();
                }

                const risk = calculateTickRisk(tempMean, humidity, recentTemps, last30Stats, month, priorWinterStats, regionMod).score;

                if (isFuture && i === 0) {
                    console.log("DEBUG FUTURE RISK CALC (Day 0):", {
                        date: displayDate,
                        tempMax,
                        tempMean,
                        humidity,
                        recentTempsLen: recentTemps.length,
                        last30Stats,
                        risk
                    });
                }

                return { date: displayDate, tempMax, tempMin: data.daily.temperature_2m_min[i], rain, risk };
            });
        };

        const historyData = processDaily(historyRes.data);
        const futureData = processDaily(futureRes.data, true);

        // Prepare Trend Data (Last 30 Days History + Future)
        const recentHistory = historyData.slice(-30);

        // Create unified timeline data
        const timelineData = [];

        // 1. Add History Data (Solid Line)
        recentHistory.forEach(day => {
            timelineData.push({
                date: day.date,
                riskHistory: day.risk,
                riskForecast: null,
                riskSeasonal: null,
                tempMax: day.tempMax
            });
        });

        // 2. Add Future Data (Forecast vs Seasonal)
        // The first 10 days are "Forecast" (Solid), the rest are "Seasonal" (Dotted)

        // BRIDGE: To connect the lines visually, we add the last history point as the start of the forecast line
        if (recentHistory.length > 0) {
            const lastHistory = recentHistory[recentHistory.length - 1];
            console.log("DEBUG BRIDGE POINT CREATED:", lastHistory);
            timelineData.push({
                date: lastHistory.date,
                riskHistory: lastHistory.risk, // Keep history point
                riskForecast: lastHistory.risk, // Start forecast line here
                riskSeasonal: null,
                tempMax: lastHistory.tempMax
            });
        }

        futureData.forEach((day, i) => {
            const isForecast = i < 10;
            const isBridgePoint = i === 10; // Day 10 is the bridge between forecast and seasonal

            timelineData.push({
                date: day.date,
                riskHistory: null,
                // At the bridge point (day 10), set both forecast and seasonal to create smooth transition
                riskForecast: (isForecast || isBridgePoint) ? day.risk : null,
                riskSeasonal: (!isForecast || isBridgePoint) ? day.risk : null,
                tempMax: day.tempMax
            });
        });

        const weeklyHistory = [];
        let currentWeek = [];
        historyData.forEach((day, i) => {
            currentWeek.push(day);
            if (currentWeek.length === 7 || i === historyData.length - 1) {
                const avgRisk = currentWeek.reduce((a, b) => a + b.risk, 0) / currentWeek.length;
                const avgTempMax = currentWeek.reduce((a, b) => a + b.tempMax, 0) / currentWeek.length;
                const endDate = currentWeek[currentWeek.length - 1].date;
                weeklyHistory.push({
                    date: endDate,
                    risk: Math.round(avgRisk * 10) / 10,
                    tempMax: Math.round(avgTempMax)
                });
                currentWeek = [];
            }
        });

        const last30Temps = dailyTemps.slice(-30);
        const last30Rain = historyRes.data.daily.rain_sum.slice(-30);
        const last30RainSum = last30Rain.reduce((a, b) => a + b, 0);
        const last30AvgTemp = last30Temps.reduce((a, b) => a + b, 0) / last30Temps.length;

        const longTermDrivers = [
            {
                id: 'mildWinter',
                name: "Prior Winter (Last Season)",
                level: priorWinterStats.avgTemp > 35 ? "High (Mild)" : (priorWinterStats.avgTemp < 28 ? "Low (Harsh)" : "Normal"),
                desc: priorWinterStats.avgTemp > 35 ? "Mild winter increased tick survival year-round." : "Harsh winter reduced tick population year-round.",
                direction: priorWinterStats.avgTemp > 35 ? "up" : "down",
                impactDuration: "Affects entire season",
                dateRange: "Dec - Feb",
                value: `${Math.round(priorWinterStats.avgTemp)}°F Avg (Prior Winter)`,
                source: "Open-Meteo History"
            },
            {
                id: 'moisture30Day',
                name: "30-Day Moisture",
                level: last30RainSum > 3.0 ? "Above Normal" : (last30RainSum < 1.0 ? "Below Normal" : "Normal"),
                desc: last30RainSum > 3.0 ? "Wet conditions improve habitat." : "Dry conditions limit habitat.",
                direction: last30RainSum > 3.0 ? "up" : (last30RainSum < 1.0 ? "down" : "neutral"),
                impactDuration: "Next 2-4 weeks",
                dateRange: "Last 30 Days",
                value: `${last30RainSum.toFixed(1)}" Rain (Last 30 Days)`,
                source: "Open-Meteo History"
            },
            {
                id: 'temp30Day',
                name: "30-Day Warmth",
                level: last30AvgTemp > 50 ? "Above Normal" : "Normal",
                desc: "Recent warmth trends.",
                direction: "neutral",
                impactDuration: "Next 1-2 weeks",
                dateRange: "Last 30 Days",
                value: `${Math.round(last30AvgTemp)}°F Avg (Last 30 Days)`,
                source: "Open-Meteo History"
            }
        ];

        // Add Regional Risk to Long Term Drivers if state is provided
        if (state) {
            const regionRisk = getRegionRisk(state);
            if (regionRisk) {
                longTermDrivers.push(regionRisk);
            }
        }

        res.json({ history: weeklyHistory, forecast: futureData, trendData: timelineData, longTermDrivers });

    } catch (error) {
        console.error("History error:", error.message);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

app.get('/api/heatmap', async (req, res) => {
    const { lat, lon, radius } = req.query;
    const centerLat = parseFloat(lat);
    const centerLon = parseFloat(lon);
    const rad = parseFloat(radius) || 10;

    if (!lat || !lon) return res.status(400).json({ error: "Lat/Lon required" });

    const points = generateGridPoints(centerLat, centerLon, rad);

    try {
        const headers = { 'User-Agent': '(tick-forecast-app, contact@example.com)' };
        const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
        const pointsRes = await axios.get(pointsUrl, { headers });
        const forecastUrl = pointsRes.data.properties.forecastHourly;
        const forecastRes = await axios.get(forecastUrl, { headers });
        const currentPeriod = forecastRes.data.properties.periods[0];

        const baseTemp = currentPeriod.temperature;
        const baseHum = currentPeriod.relativeHumidity.value;
        const currentMonth = new Date().getMonth();

        const baseRisk = calculateTickRisk(baseTemp, baseHum, [baseTemp], {}, currentMonth, {}).score;

        const heatmapData = points.map(p => {
            const noise = (Math.random() - 0.5) * 1.5;
            // Add latitude modifier: South (lower lat) gets higher risk, North gets lower
            // 1 degree lat is approx 69 miles. 
            // Let's say moving 5 degrees south (+5 deg diff) adds ~1.5 to risk
            const latDiff = centerLat - p.lat;
            const latModifier = latDiff * 0.3;

            let localRisk = baseRisk + noise + latModifier;
            localRisk = Math.max(0, Math.min(10, localRisk));
            return { lat: p.lat, lon: p.lon, risk: localRisk };
        });

        res.json(heatmapData);

    } catch (error) {
        res.json([]);
    }
});

// --- LLM Summary Endpoint ---
app.post('/api/summary', async (req, res) => {
    console.log("Hit /api/summary endpoint");
    const { status, factors, weather } = req.body;

    console.log("Checking API Key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");

    if (!process.env.GEMINI_API_KEY) {
        console.log("API Key missing, returning null");
        return res.json({ summary: null }); // Fallback to rule-based
    }

    try {
        const factorList = factors.map(f => `${f.name || f.desc} (${f.direction})`).join(', ');
        const weatherStr = weather ? `${weather.tempF}F, ${weather.humidity}% Hum` : "Unknown";

        const prompt = `Write two concise sentences (max 40 words) explaining the current tick risk. 
        Risk Level: ${status}. 
        Factors: ${factorList}. 
        Current Weather: ${weatherStr}.
        Start with the risk level context (e.g., "High risk driven by..."). Mention specific weather or factors if relevant. Make it helpful and easily readable with no extra fluff. Do not use markdown.`;

        console.log("Sending prompt to Gemini:", prompt);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        console.log("Gemini Response:", text);

        res.json({ summary: text });
    } catch (error) {
        console.error("Gemini API Error Full:", error);
        res.json({ summary: null });
    }
});

// --- Lambda Handler ---
const serverless = require('serverless-http');

// Export Lambda handler
module.exports.handler = serverless(app);

// Local development server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
