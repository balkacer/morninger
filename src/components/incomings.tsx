import { IconTypes } from "enums";
import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { Icon } from "react-native-elements";
import Theme from "theme";

export default function Incoming(props: {
  isInput: boolean;
  title: string;
  value: string;
}) {
    const { isInput, title, value } = props
  let colorScheme = useColorScheme();
  const theme = Theme(colorScheme);
  return (
    <View style={{flexDirection: isInput ? "row" : "row-reverse", width: "50%", alignItems: 'center', justifyContent: 'center' }}>
      <Icon
        name={isInput ? "arrow-up" : "arrow-down"}
        type={IconTypes.IONICON}
        color={theme.colors.iconsText}
        style={{
          backgroundColor: isInput ? theme.colors.movementInput : theme.colors.movementOutput,
          borderRadius: 10,
          width: 35,
          height: 35,
          justifyContent: "center",
          margin: 5
        }}
      />
      <View style={{flexDirection: "column", margin: 5, justifyContent: 'space-between', height: 35}}>
        <Text style={{ fontSize: 14, color: theme.colors.secondaryText }}>
         {title}
        </Text>
        <Text style={{ fontSize: 18, color: theme.colors.text, fontWeight: "bold" }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
