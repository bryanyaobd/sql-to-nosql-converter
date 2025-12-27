import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { sqlExamples } from '../utils/sqlExamples';
import './ExamplesPanel.css';

const ExamplesPanel = ({ onLoadExample }) => {
  return (
    <div className="examples-panel glass-card">
      <div className="panel-header">
        <BookOpen size={20} />
        <h3 className="panel-title">Exemples SQL</h3>
      </div>

      <div className="examples-grid">
        {sqlExamples.map((example, index) => (
          <div
            key={index}
            className="example-card glass-card clickable"
            onClick={() => onLoadExample(example)}
          >
            <div className="example-header">
              <span className="example-type">{example.type}</span>
              <ChevronRight size={16} className="example-arrow" />
            </div>

            <h4 className="example-title">{example.title}</h4>
            <p className="example-description">{example.description}</p>

            <div className="example-code">
              <code>{example.sql.substring(0, 60)}...</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamplesPanel;
