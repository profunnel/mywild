import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import StateForecastPage from './components/StateForecastPage';
import TickForecast2026 from './components/TickForecast2026';
import Footer from './components/Footer';

import ScrollToTop from './components/ScrollToTop';
import './styles/premium.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/tick-forecast-2026" element={<TickForecast2026 />} />
            <Route path="/tick-forecast-maine" element={<StateForecastPage slug="maine" />} />
            <Route path="/tick-forecast-new-hampshire" element={<StateForecastPage slug="new-hampshire" />} />
            <Route path="/tick-forecast-vermont" element={<StateForecastPage slug="vermont" />} />
            <Route path="/tick-forecast-massachusetts" element={<StateForecastPage slug="massachusetts" />} />
            <Route path="/tick-forecast-connecticut" element={<StateForecastPage slug="connecticut" />} />
            <Route path="/tick-forecast-rhode-island" element={<StateForecastPage slug="rhode-island" />} />
            <Route path="/tick-forecast-new-york" element={<StateForecastPage slug="new-york" />} />
            <Route path="/tick-forecast-new-jersey" element={<StateForecastPage slug="new-jersey" />} />
            <Route path="/tick-forecast-pennsylvania" element={<StateForecastPage slug="pennsylvania" />} />
            <Route path="/tick-forecast-delaware" element={<StateForecastPage slug="delaware" />} />
            <Route path="/tick-forecast-maryland" element={<StateForecastPage slug="maryland" />} />
            <Route path="/tick-forecast-virginia" element={<StateForecastPage slug="virginia" />} />
            <Route path="/tick-forecast-west-virginia" element={<StateForecastPage slug="west-virginia" />} />
            <Route path="/tick-forecast-north-carolina" element={<StateForecastPage slug="north-carolina" />} />
            <Route path="/tick-forecast-south-carolina" element={<StateForecastPage slug="south-carolina" />} />
            <Route path="/tick-forecast-georgia" element={<StateForecastPage slug="georgia" />} />
            <Route path="/tick-forecast-florida" element={<StateForecastPage slug="florida" />} />
            <Route path="/tick-forecast-alabama" element={<StateForecastPage slug="alabama" />} />
            <Route path="/tick-forecast-tennessee" element={<StateForecastPage slug="tennessee" />} />
            <Route path="/tick-forecast-kentucky" element={<StateForecastPage slug="kentucky" />} />
            <Route path="/tick-forecast-ohio" element={<StateForecastPage slug="ohio" />} />
            <Route path="/tick-forecast-indiana" element={<StateForecastPage slug="indiana" />} />
            <Route path="/tick-forecast-illinois" element={<StateForecastPage slug="illinois" />} />
            <Route path="/tick-forecast-michigan" element={<StateForecastPage slug="michigan" />} />
            <Route path="/tick-forecast-wisconsin" element={<StateForecastPage slug="wisconsin" />} />
            <Route path="/tick-forecast-minnesota" element={<StateForecastPage slug="minnesota" />} />
            <Route path="/tick-forecast-mississippi" element={<StateForecastPage slug="mississippi" />} />
            <Route path="/tick-forecast-louisiana" element={<StateForecastPage slug="louisiana" />} />
            <Route path="/tick-forecast-arkansas" element={<StateForecastPage slug="arkansas" />} />
            <Route path="/tick-forecast-texas" element={<StateForecastPage slug="texas" />} />
            <Route path="/tick-forecast-oklahoma" element={<StateForecastPage slug="oklahoma" />} />
            <Route path="/tick-forecast-missouri" element={<StateForecastPage slug="missouri" />} />
            <Route path="/tick-forecast-iowa" element={<StateForecastPage slug="iowa" />} />
            <Route path="/tick-forecast-kansas" element={<StateForecastPage slug="kansas" />} />
            <Route path="/tick-forecast-nebraska" element={<StateForecastPage slug="nebraska" />} />
            <Route path="/tick-forecast-south-dakota" element={<StateForecastPage slug="south-dakota" />} />
            <Route path="/tick-forecast-north-dakota" element={<StateForecastPage slug="north-dakota" />} />
            <Route path="/tick-forecast-montana" element={<StateForecastPage slug="montana" />} />
            <Route path="/tick-forecast-wyoming" element={<StateForecastPage slug="wyoming" />} />
            <Route path="/tick-forecast-colorado" element={<StateForecastPage slug="colorado" />} />
            <Route path="/tick-forecast-new-mexico" element={<StateForecastPage slug="new-mexico" />} />
            <Route path="/tick-forecast-washington" element={<StateForecastPage slug="washington" />} />
            <Route path="/tick-forecast-oregon" element={<StateForecastPage slug="oregon" />} />
            <Route path="/tick-forecast-california" element={<StateForecastPage slug="california" />} />
            <Route path="/tick-forecast-idaho" element={<StateForecastPage slug="idaho" />} />
            <Route path="/tick-forecast-utah" element={<StateForecastPage slug="utah" />} />
            <Route path="/tick-forecast-nevada" element={<StateForecastPage slug="nevada" />} />
            <Route path="/tick-forecast-arizona" element={<StateForecastPage slug="arizona" />} />
            <Route path="/tick-forecast-alaska" element={<StateForecastPage slug="alaska" />} />
            <Route path="/tick-forecast-hawaii" element={<StateForecastPage slug="hawaii" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
