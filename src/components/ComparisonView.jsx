import React from 'react';
import { GitCompare } from 'lucide-react';
import './ComparisonView.css';

const ComparisonView = ({ sqlQuery, mongoQuery }) => {
  return (
    <div className="comparison-view">
      <div className="comparison-header">
        <GitCompare size={20} />
        <h3 className="comparison-title">Vue Comparative SQL ↔ MongoDB</h3>
      </div>

      <div className="comparison-grid">
        <div className="comparison-column">
          <div className="column-header sql-header">
            <span>SQL</span>
          </div>
          <div className="column-content">
            <pre className="comparison-code sql-code">{sqlQuery}</pre>
          </div>
        </div>

        <div className="comparison-divider">
          <div className="divider-line"></div>
          <div className="divider-icon">⇄</div>
          <div className="divider-line"></div>
        </div>

        <div className="comparison-column">
          <div className="column-header mongo-header">
            <span>MongoDB</span>
          </div>
          <div className="column-content">
            <pre className="comparison-code mongo-code">{mongoQuery}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;