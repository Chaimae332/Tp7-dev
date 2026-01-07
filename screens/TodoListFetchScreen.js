import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { fetchTodosFetch } from "../services/api";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListFetchScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchTodosFetch()
      .then(setTodos)
      .catch(() => setError("Impossible de charger les tâches"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
      }}
    >
      {/* Toggle theme */}
      <Button
        title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
        onPress={toggleTheme}
      />

      {/* Error */}
      {error && (
        <Text style={{ color: "red", padding: 10 }}>{error}</Text>
      )}

      {/* Todo list */}
      <FlatList
        data={todos}
        keyExtractor={(item) => `${item.id}-${item.title}`}
        renderItem={({ item }) => (
          <Text
            style={{
              padding: 10,
              fontSize: 16,
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
          >
            {item.title}
          </Text>
        )}
      />
    </View>
  );
}
