import { operationButtons } from './TemplateApp'

export const getSolution: Function = (
  solution: Array<string | number>,
  operKey: number,
  fullValue: string[]
) => {
  const operation = solution[operKey];
  const fullValueArray = fullValue.map((el) =>
    isNaN(Number(el)) ? el : Number(el)
  );
  let sol: number | string[] = 0;
  let startIndex: number = 0;
  let lastIndex: number = solution.length - 1;

  if (solution.includes(operation)) {
    const leftExp: Array<string | number> = [];
    const rightExp: Array<string | number> = [];
    let i: number = 1;
    while (true) {
      if (
        !operationButtons.includes(
          fullValueArray[
            fullValueArray.findIndex(
              (el, ind) => el === operation && ind !== 0
            ) - i
          ]
        ) &&
        fullValueArray[
          fullValueArray.findIndex(
            (el, ind) => el === operation && ind !== 0
          ) - i
        ] !== undefined
      ) {
        leftExp.unshift(
          fullValueArray[
            fullValueArray.findIndex(
              (el, ind) => el === operation && ind !== 0
            ) - i
          ]
        );
      } else {
        startIndex =
          fullValueArray.findIndex(
            (el, ind) => el === operation && ind !== 0
          ) -
          i +
          1;
        break;
      }
      i++;
    }
    if (fullValueArray[0] === "-" && startIndex === 1) {
      leftExp.unshift("-");
      startIndex = 0;
    }
    for (i = 1; ; i++) {
      if (
        !operationButtons.includes(
          fullValueArray[
            fullValueArray.findIndex(
              (el, ind) => el === operation && ind !== 0
            ) + i
          ]
        ) &&
        fullValueArray[
          fullValueArray.findIndex(
            (el, ind) => el === operation && ind !== 0
          ) + i
        ] !== undefined
      ) {
        rightExp.push(
          fullValueArray[
            fullValueArray.findIndex(
              (el, ind) => el === operation && ind !== 0
            ) + i
          ]
        );
      } else {
        lastIndex =
          fullValueArray.findIndex(
            (el, ind) => el === operation && ind !== 0
          ) + i;
        break;
      }
    }
    if (operation === "÷") {
      sol = Number(
        Number(Number(leftExp.join("")) / Number(rightExp.join(""))).toFixed(
          2
        )
      );
    } else if (operation === "×") {
      sol = Number(
        Number(Number(leftExp.join("")) * Number(rightExp.join(""))).toFixed(
          2
        )
      );
    } else if (operation === "%") {
      if (fullValueArray[startIndex - 1] === "÷") {
        startIndex -= 1;
        return [
          ["×", "100", "÷", leftExp.join(""), "×", rightExp.join("")],
          startIndex,
          lastIndex,
        ];
      } else {
        sol = (Number(leftExp.join("")) / 100) * Number(rightExp.join(""));
      }
    } else if (operation === "+") {
      sol = Number(leftExp.join("")) + Number(rightExp.join(""));
    } else if (operation === "-") {
      sol = Number(leftExp.join("")) - Number(rightExp.join(""));
    }
  }
  return [sol, startIndex, lastIndex];
}
