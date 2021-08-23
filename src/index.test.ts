import compound from './index'
import {styles} from '@dash-ui/styles'

describe('compound', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''
    styles.dash.sheet.flush()
    styles.dash.cache.clear()
  })

  it('should create a compound style', () => {
    const compoundStyles = compound(styles)
    const text = compoundStyles({
      default: styles.one({
        backgroundColor: 'white',
      }),
      color: styles({
        red: {color: 'red'},
      }),
      size: styles.lazy((fontSize: string) => ({
        fontSize,
      })),
    })

    expect(text.css({color: 'red', size: '1rem'})).toBe(
      'background-color:white;color:red;font-size:1rem;'
    )
    text({color: 'red', size: '1rem'})
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1)
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot()

    // Cached
    expect(text.css({color: 'red', size: '1rem'})).toBe(
      'background-color:white;color:red;font-size:1rem;'
    )
    text({color: 'red', size: '1rem'})
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1)
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot()
  })
})
