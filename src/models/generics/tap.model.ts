import { ScreenNames } from "enums";

export default class TapModel {
    screen: ScreenNames;
    isActive?: boolean;
    icon: string;
    
    constructor(){
        this.screen = ScreenNames.MOVEMENTS;
        this.isActive = false;
        this.icon = "";
    }
}