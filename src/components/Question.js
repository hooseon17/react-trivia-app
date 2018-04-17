import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions, submitAnswer, tryAgain } from '../actions/questionAction';

class Question extends Component {

    fetchQuestionsHandler() {
        this.props.fetchQuestions();
    }

    submitAnswerHandler = (event) => {
        this.props.submitAnswer(event.target.value);
    }

    tryAgainHandler = () => {
        this.props.tryAgain();
    }

    decodeQuestion = (encoded) => {
        let decoded = '';
        decoded = encoded.replace(/&amp;/g, '&');
        decoded = decoded.replace(/&quot;/g, '"');
        decoded = decoded.replace(/&#039;/g, "'");
        decoded = decoded.replace(/&rsquo;/g, "'");
        return decoded;
      }

    render() {
        const start = (!(this.props.hideIntro) && !(this.props.finished)) ? (
            <div>
                <p>We will ask you 10 random True or False questions from Open Trivia DB!</p>
                <p>Click the button below to start!</p>
                <button onClick={() => this.fetchQuestionsHandler()}>Get Started!</button>
            </div>
        ) : (null);
        const question = (this.props.hideIntro && !(this.props.finished)) ? (
            <div>
                <h1>{'Question #' + this.props.questionCounter}</h1>
                <h3>{this.props.category}</h3>
                <p>{this.decodeQuestion(this.props.currentQuestion)}</p>
                <button value="True" onClick={(event) => this.submitAnswerHandler(event)}>True</button>
                <button value="False" onClick={(event) => this.submitAnswerHandler(event)}>False</button>
            </div>
        ) : (null)
        const end = (this.props.finished) ? (
            <div>
                <p>{'You got ' + (this.props.score/0.1) + '%!'}</p>
                <button onClick={() => this.tryAgainHandler()}>Try Again?</button>
            </div>
        ) : (null);
        return (
            <div>
                {start}
                {question}
                {end}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    hideIntro: state.questions.hideIntro,
    questionList: state.questions.questionList,
    questionCounter: state.questions.questionCounter,
    currentQuestion: state.questions.currentQuestion,
    currentAnswer: state.questions.currentAnswer,
    category: state.questions.category,
    score: state.questions.score,
    finished: state.questions.finished
});

export default connect(mapStateToProps, { fetchQuestions, submitAnswer, tryAgain })(Question);