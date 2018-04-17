import { FETCH_QUESTIONS, SUBMIT_ANSWER, TRY_AGAIN } from '../actions/types';

const initialState = {
    hideIntro: false,
    questionList: [],
    questionCounter: 0,
    currentQuestion: '',
    currentAnswer: '',
    category: '',
    score: 0,
    finished: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return {
                ...state,
                hideIntro: true,
                questionList: action.payload,
                currentQuestion: action.payload[0].question,
                currentAnswer: action.payload[0].correct_answer,
                category: action.payload[0].category,
                questionCounter: state.questionCounter += 1,
            }
        case SUBMIT_ANSWER:
            if (state.questionCounter >= 10) {
                if (action.payload === state.currentAnswer) {
                    return {
                        ...state,
                        score: state.score += 1,
                        currentQuestion: '',
                        currentAnswer: '',
                        category: '',
                        finished: true
                    }
                } else {
                    return {
                        ...state,
                        currentQuestion: '',
                        currentAnswer: '',
                        category: '',
                        finished: true
                    }
                }
            } else {
                if (action.payload === state.currentAnswer) {
                    return {
                        ...state,
                        score: state.score += 1,
                        currentQuestion: state.questionList[state.questionCounter].question,
                        currentAnswer: state.questionList[state.questionCounter].correct_answer,
                        category: state.questionList[state.questionCounter].category,
                        questionCounter: state.questionCounter += 1,
                    }
                } else {
                    return {
                        ...state,
                        currentQuestion: state.questionList[state.questionCounter].question,
                        currentAnswer: state.questionList[state.questionCounter].correct_answer,
                        category: state.questionList[state.questionCounter].category,
                        questionCounter: state.questionCounter += 1,
                    }
                }
            }
        case TRY_AGAIN:
            return {
                ...state,
                hideIntro: false,
                questionList: [],
                questionCounter: 0,
                currentQuestion: '',
                currentAnswer: '',
                category: '',
                score: 0,
                finished: false
            }
        default:
            return state;
    }
}