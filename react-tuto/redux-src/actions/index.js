import * as actionTypes from './types';

/**
 * Actionsはあくまでオブジェクト
 * 行動の種類とパラメータのみを定義する
 * ロジックの定義はReducerに任せる
 */

export const onNumClick = (number) => ({
  type: actionTypes.INPUT_NUMBER,
  number,
});

export const onPlusClick = () => ({
  type: actionTypes.PLUS,
});
