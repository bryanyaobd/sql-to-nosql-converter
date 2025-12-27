# 🔄 SQL to NoSQL Converter

<div align="center">

![SQL to NoSQL](https://img.shields.io/badge/SQL-→-blue?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)


**Convertissez vos requêtes SQL en MongoDB instantanément**

[Demo](#) • [Fonctionnalités](#-fonctionnalités) • [Installation](#-installation) • [Exemples](#-exemples)

</div>


## ✨ Fonctionnalités

### 🔄 Conversion Intelligente
- ✅ **SELECT** → `db.collection.find()`
- ✅ **INSERT** → `db.collection.insertOne()`
- ✅ **UPDATE** → `db.collection.updateMany()`
- ✅ **DELETE** → `db.collection.deleteMany()`

### 🎯 Support Complet
- 📍 Clauses **WHERE** (conditions multiples)
- 🔢 Opérateurs : `=`, `>`, `<`, `>=`, `<=`, `LIKE`, `IN`
- 📊 **ORDER BY** (ASC/DESC)
- 🎚️ **LIMIT**
- 🎭 Projection de champs
- 🔍 Recherche avec patterns (LIKE → regex)

### 🎨 Interface Moderne
- 🌙 Design dark élégant avec éditeur de code
- 📝 Coloration syntaxique
- 🔢 Numéros de lignes
- 🎭 Animations fluides
- 📱 Responsive design

### 🛠️ Outils Pratiques
- 💾 Copie en un clic
- 📥 Téléchargement en fichier .js
- 🔄 Formatage automatique du code
- 💬 Commentaires explicatifs optionnels
- 📊 Vue comparative SQL ↔ MongoDB
- 📚 10 exemples intégrés

### 📊 Statistiques en Temps Réel
- 📏 Nombre de lignes
- 🔤 Nombre de caractères
- 📝 Nombre de mots
- ✅ Validation instantanée

---

## 🚀 Installation

### Prérequis

- **Node.js** v14.0.0 ou supérieur
- **npm** v6.0.0 ou supérieur

### Étapes d'installation
```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/sql-to-nosql-converter.git

# 2. Accéder au dossier
cd sql-to-nosql-converter

# 3. Installer les dépendances
npm install

# 4. Lancer l'application
npm start
```

L'application sera accessible sur **http://localhost:3000**

---

## 🛠️ Technologies Utilisées

| Technologie | Description |
|------------|-------------|
| **React 18.2** | Framework UI |
| **Lucide React** | Bibliothèque d'icônes |
| **JavaScript ES6+** | Parsing et conversion |
| **CSS3** | Animations et styles |

---

## 📖 Utilisation

### 1️⃣ Entrer une Requête SQL
```sql
SELECT name, email, age 
FROM users 
WHERE age > 25 AND status = 'active'
ORDER BY name ASC 
LIMIT 10;
```

### 2️⃣ Obtenir la Conversion MongoDB
```javascript
db.users.find(
  {
    "age": { "$gt": 25 },
    "status": "active"
  },
  {
    "name": 1,
    "email": 1,
    "age": 1
  }
)
  .sort({ name: 1 })
  .limit(10);
```

### 3️⃣ Options de Conversion

- **Formater le code** : Indentation automatique
- **Inclure les commentaires** : Ajoute des explications
- **Vue comparative** : Affiche SQL et MongoDB côte à côte

### 4️⃣ Copier ou Télécharger

- 📋 **Copier** : Copie dans le presse-papier
- 💾 **Télécharger** : Sauvegarde en fichier `.js`

---

## 💡 Exemples de Conversion

### Exemple 1 : SELECT Simple

**SQL :**
```sql
SELECT * FROM users WHERE age > 25;
```

**MongoDB :**
```javascript
db.users.find({
  "age": { "$gt": 25 }
});
```

---

### Exemple 2 : SELECT avec Projection

**SQL :**
```sql
SELECT name, email FROM users WHERE status = 'active';
```

**MongoDB :**
```javascript
db.users.find(
  { "status": "active" },
  { "name": 1, "email": 1 }
);
```

---

### Exemple 3 : SELECT avec LIKE

**SQL :**
```sql
SELECT * FROM products WHERE name LIKE '%phone%';
```

**MongoDB :**
```javascript
db.products.find({
  "name": { 
    "$regex": ".*phone.*", 
    "$options": "i" 
  }
});
```

---

### Exemple 4 : SELECT avec IN

**SQL :**
```sql
SELECT * FROM orders WHERE status IN ('pending', 'processing');
```

**MongoDB :**
```javascript
db.orders.find({
  "status": { 
    "$in": ["pending", "processing"] 
  }
});
```

---

### Exemple 5 : INSERT

**SQL :**
```sql
INSERT INTO users (name, email, age) 
VALUES ('John Doe', 'john@example.com', 30);
```

**MongoDB :**
```javascript
db.users.insertOne({
  "name": "John Doe",
  "email": "john@example.com",
  "age": "30"
});
```

---

### Exemple 6 : UPDATE

**SQL :**
```sql
UPDATE users SET status = 'inactive' WHERE age > 65;
```

**MongoDB :**
```javascript
db.users.updateMany(
  { "age": { "$gt": 65 } },
  { "$set": { "status": "inactive" } }
);
```

---

### Exemple 7 : DELETE

**SQL :**
```sql
DELETE FROM users WHERE status = 'deleted';
```

**MongoDB :**
```javascript
db.users.deleteMany({
  "status": "deleted"
});
```

---

### Exemple 8 : Requête Complexe

**SQL :**
```sql
SELECT name, email, age 
FROM users 
WHERE age >= 18 AND status = 'active'
ORDER BY age DESC 
LIMIT 20;
```

**MongoDB :**
```javascript
db.users.find(
  {
    "age": { "$gte": 18 },
    "status": "active"
  },
  {
    "name": 1,
    "email": 1,
    "age": 1
  }
)
  .sort({ age: -1 })
  .limit(20);
```

---

## 📚 Opérateurs Supportés

| SQL | MongoDB | Description |
|-----|---------|-------------|
| `=` | `field: value` | Égalité |
| `>` | `{ $gt: value }` | Supérieur |
| `<` | `{ $lt: value }` | Inférieur |
| `>=` | `{ $gte: value }` | Supérieur ou égal |
| `<=` | `{ $lte: value }` | Inférieur ou égal |
| `LIKE` | `{ $regex: pattern }` | Pattern matching |
| `IN` | `{ $in: [values] }` | Liste de valeurs |
| `AND` | Combinaison de filtres | ET logique |

---



## 🎯 Limitations Actuelles

- ⚠️ Pas de support pour les **JOINs** complexes
- ⚠️ Pas de support pour **GROUP BY** / **HAVING**
- ⚠️ Pas de support pour les **sous-requêtes**
- ⚠️ Pas de support pour **CREATE TABLE**
- ⚠️ Les transactions ne sont pas converties

---

## 🚀 Fonctionnalités à Venir

- [ ] Support des JOINs (conversion en $lookup)
- [ ] Support de GROUP BY (conversion en aggregate)
- [ ] Support des sous-requêtes
- [ ] Conversion vers d'autres bases NoSQL (Cassandra, DynamoDB)
- [ ] Export en plusieurs formats (Python, Node.js, Java)
- [ ] Historique des conversions
- [ ] Mode batch (convertir plusieurs requêtes)
- [ ] Validation avancée des requêtes
- [ ] Tests unitaires des conversions
- [ ] API REST pour l'intégration

---

## 🤝 Contribution

Les contributions sont les bienvenues ! 

### Comment contribuer

1. **Fork** le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une **Pull Request**

### Guidelines

- Suivez le style de code existant
- Ajoutez des tests pour les nouvelles fonctionnalités
- Mettez à jour la documentation
- Testez sur différents navigateurs

---

## 🐛 Signaler un Bug

Ouvrez une [issue](https://github.com/bryanyaobd/sql-to-nosql-converter/issues) avec :
- Description détaillée du problème
- Requête SQL utilisée
- Résultat attendu vs résultat obtenu
- Screenshots si possible
- Version du navigateur


## 🙏 Remerciements

- [React](https://reactjs.org/) - Framework UI
- [Lucide Icons](https://lucide.dev/) - Icônes élégantes
- [MongoDB Docs](https://docs.mongodb.com/) - Documentation
- [SQL Tutorial](https://www.w3schools.com/sql/) - Référence SQL
- Tous les contributeurs et utilisateurs

---

## 📚 Ressources Utiles

### Documentation

- [MongoDB Query Language](https://docs.mongodb.com/manual/tutorial/query-documents/)
- [SQL to MongoDB Mapping](https://docs.mongodb.com/manual/reference/sql-comparison/)
- [MongoDB Aggregation](https://docs.mongodb.com/manual/aggregation/)

### Tutoriels

- [Migrer de SQL vers MongoDB](https://www.mongodb.com/basics/sql-to-mongodb)
- [MongoDB University](https://university.mongodb.com/)
- [SQL vs NoSQL](https://www.mongodb.com/nosql-explained/nosql-vs-sql)

---

## 🎓 Cas d'Usage

### Pour les Développeurs
- 🎯 Apprendre MongoDB en comparant avec SQL
- 🔄 Migrer des applications SQL vers MongoDB
- 📚 Comprendre les équivalences entre SQL et NoSQL
- ⚡ Prototyper rapidement des requêtes MongoDB

### Pour les Étudiants
- 📖 Apprendre les deux paradigmes simultanément
- 🎓 Préparer des projets académiques
- 💡 Comprendre les différences conceptuelles

### Pour les Équipes
- 🚀 Accélérer la migration de bases de données
- 📝 Documenter les équivalences
- 🔍 Former les développeurs SQL à MongoDB

---

## 📊 Statistiques

![GitHub stars](https://img.shields.io/github/stars/votre-username/sql-to-nosql-converter?style=social)
![GitHub forks](https://img.shields.io/github/forks/votre-username/sql-to-nosql-converter?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/votre-username/sql-to-nosql-converter?style=social)
![GitHub issues](https://img.shields.io/github/issues/votre-username/sql-to-nosql-converter)

---

## 💬 FAQ

### Q: Est-ce que tous les types de requêtes SQL sont supportés ?
**R:** Actuellement, nous supportons SELECT, INSERT, UPDATE et DELETE. Les JOINs et GROUP BY sont en cours de développement.

### Q: Puis-je utiliser cet outil en production ?
**R:** Cet outil est parfait pour l'apprentissage et le prototypage. Pour la production, vérifiez toujours les requêtes générées.

### Q: Comment signaler un bug de conversion ?
**R:** Ouvrez une issue sur GitHub avec la requête SQL et le résultat obtenu.

### Q: Puis-je contribuer au projet ?
**R:** Absolument ! Les contributions sont les bienvenues. Consultez la section Contribution.

---

<div align="center">

**⭐ N'oubliez pas de mettre une étoile si ce projet vous aide ! ⭐**

**Made with ❤️ and ☕ by [Votre Nom](https://github.com/votre-username)**

---

**Transformez votre SQL en NoSQL en un clic ! 🚀**

</div>