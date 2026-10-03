import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { Link, router } from "expo-router";
import { Lock, ShoppingBag, User } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setError("");
    setUsername("");
    setPassword("");
    router.replace("/otp");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={styles.logo}>
            <ShoppingBag size={26} color="#fff" />
          </View>
          <Text style={styles.title}>Create New Account</Text>
          <Text style={styles.subtitle}>
            Create account to start shopping at StepUp.
          </Text>

          {/* Form */}

          <View style={styles.form}>
            <AppInput
              variant="filled"
              icon={User}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            <AppInput
              variant="filled"
              icon={Lock}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              returnKeyType="done"
              type="password"
              onSubmitEditing={handleLogin}
            />

            <AppInput
              variant="filled"
              icon={Lock}
              placeholder="Confirm Password"
              value={confirmPass}
              onChangeText={setConfirmPass}
              autoCapitalize="none"
              returnKeyType="done"
              type="password"
              onSubmitEditing={handleLogin}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <AppButton
            name="Register"
            color="#111"
            size="lg"
            style={styles.button}
            onPress={handleLogin}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/login" style={styles.footerLink}>
              Login
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.8,
    color: "#111",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6B6B6B",
    marginTop: 6,
  },

  form: { gap: 12, marginTop: 32 },
  error: { fontSize: 13, color: "#E5322D", marginLeft: 4 },

  button: { marginTop: 24 },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: { fontSize: 14, color: "#6B6B6B" },
  footerLink: { fontSize: 14, fontWeight: "700", color: "#111" },
});
