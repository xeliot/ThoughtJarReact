import React, { Component } from "react";
import "./Dynamik.css";
import { ShortAnswer } from "./SurveyQuestionTemplates.js";
import { LongAnswer } from "./SurveyQuestionTemplates.js";
import { DropdownButton, MenuItem, ButtonToolbar } from "react-bootstrap";

export default class Dynamik extends Component {
  constructor (props) {
    super(props);
    this.state = {
      surveyquestions: []
    };
    this.keycount = 1;
    this.createShortAnswer = this.createShortAnswer.bind(this);
    this.createLongAnswer = this.createLongAnswer.bind(this);
    this.loadSurveyQuestions = this.loadSurveyQuestions.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  deleteQuestion(id) {
      var deleteIndex = -1;
      for (var i=0; i<this.state.surveyquestions.length; i++){
        if (this.state.surveyquestions[i].props.id === (id)){
          deleteIndex = i;
          break;
        }
      }
      if(deleteIndex !== -1){
        const updatedSurveyQuestions = [...this.state.surveyquestions];
        updatedSurveyQuestions.splice(deleteIndex, 1);
        this.setState({surveyquestions: updatedSurveyQuestions});
      }
  }

  createLongAnswer() {
    const deleteId = this.keycount;
    const newSurveyQuestions = this.state.surveyquestions.concat(<LongAnswer delete={() => this.deleteQuestion(deleteId)} id={deleteId} key={this.keycount} />);
    this.setState({surveyquestions: newSurveyQuestions});
    this.keycount += 1;
  }

  createShortAnswer() {
    const deleteId = this.keycount;
    const newSurveyQuestions = this.state.surveyquestions.concat(<ShortAnswer delete={() => this.deleteQuestion(deleteId)} id={deleteId} key={this.keycount} />);
    this.setState({surveyquestions: newSurveyQuestions});
    this.keycount += 1;
  }

  loadSurveyQuestions() {
    return (this.state.surveyquestions);
  }

  render() {
    return(
      <div className="Dynamik">
        <div className="DynamikHeader">
          <h2>Welcome To Dynamik.</h2>
          <p>Click Add to start building.</p>
        </div>
        {this.loadSurveyQuestions()}
        <ButtonToolbar className="add-question">
          <DropdownButton bsSize="large" title="Add" id="dropdown-size-large" dropup pullRight>
            <MenuItem eventKey="1" onClick={this.createShortAnswer}>Short Answer Question</MenuItem>
            <MenuItem eventKey="2" onClick={this.createLongAnswer}>Long Answer Question</MenuItem>
            <MenuItem eventKey="3">Number Answer Question</MenuItem>
            <MenuItem eventKey="4">Multiple Choice Question</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}
