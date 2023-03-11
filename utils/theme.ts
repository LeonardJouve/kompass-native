import {MarginProp, PaddingProp, Spacings} from '@typing/theme';

export const getSpacings = (spacings: Spacings, values: MarginProp | PaddingProp): Partial<Record<keyof MarginProp | keyof PaddingProp, number>> => {
    const newValues = Object.keys(values).reduce((currentValues, key) => {
        const value = values[key as keyof typeof values];
        return {
            ...currentValues,
            [key]: typeof value === 'number' ? value : spacings[values[key as keyof typeof values]] ?? 0,
        };
    }, {});
    return newValues;
};
