import React from 'react';
import { Leaf, CheckCircle, Copy } from 'lucide-react';
import './NoSQLOutput.css';

const NoSQLOutput = ({ mongoQuery, error }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mongoQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineNumbers = mongoQuery.split('\n').length;

  return (
    <div className="nosql-output-card">
      <div className="card-header">
        <div className="card-header-left">
          <Leaf size={20} className="header-icon" />
          <h2 className="card-title">MongoDB Query</h2>
        </div>
        {mongoQuery && (
          <button onClick={handleCopy} className="copy-badge" title="Copier">
            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
            {copied ? 'Copié!' : 'Copier'}
          </button>
        )}
      </div>

      <div className="output-container">
        {mongoQuery ? (
          <>
            <div className="line-numbers">
              {Array.from({ length: lineNumbers }, (_, i) => (
                <div key={i} className="line-number">{i + 1}</div>
              ))}
            </div>
            <pre className="mongo-output">{mongoQuery}</pre>
          </>
        ) : (
          <div className="empty-state">
            {error ? (
              <>
                <div className="empty-icon error">⚠️</div>
                <p className="empty-title">Erreur de conversion</p>
                <p className="empty-text">{error}</p>
              </>
            ) : (
              <>
                <div className="empty-icon">🍃</div>
                <p className="empty-title">En attente d'une requête SQL</p>
                <p className="empty-text">Entrez une requête SQL pour voir la conversion MongoDB</p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="output-footer">
        <div className="footer-tags">
          <span className="tag">db.collection</span>
          <span className="tag">find()</span>
          <span className="tag">aggregate()</span>
          <span className="tag">insertOne()</span>
        </div>
      </div>
    </div>
  );
};

export default NoSQLOutput;