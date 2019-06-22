import React from 'react';
import ReactDOM from 'react-dom';
// ShoppingListコンポーネントを読み込む
import ShoppingList from './shopping-list.jsx';

// ReactDOMにより id="root" の要素を <ShoppingList name="Mark" /> に置き換える
ReactDOM.render(
    <ShoppingList name="Mark" />,
    document.getElementById('root')
);
