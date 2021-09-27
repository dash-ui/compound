import { styles } from "@dash-ui/styles";
import compound from "./index";

describe("compound", () => {
  afterEach(() => {
    styles.dash.sheet.flush();
    styles.dash.cache.clear();
    styles.dash.inserted.clear();
  });

  it("should create a compound style", () => {
    const compoundStyles = compound(styles);
    const text = compoundStyles({
      default: styles.one({
        backgroundColor: "white",
      }),
      color: styles({
        red: { color: "red" },
      }),
      size: styles.lazy((fontSize: string) => ({
        fontSize,
      })),
    });

    expect(text.css({ color: "red", size: "1rem" })).toBe(
      "background-color:white;color:red;font-size:1rem;"
    );
    text({ color: "red", size: "1rem" });
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);
    expect(
      document.querySelectorAll(`style[data-dash]`)[0].textContent
    ).toMatchSnapshot();

    // Cached
    expect(text.css({ color: "red", size: "1rem" })).toBe(
      "background-color:white;color:red;font-size:1rem;"
    );
    text({ color: "red", size: "1rem" });
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);
    expect(
      document.querySelectorAll(`style[data-dash]`)[0].textContent
    ).toMatchSnapshot();
  });

  it("should create an atomic compound style", () => {
    const compoundStyles = compound(styles);
    const text = compoundStyles(
      {
        default: styles.one({
          backgroundColor: "white",
        }),
        color: styles({
          red: { color: "red" },
        }),
        size: styles.lazy((fontSize: string) => ({
          fontSize,
        })),
      },
      { atomic: true }
    );

    expect(text.css({ color: "red", size: "1rem" })).toBe(
      "background-color:white;color:red;font-size:1rem;"
    );
    expect(text.atomicCss({ color: "red", size: "1rem" })).toStrictEqual([
      "background-color:white;",
      "color:red;",
      "font-size:1rem;",
    ]);
    text({ color: "red", size: "1rem" });
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(3);
    expect(
      document.querySelectorAll(`style[data-dash]`)[0].textContent
    ).toMatchSnapshot();
    expect(
      document.querySelectorAll(`style[data-dash]`)[1].textContent
    ).toMatchSnapshot();
    expect(
      document.querySelectorAll(`style[data-dash]`)[2].textContent
    ).toMatchSnapshot();

    // Cached
    expect(text.atomicCss({ color: "red", size: "1rem" })).toStrictEqual([
      "background-color:white;",
      "color:red;",
      "font-size:1rem;",
    ]);
    text({ color: "red", size: "1rem" });
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(3);
    expect(
      document.querySelectorAll(`style[data-dash]`)[0].textContent
    ).toMatchSnapshot();
    expect(
      document.querySelectorAll(`style[data-dash]`)[1].textContent
    ).toMatchSnapshot();
    expect(
      document.querySelectorAll(`style[data-dash]`)[2].textContent
    ).toMatchSnapshot();
  });

  it("should create an atomic compound style ad hoc", () => {
    const compoundStyles = compound(styles);
    const text = compoundStyles({
      default: styles.one({
        backgroundColor: "white",
      }),
      color: styles({
        red: { color: "red" },
      }),
      size: styles.lazy((fontSize: string) => ({
        fontSize,
      })),
    });

    text({ color: "red", size: "1rem" }, { atomic: true });
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(3);
    expect(
      document.querySelectorAll(`style[data-dash]`)[0].textContent
    ).toMatchSnapshot();
    expect(
      document.querySelectorAll(`style[data-dash]`)[1].textContent
    ).toMatchSnapshot();
    expect(
      document.querySelectorAll(`style[data-dash]`)[2].textContent
    ).toMatchSnapshot();

    // Cached
    text({ color: "red", size: "1rem" }, { atomic: true });
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(3);
    expect(
      document.querySelectorAll(`style[data-dash]`)[0].textContent
    ).toMatchSnapshot();
    expect(
      document.querySelectorAll(`style[data-dash]`)[1].textContent
    ).toMatchSnapshot();
    expect(
      document.querySelectorAll(`style[data-dash]`)[2].textContent
    ).toMatchSnapshot();
  });
});
