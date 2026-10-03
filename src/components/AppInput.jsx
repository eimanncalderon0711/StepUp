import { Fontisto } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function AppInput({
  placeholder,
  onChangeText,
  value,
  type,
  icon: Icon, // optional left icon (e.g. a lucide icon component)
  right, // optional element on the right (e.g. a show/hide button)
  variant = "outline", // "outline" (original look) | "filled"
  style,
  ...rest // secureTextEntry, autoCapitalize, returnKeyType, onSubmitEditing...
}) {
  const [focused, setFocused] = useState(false);
  const filled = variant === "filled";

  return (
    <View
      style={[
        styles.input,
        filled && styles.filled,
        filled && focused && styles.filledFocused,
        style,
      ]}
    >
      {Icon ? <Icon size={18} color={focused ? "#111" : "#8A8A8A"} /> : null}

      <TextInput
        {...rest}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={filled ? "#9A9A98" : undefined}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[{ flex: 1 }, filled && styles.filledText]}
      />

      {right}

      {type === "search" ? (
        <Fontisto name="search" size={24} color="black" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  // original style, unchanged
  input: {
    borderWidth: 1,
    height: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  // new "filled" variant
  filled: {
    height: 54,
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "transparent",
    backgroundColor: "#F6F6F5",
  },
  filledFocused: { borderColor: "#111", backgroundColor: "#fff" },
  filledText: { fontSize: 16, color: "#111", height: "100%" },
});
