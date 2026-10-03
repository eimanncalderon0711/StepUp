import { Fontisto } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function AppInput({ placeholder, onChangeText, value, type }) {
  return (
    <View style={styles.input}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={{ flex: 1 }}
      />
      {type && type === "search" ? (
        <Fontisto name="search" size={24} color="black" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
});
