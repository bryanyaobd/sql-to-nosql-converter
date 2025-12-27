import React from 'react';
import { Database, AlertCircle } from 'lucide-react';
import './SQLEditor.css';

const SQLEditor = ({ sqlQuery, setSqlQuery, error }) => {
  const lineNumbers = sqlQuery.split('\n').length;

  return (
    <div className="sql-editor-card">
      <div className="card-header">
        <div className="card-header-left">
          <Database size={20} className="header-icon" />
          <h2 className="card-title">Requête SQL</h2>
        </div>
        <div className="sql-badge">MySQL / PostgreSQL</div>
      </div>

      <div className="editor-container">
        <div className="line-numbers">
          {Array.from({ length: Math.max(lineNumbers, 10) }, (_, i) => (
            <div key={i} className="line-number">{i + 1}</div>
          ))}
        </div>
        <textarea
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          placeholder="-- Entrez votre requête SQL ici...
-- Exemple:
SELECT * FROM users WHERE age > 25 ORDER BY name ASC LIMIT 10;"
          className="sql-textarea"
          spellCheck={false}
        />
      </div>

      {error && (
        <div className="error-banner">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="editor-footer">
        <div className="footer-info">
          <span className="info-item">
            <strong>Lignes:</strong> {sqlQuery.split('\n').length}
          </span>
          <span className="info-item">
            <strong>Caractères:</strong> {sqlQuery.length}
          </span>
          <span className="info-item">
            <strong>Mots:</strong> {sqlQuery.split(/\s+/).filter(Boolean).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SQLEditor;