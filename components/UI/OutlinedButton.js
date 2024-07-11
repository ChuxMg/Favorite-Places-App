import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

function OutlinedButton({ onPress, icon, color, mode, children }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        mode === "delete" && styles.deleteModeBorder,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Ionicons style={styles.icon} name={icon} size={18} color={color} />
      <Text style={[styles.text, mode === "delete" && styles.deleteModeText]}>
        {children}
      </Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary100,
  },
  deleteModeBorder: {
    borderColor: Colors.error,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary100,
  },
  deleteModeText: {
    color: Colors.error,
  },
});
