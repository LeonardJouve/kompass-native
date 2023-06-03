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

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export const changeColorBrightness = (hexColor: string, brightnessDelta: number, opacity = 1) => {
    let r = parseInt(hexColor.substring(1, 3), 16);
    r = Math.round(clamp((1 + brightnessDelta) * r, 0, 255));
    let g = parseInt(hexColor.substring(3, 5), 16);
    g = Math.round(clamp((1 + brightnessDelta) * g, 0, 255));
    let b = parseInt(hexColor.substring(5, 7), 16);
    b = Math.round(clamp((1 + brightnessDelta) * b, 0, 255));
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
