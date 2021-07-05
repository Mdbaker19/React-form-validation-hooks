import useInput from '../hooks/use-input';

const validateEmail = (emailStr) => {
    return emailStr.includes("@") &&
            emailStr.trim() !== "" &&
            emailStr.includes(".");
}

const validateName = (nameStr) => {
    return nameStr.trim() !== "";
}

const SimpleInput = (props) => {

    const {
        value: enteredName,
        hasError: nameInputHasError,
        isValid: enteredNameIsValid,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput,
        valueChangeHandler: nameChangeHandler
    } = useInput(validateName);

    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        isValid: enteredEmailIsValid,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput,
        valueChangeHandler: emailChangeHandler
    } = useInput(validateEmail);

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = e => {
        e.preventDefault();
        if (!enteredNameIsValid || !enteredEmailIsValid) return;
        // nameInputRef.current.value = ""; DO NOT DO THIS, NOT IDEAL TO MANIPULATE DOM YOURSELF, LET REACT DO IT
        resetNameInput();
        resetEmailInput();
    }

    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text'
               id='name'
               onChange={nameChangeHandler}
               value={enteredName}
               onBlur={nameInputBlurHandler}
        />
          {nameInputHasError && <p className="error-text">Name can not be empty.</p>}
      </div>
        <div className={emailInputClasses}>
            <label htmlFor="email">Your Email</label>
            <input type="email"
                   id="email"
                   onChange={emailChangeHandler}
                   value={enteredEmail}
                   onBlur={emailInputBlurHandler}
            />
            {emailInputHasError && <p className="error-text">Email must be valid.</p> }
        </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
    );
};

export default SimpleInput;
