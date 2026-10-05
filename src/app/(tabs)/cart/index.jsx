import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../../components/AppButton";
import { useCart } from "../../../providers/CartProvider";

export default function Cart() {
  const { items, count, cartTotal, clearCart, addItem } = useCart();

  return (
    <SafeAreaView
      style={{
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
        style={{ marginTop: 20 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 10,
              borderRadius: 10,
              padding: 5,
              backgroundColor: "white",
              elevation: 2,
              gap: 20,
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
            </View>

            <View style={{ gap: 5, alignItems: "center" }}>
              <Pressable
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 25,
                  width: 25,
                  backgroundColor: "black",
                  borderRadius: 100,
                }}
                onPress={() => addItem(item, item.size, 2)}
              >
                <Text style={{ color: "white" }}>+</Text>
              </Pressable>
              <Text>{item.qty}</Text>
              <Pressable
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 25,
                  width: 25,
                  backgroundColor: "black",
                  borderRadius: 100,
                }}
                onPress={() => addItem(item, item.size, -1)}
              >
                <Text style={{ color: "white" }}>-</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <View>
        <Text>Total: ${cartTotal}</Text>
      </View>
    </SafeAreaView>
  );
}
