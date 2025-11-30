import { useEffect, useState } from 'react';

import './Hero.css';

/**
 * Hero Component - Immersive parallax hero section
 * 
 * Purpose: Create an emotional, immersive first impression with parallax effect
 * SEO: Contains the page's H1 with primary keyword
 * Accessibility: ARIA labels, semantic HTML, keyboard accessible
 * Performance: Optimized scroll handler with passive listeners
 */
export function Hero({ title, subtitle, bgImage, children }) {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        // Parallax scroll handler (debounced for performance)
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setOffsetY(window.pageYOffset);
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Passive listener for better scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section
            className="hero"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${bgImage})`,
                backgroundPositionY: `${offsetY * 0.5}px`, // Parallax at 50% speed
            }}
            aria-labelledby="hero-title"
        >
            <div className="hero-content">
                {/* SEO CRITICAL: H1 with primary keyword */}
                <h1 id="hero-title" className="hero-title">
                    {title}
                </h1>

                <p className="hero-subtitle">
                    {subtitle}
                </p>

                {children}
            </div>
        </section>
    );
}

export default Hero;
