import GlobalStyle from "styles";
import React from "react";
import { Platform, StyleProp, TextStyle, View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { FC } from "react";

interface CardProps {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<TextStyle>
}

const Card: FC<CardProps> = (props) => {
  const { children, style } = props;
  let colorScheme = useColorScheme();
  const styles = GlobalStyle(colorScheme, Platform.OS);
  return <View style={[styles.card, style || {}]}>{children}</View>;
};

export default Card;