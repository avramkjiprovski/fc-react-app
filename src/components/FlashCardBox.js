import "./FlashCardBox.css"
import FlashCard from './FlashCard'
import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { AddBox, Delete, Edit, Flip, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { v4 as uuid } from 'uuid';

export default class FlashCardBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showFront: true,
            currentCard: 0,
            isForm: false,
            questions: [
                "What is a react component?",
                "How are parameters sent to the component?",
                "What does the render method return?"
            ],
            answers: [
                "A react component is a simple javascript class that must be inherited to write a react component.",
                "Via the props parameter.",
                "a react element"
            ]
        }

        this.nextCard = this.nextCard.bind(this)
        this.prevCard = this.prevCard.bind(this)
        this.toggleForm = this.toggleForm.bind(this)
        this.updateCard = this.updateCard.bind(this)
        this.addCard = this.addCard.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
    }

    nextCard(){
        if(this.state.currentCard+1 < this.state.questions.length){
            this.setState({
                currentCard: this.state.currentCard+1,
                isForm: false
            })
        }
    }

    prevCard(){
        if(this.state.currentCard-1 >= 0){
            this.setState({
                currentCard: this.state.currentCard-1,
                isForm: false
            })
        }
    }

    toggleSide(){
        this.setState({
            showFront: !this.state.showFront,
            isForm: false
        })
    }

    toggleForm(){
        this.setState({
            isForm: !this.state.isForm
        })
    }

    updateCard(editedContent, current){
        if(this.state.showFront){
            let newQuestions = this.state.questions
            newQuestions[current] = editedContent
            this.setState({
                questions: newQuestions,
                isForm: false
            })
        }else{
            let newAnswers = this.state.answers
            newAnswers[current] = editedContent
            this.setState({
                answers: newAnswers,
                isForm: false
            })
        }
    } 

    addCard(){
        let questions = this.state.questions
        let answers = this.state.answers
        
        questions.push("New question(edit me)")
        answers.push("New answer(edit me)")

        
        let newCurrent = questions.length-1

        this.setState({
            questions: questions,
            answers: answers,
            currentCard: newCurrent
        })
    }

    deleteCard(){
        let questions = this.state.questions
        let answers = this.state.answers
        let current = this.state.currentCard

        questions.splice(current, 1)
        answers.splice(current, 1)

        switch(current){
            case 0: 
                current++
                break
            case questions.length: 
                current--
                break
            default: break
        }
        

        this.setState({
            questions: questions,
            answers: answers,
            currentCard: current
        })

    }

    render() {

        return(
            <div className="FlashCardBox_Center">

                <FlashCard 
                    showFront={this.state.showFront}
                    frontContent={this.state.questions[this.state.currentCard]}
                    backContent={this.state.answers[this.state.currentCard]}
                    isForm={this.state.isForm}
                    updateCard={this.updateCard}
                    key={uuid()}
                    current={this.state.currentCard}
                />

                <div className="FCB_BotButtons">
                    <Button onClick={this.addCard} color="primary">
                        <AddBox />
                    </Button>
                    <Button onClick={this.deleteCard} color="primary">
                        <Delete />
                    </Button>
                    <Button onClick={this.toggleForm} color="primary">
                        <Edit />
                    </Button>
                    <Button onClick={()=>this.toggleSide()} color="primary">
                        <Flip />
                    </Button>
                    <Button onClick={()=>this.prevCard()} color="primary">
                        <KeyboardArrowLeft />
                    </Button>
                    <Button onClick={()=>this.nextCard()} color="primary">
                        <KeyboardArrowRight />
                    </Button>
                </div>

            </div>
        )
    }
}