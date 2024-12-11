import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "expo-router";
import { theme } from "./../../assets/utils/theme";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "../../Config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Import the library

export default function AddBusiness() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    // User inputs
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [website, setWebsite] = useState("");
    const [about, setAbout] = useState("");
    const [categories, setCategories] = useState("");

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Add New Business",
        });
        getCategoryList();
    }, []);

    // Fetch categories from Firestore
    const getCategoryList = async () => {
        const q = query(collection(db, "Category"));
        const snapshot = await getDocs(q);

        const data = [];
        snapshot.forEach((doc) => {
            const docData = doc.data();
            data.push({
                label: docData.name,
                value: docData.name,
            });
        });
        setCategory(data);
    };

    // Image picker
    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Add new business
    const onAddNewBusiness = async () => {
        setLoading(true);

        if (!image) {
            console.error("No image selected.");
            return;
        }

        const fileName = Date.now().toString();
        const resp = await fetch(image);
        const blob = await resp.blob();

        const imageRef = ref(storage, `business-app/${fileName}`);
        await uploadBytes(imageRef, blob).then(() => {
            getDownloadURL(imageRef).then(async (downloadUrl) => {
                saveBusinessDetail(downloadUrl);
            });
        });
        setLoading(false);
    };

    // Save business data
    const saveBusinessDetail = async (imageUrl) => {
        await setDoc(doc(db, "BusinessList", Date.now().toString()), {
            name: name,
            address: address,
            contact: contact,
            website: website,
            about: about,
            category: categories,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            imageUrl: imageUrl,
        });
        setLoading(false);
        ToastAndroid.show("New business added successfully", ToastAndroid.LONG);
    };

    return (
        <KeyboardAwareScrollView
            style={{
                padding: 20,
            }}
            extraScrollHeight={100} // Add extra space for the keyboard
            enableOnAndroid={true} // Make sure it works on Android
        >
            <Text
                style={{
                    fontFamily: "outfit-bold",
                    fontSize: 26,
                    textAlign: "center",
                }}
            >
                Add New Business
            </Text>
            <Text
                style={{
                    fontFamily: "outfit-regular",
                    fontSize: 18,
                    color: theme.Gray,
                    marginTop: 10,
                    textAlign: "center",
                }}
            >
                Fill all details in order to add new business.
            </Text>

            <TouchableOpacity
                style={{
                    backgroundColor: "#D3D3D3",
                    width: 200,
                    height: 120,
                    marginLeft: "18%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                    marginTop: 20,
                }}
                onPress={onImagePick}
            >
                {!image ? (
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                        }}
                        source={require("./../../assets/images/addpic.png")}
                    />
                ) : (
                    <Image
                        style={{
                            width: 200,
                            height: 120,
                            borderRadius: 8,
                        }}
                        source={{ uri: image }}
                    />
                )}
            </TouchableOpacity>

            <TextInput
                placeholder="Name"
                onChangeText={setName}
                style={{
                    padding: 10,
                    borderWidth: 2,
                    borderRadius: 5,
                    fontFamily: "outfit-regular",
                    fontSize: 16,
                    borderColor: theme.primaryColor,
                    marginTop: 20,
                }}
            />
            <TextInput
                placeholder="Address"
                onChangeText={setAddress}
                style={{
                    padding: 10,
                    borderWidth: 2,
                    borderRadius: 5,
                    fontFamily: "outfit-regular",
                    fontSize: 16,
                    borderColor: theme.primaryColor,
                    marginTop: 20,
                }}
            />
            <TextInput
                placeholder="Contact"
                onChangeText={setContact}
                keyboardType="phone-pad"
                style={{
                    padding: 10,
                    borderWidth: 2,
                    borderRadius: 5,
                    fontFamily: "outfit-regular",
                    fontSize: 16,
                    borderColor: theme.primaryColor,
                    marginTop: 20,
                }}
            />
            <TextInput
                placeholder="Website"
                onChangeText={setWebsite}
                style={{
                    padding: 10,
                    borderWidth: 2,
                    borderRadius: 5,
                    fontFamily: "outfit-regular",
                    fontSize: 16,
                    borderColor: theme.primaryColor,
                    marginTop: 20,
                }}
            />
            <TextInput
                placeholder="About"
                onChangeText={setAbout}
                multiline
                numberOfLines={5}
                style={{
                    padding: 10,
                    borderWidth: 2,
                    borderRadius: 5,
                    fontFamily: "outfit-regular",
                    fontSize: 16,
                    borderColor: theme.primaryColor,
                    marginTop: 20,
                    height: 100,
                }}
            />
            <View
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    fontFamily: "outfit-regular",
                    fontSize: 16,
                    borderColor: theme.primaryColor,
                    marginTop: 20,
                }}
            >
                <RNPickerSelect
                    onValueChange={setCategories}
                    items={category}
                />
            </View>

            <TouchableOpacity
                style={{
                    padding: 15,
                    backgroundColor: theme.primaryColor,
                    borderRadius: 8,
                    marginTop: 20,
                    marginBottom: 40,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onPress={onAddNewBusiness}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <Text
                        style={{
                            fontFamily: "outfit-medium",
                            fontSize: 18,
                            textAlign: "center",
                            color: "#fff",
                        }}
                    >
                        Add Business
                    </Text>
                )}
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
}
