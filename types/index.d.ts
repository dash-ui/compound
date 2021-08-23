import type { ResponsiveLazy, ResponsiveOne, ResponsiveStyle, ResponsiveStyles } from '@dash-ui/responsive';
import type { Style, Styles, StylesLazy, StylesOne, DashTokens } from '@dash-ui/styles';
/**
 * A factory function that creates a compound styles utility
 */
declare function compound<Tokens extends DashTokens, ThemeNames extends string>(styles: Styles<Tokens, ThemeNames> | ResponsiveStyles<Tokens, any, ThemeNames>): <Keys extends string, T extends Record<Keys, StylesOne | ResponsiveStyle<any, any, any> | Style<any, DashTokens> | ResponsiveOne<any> | StylesLazy<any> | ResponsiveLazy<any, any>>, StyleMap extends { [Name in keyof T]: T[Name]; }>(styleMap: StyleMap) => ((compoundMap?: { [Name_1 in keyof StyleMap]?: Parameters<StyleMap[Name_1]>[0] | undefined; }) => string) & {
    css: (compoundMap: { [Name_2 in keyof StyleMap]?: Parameters<StyleMap[Name_2]>[0] | undefined; }) => string;
    styles: StyleMap;
};
export default compound;
