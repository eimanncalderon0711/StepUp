import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AppButton({ children, name, color, style, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.opacityBtn, backgroundColor: color, ...style }}
    >
      <Text style={styles.opacityBtnText}>{name}</Text>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  opacityBtn: {
    backgroundColor: "red",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    // flex: 1,
  },
  opacityBtnText: {
    textAlign: "center",
    color: "white",
  },
  pressableBtn: {
    backgroundColor: "lightblue",
    padding: 10,
  },
});
