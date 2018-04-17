import { FETCH_QUESTIONS, SUBMIT_ANSWER, TRY_AGAIN } from './types';

export const fetchQuestions = () => dispatch => {
    fetch('https://opentdb.com/api.php?amount=10&type=boolean')
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: FETCH_QUESTIONS,
                payload: data.results
            })
        );
}

export const submitAnswer = (value) => dispatch => {
    dispatch({
        type: SUBMIT_ANSWER,
        payload: value
    });
}

export const tryAgain = () => dispatch => {
    dispatch({
        type: TRY_AGAIN,
        payload: ''
    });
}
