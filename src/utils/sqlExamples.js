export const sqlExamples = [
    {
      type: 'SELECT',
      title: 'Sélection Simple',
      description: 'Récupérer tous les utilisateurs',
      sql: 'SELECT * FROM users;'
    },
    {
      type: 'SELECT',
      title: 'Sélection avec WHERE',
      description: 'Utilisateurs de plus de 25 ans',
      sql: 'SELECT * FROM users WHERE age > 25;'
    },
    {
      type: 'SELECT',
      title: 'Sélection avec ORDER BY',
      description: 'Utilisateurs triés par nom',
      sql: 'SELECT * FROM users WHERE age > 18 ORDER BY name ASC LIMIT 10;'
    },
    {
      type: 'SELECT',
      title: 'Projection de Champs',
      description: 'Sélectionner des champs spécifiques',
      sql: 'SELECT name, email, age FROM users WHERE status = "active";'
    },
    {
      type: 'SELECT',
      title: 'Recherche avec LIKE',
      description: 'Rechercher par pattern',
      sql: 'SELECT * FROM products WHERE name LIKE "%phone%";'
    },
    {
      type: 'SELECT',
      title: 'Filtre avec IN',
      description: 'Filtrer par liste de valeurs',
      sql: 'SELECT * FROM orders WHERE status IN ("pending", "processing", "completed");'
    },
    {
      type: 'INSERT',
      title: 'Insertion Simple',
      description: 'Ajouter un nouvel utilisateur',
      sql: 'INSERT INTO users (name, email, age) VALUES ("John Doe", "john@example.com", 30);'
    },
    {
      type: 'UPDATE',
      title: 'Mise à Jour',
      description: 'Modifier un utilisateur',
      sql: 'UPDATE users SET status = "inactive" WHERE age > 65;'
    },
    {
      type: 'DELETE',
      title: 'Suppression',
      description: 'Supprimer des enregistrements',
      sql: 'DELETE FROM users WHERE status = "deleted";'
    },
    {
      type: 'SELECT',
      title: 'Requête Complexe',
      description: 'Multiple conditions et tri',
      sql: 'SELECT name, email, age FROM users WHERE age >= 18 AND status = "active" ORDER BY age DESC LIMIT 20;'
    }
  ];
  
  export default sqlExamples;