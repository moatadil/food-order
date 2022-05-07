import { useContext, useState, useEffect } from 'react'
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

import CartContext from '../../store/cart-context'
const HeaderCartButton = (props) => {
  const [isbump, setIsBump] = useState(false)
  const cartCtx = useContext(CartContext)
  const { items } = cartCtx

  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item?.amount
  }, 0)
  useEffect(() => {
    if (items.length === 0) return
    setIsBump(true)
    const timer = setTimeout(() => {
      setIsBump(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [items])
  const buttonClasses = `${classes.button} ${isbump ? classes.bump : ''}`
  return (
    <button className={ buttonClasses } onClick={ props.onClick }>
      <span className={ classes.icon }>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={ classes.badge }>{ numberOfCartItems }</span>
    </button>
  );
};

export default HeaderCartButton;
