import * as Location from "expo-location";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../../components/AppButton";
import AppInput from "../../../components/AppInput";

export default function settings() {
  const [location, setLocation] = useState(null);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setLocation(location);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

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

        {location && (
          <MapView
            style={{
              width: "100%",
              height: 400,
            }}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
          />
        )}

        <AppButton
          name="Get Current Location"
          color="gray"
          onPress={getCurrentLocation}
        />
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
