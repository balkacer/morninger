import { Mocks, MovementCategories, MovementTypes, ScreenNames } from "enums";
import { MovementModel, TapModel } from "models";

const GenerateMocks = <T>(mock: Mocks, quantity: number): T[] => {
    const mocks = [];
    for (let i = 0; i < quantity; i++) {
        mocks.push(instances[mock](i));
    }
    return mocks as any as T[];
}

const instances = {
    movement: (i: number) => ({
        amount: i * Math.random() * 10 + 1,
        type: MovementTypes[i % 2 == 0 || i % 5 == 0 ? "INPUT" : "OUTPUT"],
        category: i
    }) as MovementModel,
    tap: (i: number) => ({
        icon: [
            "settings",
            "ios-swap-vertical",
            "notifications"
        ][i],
        screen: ScreenNames[i === 0 ? "SETTINGS" : i === 1 ? "MOVEMENTS" : "NOTIFICATIONS"],
        isActive: !(i)
    }) as TapModel
}

export default GenerateMocks;