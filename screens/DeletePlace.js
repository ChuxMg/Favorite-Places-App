import { StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useState } from "react";
import { deletePlace } from "../util/database";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function DeletePlace({ route, navigation }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedPlaceId = route.params.placeId;

  function deletePlaceHandler() {
    setIsDeleting(true);
    deletePlace(selectedPlaceId);
    setIsDeleting(false);

    navigation.navigate("AllPlaces");
  }

  if (isDeleting) {
    return <LoadingOverlay />;
  }

  function onCancelDeleteHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Are you sure you want to delete?</Text>
      </View>
      <View style={styles.buttonActions}>
        <View style={styles.button}>
          <OutlinedButton
            icon="return-up-back"
            color={Colors.primary100}
            onPress={onCancelDeleteHandler}
          >
            Cancel Action
          </OutlinedButton>
        </View>
        <View style={styles.button}>
          <OutlinedButton
            icon="trash"
            color={Colors.error}
            mode="delete"
            onPress={deletePlaceHandler}
          >
            Confirm Delete
          </OutlinedButton>
        </View>
      </View>
    </View>
  );
}

export default DeletePlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 16,
  },
  button: {
    paddingHorizontal: 20,
  },
  textContainer: {
    padding: 40,
  },
  text: {
    color: Colors.primary200,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
