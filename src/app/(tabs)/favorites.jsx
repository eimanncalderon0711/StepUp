import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";

export default function Favorites() {
  return (
    <SafeAreaView>
      <Header>
        <Header.Title style={{ fontSize: 25 }}>Favorites</Header.Title>
      </Header>
    </SafeAreaView>
  );
}
