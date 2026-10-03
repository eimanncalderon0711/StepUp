import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "./Card";

export default function ProductCard({
  id,
  name,
  category,
  price,
  imageUrl,
  details,
  children, // optional slot for actions, badges, quantity controls, etc.
}) {
  return (
    <Card>
      <TouchableOpacity
        opacity={0.2}
        style={{ width: "100%" }}
        onPress={() =>
          router.push({
            pathname: "/products/[id]",
            params: { id: String(id) },
          })
        }
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          <Text style={styles.price}>${price}</Text>
          {details ? (
            <Text style={styles.details} numberOfLines={2}>
              {details}
            </Text>
          ) : null}
        </View>

        {children}
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    marginTop: 8,
    gap: 2,
  },
  category: {
    fontSize: 12,
    color: "gray",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
  },
  details: {
    fontSize: 12,
    color: "gray",
  },
});
