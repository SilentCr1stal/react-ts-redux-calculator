import { combineReducers, createStore, Reducer } from "redux";
import { solutionReducer } from "./solutionReducer";
import { themeReducer } from "./themeReducer";
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer: Reducer = combineReducers({
  solution: solutionReducer,
  theme: themeReducer
})

export const store = createStore(rootReducer, composeWithDevTools())
