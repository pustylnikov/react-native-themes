type Theme = { [key: string]: string }

type Themes = { [key: string]: Theme }

type StyleCreator = (colors: Theme, props?: any) => any

let colors: Themes = {};

export function setColorThemes(themes: Themes): void {
    colors = Object.freeze(themes);
}

export function getColorTheme(theme: string): Theme {
    return colors[theme];
}

export function createStyle(styleCreator: StyleCreator) {
    return function (theme: string, props?: any) {
        return styleCreator(getColorTheme(theme), props);
    };
}
