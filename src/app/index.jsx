import { Link } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Brand */}
        <View style={styles.logo}>
          <ShoppingBag size={30} color="#fff" />
        </View>

        {/* Heading */}
        <Text style={styles.title}>Welcome to StepUp</Text>

        <Text style={styles.subtitle}>
          Find your next favorite pair and shop styles made for every step.
        </Text>

        {/* CTA */}
        <Link href="/login" style={styles.button} replace>
          Get started
        </Link>

        {/* Footer */}
        <Text style={styles.footer}>
          Already have an account?{" "}
          <Link href="/login" style={styles.footerLink}>
            Log in
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.9,
    color: "#111",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6B6B6B",
    textAlign: "center",
    marginTop: 10,
    maxWidth: 320,
  },

  button: {
    marginTop: 32,
    width: "100%",
    backgroundColor: "#111",
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    paddingVertical: 16,
    borderRadius: 10,
    overflow: "hidden",
  },

  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "#6B6B6B",
  },

  footerLink: {
    fontWeight: "700",
    color: "#111",
  },
});
