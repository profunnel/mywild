import { useEffect, useState } from 'react';

import './StickyNav.css';

/**
 * StickyNav Component - Context-aware navigation
 * 
 * Purpose: Provide persistent navigation ONLY after user scrolls past hero
 * Design: Glassmorphism styling with smooth transitions
 * Accessibility: Keyboard navigable, ARIA labels
 * Mobile: Horizontal scrollable pill list
 */
export function StickyNav({ links, logo, stateName }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Show nav after scrolling 80% of viewport height
                    const scrollThreshold = window.innerHeight * 0.8;
                    setIsVisible(window.pageYOffset > scrollThreshold);
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Passive listener for better scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check initial scroll position
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`sticky-nav ${isVisible ? 'sticky-nav--visible' : ''}`}
            aria-label="Page sections"
            role="navigation"
        >
            <div className="sticky-nav__container">
                {/* Logo/Branding */}
                <div className="sticky-nav__brand">
                    <span className="sticky-nav__logo">
                        {logo || 'TickRisk'}
                    </span>
                    {stateName && (
                        <>
                            <span className="sticky-nav__separator" aria-hidden="true">|</span>
                            <span className="sticky-nav__state">{stateName}</span>
                        </>
                    )}
                </div>

                {/* Navigation Links */}
                <ul className="sticky-nav__links">
                    {links.map((link, index) => (
                        <li key={index} className="sticky-nav__item">
                            <a
                                href={link.href}
                                className="sticky-nav__link"
                                aria-label={link.label}
                            >
                                {link.icon && (
                                    <span className="sticky-nav__icon" aria-hidden="true">
                                        {link.icon}
                                    </span>
                                )}
                                <span>{link.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default StickyNav;
