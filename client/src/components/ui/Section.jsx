import { useEffect, useRef, useState } from 'react';
import './Section.css';

/**
 * Section Component - Animated container with IntersectionObserver
 * 
 * Purpose: Wrapper component for page sections with scroll-triggered animations
 * Design: Background color variants for visual hierarchy
 * Accessibility: Semantic HTML with proper IDs for anchor links
 * Performance: IntersectionObserver for efficient scroll detection
 */
export function Section(props) {
    const { variant, id, children, className } = props;
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Once visible, stop observing (animation happens once)
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of section is visible
                rootMargin: '0px 0px -50px 0px', // Trigger slightly before entering viewport
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const sectionClasses = [
        'section',
        `section--${variant}`,
        isVisible ? 'section--visible' : '',
        className || '',
    ].filter(Boolean).join(' ');

    return (
        <section
            ref={sectionRef}
            id={id}
            className={sectionClasses}
            style={props.style}
            aria-labelledby={id ? `${id}-heading` : undefined}
        >
            <div className="section__container">
                {children}
            </div>
        </section>
    );
}

export default Section;
