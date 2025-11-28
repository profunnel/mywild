import React from 'react';
import './TickDetailModal.css';

const TickDetailModal = ({ tick, onClose }) => {
    if (!tick) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <div className="modal-image" style={{ backgroundImage: `url('${tick.image}')` }}></div>
                    <div className="modal-title-block">
                        <h2>{tick.commonName}</h2>
                        <span className="modal-latin">{tick.latinName}</span>
                        <div className="danger-badge">
                            <span className="danger-label">Danger Level:</span>
                            <span className={`danger-value ${tick.dangerLevel.toLowerCase()}`}>{tick.dangerLevel}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="info-section">
                        <h3>Where They Hide</h3>
                        <p>{tick.habitat}</p>
                    </div>

                    <div className="info-section">
                        <h3>When They Strike</h3>
                        <p>{tick.seasonality}</p>
                    </div>

                    <div className="info-section full-width">
                        <h3>What They Carry</h3>
                        <ul className="disease-list">
                            {tick.diseases.map((disease, index) => (
                                <li key={index}>
                                    <strong>{disease.name}:</strong> {disease.description}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="info-section full-width fun-fact">
                        <h3>Did You Know?</h3>
                        <p>{tick.funFact}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TickDetailModal;
