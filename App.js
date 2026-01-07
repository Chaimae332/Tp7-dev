import React, { useContext, useEffect, useState } from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ActivityIndicator } from "react-native";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";

import { initDB } from "./services/database";

import LoginScreen from "./screens/LoginScreen";
import TodoListScreen from "./screens/TodoListScreen";
import TodoDetailsScreen from "./screens/TodoDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ApiTestScreen from "./screens/ApiTestScreen";
import TodoListFetchScreen from "./screens/TodoListFetchScreen";
import TodoListOfflineScreen from "./screens/TodoListOfflineScreen";

// ---------------- NAVIGATORS ----------------
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ---------------- TASKS STACK (TP 6) ----------------
function TasksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tâches" component={TodoListScreen} />
      <Stack.Screen name="Détails" component={TodoDetailsScreen} />
    </Stack.Navigator>
  );
}

// ---------------- DRAWER (APRES LOGIN) ----------------
function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tâches" component={TasksStack} />
      <Drawer.Screen name="Todos API" component={TodoListFetchScreen} />
      <Drawer.Screen name="Todos Offline" component={TodoListOfflineScreen} />
      <Drawer.Screen name="API Test" component={ApiTestScreen} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

// ---------------- AUTH SWITCH ----------------
function RootNavigator() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user ? <AppDrawer /> : <LoginScreen />;
}

// ---------------- MAIN APP (THEME GLOBAL) ----------------
function MainApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer
      theme={
        theme === "dark"
          ? NavigationDarkTheme
          : NavigationLightTheme
      }
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// ---------------- APP ENTRY (INIT SQLITE) ----------------
export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDB();
    setDbReady(true);
  }, []);

  if (!dbReady) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <MainApp />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}
