import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../../components/AppButton";
import AppInput from "../../../components/AppInput";

export default function settings() {
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the camera is required.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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

      {/* Profile Image */}
      <View
        style={{ alignItems: "center", marginTop: 20, position: "relative" }}
      >
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ height: "100%", width: "100%", borderRadius: 100 }}
            />
          ) : (
            <View
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 100,
                backgroundColor: "gray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>
                <Entypo name="user" size={35} color="black" />
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={takePhoto}
            style={{ position: "absolute", right: 0, bottom: 0, zIndex: 10 }}
          >
            <Entypo name="camera" size={30} color="brown" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            borderRadius: 100,
            paddingHorizontal: 10,
          }}
        >
          <AntDesign name="upload" size={24} color="white" />
          <AppButton
            onPress={pickImage}
            name="Select image"
            color={"black"}
            style={{
              backgroundColor: "transparent",
              borderRadius: 10,
              padding: 10,
            }}
          />
        </View>
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
