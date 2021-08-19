import { ScreenNames } from "enums";
import { TapModel } from "models";
import React, { FC } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { Icon } from "react-native-elements";
import GlobalStyle from "styles";
import Theme from "theme";

interface TapProps {
  iconType: string;
  tap: TapModel;
  onTap: (screen: ScreenNames) => void
}

const Tap: FC<TapProps> = (props) => {
  let colorScheme = useColorScheme();
  const styles = GlobalStyle(colorScheme, Platform.OS);
  const theme = Theme(colorScheme);
  const { iconType, tap, onTap } = props;
  const { isActive, screen, icon } = tap;

  return (
    <TouchableOpacity style={styles.tap} onPress={() => onTap(screen)}>
      <Icon
        type={iconType}
        name={icon}
        color={isActive ? theme.colors.text : theme.colors.placeholder}
      />
    </TouchableOpacity>
  );
};

export default Tap;
