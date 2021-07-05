import { useState } from "react";

const validateEmail = (emailStr) => {
    return emailStr.includes("@") &&
            emailStr.trim() !== "" &&
            emailStr.includes(".");
}

const SimpleInput = (props) => {

    const [nameValue, setNameValue] = useState("");
    const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

    const enteredNameIsValid = nameValue.trim() !== ""; // this is re - render, re eval on comp re render, works like an every key stroke
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

    const [emailValue, setEmailValue] = useState("");
    const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);

    const enteredEmailIsValid = validateEmail(emailValue);
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched;

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const emailChangeHandler = e => {
        setEmailValue(e.target.value);
    }

    const emailInputBlurHandler = e => {
        setEnteredEmailIsTouched(true);
    }

    const nameChangeHandler = e => { // every key stroke
        setNameValue(e.target.value);
    }

    const nameInputBlurHandler = e => {
        setEnteredNameIsTouched(true);
    }

    const formSubmitHandler = e => {
        e.preventDefault();
        setEnteredNameIsTouched(true);
        setEnteredEmailIsTouched(true);

        if (!enteredNameIsValid || !enteredEmailIsValid) return;
        console.log(nameValue);
        // nameInputRef.current.value = ""; DO NOT DO THIS, NOT IDEAL TO MANIPULATE DOM YOURSELF, LET REACT DO IT
        setNameValue("");
        setEmailValue("");
        setEnteredEmailIsTouched(false);
        setEnteredNameIsTouched(false); // needed for form submit when the value is "", it was error-ing out after submit
    }

    const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

    return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text'
               id='name'
               onChange={nameChangeHandler}
               value={nameValue}
               onBlur={nameInputBlurHandler}
        />
          {nameInputIsInvalid && <p className="error-text">Name can not be empty.</p>}
      </div>
        <div className={emailInputClasses}>
            <label htmlFor="email">Your Email</label>
            <input type="email"
                   id="email"
                   onChange={emailChangeHandler}
                   value={emailValue}
                   onBlur={emailInputBlurHandler}
            />
            {emailInputIsInvalid && <p className="error-text">Email must be valid.</p> }
        </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
    );
};

export default SimpleInput;
