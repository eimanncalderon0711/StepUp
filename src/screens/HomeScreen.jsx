import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { Bell, Menu, Search } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppInput from "../components/AppInput";
import Categories from "../components/Categories";
import ProductActions from "../components/ProductActions";
import ProductCard from "../components/ProductCard";

import { Header } from "../components/Header";
import { useProduct } from "../providers/ProductProvider";

const PADDING = 20;
const GAP = 12;

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const { products } = useProduct(); // TODO: implement products context and fetch products from API

  const { width } = useWindowDimensions();
  const cardWidth = (width - PADDING * 2 - GAP) / 2;

  const [cart, setCart] = useState([]); // [{ id, qty }]

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { id: product.id, qty: 1 }];
    });
  };

  const handleBuyNow = (product) => {
    router.push({
      pathname: "/products/[id]",
      params: { id: String(product.id) },
    });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View>
            <Text>No products available.</Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Header dark>
              <Header.Left>
                <Header.Button
                  icon={Menu}
                  label="Open menu"
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                />
              </Header.Left>

              <Header.Title style={{ fontSize: 25, fontWeight: "600" }}>
                ShopeeBai
              </Header.Title>

              <Header.Right>
                <Header.Button
                  icon={Bell}
                  label="Notifications"
                  badge={cartCount}
                />
              </Header.Right>
            </Header>

            <Categories />

            <View style={styles.searchRow}>
              <View style={{ flex: 1 }}>
                <AppInput placeholder="Search products..." />
              </View>
              <View style={styles.iconWrapper}>
                <Search color="white" />
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ width: cardWidth }}>
            <ProductCard
              id={item.id}
              name={item.name}
              price={item.price}
              category={item.category}
              imageUrl={item.imageUrl}
              details={item.details}
            >
              <ProductActions
                onAddToCart={() => handleAddToCart(item)}
                onBuyNow={() => handleBuyNow(item)}
              />
            </ProductCard>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingHorizontal: PADDING,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    gap: GAP,
  },
  header: {
    marginBottom: 20,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  textMedium: {
    fontSize: 25,
  },
  fontMedium: {
    fontWeight: "600",
  },
  iconWrapper: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 100,
  },
  bellWrapper: {
    paddingTop: 6,
    paddingRight: 6, // empty space so the badge isn't clipped
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: "white", // use your screen background color; makes the badge look cut out
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 9,
    fontWeight: "700",
    lineHeight: 11,
    textAlign: "center",
    includeFontPadding: false,
  },
});
