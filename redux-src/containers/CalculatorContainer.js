import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import NumBtn from '../components/NumBtn';
import PlusBtn from '../components/PlusBtn';
import Result from '../components/Result';

/**
 * CalculatorContainer
 * - Calculatorの状態をViewに反映
 * - CalculatorへのActionの発火点
 */
class CalculatorContainer extends Component {
  render() {
    const {calculator, actions} = this.props;
    return (
      <div>
        <div>
          <NumBtn n={1} onClick={() => actions.onNumClick(1)} />
          <NumBtn n={2} onClick={() => actions.onNumClick(2)} />
          <NumBtn n={3} onClick={() => actions.onNumClick(3)} />
        </div>
        <div>
          <NumBtn n={4} onClick={() => actions.onNumClick(4)} />
          <NumBtn n={5} onClick={() => actions.onNumClick(5)} />
          <NumBtn n={6} onClick={() => actions.onNumClick(6)} />
        </div>
        <div>
          <NumBtn n={7} onClick={() => actions.onNumClick(7)} />
          <NumBtn n={8} onClick={() => actions.onNumClick(8)} />
          <NumBtn n={9} onClick={() => actions.onNumClick(9)} />
        </div>
        <div>
          <NumBtn n={0} onClick={() => actions.onNumClick(0)} />
          <PlusBtn onClick={actions.onPlusClick} />
        </div>
        <div>
          <Result result={calculator.showingResult? calculator.resultValue: calculator.inputValue} />
        </div>
      </div>
    );
  }
}

/**
 * mapState
 * 各Containerの状態をマッピング
 * @param {*} state Reducerから送られてくる状態オブジェクト
 * @param {*} ownProps 各Containerのprops
 * @return {*} map Containerとstateオブジェクトを関連付けしたマップ
 */
const mapState = (state, ownProps) => ({
  calculator: state.calculator,
});

/**
 * mapDispatch
 * 各ContainerのActionをマッピング
 */
const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapState, mapDispatch)(CalculatorContainer);
