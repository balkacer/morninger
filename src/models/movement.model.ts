import { MovementCategories } from "enums";

export default class MovementModel {
    id?: number;
    amount: number = 0;
    category: MovementCategories = MovementCategories.UNDEFINED;
    type: number = 0;
    date: string = "";

    constructor(movement: { amount: number, category: MovementCategories, type: number, date: string }) {
        Object.assign(this, movement);
    }
}