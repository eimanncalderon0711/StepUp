import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useSegments } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartProvider from "../../providers/CartProvider";
import ProductProvider from "../../providers/ProductProvider";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();

  const hiddenTabRoutes = ["settings", "cart", "checkout", "[id]"];
  const hideTabBar = hiddenTabRoutes.some((route) => segments.includes(route));

  return (
    <ProductProvider>
      <CartProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
            tabBarShowLabel: true,
            tabBarHideOnKeyboard: true,

            tabBarStyle: hideTabBar
              ? { display: "none" }
              : {
                  position: "absolute",
                  bottom: insets.bottom + 10,
                  marginHorizontal: 20,
                  height: 65,
                  borderRadius: 35,
                  backgroundColor: "white",
                  borderTopWidth: 0,
                  elevation: 5,
                  shadowOpacity: 0.15,
                },

            tabBarItemStyle: {
              marginTop: 4,
              justifyContent: "center",
              alignItems: "center",
            },

            tabBarLabelStyle: {
              marginTop: 4,
              marginBottom: 0,
              padding: 0,
            },
          }}
        >
          <Tabs.Screen
            name="(drawer)"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "home-sharp" : "home-outline"}
                  color={focused ? "black" : color}
                  size={24}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="favorites"
            options={{
              title: "Favorites",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "heart" : "heart-outline"}
                  color={focused ? "black" : color}
                  size={24}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="cart"
            options={{
              title: "Cart",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "cart" : "cart-outline"}
                  color={focused ? "black" : color}
                  size={24}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="products/[id]/index"
            options={{
              href: null,
            }}
          />

          <Tabs.Screen
            name="checkout"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </CartProvider>
    </ProductProvider>
  );
}
