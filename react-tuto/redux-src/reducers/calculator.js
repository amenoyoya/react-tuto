import * as actionTypes from '../actions/types';

const initialAppState = {
  inputValue: 0,
  resultValue: 0,
  showingResult: false,
}

/**
 * Reducer.calculator
 * Actionの種類に応じて Calculatorの状態を変換するメソッド
 * @param {*} state Action受信前のCalculatorの状態
 * @param {*} action 受信するActionオブジェクト
 * @return {*} state Actionを反映した後のCalculatorの状態
 */
const calculator = (state = initialAppState, action) => {
  if (action.type === actionTypes.INPUT_NUMBER) {
    return {
      ...state, // ...: Spread演算子｜arrayやdictを展開（Pythonの *list, **dict と同じようなもの）
      inputValue: state.inputValue * 10 + action.number,
      showingResult: false,
    };
  }
  if (action.type === actionTypes.PLUS) {
    return {
      ...state,
      inputValue: 0,
      resultValue: state.resultValue + state.inputValue,
      showingResult: true,
    }
  }
  return state;
};

export default calculator;
