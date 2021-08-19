import { Screen, Tapbar } from "components";
import GenerateMocks from "mocks";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import GlobalStyle from "styles";
import { IconTypes, Mocks, ScreenNames } from "enums";
import { TapModel } from "models";
import { MovementsScreen, SettingsScreen, NotificationsScreen } from "./tab-screens";

const HomeScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const _taps = GenerateMocks<TapModel>(Mocks.TAP, 3);

  let colorScheme = useColorScheme();
  const styles = GlobalStyle(colorScheme, Platform.OS);

  const [screenName, setScreenName] = useState<ScreenNames>(
    ScreenNames.MOVEMENTS
  );

  return (
    <Screen>
      <View style={styles.container}>
        {screenName === ScreenNames.MOVEMENTS && <MovementsScreen />}
        {screenName === ScreenNames.SETTINGS && <SettingsScreen />}
        {screenName === ScreenNames.NOTIFICATIONS && <NotificationsScreen />}
      </View>
      <Tapbar
        taps={_taps}
        iconsType={IconTypes.IONICON}
        onChangeScreen={(screen) => setScreenName(screen)}
        initialActiveScren={ScreenNames.MOVEMENTS}
      />
    </Screen>
  );
};

export default HomeScreen;
