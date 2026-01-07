// src/screens/TodoListScreen.js

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";
import AppBar from "../screens/AppBar";

export default function TodoListScreen({ navigation }) {
  
  const { todos, addTodo } = useTodoStore();

  useEffect(() => {
    addTodo({ id: 1, title: "Faire les courses" });
    addTodo({ id: 2, title: "Sortir le chien" });
    addTodo({ id: 3, title: "Coder une app RN" });
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>

      {/* Barre du haut */}
      <AppBar title="Mes tâches" />

      {/* Liste des tâches */}
      <FlatList
        data={todos}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Détails", item)}
            style={{
              padding: 15,
              marginVertical: 8,
              backgroundColor: "#eee",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}
