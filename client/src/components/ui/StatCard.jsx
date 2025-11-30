
import './StatCard.css';

/**
 * StatCard Component - Glassmorphism stat display
 * 
 * Purpose: Display key statistics with premium glassmorphism styling
 * Design: Semi-transparent background with blur effect
 * Variants: Color-coded for risk levels (high/moderate/low)
 * Accessibility: Semantic HTML with clear visual hierarchy
 */
export function StatCard({ label, value, icon, variant = 'neutral', className = '', style = {} }) {
    const cardClasses = [
        'stat-card',
        'glass-card',
        `stat-card--${variant}`,
        className
    ].join(' ');

    return (
        <div className={cardClasses} style={style}>
            {icon && (
                <div className="stat-card__icon" aria-hidden="true">
                    {icon}
                </div>
            )}

            <div className="stat-card__content">
                <div className="stat-card__value">
                    {value}
                </div>

                <div className="stat-card__label">
                    {label}
                </div>
            </div>
        </div>
    );
}

export default StatCard;
