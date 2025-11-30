import { useState } from 'react';
import './Accordion.css';

/**
 * Accordion Component - Expandable content sections
 * 
 * Purpose: Display collapsible content (e.g., tick removal guide)
 * Design: Smooth height transitions with chevron rotation
 * Accessibility: ARIA attributes, keyboard navigation (Enter/Space)
 * Behavior: One item open at a time (optional: allow multiple)
 * 
 * @param {Array} items - Array of {title, content} objects
 * @param {boolean} allowMultiple - Allow multiple items open (default: false)
 */
export function Accordion({ items, allowMultiple = false }) {
    const [openIndices, setOpenIndices] = useState([]);

    const toggleItem = (index) => {
        if (allowMultiple) {
            // Toggle individual item
            setOpenIndices((prev) =>
                prev.includes(index)
                    ? prev.filter((i) => i !== index)
                    : [...prev, index]
            );
        } else {
            // Only one item open at a time
            setOpenIndices((prev) =>
                prev.includes(index) ? [] : [index]
            );
        }
    };

    const isOpen = (index) => openIndices.includes(index);

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`accordion__item ${isOpen(index) ? 'accordion__item--open' : ''}`}
                >
                    {/* Header - Clickable trigger */}
                    <button
                        className="accordion__header"
                        onClick={() => toggleItem(index)}
                        aria-expanded={isOpen(index)}
                        aria-controls={`accordion-content-${index}`}
                        id={`accordion-header-${index}`}
                    >
                        <span className="accordion__title">{item.title}</span>
                        <span className="accordion__icon" aria-hidden="true">
                            {/* Chevron icon */}
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 7.5L10 12.5L15 7.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </button>

                    {/* Content - Expandable panel */}
                    <div
                        id={`accordion-content-${index}`}
                        className="accordion__content"
                        role="region"
                        aria-labelledby={`accordion-header-${index}`}
                        aria-hidden={!isOpen(index)}
                    >
                        <div className="accordion__body">
                            {typeof item.content === 'string' ? (
                                <p>{item.content}</p>
                            ) : (
                                item.content
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accordion;
