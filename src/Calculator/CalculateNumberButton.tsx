import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IValue } from "../index";
import { operationButtons } from "./TemplateApp";
import { getSolution } from "./utils";

interface IButtonNumbers {
  content: string | JSX.Element | number;
  className: string;
  type: string;
  setSolution: (solution: string) => void;
}

export const CalculateNumberButton: React.FunctionComponent<IButtonNumbers> = ({
  content,
  className,
  type,
  setSolution,
}): React.ReactElement => {
  const dispatch: Dispatch<object> = useDispatch<Dispatch<object>>();
  const value: string | any = useSelector<IValue>(
    (state: IValue): string => state.value
  );

  const print: Function = (symbol: string): void => {
    dispatch({ type: "PRINT_NUMBER", payload: symbol });
  };

  const erase: Function = (): void => {
    dispatch({ type: "DELETE_NUMBER", payload: undefined });
  };

  const clear: Function = (): void => {
    dispatch({ type: "CLEAR_EXPRESSION", payload: null });
  };

  const checkLastNum: Function = (input: string): string => {
    if (operationButtons.includes(value[value.length - 1])) {
      if (input !== ".") {
        return input;
      }
    }

    const exp: Array<string> = value
      .split("%")
      .join(" ")
      .split("÷")
      .join(" ")
      .split("—")
      .join(" ")
      .split("×")
      .join(" ")
      .split("+")
      .join(" ")
      .split(" ");
    const lastExp: string | undefined = exp.pop();

    if (!lastExp && input === ".") {
      return "";
    }

    if (lastExp?.startsWith("0")) {
      if (!lastExp?.includes(".")) {
        if (input === ".") {
          return input;
        } else {
          return "";
        }
      }
    }

    if (lastExp?.includes(".") && input === ".") {
      return "";
    }

    return input;
  };

  return (
    <React.Fragment>
      <div
        className={`numbers__buttons__button number-button-${className} 
        flex justify-center items-center`}
        data-type={type}
        onClick={(event): void => {
          const type: string = event.currentTarget.dataset["type"]!;
          const inner: string = event.currentTarget.innerText;
          switch (type) {
            case "number":
              if (value === "") {
                print(inner);
                break;
              }
              const num = checkLastNum(inner);
              print(num);
              break;
            case "operation":
              if (inner !== "=") {
                if (
                  !operationButtons.includes(
                    value.split("")[value.length - 1]
                  ) &&
                  value !== ""
                ) {
                  if (value.split("")[value.length - 1] !== ".") {
                    print(inner);
                  }
                } else if (
                  operationButtons.includes(value.split("")[value.length - 1])
                ) {
                  dispatch({ type: "DELETE_NUMBER", payload: undefined });
                  print(inner);
                }
              } else {
                if (
                  !operationButtons.includes(value.split("")[value.length - 1])
                ) {
                  let solution: Array<any> = value
                    .split("")
                    .map((num: string) =>
                      isNaN(Number(num)) ? num : Number(num)
                    );

                  let keys: number[] = [];
                  solution.forEach((el: number | string, key: number): void => {
                    if (operationButtons.includes(el)) {
                      keys.push(key);
                    }
                  });
                  if (keys.includes(0)) {
                    keys.shift();
                  }

                  if (keys.length) {
                    let operations: Array<string> = solution.filter(
                      (el: string | number) =>
                        typeof el !== "number" && el !== "."
                    );

                    if (keys.length !== operations.length) {
                      operations.shift();
                    }
                    let fullValue: string[] = value.split("");
                    operations.forEach((el: string, i: number): void => {
                      if (el === "%") {
                        const [sol, start, end] = getSolution(
                          solution,
                          keys[i],
                          fullValue
                        );
                        if (solution[keys[i]] === el) {
                          fullValue = fullValue
                            .slice(0, start)
                            .concat(
                              sol,
                              ...fullValue.slice(end, fullValue.length)
                            );
                        }
                      }
                    });
                    solution = fullValue.map((num: string) =>
                      isNaN(Number(num)) ? num : Number(num)
                    );
                    keys = [];
                    solution.forEach(
                      (el: number | string, key: number): void => {
                        if (operationButtons.includes(el)) {
                          keys.push(key);
                        }
                      }
                    );
                    if (keys.includes(0)) {
                      keys.shift();
                    }
                    operations = solution.filter(
                      (el: string | number) =>
                        typeof el !== "number" && el !== "."
                    );

                    if (keys.length !== operations.length) {
                      operations.shift();
                    }
                    let addOperations: string[] = operations;
                    let addKeys: number[] = keys;
                    operations.forEach((el: string, i: number): void => {
                      if (["×", "÷"].includes(el)) {
                        const [sol, start, end] = getSolution(
                          solution,
                          keys[i],
                          fullValue
                        );
                        addOperations = addOperations.filter(
                          (op: string) => op !== el
                        );
                        addKeys = addKeys.filter(
                          (num: number) => el !== solution[num]
                        );
                        if (solution[keys[i]] === el) {
                          fullValue = fullValue
                            .slice(0, start)
                            .concat(
                              sol.toString().split(""),
                              ...fullValue.slice(end, fullValue.length)
                            );
                        }
                      }
                    });
                    addOperations.forEach((el: string, i: number): void => {
                      if (["-", "+"].includes(el)) {
                        const [sol, start, end] = getSolution(
                          solution,
                          addKeys[i],
                          fullValue
                        );
                        if (solution[addKeys[i]] === el) {
                          fullValue = fullValue
                            .slice(0, start)
                            .concat(
                              sol.toString().split(""),
                              ...fullValue.slice(end, fullValue.length)
                            );
                        }
                      }
                    });
                    const solutionExpression = fullValue.join("");
                    setSolution(solutionExpression);
                    clear();
                  } else {
                    if (value.split("")[value.length - 1] !== ".") {
                      setSolution(value);
                    }
                  }
                }
              }
              break;
            case "additional_btn":
              inner === "AC" ? clear() : void 0;
              typeof content === "object" ? erase() : void 0;
              inner === "." ? print(checkLastNum(inner)) : void 0;
              inner === "±"
                ? dispatch({ type: "SET_NEGATIVE", payload: null })
                : void 0; // it's working
              break;
            default:
          }
        }}
      >
        <div
          className={`number-button number-button-${className}__inner-block`}
        >
          {content}
        </div>
      </div>
    </React.Fragment>
  );
};
