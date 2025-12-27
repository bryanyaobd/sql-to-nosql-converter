import React from 'react';
import { Settings, Code, MessageSquare, GitCompare } from 'lucide-react';
import './ConversionOptions.css';

const ConversionOptions = ({ options, setOptions }) => {
  const toggleOption = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="conversion-options">
      <div className="options-header">
        <Settings size={18} />
        <span>Options de Conversion</span>
      </div>

      <div className="options-grid">
        <button
          onClick={() => toggleOption('prettify')}
          className={`option-btn ${options.prettify ? 'active' : ''}`}
        >
          <Code size={18} />
          <span>Formater le code</span>
        </button>

        <button
          onClick={() => toggleOption('includeComments')}
          className={`option-btn ${options.includeComments ? 'active' : ''}`}
        >
          <MessageSquare size={18} />
          <span>Inclure les commentaires</span>
        </button>

        <button
          onClick={() => toggleOption('showComparison')}
          className={`option-btn ${options.showComparison ? 'active' : ''}`}
        >
          <GitCompare size={18} />
          <span>Vue comparative</span>
        </button>
      </div>
    </div>
  );
};

export default ConversionOptions;