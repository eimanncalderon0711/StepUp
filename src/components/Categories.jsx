import { Text, View } from "react-native";

export default function Categories() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginTop: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          borderRadius: 100,
          padding: 5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>All</Text>
      </View>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          borderRadius: 100,
          padding: 5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Men's</Text>
      </View>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          borderRadius: 100,
          padding: 5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Women's</Text>
      </View>
    </View>
  );
}
