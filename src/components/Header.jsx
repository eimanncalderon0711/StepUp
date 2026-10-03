import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { createContext, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HeaderContext = createContext({ dark: false });

function Root({ children, dark = false, floating = false }) {
  const insets = useSafeAreaInsets();

  return (
    <HeaderContext.Provider value={{ dark }}>
      <View
        style={[
          styles.root,
          floating && [styles.floating, { top: insets.top + 8 }],
        ]}
      >
        {children}
      </View>
    </HeaderContext.Provider>
  );
}

function Left({ children }) {
  return <View style={styles.left}>{children}</View>;
}

function Right({ children }) {
  return <View style={styles.right}>{children}</View>;
}

function Title({ children, style }) {
  return (
    <Text style={[styles.title, style]} numberOfLines={1} pointerEvents="none">
      {children}
    </Text>
  );
}

function Button({ icon: Icon, label, onPress, badge = 0, iconProps }) {
  const { dark } = useContext(HeaderContext);

  return (
    <View>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => [
          styles.button,
          dark ? styles.buttonDark : styles.buttonLight,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Icon size={20} color={dark ? "#fff" : "#111"} {...iconProps} />
      </Pressable>

      {badge > 0 && (
        <View style={styles.badge} pointerEvents="none">
          <Text style={styles.badgeText}>{badge > 9 ? "9+" : badge}</Text>
        </View>
      )}
    </View>
  );
}

function Back({ onPress }) {
  const router = useRouter();

  return (
    <Button
      icon={ArrowLeft}
      label="Go back"
      onPress={onPress ?? (() => router.back())}
    />
  );
}

export const Header = Object.assign(Root, {
  Left,
  Right,
  Title,
  Button,
  Back,
});

const styles = StyleSheet.create({
  root: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  floating: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 10,
  },
  left: { zIndex: 1 },
  right: { marginLeft: "auto", zIndex: 1 },

  // centered on the screen no matter which sides are present
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 56,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },

  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLight: { backgroundColor: "#fff", elevation: 3 },
  buttonDark: { backgroundColor: "#111" },

  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
});