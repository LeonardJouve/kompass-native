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

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const adjustColor = (value: number, brightnessDelta: number) => Math.round(clamp((1 + brightnessDelta) * value, 0, 255));

export const changeColorBrightness = (hexColor: string, brightnessDelta: number, opacity = 1) => {
    const r = adjustColor(parseInt(hexColor.substring(1, 3), 16), brightnessDelta);
    const g = adjustColor(parseInt(hexColor.substring(3, 5), 16), brightnessDelta);
    const b = adjustColor(parseInt(hexColor.substring(5, 7), 16), brightnessDelta);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const grayscaleColor = (hexColor: string, opacity = 1) => {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const gray = Math.round((r + g + b) / 3);
    return `rgba(${gray}, ${gray}, ${gray}, ${opacity})`;
};
