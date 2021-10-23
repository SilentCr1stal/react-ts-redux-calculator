import React, { Dispatch, ReactNode, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { CalculateNumberButton } from "./CalculateNumberButton";
import CalculationsScreen from "./CalculatuonsScreen";
import HeaderTemplateApp from "./HeaderTemplateApp";

type Object<T> = {
  classNames: Array<string>;
  buttons: T;
  types: Array<string>;
};

export const operationButtons: Array<string | JSX.Element | number> = [
  "%",
  "÷",
  "×",
  "-",
  "+",
  "=",
];

const TemplateApp: React.FunctionComponent = (): JSX.Element => {
  const [solution, setSolution] = useState<string>("0");

  const contentButtons: Object<Array<string | JSX.Element | number>> = {
    classNames: [
      "drop-calculation",
      "del-number",
      "percentage-calc",
      "div-calc",
      "7",
      "8",
      "9",
      "multi-calc",
      "4",
      "5",
      "6",
      "sub-calc",
      "1",
      "2",
      "3",
      "add-calc",
      "change-sign",
      "0",
      "point-number",
      "equals-calc",
    ],
    buttons: [
      "AC",
      <i className="fas fa-backspace text-icons-tiny" key="2"></i>,
      "%",
      "÷",
      7,
      8,
      9,
      "×",
      4,
      5,
      6,
      "-",
      1,
      2,
      3,
      "+",
      "±",
      0,
      ".",
      "=",
    ],
    types: ["number", "operation", "additional_btn"],
  };
  const isWhiteThemeColor: boolean | any = useSelector<RootStateOrAny>(
    (state) => state.theme.isWhiteThemeColor
  )
  return (
    <React.Fragment>
      <div
        className={`${
          isWhiteThemeColor ? "bg-white-900" : "bg-black-700"
        } calc-template p-4`}
      >
        <HeaderTemplateApp/>
        <main
          className="main-screen__calculations 
        py-2 flex items-center justify-end"
        >
          <CalculationsScreen solution={solution} />
        </main>
        <div className="wrapper__numbers">
          <div className="wrapper__numbers__buttons grid grid-cols-4 gap-1">
            {contentButtons.buttons.map((button, key): ReactNode => {
              const type =
                typeof button === "number"
                  ? contentButtons.types[0]
                  : typeof button === "string" &&
                    operationButtons.includes(button)
                  ? contentButtons.types[1]
                  : contentButtons.types[2];
              return (
                <CalculateNumberButton
                  content={button}
                  key={key}
                  className={contentButtons.classNames[key]}
                  type={type}
                  setSolution={setSolution}
                />
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TemplateApp;
