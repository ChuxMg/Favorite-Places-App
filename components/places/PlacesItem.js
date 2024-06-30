import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function PlacesItem({place, onSelect}) {
    return (
      <Pressable onPress={onSelect}>
        <Image source={{uri: place.imageUri}} />
        <View>
          <Text>{place.title}</Text>
          <Text>{place.address}</Text>
        </View>
      </Pressable>
    );
}

export default PlacesItem;

const styles = StyleSheet.create({
    
});