import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../../components/AppButton";
import AppInput from "../../../components/AppInput";
import MapView from "react-native-maps";

export default function settings() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Settings</Text>
      </View>

      {/* Settings content goes here */}
      <View style={{ marginTop: 50, gap: 10 }}>
        <AppInput placeholder="Full Name" />
        <AppInput placeholder="Email" />
        <AppInput placeholder="Address" />

        <MapView
          style={{
            width: "100%",
            height: 300,
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />

        <AppButton name="Get Current Location" color="gray" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
