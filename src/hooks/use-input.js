import { useState } from "react";

const useInput = (validateValueFn) => {

    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValueFn(enteredValue); // this is re - render, re eval on comp re render, works like an every key stroke
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = e => {
        setEnteredValue(e.target.value);
    }

    const inputBlurHandler = e => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        hasError,
        isValid: valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }

}
export default useInput;