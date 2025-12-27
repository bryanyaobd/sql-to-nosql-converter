import { parseSQL } from './sqlParser';

export const convertSQLToMongo = (sql, options = {}) => {
  if (!sql || !sql.trim()) {
    throw new Error('Requête SQL vide');
  }

  try {
    const parsed = parseSQL(sql);
    
    switch (parsed.type) {
      case 'SELECT':
        return convertSelect(parsed, options);
      case 'INSERT':
        return convertInsert(parsed, options);
      case 'UPDATE':
        return convertUpdate(parsed, options);
      case 'DELETE':
        return convertDelete(parsed, options);
      default:
        throw new Error(`Type de requête non supporté: ${parsed.type}`);
    }
  } catch (error) {
    throw new Error(`Erreur de conversion: ${error.message}`);
  }
};

// Convertir SELECT
const convertSelect = (parsed, options) => {
  const { table, fields, conditions, orderBy, limit } = parsed;
  const { prettify, includeComments } = options;
  
  let result = '';
  
  if (includeComments) {
    result += `// Requête SQL: ${parsed.original}\n`;
    result += `// Conversion MongoDB\n\n`;
  }
  
  // Construire le filtre
  const filter = buildFilter(conditions);
  
  // Construire la projection
  const projection = buildProjection(fields);
  
  // Requête de base
  result += `db.${table}.find(`;
  
  if (prettify) {
    result += `\n  ${JSON.stringify(filter, null, 2).replace(/\n/g, '\n  ')}`;
    if (projection && Object.keys(projection).length > 0) {
      result += `,\n  ${JSON.stringify(projection, null, 2).replace(/\n/g, '\n  ')}`;
    }
    result += '\n)';
  } else {
    result += JSON.stringify(filter);
    if (projection && Object.keys(projection).length > 0) {
      result += `, ${JSON.stringify(projection)}`;
    }
    result += ')';
  }
  
  // Ajouter ORDER BY
  if (orderBy) {
    const sortOrder = orderBy.direction === 'ASC' ? 1 : -1;
    if (prettify) {
      result += `\n  .sort({ ${orderBy.field}: ${sortOrder} })`;
    } else {
      result += `.sort({${orderBy.field}:${sortOrder}})`;
    }
  }
  
  // Ajouter LIMIT
  if (limit) {
    if (prettify) {
      result += `\n  .limit(${limit})`;
    } else {
      result += `.limit(${limit})`;
    }
  }
  
  result += ';';
  
  if (includeComments) {
    result += '\n\n// Note: Cette requête retourne un curseur';
    result += '\n// Utilisez .toArray() pour obtenir tous les résultats';
  }
  
  return result;
};

// Convertir INSERT
const convertInsert = (parsed, options) => {
  const { table, values } = parsed;
  const { prettify, includeComments } = options;
  
  if (!values) {
    throw new Error('Impossible d\'extraire les valeurs INSERT');
  }
  
  let result = '';
  
  if (includeComments) {
    result += `// Requête SQL: ${parsed.original}\n`;
    result += `// Conversion MongoDB\n\n`;
  }
  
  result += `db.${table}.insertOne(`;
  
  if (prettify) {
    result += `\n  ${JSON.stringify(values, null, 2).replace(/\n/g, '\n  ')}\n`;
  } else {
    result += JSON.stringify(values);
  }
  
  result += ');';
  
  if (includeComments) {
    result += '\n\n// Retourne: { acknowledged: true, insertedId: ObjectId(...) }';
  }
  
  return result;
};

// Convertir UPDATE
const convertUpdate = (parsed, options) => {
  const { table, conditions } = parsed;
  const { prettify, includeComments } = options;
  
  let result = '';
  
  if (includeComments) {
    result += `// Requête SQL: ${parsed.original}\n`;
    result += `// Conversion MongoDB\n\n`;
  }
  
  // Extraire les SET values
  const setMatch = parsed.original.match(/SET\s+(.*?)\s+WHERE/i);
  if (!setMatch) {
    throw new Error('Impossible d\'extraire les valeurs SET');
  }
  
  const setParts = setMatch[1].split(',').map(p => p.trim());
  const updateDoc = {};
  
  setParts.forEach(part => {
    const [field, value] = part.split('=').map(p => p.trim());
    updateDoc[field] = value.replace(/['"]/g, '');
  });
  
  const filter = buildFilter(conditions);
  
  result += `db.${table}.updateMany(`;
  
  if (prettify) {
    result += `\n  ${JSON.stringify(filter, null, 2).replace(/\n/g, '\n  ')},`;
    result += `\n  { $set: ${JSON.stringify(updateDoc, null, 2).replace(/\n/g, '\n    ')} }\n`;
  } else {
    result += `${JSON.stringify(filter)}, { $set: ${JSON.stringify(updateDoc)} }`;
  }
  
  result += ');';
  
  if (includeComments) {
    result += '\n\n// Utilisez updateOne() pour mettre à jour un seul document';
  }
  
  return result;
};

// Convertir DELETE
const convertDelete = (parsed, options) => {
  const { table, conditions } = parsed;
  const { prettify, includeComments } = options;
  
  let result = '';
  
  if (includeComments) {
    result += `// Requête SQL: ${parsed.original}\n`;
    result += `// Conversion MongoDB\n\n`;
  }
  
  const filter = buildFilter(conditions);
  
  result += `db.${table}.deleteMany(`;
  
  if (prettify) {
    result += `\n  ${JSON.stringify(filter, null, 2).replace(/\n/g, '\n  ')}\n`;
  } else {
    result += JSON.stringify(filter);
  }
  
  result += ');';
  
  if (includeComments) {
    result += '\n\n// Utilisez deleteOne() pour supprimer un seul document';
  }
  
  return result;
};

// Construire le filtre MongoDB
const buildFilter = (conditions) => {
  if (!conditions || conditions.length === 0) return {};
  
  const filter = {};
  
  conditions.forEach(cond => {
    const { field, operator, value } = cond;
    
    switch (operator) {
      case '=':
        filter[field] = isNaN(value) ? value : Number(value);
        break;
      case '>':
        filter[field] = { $gt: value };
        break;
      case '<':
        filter[field] = { $lt: value };
        break;
      case '>=':
        filter[field] = { $gte: value };
        break;
      case '<=':
        filter[field] = { $lte: value };
        break;
      case 'LIKE':
        // Convertir LIKE en regex
        const regexPattern = value.replace(/%/g, '.*');
        filter[field] = { $regex: regexPattern, $options: 'i' };
        break;
      case 'IN':
        filter[field] = { $in: value };
        break;
      default:
        filter[field] = value;
    }
  });
  
  return filter;
};

// Construire la projection
const buildProjection = (fields) => {
  if (!fields || fields.length === 0 || fields[0] === '*') return null;
  
  const projection = {};
  fields.forEach(field => {
    projection[field.trim()] = 1;
  });
  
  return projection;
};

export default convertSQLToMongo;