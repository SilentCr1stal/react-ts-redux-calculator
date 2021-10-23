export interface IValue {
  value: string;
}

const defaultValue: IValue = {
  value: "-100+42÷7+9.005÷90%50+10-451.5×3+2",
};

export const solutionReducer = (state: IValue = defaultValue, action?: any) => {
  switch (action.type) {
    case "PRINT_NUMBER":
      return { ...state, value: state.value + action.payload };
    case "DELETE_NUMBER":
      const expression = state.value.trim().split("");
      expression.pop();
      return { ...state, value: expression.join("") };
    case "CLEAR_EXPRESSION":
      return { ...state, value: "" };
    case "SET_NEGATIVE":
      return {
        ...state,
        value: setNegativeExpression(state.value.split("")),
      };
    case "CHANGE_VALUE":
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

const setNegativeExpression: Function = (input: Array<string>): string => {
  if (input[0] !== "-") {
    input.unshift("-");
  } else {
    input.shift();
  }

  return input.join("");
}
