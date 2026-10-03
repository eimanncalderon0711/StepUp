import { useLocalSearchParams, useRouter } from "expo-router";
import { Heart, ShoppingBag } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "../../../../components/Header";
import { useProduct } from "../../../../providers/ProductProvider";

const SIZES = [
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
];
// Placeholder stock data: replace with real availability from your backend.
const SOLD_OUT = ["7.5", "11.5"];

// Handles both "₱7,295" (string) and 7295 (number)
const formatPrice = (price) =>
  typeof price === "string" && price.includes("₱")
    ? price
    : `₱${Number(price).toLocaleString("en-PH")}`;

export default function ProductDetail() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { products } = useProduct();

  const [size, setSize] = useState(null);
  const [liked, setLiked] = useState(false);

  const product = products.find(
    (item) => item.id.toString() === String(Array.isArray(id) ? id[0] : id),
  );

  if (!product) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top }]}>
        <Text style={styles.notFoundText}>Product not found</Text>
        <Pressable style={styles.primaryBtn} onPress={() => router.back()}>
          <Text style={styles.primaryBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 + insets.bottom }}
      >
        {/* Hero */}
        <View style={[styles.hero, { paddingTop: insets.top + 56 }]}>
          {product.imageUrl ? (
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.noImage}>No image</Text>
          )}
        </View>

        {/* Name + price */}
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={styles.titleCol}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.category}>{product.category}</Text>
            </View>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>

          {/* Size */}
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Select size</Text>
            <Text style={styles.sectionHint}>US men's</Text>
          </View>
          <View style={styles.sizeGrid}>
            {SIZES.map((s) => {
              const soldOut = SOLD_OUT.includes(s);
              const selected = size === s;
              return (
                <Pressable
                  key={s}
                  disabled={soldOut}
                  onPress={() => setSize(s)}
                  accessibilityRole="button"
                  accessibilityState={{ selected, disabled: soldOut }}
                  style={[
                    styles.sizeChip,
                    selected && styles.sizeChipSelected,
                    soldOut && styles.sizeChipDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selected && styles.sizeTextSelected,
                      soldOut && styles.sizeTextDisabled,
                    ]}
                  >
                    {s}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Details */}
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.paragraph}>
            {product.details ||
              `${product.name} from the ${product.category} collection. Pick your size and add it to your bag when you're ready.`}
          </Text>

          <View style={styles.specs}>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Category</Text>
              <Text style={styles.specValue}>{product.category}</Text>
            </View>
            <View style={[styles.specRow, styles.specRowBorder]}>
              <Text style={styles.specLabel}>Price</Text>
              <Text style={styles.specValue}>{formatPrice(product.price)}</Text>
            </View>
            <View style={[styles.specRow, styles.specRowBorder]}>
              <Text style={styles.specLabel}>Size</Text>
              <Text style={styles.specValue}>
                {size ? `US ${size}` : "Not selected"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating header buttons */}
      <Header floating>
        <Header.Left>
          <Header.Back />
        </Header.Left>

        <Header.Right>
          <Header.Button
            icon={Heart}
            label={liked ? "Remove from favorites" : "Add to favorites"}
            onPress={() => setLiked((v) => !v)}
            iconProps={
              liked ? { color: "#E5322D", fill: "#E5322D" } : undefined
            }
          />
        </Header.Right>
      </Header>

      {/* Bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          disabled={!size}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.addBtn,
            !size && styles.btnDisabled,
            pressed && styles.pressed,
          ]}
        >
          <ShoppingBag size={18} color="#111" />
          <Text style={styles.addBtnText}>Add to bag</Text>
        </Pressable>

        <Pressable
          disabled={!size}
          accessibilityRole="button"
          onPress={() =>
            router.push({
              pathname: "/checkout",
              params: { id: String(id), size },
            })
          }
          style={({ pressed }) => [
            styles.buyBtn,
            !size && styles.btnDisabled,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buyBtnText}>Buy now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  hero: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 32,
  },
  heroImage: {
    width: "92%",
    height: 300,
  },
  noImage: { height: 300, textAlignVertical: "center", color: "#888" },

  floatingHeader: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  body: { paddingHorizontal: 20, paddingTop: 24 },
  titleRow: { flexDirection: "row", alignItems: "flex-start", gap: 16 },
  titleCol: { flex: 1 },
  name: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.8,
    lineHeight: 32,
    color: "#111",
  },
  category: { fontSize: 15, color: "#6B6B6B", marginTop: 6 },
  price: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
    letterSpacing: -0.4,
    marginTop: 2,
  },

  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 32,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#111" },
  sectionHint: { fontSize: 13, color: "#8A8A8A" },

  sizeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sizeChip: {
    width: "23.5%",
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#DADADA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  sizeChipSelected: { backgroundColor: "#111", borderColor: "#111" },
  sizeChipDisabled: { backgroundColor: "#F5F5F5", borderColor: "#EEE" },
  sizeText: { fontSize: 15, fontWeight: "600", color: "#111" },
  sizeTextSelected: { color: "#fff" },
  sizeTextDisabled: { color: "#BBB", textDecorationLine: "line-through" },

  divider: { height: 1, backgroundColor: "#EEE", marginVertical: 24 },
  paragraph: {
    fontSize: 15,
    lineHeight: 23,
    color: "#555",
    marginTop: 10,
  },

  specs: { marginTop: 20 },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  specRowBorder: { borderTopWidth: 1, borderTopColor: "#F0F0F0" },
  specLabel: { fontSize: 15, color: "#8A8A8A" },
  specValue: { fontSize: 15, fontWeight: "600", color: "#111" },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  addBtn: {
    flex: 1,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addBtnText: { fontSize: 16, fontWeight: "700", color: "#111" },
  buyBtn: {
    flex: 1,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  buyBtnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
  btnDisabled: { opacity: 0.35 },
  pressed: { opacity: 0.85 },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  notFoundText: { fontSize: 18, fontWeight: "600", marginBottom: 20 },
});
