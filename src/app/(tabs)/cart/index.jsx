import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../../components/AppButton";
import { useCart } from "../../../providers/CartProvider";

export default function Cart() {
  const { items, count, cartTotal, clearCart } = useCart();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 30, marginBottom: 50 }}>
        My Cart
      </Text>
      <AppButton name="Clear Cart" onPress={clearCart} />

      <FlatList
        data={items}
        style={{marginTop: 20}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              elevation: 10,
              gap: 10,
              marginTop: 10,
            }}
          >
            <View style={{ height: 100, width: 100 }}>
              <Image
                style={{ height: "100%", width: "100%" }}
                source={{ uri: item.imageUrl }}
              />
            </View>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text>Quantity: {item.qty}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
