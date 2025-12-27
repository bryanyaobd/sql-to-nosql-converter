import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Copy, RotateCcw, Check, AlertCircle } from 'lucide-react';
import SQLEditor from './components/SQLEditor';
import NoSQLOutput from './components/NoSQLOutput';
import ConversionOptions from './components/ConversionOptions';
import ExamplesPanel from './components/ExamplesPanel';
import ComparisonView from './components/ComparisonView';
import { convertSQLToMongo } from './utils/mongoConverter';
import './App.css';

function App() {
  const [sqlQuery, setSqlQuery] = useState('');
  const [mongoQuery, setMongoQuery] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    database: 'mongodb',
    prettify: true,
    includeComments: true,
    showComparison: false
  });

  // Convertir automatiquement
  useEffect(() => {
    if (!sqlQuery.trim()) {
      setMongoQuery('');
      setError('');
      return;
    }

    try {
      const result = convertSQLToMongo(sqlQuery, options);
      setMongoQuery(result);
      setError('');
    } catch (err) {
      setError(err.message);
      setMongoQuery('');
    }
  }, [sqlQuery, options]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mongoQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([mongoQuery], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mongodb-query.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSqlQuery('');
    setMongoQuery('');
    setError('');
  };

  const handleLoadExample = (example) => {
    setSqlQuery(example.sql);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-sql">SQL</span>
              <ArrowRight className="logo-arrow" />
              <span className="logo-nosql">NoSQL</span>
            </div>
            <div>
              <h1 className="header-title">SQL to NoSQL Converter</h1>
              <p className="header-subtitle">Convertissez vos requêtes SQL en MongoDB instantanément</p>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={handleReset} className="btn btn-secondary" title="Réinitialiser">
              <RotateCcw size={18} />
              Reset
            </button>
            <button 
              onClick={handleCopy} 
              className="btn btn-primary" 
              disabled={!mongoQuery}
              title="Copier"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copié' : 'Copier'}
            </button>
            <button 
              onClick={handleDownload} 
              className="btn btn-success" 
              disabled={!mongoQuery}
              title="Télécharger"
            >
              <Download size={18} />
              Télécharger
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Options Bar */}
          <ConversionOptions options={options} setOptions={setOptions} />

          {/* Editor Grid */}
          <div className="editor-grid">
            {/* SQL Editor */}
            <SQLEditor 
              sqlQuery={sqlQuery}
              setSqlQuery={setSqlQuery}
              error={error}
            />

            {/* Arrow */}
            <div className="arrow-container">
              <div className="arrow-circle">
                <ArrowRight size={32} />
              </div>
            </div>

            {/* MongoDB Output */}
            <NoSQLOutput 
              mongoQuery={mongoQuery}
              error={error}
            />
          </div>

          {/* Comparison View */}
          {options.showComparison && mongoQuery && (
            <ComparisonView 
              sqlQuery={sqlQuery}
              mongoQuery={mongoQuery}
            />
          )}

          {/* Examples Panel */}
          <ExamplesPanel onLoadExample={handleLoadExample} />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Fait avec ❤️ | SQL to NoSQL Converter © 2026</p>
      </footer>
    </div>
  );
}

export default App;