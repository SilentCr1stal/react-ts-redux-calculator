import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";

interface ICalculationScreen {
  solution: string;
}

const CalculationsScreen: React.FunctionComponent<ICalculationScreen> = ({
  solution,
}): JSX.Element => {
  const expression: string | any = useSelector<RootStateOrAny>(
    (state) => state.solution.value
  );
  const isWhiteThemeColor: boolean | any = useSelector<RootStateOrAny>(
    (state) => state.theme.isWhiteThemeColor
  )
  return (
    <React.Fragment>
      <div className="screen__inner-block">
        <div className="screen__place-calculate">
          <div className="screen__entered-numbers screen__numbers">
            {expression}
          </div>
          <div className={`screen__output-numbers screen__numbers ${
                  isWhiteThemeColor ? "text-dark" : "text-light"
                }`}>
            {solution}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalculationsScreen;
