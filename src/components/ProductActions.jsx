import { CreditCard, ShoppingCart } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProductActions({ onAddToCart, onBuyNow }) {
  return (
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.cartButton}
        activeOpacity={0.7}
        onPress={onAddToCart}
        accessibilityLabel="Add to cart"
      >
        <ShoppingCart size={18} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buyButton}
        activeOpacity={0.7}
        onPress={onBuyNow}
        accessibilityLabel="Buy now"
      >
        <CreditCard size={16} color="white" />
        <Text style={styles.buyText}>Buy now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  buyButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  buyText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
});