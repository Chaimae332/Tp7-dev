import * as SQLite from "expo-sqlite";

// Ouvre (ou crée) la base
export const db = SQLite.openDatabaseSync("todos.db");

// Initialisation de la base
export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY,
      title TEXT
    );
  `);
};

// Ajouter une tâche hors ligne
export const addTodoOffline = (title) => {
  db.runSync(
    "INSERT INTO todos (id, title) VALUES (?, ?)",
    [Date.now(), title]
  );
};

// Mettre à jour une tâche
export const updateTodoOffline = (id, title) => {
  db.runSync(
    "UPDATE todos SET title = ? WHERE id = ?",
    [title, id]
  );
};

// Charger toutes les tâches
export const loadTodos = () => {
  return db.getAllSync("SELECT * FROM todos");
};

// Supprimer une tâche (exercice bonus)
export const deleteTodoOffline = (id) => {
  db.runSync("DELETE FROM todos WHERE id = ?", [id]);
};
