import { IconTypes, ScreenNames } from "enums";
import { TapModel } from "models";
import React, { useState } from "react";
import { FC } from "react";
import { Platform, View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import GlobalStyle from "styles";
import Tap from "./tap";

interface TapbarProps {
  iconsType?: string;
  taps: TapModel[];
  initialActiveScren: string;
  onChangeScreen: (screen: ScreenNames) => void;
}

const Tapbar: FC<TapbarProps> = (props) => {
  let colorScheme = useColorScheme();
  const styles = GlobalStyle(colorScheme, Platform.OS);

  const { iconsType, taps, initialActiveScren, onChangeScreen } = props;
  const [activeScreen, setActiveScreen] = useState<string>(initialActiveScren);

  const renderTaps = (): JSX.Element[] => {
    const renderTaps: JSX.Element[] = [];
    taps.forEach(tap => {
      tap.isActive = tap.screen === activeScreen;
      renderTaps.push(
        <Tap
          key={tap.screen}
          tap={tap}
          iconType={iconsType || IconTypes.IONICON}
          onTap={(screen) => {
            setActiveScreen(screen);
            onChangeScreen(screen);
          }}
        />
      );
    });
    return renderTaps;
  };

  return <View style={styles.tapbar}>{renderTaps()}</View>;
};

export default Tapbar;
