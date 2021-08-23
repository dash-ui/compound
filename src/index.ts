import type {
  ResponsiveLazy,
  ResponsiveOne,
  ResponsiveStyle,
  ResponsiveStyles,
} from '@dash-ui/responsive'
import type {
  Style,
  Styles,
  StylesLazy,
  StylesOne,
  DashTokens,
} from '@dash-ui/styles'

/**
 * A factory function that creates a compound styles utility
 */
function compound<Tokens extends DashTokens, ThemeNames extends string>(
  styles: Styles<Tokens, ThemeNames> | ResponsiveStyles<Tokens, any, ThemeNames>
) {
  /**
   * A function for creating compound/multi-variant styles
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
    StyleMap extends {[Name in keyof T]: T[Name]}
  >(styleMap: StyleMap) {
    const cache = new Map<string, string>()
    const mapKeys: string[] = []
    mapKeys.push(...Object.keys(styleMap))

    function css(
      compoundMap: {[Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0]}
    ): string {
      const key = JSON.stringify(compoundMap)
      if (cache.has(key)) return cache.get(key) || ''
      let output =
        // @ts-expect-error
        typeof styleMap.default === 'function'
          ? // @ts-expect-error
            styleMap.default.css()
          : ''

      for (let i = 0; i < mapKeys.length; i++) {
        const key = mapKeys[i]
        if (key === 'default') continue
        const value = (compoundMap as any)[key]
        if (value === void 0 || value === null) continue
        output += (styleMap as any)[key]?.css(value)
      }

      cache.set(key, output)
      return output
    }

    return Object.assign(
      function compoundStyle(
        compoundMap: {
          [Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0]
        } = {}
      ) {
        return styles.cls(css(compoundMap))
      },
      {
        css,
        styles: styleMap,
      }
    )
  }
}

export default compound
