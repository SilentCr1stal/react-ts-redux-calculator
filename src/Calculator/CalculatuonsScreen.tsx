import React from "react";
import { useSelector } from "react-redux";
import { IValue } from "../index";

interface ICalculationScreen {
  solution: string;
}

const CalculationsScreen: React.FunctionComponent<ICalculationScreen> = ({
  solution,
}): JSX.Element => {
  const expression: string | any = useSelector<IValue>(
    (state: IValue): string => state.value
  );
  return (
    <React.Fragment>
      <div className="screen__inner-block">
        <div className="screen__place-calculate">
          <div className="screen__entered-numbers screen__numbers">
            {expression}
          </div>
          <div className="screen__output-numbers screen__numbers">
            {solution}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalculationsScreen;
