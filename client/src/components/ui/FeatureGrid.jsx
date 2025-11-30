import './FeatureGrid.css';

/**
 * FeatureGrid Component - Responsive grid for features
 * 
 * Purpose: Display multiple feature cards in a responsive layout
 * Design: Grid on desktop, responsive columns
 * Accessibility: Keyboard navigable
 * Mobile: Touch targets 44x44px minimum
 */
export function FeatureGrid({ children, columns = 3 }) {
    const gridClasses = [
        'feature-grid',
        `feature-grid--cols-${columns}`,
    ].join(' ');

    return (
        <div className={gridClasses}>
            {children}
        </div>
    );
}

export default FeatureGrid;
