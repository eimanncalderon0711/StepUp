import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Cart</Text>
    </SafeAreaView>
  );
}
