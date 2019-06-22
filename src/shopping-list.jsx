import React from 'react';

/**
 * ShoppingListコンポーネント
 * : React.Componentを継承して作成
 * 
 * Usage: <ShoppingList name="Mark" />
 */
export default class ShoppingList extends React.Component {
    // renderメソッドでコンポーネント内部のHTMLタグを定義
    render() {
        return (
            <div className="shopping-list">
            <h1>Shopping List for {this.props.name}</h1>
            <ul>
                <li>Instagram</li>
                <li>WhatsApp</li>
                <li>Oculus</li>
            </ul>
            </div>
        );
    }
}
