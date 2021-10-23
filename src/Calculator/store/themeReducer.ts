export interface IThemeApp {
  isWhiteThemeColor: boolean
}

const defaultThemeApp: IThemeApp = {
  isWhiteThemeColor: true
}

export const themeReducer =
  (state: IThemeApp = defaultThemeApp, action?: any) => {
    switch (action.type) {
      case "LIGHT_THEME":
        return {...state, isWhiteThemeColor: true}
      case "DARK_THEME":
        return {...state, isWhiteThemeColor: false}
      default:
        return state
    }
  }
