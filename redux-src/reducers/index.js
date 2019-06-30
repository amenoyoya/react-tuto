import { combineReducers } from 'redux';
import calculator from './calculator';

/**
 * 定義したReducerを全て結合
 * => Containerに渡される
 */
const reducer = combineReducers({
  calculator,
});

export default reducer;
