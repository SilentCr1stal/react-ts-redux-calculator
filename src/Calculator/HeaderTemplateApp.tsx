import React from "react";

interface IHeaderTemplateAppProps {
  themeApp: boolean;
}

const HeaderTemplateApp: React.FunctionComponent<IHeaderTemplateAppProps> = ({
  themeApp,
}) => {
  const theme = {
    light: "far fa-moon",
    dark: "fas fa-sun",
  };

  return (
    <React.Fragment>
      <header className="header mt-6">
        <div className="header__inner-block flex justify-end">
          <div className="change-theme-app__block">
            <button
              className="button__change-theme"
              onClick={(event: React.MouseEvent): void => {

              }}
            >
              <i
                className={`${
                  themeApp ? theme.light : theme.dark
                } text-icons-tiny`}
              ></i>
            </button>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default HeaderTemplateApp;
