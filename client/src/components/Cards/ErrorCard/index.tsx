import React from 'react';
import './styles.scss';

export const ErrorCard: React.FC<{ count: number }> = ({ count }) => (
    <div className='error-card content'>
        <div className='toolbar errors'>
            <h1 className="card-title">Error Reports</h1>
            <span><i className="fas fa-exclamation-triangle"></i></span>
        </div>
        <h1 className="card-count">{count}</h1>
        <p>reported in the last 24 hours</p>
    </div>
)