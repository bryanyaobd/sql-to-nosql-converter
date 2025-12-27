// Parser SQL simple pour extraire les éléments de la requête
export const parseSQL = (sql) => {
    const query = sql.trim().toUpperCase();
    
    // Détecter le type de requête
    let type = 'UNKNOWN';
    if (query.startsWith('SELECT')) type = 'SELECT';
    else if (query.startsWith('INSERT')) type = 'INSERT';
    else if (query.startsWith('UPDATE')) type = 'UPDATE';
    else if (query.startsWith('DELETE')) type = 'DELETE';
    else if (query.startsWith('CREATE')) type = 'CREATE';
    
    const result = {
      type,
      original: sql,
      table: extractTable(sql, type),
      fields: extractFields(sql, type),
      conditions: extractConditions(sql),
      orderBy: extractOrderBy(sql),
      limit: extractLimit(sql),
      values: extractValues(sql, type),
      joins: extractJoins(sql)
    };
    
    return result;
  };
  
  // Extraire le nom de la table
  const extractTable = (sql, type) => {
    let match;
    
    if (type === 'SELECT') {
      match = sql.match(/FROM\s+(\w+)/i);
    } else if (type === 'INSERT') {
      match = sql.match(/INSERT\s+INTO\s+(\w+)/i);
    } else if (type === 'UPDATE') {
      match = sql.match(/UPDATE\s+(\w+)/i);
    } else if (type === 'DELETE') {
      match = sql.match(/FROM\s+(\w+)/i);
    }
    
    return match ? match[1] : 'collection';
  };
  
  // Extraire les champs SELECT
  const extractFields = (sql, type) => {
    if (type !== 'SELECT') return [];
    
    const match = sql.match(/SELECT\s+(.*?)\s+FROM/i);
    if (!match) return ['*'];
    
    const fieldsStr = match[1].trim();
    if (fieldsStr === '*') return ['*'];
    
    return fieldsStr.split(',').map(f => f.trim());
  };
  
  // Extraire les conditions WHERE
  const extractConditions = (sql) => {
    const match = sql.match(/WHERE\s+(.*?)(?:ORDER BY|LIMIT|GROUP BY|$)/i);
    if (!match) return [];
    
    const whereClause = match[1].trim();
    
    // Parser simple des conditions
    const conditions = [];
    const parts = whereClause.split(/\s+AND\s+/i);
    
    parts.forEach(part => {
      // field = value
      let condMatch = part.match(/(\w+)\s*=\s*['"]?([^'";\s]+)['"]?/i);
      if (condMatch) {
        conditions.push({
          field: condMatch[1],
          operator: '=',
          value: condMatch[2].replace(/['"]/g, '')
        });
        return;
      }
      
      // field > value
      condMatch = part.match(/(\w+)\s*>\s*(\d+)/i);
      if (condMatch) {
        conditions.push({
          field: condMatch[1],
          operator: '>',
          value: parseInt(condMatch[2])
        });
        return;
      }
      
      // field < value
      condMatch = part.match(/(\w+)\s*<\s*(\d+)/i);
      if (condMatch) {
        conditions.push({
          field: condMatch[1],
          operator: '<',
          value: parseInt(condMatch[2])
        });
        return;
      }
      
      // field >= value
      condMatch = part.match(/(\w+)\s*>=\s*(\d+)/i);
      if (condMatch) {
        conditions.push({
          field: condMatch[1],
          operator: '>=',
          value: parseInt(condMatch[2])
        });
        return;
      }
      
      // field <= value
      condMatch = part.match(/(\w+)\s*<=\s*(\d+)/i);
      if (condMatch) {
        conditions.push({
          field: condMatch[1],
          operator: '<=',
          value: parseInt(condMatch[2])
        });
        return;
      }
      
      // field LIKE value
      condMatch = part.match(/(\w+)\s+LIKE\s+['"]([^'"]+)['"]/i);
      if (condMatch) {
        conditions.push({
          field: condMatch[1],
          operator: 'LIKE',
          value: condMatch[2]
        });
        return;
      }
      
      // field IN (values)
      condMatch = part.match(/(\w+)\s+IN\s+\((.*?)\)/i);
      if (condMatch) {
        const values = condMatch[2].split(',').map(v => v.trim().replace(/['"]/g, ''));
        conditions.push({
          field: condMatch[1],
          operator: 'IN',
          value: values
        });
        return;
      }
    });
    
    return conditions;
  };
  
  // Extraire ORDER BY
  const extractOrderBy = (sql) => {
    const match = sql.match(/ORDER BY\s+(.*?)(?:LIMIT|$)/i);
    if (!match) return null;
    
    const orderStr = match[1].trim();
    const parts = orderStr.split(/\s+/);
    
    return {
      field: parts[0],
      direction: parts[1] ? parts[1].toUpperCase() : 'ASC'
    };
  };
  
  // Extraire LIMIT
  const extractLimit = (sql) => {
    const match = sql.match(/LIMIT\s+(\d+)/i);
    return match ? parseInt(match[1]) : null;
  };
  
  // Extraire les valeurs INSERT
  const extractValues = (sql, type) => {
    if (type !== 'INSERT') return null;
    
    const columnsMatch = sql.match(/INSERT\s+INTO\s+\w+\s*\((.*?)\)/i);
    const valuesMatch = sql.match(/VALUES\s*\((.*?)\)/i);
    
    if (!columnsMatch || !valuesMatch) return null;
    
    const columns = columnsMatch[1].split(',').map(c => c.trim());
    const values = valuesMatch[1].split(',').map(v => v.trim().replace(/['"]/g, ''));
    
    const result = {};
    columns.forEach((col, i) => {
      result[col] = values[i];
    });
    
    return result;
  };
  
  // Extraire les JOINs
  const extractJoins = (sql) => {
    const joins = [];
    const joinMatches = sql.matchAll(/(?:INNER|LEFT|RIGHT)\s+JOIN\s+(\w+)\s+ON\s+(.*?)(?:WHERE|ORDER|LIMIT|$)/gi);
    
    for (const match of joinMatches) {
      joins.push({
        table: match[1],
        condition: match[2].trim()
      });
    }
    
    return joins;
  };
  
  export default parseSQL;