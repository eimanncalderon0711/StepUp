import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

export default function Otp() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count < 0) {
      return setCount(0);
    }
    const timer = setInterval(() => setCount(count - 1), 1000);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account Verification</Text>
      <View style={styles.otpWrapper}>
        <AppInput
          variant="filled"
          keyBoardType="number-pad"
          maxLength={1}
          textAlign="center"
          style={styles.otpInputWidth}
        />
        <AppInput
          variant="filled"
          keyBoarType="number-pad"
          maxLength={1}
          textAlign="center"
          style={styles.otpInputWidth}
        />
        <AppInput
          variant="filled"
          keyBoarType="number-pad"
          maxLength={1}
          textAlign="center"
          style={styles.otpInputWidth}
        />
        <AppInput
          variant="filled"
          keyBoarType="number-pad"
          maxLength={1}
          textAlign="center"
          style={styles.otpInputWidth}
        />
      </View>
      <View style={styles.submitBtn}>
        <AppButton
          name={"Submit"}
          color={"black"}
          style={{ width: 200 }}
          size="lg"
        />
      </View>

      <View style={{ gap: 20 }}>
        <Text>You have {count} seconds to resend code</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  otpWrapper: {
    marginTop: 20,
    gap: 10,
    flexDirection: "row",
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
  },

  otpInputWidth: {
    width: 50,
    borderWidth: 1,
    borderColor: "black",
  },

  submitBtn: {
    marginTop: 20,
  },
});
