import React from 'react';
import ReactDOM from 'react-dom';
// ShoppingListコンポーネントを読み込む
import ShoppingList from './shopping-list.jsx';
// style.cssを取り込む
import './style.css';

// ReactDOMにより id="root" の要素を <ShoppingList name="Mark" /> に置き換える
ReactDOM.render(
    <ShoppingList name="Mark" />,
    document.getElementById('root')
);
