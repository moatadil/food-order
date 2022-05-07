import classes from './Checkout.module.css';
import { useRef, useState } from 'react'
const isEmpty = value => value.trim() === ''
const isFiveCharacter = value => value.trim().length === 5
const Checkout = (props) => {
    const [validityInput, setValidityInput] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()
    const confirmHandler = (event) => {
        event.preventDefault();
        const name = (nameInputRef.current.value)
        const street = (streetInputRef.current.value)
        const postal = (postalInputRef.current.value)
        const city = (cityInputRef.current.value)

        const nameIsValid = !isEmpty(name)
        const streetIsValid = !isEmpty(street)
        const cityIsValid = !isEmpty(city)
        const postalIsValid = isFiveCharacter(postal)
        setValidityInput({
            name: nameIsValid,
            street: streetIsValid,
            postal: postalIsValid,
            city: cityIsValid
        })
        const formIsValid =
            nameIsValid &&
            streetIsValid &&
            postalIsValid &&
            cityIsValid

        if (formIsValid) {
            const obj = {
                name,
                street,
                postal,
                city
            }
            props.onSubmit(obj)
        }
    };
    const nameInputClasses = `${classes.control} ${validityInput.name ? '' : classes.invalid}`
    const streetInputClasses = `${classes.control} ${validityInput.street ? '' : classes.invalid}`
    const postalInputClasses = `${classes.control} ${validityInput.postal ? '' : classes.invalid}`
    const cityInputClasses = `${classes.control} ${validityInput.city ? '' : classes.invalid}`
    return (
        <form className={ classes.form } onSubmit={ confirmHandler }>
            <div className={ nameInputClasses }>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={ nameInputRef } />
                { !validityInput.name && <p>Please enter valid name</p> }
            </div>
            <div className={ streetInputClasses }>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={ streetInputRef } />
                { !validityInput.street && <p>Please enter valid street</p> }
            </div>
            <div className={ postalInputClasses }>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={ postalInputRef } />
                { !validityInput.postal && <p>Please enter valid postal</p> }
            </div>
            <div className={ cityInputClasses }>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={ cityInputRef } />
                { !validityInput.city && <p>Please enter valid city</p> }
            </div>
            <div className={ classes.actions }>
                <button type='button' onClick={ props.onCancel }>
                    Cancel
                </button>
                <button className={ classes.submit }>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;