// Valider une requête SQL
export const validateSQL = (sql) => {
    if (!sql || !sql.trim()) {
      return { valid: false, error: 'Requête SQL vide' };
    }
  
    const query = sql.trim().toUpperCase();
    
    // Vérifier les mots-clés SQL de base
    const validKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER'];
    const startsWithValid = validKeywords.some(keyword => query.startsWith(keyword));
    
    if (!startsWithValid) {
      return { 
        valid: false, 
        error: 'La requête doit commencer par SELECT, INSERT, UPDATE ou DELETE' 
      };
    }
  
    // Vérifier les parenthèses équilibrées
    const openParens = (sql.match(/\(/g) || []).length;
    const closeParens = (sql.match(/\)/g) || []).length;
    
    if (openParens !== closeParens) {
      return { valid: false, error: 'Parenthèses non équilibrées' };
    }
  
    // Vérifier les guillemets équilibrés
    const singleQuotes = (sql.match(/'/g) || []).length;
    const doubleQuotes = (sql.match(/"/g) || []).length;
    
    if (singleQuotes % 2 !== 0) {
      return { valid: false, error: 'Guillemets simples non équilibrés' };
    }
    
    if (doubleQuotes % 2 !== 0) {
      return { valid: false, error: 'Guillemets doubles non équilibrés' };
    }
  
    return { valid: true, error: null };
  };
  
  export default validateSQL;