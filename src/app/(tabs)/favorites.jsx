import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import { useFavorite } from "../../providers/FavoriteProvider";

export default function Favorites() {
  const { favorites } = useFavorite();

  return (
    <SafeAreaView>
      <Header>
        <Header.Title style={{ fontSize: 25 }}>Favorites</Header.Title>
      </Header>
    </SafeAreaView>
  );
}
