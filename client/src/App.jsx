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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
