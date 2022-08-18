import type { ResponsiveLazy, ResponsiveOne, ResponsiveStyle, ResponsiveStyles } from "@dash-ui/responsive";
import type { DashThemes, DashTokens, Style, Styles, StylesLazy, StylesOne } from "@dash-ui/styles";
/**
 * A factory function that creates a compound styles utility
 *
 * @param styles
 */
declare function compound<Tokens extends DashTokens, Themes extends DashThemes>(styles: Styles<Tokens, Themes> | ResponsiveStyles<Tokens, Themes, any>): <Keys extends string, T extends Record<Keys, StylesOne | ResponsiveStyle<any, any, any, any> | Style<any, DashTokens, DashThemes> | ResponsiveOne<any> | StylesLazy<any> | ResponsiveLazy<any, any>>, StyleMap extends { [Name in keyof T]: T[Name]; }>(styleMap: StyleMap, options?: CompoundStylesOptions) => CompoundStyle<Keys, T, StyleMap>;
export declare type CompoundStyle<Keys extends string, T extends Record<Keys, ResponsiveStyle<any, any, any, any> | Style<any> | StylesOne | ResponsiveOne<any> | StylesLazy<any> | ResponsiveLazy<any, any>>, StyleMap extends {
    [Name in keyof T]: T[Name];
}> = {
    (compoundMap?: {
        [Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0] | undefined;
    }, compoundOptions?: CompoundStylesOptions): string;
    atomicCss(compoundMap: {
        [Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0];
    }): string[];
    css(compoundMap: {
        [Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0];
    }): string;
    styles: StyleMap;
};
export declare type CompoundStylesOptions = {
    atomic?: boolean;
};
export default compound;
