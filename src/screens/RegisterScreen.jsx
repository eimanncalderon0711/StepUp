import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import Card from "@/components/Card";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.formHeaderTitle}>Registration</Text>
        <View style={styles.formInputContainer}>
          <AppInput placeholder={"Username"} />
          <AppInput placeholder={"Password"} />
          <AppInput placeholder={"Confirm Password"} />
        </View>
        <Link href="/login">Already have an account?</Link>
        <View style={{ marginTop: 10 }}>
          <AppButton name={"Register"} color="blue" />
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
