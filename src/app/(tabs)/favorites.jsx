import { FontAwesome } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import { Header } from "../../components/Header";
import { useFavorite } from "../../providers/FavoriteProvider";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorite();

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Header.Title style={{ fontSize: 25 }}>Favorites</Header.Title>
      </Header>
      <View>
        <FlatList
          ListEmptyComponent={<Text>No favorites yet.</Text>}
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          // ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.btnContainer}>
              <Card style={styles.cardWrapper}>
                <View style={styles.productImage}>
                  <Image
                    source={{
                      uri: item.imageUrl,
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </View>
                <View style={styles.productContentWrapper}>
                  <View>
                    <Text>{item.name}</Text>
                    <Text>{item.category}</Text>
                    <Text>{item.price}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeFavorite(item)}>
                    <FontAwesome name="heart" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },

  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  btnContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    // Android shadow
    elevation: 6,
  },

  productContentWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  productImage: {
    height: 100,
    width: 100,
    backgroundColor: "gray",
  },
});
