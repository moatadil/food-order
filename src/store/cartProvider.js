import { useReducer } from 'react'
import CartContext from './cart-context'
const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        let items = [...state.items]
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount
        const existingCartItemIndex = items.findIndex(item => item.id === action.item.id)
        if (existingCartItemIndex >= 0) {
            items[existingCartItemIndex].amount = items[existingCartItemIndex].amount + action.item.amount
        } else {
            items = items.concat(action.item)
        }
        return {
            items: items,
            totalAmount: updateTotalAmount
        }
    } else if (action.type === 'REMOVE') {
        let updatedItems
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex]
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        const updateTotalAmount = state.totalAmount - existingCartItem.price
        return {
            items: updatedItems,
            totalAmount: updateTotalAmount
        }
    } else if (action.type === 'Clear') {
        return defaultCartState
    }
    return defaultCartState
}
export default function CartProvider (props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        })
    }
    const removeItemCart = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id
        })
    }
    const clearCartHandler = () => {
        dispatchCartAction({ type: 'Clear' })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemCart,
        clearCart: clearCartHandler
    }
    return (
        <CartContext.Provider value={ cartContext }>
            { props.children }
        </CartContext.Provider  >
    )
}
