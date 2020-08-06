import React from 'react';
import propTypes from 'prop-types';

/**
 * 以下の書き方は
 * ```
 * const NumBtn = (props) => {
 *   return (
 *     <button onClick={props.onClick}>{props.n}</button>
 *   )
 * }
 * ```
 * と同じ
 */
const NumBtn = ({n, onClick}) => (
  <button onClick={onClick}>{n}</button>
);

NumBtn.propTypes = {
  onClick: propTypes.func.isRequired
};

export default NumBtn;
