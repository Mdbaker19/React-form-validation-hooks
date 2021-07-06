import { useReducer } from "react";

const initialInputState = {
    value: "",
    isTouched: false
}

const inputStateReducer = (state, action) => {
    if (action.type === "INPUT") {
        return { value: action.value, isTouched: state.isTouched };
    } else if (action.type === "BLUR") {
        return { value: state.value, isTouched: true };
    } else if (action.type === "RESET") {
        return { value: "", isTouched: false };
    }
    return inputStateReducer;
}

const useMyInput = (validateFn) => {

    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    // const [enteredValue, setEnteredValue] = useState("");
    // const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateFn(inputState.value);
    const hasErrors = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = e => {
        dispatch( { type: "INPUT", value: e.target.value } );
    }

    const valueBlurHandler = () => {
        dispatch( { type: "BLUR" } );
    }

    const reset = () => {
        dispatch( { type: "RESET" } );
    }

    return {
        value: inputState.value,
        valid: valueIsValid,
        hasErrors,
        valueChangeHandler,
        valueBlurHandler,
        reset
    }

}
export default useMyInput;