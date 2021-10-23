import React from "react";
import "./App.css";
import TemplateApp from "./Calculator/TemplateApp";

/**
 *
 * @return {JSX.Element}
 */
function App(): JSX.Element {
  const isWhiteThemeColor = true;

  return (
    <React.Fragment>
      <div className="app__wrapper flex justify-center items-center">
        <TemplateApp isWhiteThemeColor={isWhiteThemeColor} />
      </div>
    </React.Fragment>
  );
}

export default App;
