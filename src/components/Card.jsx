import { StyleSheet, View } from "react-native";

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    elevation: 10,
  },
});
