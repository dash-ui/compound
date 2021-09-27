import type {
  ResponsiveLazy,
  ResponsiveOne,
  ResponsiveStyle,
  ResponsiveStyles,
} from "@dash-ui/responsive";
import type {
  DashTokens,
  Style,
  Styles,
  StylesLazy,
  StylesOne,
} from "@dash-ui/styles";

/**
 * A factory function that creates a compound styles utility
 *
 * @param styles
 */
function compound<Tokens extends DashTokens, ThemeNames extends string>(
  styles: Styles<Tokens, ThemeNames> | ResponsiveStyles<Tokens, any, ThemeNames>
) {
  /**
   * A function for creating compound/multi-variant styles
   *
   * @param styleMap
   * @param options
   */
  return function compoundStyles<
    Keys extends string,
    T extends Record<
      Keys,
      | ResponsiveStyle<any, any, any>
      | Style<any>
      | StylesOne
      | ResponsiveOne<any>
      | StylesLazy<any>
      | ResponsiveLazy<any, any>
    >,
    StyleMap extends { [Name in keyof T]: T[Name] }
  >(styleMap: StyleMap, options: CompoundStylesOptions = emptyObj) {
    const cache = new Map<string, string[]>();
    const mapKeys: string[] = [];
    mapKeys.push(...Object.keys(styleMap));

    function atomicCss(compoundMap: {
      [Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0];
    }): string[] {
      const key = JSON.stringify(compoundMap);
      const cached = cache.get(key);
      if (cached) return cached;

      const output: string[] =
        // @ts-expect-error
        typeof styleMap.default === "function"
          ? [
              // @ts-expect-error
              styleMap.default.css(),
            ]
          : [];

      for (let i = 0; i < mapKeys.length; i++) {
        const key = mapKeys[i];
        if (key === "default") continue;
        const value = (compoundMap as any)[key];
        if (value === void 0 || value === null) continue;
        output.push((styleMap as any)[key]?.css(value));
      }

      cache.set(key, output);
      return output;
    }

    function css(compoundMap: {
      [Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0];
    }): string {
      return "".concat(...atomicCss(compoundMap));
    }

    function compoundStyle(
      compoundMap: {
        [Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0];
      } = {},
      compoundOptions: CompoundStylesOptions = emptyObj
    ) {
      if (compoundOptions.atomic ?? options.atomic) {
        const css = atomicCss(compoundMap);
        let classes = "";

        for (let i = 0; i < css.length; i++) {
          classes += styles.cls(css[i]) + (i === css.length - 1 ? "" : " ");
        }

        return classes;
      }

      return styles.cls(css(compoundMap));
    }

    return Object.assign(compoundStyle, {
      css,
      atomicCss,
      styles: styleMap,
    });
  };
}

const emptyObj = {};

export type CompoundStylesOptions = {
  atomic?: boolean;
};

export default compound;
