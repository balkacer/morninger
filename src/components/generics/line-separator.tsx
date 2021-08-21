import { Colors } from "enums";
import React from "react";
import { View } from "react-native";

export default function LineSeparator(props: {color: Colors, width?: string | number | undefined}) {
    const { color, width } = props;
    return(
        <View
        style={{
          backgroundColor: color,
          height: 1,
          width: width,
        }}
      ></View>
    )
}