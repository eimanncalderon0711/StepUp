import { StyleSheet, View } from "react-native";

export default function Card({ children, style }) {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    width: "100%",
  },
});
