import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchTodosFetch } from "../services/api";

export default function ApiTestScreen() {
  useEffect(() => {
    fetchTodosFetch()
      .then((data) => {
        console.log("✅ TODOS API :", data);
      })
      .catch((error) => {
        console.log("❌ ERREUR API :", error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Ouvre la console pour voir les données de l’API
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});
