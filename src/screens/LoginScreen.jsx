import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import Card from "@/components/Card";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    setError("");
    setUsername("");
    setPassword("");
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.formHeaderTitle}>Login</Text>
        <View style={styles.formInputContainer}>
          <AppInput
            placeholder={"Username"}
            value={username}
            onChangeText={setUsername}
          />
          <AppInput
            placeholder={"Password"}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {error ? <Text>{error}</Text> : null}
        <Link href="/register">Dont have account yet?</Link>
        <View style={{ marginTop: 10 }}>
          <AppButton name={"Login"} color="blue" onPress={handleLogin} />
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  formInputContainer: {
    gap: 10,
  },

  formHeaderTitle: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 700,
  },
});
