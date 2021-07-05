import { useState } from "react";

const useMyInput = (validateFn) => {

    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateFn(enteredValue);
    const hasErrors = !valueIsValid && isTouched;

    const valueChangeHandler = e => {
        setEnteredValue(e.target.value);
    }

    const valueBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        valid: valueIsValid,
        hasErrors,
        valueChangeHandler,
        valueBlurHandler,
        reset
    }

}
export default useMyInput;