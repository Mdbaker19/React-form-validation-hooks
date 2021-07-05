import useMyInput from "../hooks/use-myInput";

const validateNameInput = (inputStr) => {
    return inputStr.trim() !== "";
}
const validateEmail = (inputStr) => {
    return inputStr.includes("@") &&
        inputStr.trim() !== "" &&
        inputStr.includes(".");
}

const BasicForm = (props) => {

    const {
        value: enteredName,
        valid: enteredNameIsValid,
        hasErrors: nameHasErrors,
        valueChangeHandler: nameInputChangeHandler,
        valueBlurHandler: nameInputBlurHandler,
        reset: resetName
    } = useMyInput(validateNameInput);

    const {
        value: enteredLastName,
        valid: lastNameIsValid,
        hasErrors: lastNameHasErrors,
        valueChangeHandler: lastNameChangeHandler,
        valueBlurHandler: lastNameBlurHandler,
        reset: resetLastName
    } = useMyInput(validateNameInput);

    const {
        value: enteredEmail,
        valid: enteredEmailIsValid,
        hasErrors: emailHasErrors,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useMyInput(validateEmail);


    let formIsValid = false;

    if(enteredNameIsValid && lastNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = e => {
        e.preventDefault();
        resetName();
        resetLastName();
        resetEmail();

        let data = {
            name: enteredName + " " + enteredLastName,
            email: enteredEmail
        }
        console.log(data);
    }

    const nameInputClass = nameHasErrors ? "form-control invalid" : "form-control";

    const lastNameClass = lastNameHasErrors ? "form-control invalid" : "form-control";

    const emailClass = emailHasErrors ? "form-control invalid" : "form-control";

    return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={nameInputClass}>
          <label htmlFor='name'>First Name</label>
          <input
              type='text'
              id='name'
              value={enteredName}
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
          />
            {nameHasErrors && <p>Name can not be empty.</p>}
        </div>
        <div className={lastNameClass}>
          <label htmlFor='name'>Last Name</label>
          <input
              type='text'
              id='name'
              value={enteredLastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
          />
            {lastNameHasErrors && <p>Last name can not be empty.</p>}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
            type='text'
            id='name'
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
        />
          {emailHasErrors && <p>Email must be valid.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
    );
};

export default BasicForm;
