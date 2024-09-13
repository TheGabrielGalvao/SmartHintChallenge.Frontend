import { OptionItem } from "../types/Option";

export function enumToOptionItemList<T>(enumObj: T): OptionItem[] {
    const optionItemList: OptionItem[] = [];

    for (const key in enumObj) {
        if (Object.prototype.hasOwnProperty.call(enumObj, key)) {
            const isValueProperty = parseInt(key, 10) >= 0
            if (!isValueProperty) {
                const value = (enumObj as any)[key];
                const label = key;
                optionItemList.push({ value, label });
            }
        }
    }

    return optionItemList;
}