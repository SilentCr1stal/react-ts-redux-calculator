import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

const HeaderTemplateApp: React.FunctionComponent = () => {
  const theme = {
    light: "far fa-moon",
    dark: "fas fa-sun",
  };

  const dispatch: Dispatch = useDispatch<Dispatch>();
  const isWhiteThemeColor: boolean | any = useSelector<RootStateOrAny>(
    (state) => state.theme.isWhiteThemeColor
  );
  console.log(isWhiteThemeColor);
  return (
    <React.Fragment>
      <header className="header mt-6">
        <div className="header__inner-block flex justify-end">
          <div className="change-theme-app__block">
            <button
              className="button__change-theme"
              onClick={(event: React.MouseEvent): void => {
                dispatch({
                  type: `${isWhiteThemeColor ? "DARK_THEME" : "LIGHT_THEME"}`,
                });
              }}
            >
              <i
                className={`${
                  isWhiteThemeColor ? theme.light : theme.dark
                } text-icons-tiny ${
                  isWhiteThemeColor ? "text-dark" : "text-light"
                }`}
              ></i>
            </button>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default HeaderTemplateApp;
