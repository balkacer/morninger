import { Colors } from "enums";
import React from "react";
import { Text } from "react-native";

enum TitleSizes {
    s = 16,
    m = 24,
    l = 36
}

export default function Title(props: {color: Colors, size?: 's' | 'm' | 'l', text: string}){
    const { color, size, text } = props;

    return(
        <Text style={{color: color, fontSize: size ? TitleSizes[size] : TitleSizes.m}}>{text}</Text>
    )
}