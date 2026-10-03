import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AppButton({
  children,
  name,
  color,
  style,
  onPress,
  size = "sm", // "sm" (original look) | "lg" (full-height pill)
  disabled = false,
}) {
  const large = size === "lg";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[
        styles.opacityBtn,
        large && styles.large,
        color && { backgroundColor: color },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.opacityBtnText, large && styles.largeText]}>
        {name}
      </Text>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // original styles, unchanged
  opacityBtn: {
    backgroundColor: "red",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  opacityBtnText: {
    textAlign: "center",
    color: "white",
  },
  pressableBtn: {
    backgroundColor: "lightblue",
    padding: 10,
  },

  // new "lg" size
  large: {
    height: 54,
    borderRadius: 27,
    padding: 0,
    alignItems: "center",
  },
  largeText: { fontSize: 16, fontWeight: "700" },
  disabled: { opacity: 0.4 },
});
