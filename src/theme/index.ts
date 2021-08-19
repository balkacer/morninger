import { Colors } from "enums";
import { ColorSchemeName } from "react-native-appearance";

function Theme(scheme: ColorSchemeName) {
    return {
        avatars: {
            normal: {
                h: 50,
                w: 50,
                r: 50
            }
        },
        colors: {
            primary: Colors[scheme == "dark" ? "PRIMARY_DARK" : "PRIMARY_LIGHT"],
            background: Colors[scheme == "dark" ? "BG_DARK" : "BG_LIGHT"],
            card: Colors[scheme == "dark" ? "CARD_BG_DARK" : "CARD_BG_LIGHT"],
            title: Colors[scheme == "dark" ? "BG_LIGHT" : "BG_DARK"],
            placeholder: Colors[scheme == "dark" ? "PLACEHOLDER_DARK" : "PLACEHOLDER_LIGTH"],
            text: Colors[scheme == "dark" ? "BG_LIGHT" : "BG_DARK"],
            tabActive: Colors[scheme == "dark" ? "PRIMARY_DARK" : "PRIMARY_LIGHT"],
            tabDeactive: Colors[scheme == "dark" ? "BG_LIGHT" : "BG_DARK"],
            movementInput: Colors[scheme == "dark" ? "M_INPUT_DARK" : "M_INPUT_LIGHT"],
            movementOutput: Colors[scheme == "dark" ? "M_OUTPUT_DARK" : "M_OUTPUT_LIGHT"],
            movementInputBg: Colors[scheme == "dark" ? "M_INPUT_DARK_BG" : "M_INPUT_LIGHT_BG"],
            movementOutputBg: Colors[scheme == "dark" ? "M_OUTPUT_DARK_BG" : "M_OUTPUT_LIGHT_BG"],
            secondaryText: Colors[scheme == "dark" ? "SECONDARY_TEXT_DARK" : "SECONDARY_TEXT_LIGHT"]
        }
    }
};

export default Theme;
