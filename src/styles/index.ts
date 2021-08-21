import { StyleSheet } from "react-native";
import { ColorSchemeName } from "react-native-appearance";

import Theme from "theme";

const GlobalStyle = (schema: ColorSchemeName = "dark", platform = "android") => {
    const theme = Theme(schema);

    return StyleSheet.create({
        screen: {
            backgroundColor: theme.colors.background,
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
            margin: 0
        },
        container: {
            backgroundColor: theme.colors.background,
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
            margin: 0,
            width: "100%"
        },
        toolbar: {
            width: "100%",
            height: 200,
            paddingHorizontal: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
        },
        toolbarRow: {
            width: "100%",
            height: 100,
            paddingBottom: 20,
            paddingHorizontal: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            backgroundColor: 'transparent'
        },
        toolbarTitle: {
            color: theme.colors.title,
            fontSize: 36,
            fontWeight: "bold",
            marginLeft: 2,
        },
        textInput: {
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: theme.colors.card,
            borderRadius: 10,
            fontSize: 16,
            color: theme.colors.text
        },
        card: {
            backgroundColor: theme.colors.card,
            padding: 10,
            borderRadius: 10,
            width: "100%"
        },
        cardTitle: {
            color: theme.colors.title,
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 4,
        },
        tapbar: {
            height: 64,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
        }
    })
};

export default GlobalStyle;
