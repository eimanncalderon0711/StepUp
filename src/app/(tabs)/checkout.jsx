import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, MapPin, Minus, Plus } from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import { useProduct } from "../../providers/ProductProvider";

// Placeholder values: replace with real data from your backend / user profile.
const SHIPPING_FEE = 150;
const ADDRESS = {
  name: "Juan Dela Cruz",
  phone: "+63 900 000 0000",
  line: "123 Sample Street, Barangay, City",
};
const PAYMENT_METHODS = [
  { key: "cod", label: "Cash on delivery", hint: "Pay when it arrives" },
  { key: "gcash", label: "GCash", hint: "Pay with your e-wallet" },
  { key: "card", label: "Credit / debit card", hint: "Visa, Mastercard" },
];

const first = (v) => (Array.isArray(v) ? v[0] : v);
const parsePrice = (price) => Number(String(price).replace(/[^0-9.]/g, ""));
const peso = (n) => `₱${n.toLocaleString("en-PH")}`;

export default function Checkout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { products } = useProduct();

  const [qty, setQty] = useState(1);
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState(false);

  const size = first(params.size);

  const product = products.find(
    (p) => p.id.toString() === String(first(params.id)),
  );

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.centerTitle}>Product not found</Text>
        <Pressable style={styles.primaryBtn} onPress={() => router.back()}>
          <Text style={styles.primaryBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const subtotal = parsePrice(product.price) * qty;
  const total = subtotal + SHIPPING_FEE;

  if (placed) {
    return (
      <View style={styles.center}>
        <View style={styles.successIcon}>
          <Check size={36} color="#fff" />
        </View>
        <Text style={styles.centerTitle}>Order placed</Text>
        <Text style={styles.centerText}>
          Thanks for your purchase. We'll let you know when your {product.name}{" "}
          is on its way.
        </Text>
        <Pressable
          style={[styles.primaryBtn, { alignSelf: "stretch" }]}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.primaryBtnText}>Continue shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerWrap}>
        <Header>
          <Header.Left>
            <Header.Back />
          </Header.Left>
          <Header.Title>Checkout</Header.Title>
        </Header>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120 + insets.bottom,
        }}
      >
        {/* Delivery address */}
        <Text style={styles.sectionTitle}>Deliver to</Text>
        <View style={styles.card}>
          <View style={styles.addressIcon}>
            <MapPin size={18} color="#111" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.addressName}>{ADDRESS.name}</Text>
            <Text style={styles.muted}>{ADDRESS.phone}</Text>
            <Text style={styles.muted}>{ADDRESS.line}</Text>
          </View>
          <Pressable hitSlop={8}>
            <Text style={styles.link}>Change</Text>
          </Pressable>
        </View>

        {/* Order */}
        <Text style={styles.sectionTitle}>Your order</Text>
        <View style={styles.card}>
          <View style={styles.thumb}>
            {product.imageUrl && (
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.thumbImage}
                resizeMode="contain"
              />
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.itemName} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.muted}>
              {size ? `US ${size}` : product.category}
            </Text>

            <View style={styles.itemFooter}>
              <View style={styles.stepper}>
                <Pressable
                  style={styles.stepBtn}
                  disabled={qty === 1}
                  onPress={() => setQty((q) => q - 1)}
                  accessibilityLabel="Decrease quantity"
                >
                  <Minus size={16} color={qty === 1 ? "#BBB" : "#111"} />
                </Pressable>
                <Text style={styles.qty}>{qty}</Text>
                <Pressable
                  style={styles.stepBtn}
                  onPress={() => setQty((q) => q + 1)}
                  accessibilityLabel="Increase quantity"
                >
                  <Plus size={16} color="#111" />
                </Pressable>
              </View>
              <Text style={styles.itemPrice}>{peso(subtotal)}</Text>
            </View>
          </View>
        </View>

        {/* Payment */}
        <Text style={styles.sectionTitle}>Payment method</Text>
        <View style={styles.cardColumn}>
          {PAYMENT_METHODS.map((m, i) => {
            const selected = payment === m.key;
            return (
              <Pressable
                key={m.key}
                onPress={() => setPayment(m.key)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                style={[styles.payRow, i > 0 && styles.rowBorder]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.payLabel}>{m.label}</Text>
                  <Text style={styles.muted}>{m.hint}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioOn]}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Summary */}
        <Text style={styles.sectionTitle}>Order summary</Text>
        <View style={styles.cardColumn}>
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>
              Subtotal ({qty} {qty === 1 ? "item" : "items"})
            </Text>
            <Text style={styles.sumValue}>{peso(subtotal)}</Text>
          </View>
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Shipping</Text>
            <Text style={styles.sumValue}>{peso(SHIPPING_FEE)}</Text>
          </View>
          <View style={[styles.sumRow, styles.rowBorder]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{peso(total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Single action bar: the total lives in the button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryBtn,
            // { alignSelf: "stretch" },
            pressed && { opacity: 0.85 },
          ]}
          onPress={() => setPlaced(true)}
          accessibilityRole="button"
        >
          <Text style={styles.primaryBtnText}>Place order · {peso(total)}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerWrap: { paddingHorizontal: 20, paddingBottom: 4 },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    marginTop: 24,
    marginBottom: 12,
  },
  muted: { fontSize: 14, color: "#6B6B6B", marginTop: 2 },
  link: { fontSize: 14, fontWeight: "600", color: "#111" },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F6F6F5",
  },
  cardColumn: {
    borderRadius: 16,
    backgroundColor: "#F6F6F5",
    paddingHorizontal: 14,
  },
  rowBorder: { borderTopWidth: 1, borderTopColor: "#E6E6E4" },

  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addressName: { fontSize: 15, fontWeight: "700", color: "#111" },

  thumb: {
    width: 88,
    height: 88,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbImage: { width: 80, height: 80 },
  itemName: { fontSize: 15, fontWeight: "700", color: "#111" },
  itemFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemPrice: { fontSize: 16, fontWeight: "800", color: "#111" },

  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
  },
  stepBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  qty: {
    minWidth: 22,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },

  payRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  payLabel: { fontSize: 15, fontWeight: "600", color: "#111" },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#C9C9C7",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOn: { borderColor: "#111" },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111",
  },

  sumRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  sumLabel: { fontSize: 15, color: "#6B6B6B" },
  sumValue: { fontSize: 15, fontWeight: "600", color: "#111" },
  totalLabel: { fontSize: 17, fontWeight: "800", color: "#111" },
  totalValue: { fontSize: 17, fontWeight: "800", color: "#111" },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  primaryBtn: {
    height: 54,
    borderRadius: 27,
    paddingHorizontal: 28,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  centerTitle: { fontSize: 22, fontWeight: "800", color: "#111" },
  centerText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6B6B6B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 28,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
