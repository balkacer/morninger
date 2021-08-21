import { Colors } from "enums";
import { ColorSchemeName } from "react-native-appearance";

function Theme(scheme: ColorSchemeName) {
    return {
        colors: {
            primary: Colors[scheme == "dark" ? "PRIMARY_DARK" : "PRIMARY_LIGHT"],
            inputs: Colors[scheme == "dark" ? "PRIMARY_DARK" : "PRIMARY_LIGHT"],
            background: Colors[scheme == "dark" ? "BG_DARK" : "BG_LIGHT"],
            modalBackground: Colors[scheme == "dark" ? "BG_DARK" : "BG_LIGHT"],
            card: Colors[scheme == "dark" ? "CARD_BG_DARK" : "CARD_BG_LIGHT"],
            title: Colors[scheme == "dark" ? "BG_LIGHT" : "BG_DARK"],
            placeholder: Colors[scheme == "dark" ? "PLACEHOLDER_DARK" : "PLACEHOLDER_LIGTH"],
            text: Colors[scheme == "dark" ? "BG_LIGHT" : "BG_DARK"],
            tabActive: Colors[scheme == "dark" ? "PRIMARY_DARK" : "PRIMARY_LIGHT"],
            tabDeactive: Colors[scheme == "dark" ? "BG_LIGHT" : "BG_DARK"],
            movementInput: Colors[scheme == "dark" ? "M_INPUT_DARK" : "M_INPUT_LIGHT"],
            movementOutput: Colors[scheme == "dark" ? "M_OUTPUT_DARK" : "M_OUTPUT_LIGHT"],
            secondaryText: Colors[scheme == "dark" ? "SECONDARY_TEXT_DARK" : "SECONDARY_TEXT_LIGHT"],
            iconsText: Colors[scheme == "dark" ? "ICONS_TXT_DARK" : "ICONS_TXT_LIGHT"],
        }
    }
};

export default Theme;
