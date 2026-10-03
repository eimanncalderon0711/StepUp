import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { Link, router } from "expo-router";
import { Eye, EyeOff, Lock, ShoppingBag, User } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin() {
    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setError("");
    setUsername("");
    setPassword("");
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Log in to continue shopping at ShopeeBai.
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
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              right={
                <Pressable
                  hitSlop={10}
                  onPress={() => setShowPassword((v) => !v)}
                  accessibilityLabel={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#8A8A8A" />
                  ) : (
                    <Eye size={18} color="#8A8A8A" />
                  )}
                </Pressable>
              }
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <AppButton
            name="Login"
            color="#111"
            size="lg"
            style={styles.button}
            onPress={handleLogin}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account yet? </Text>
            <Link href="/register" style={styles.footerLink}>
              Register
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
