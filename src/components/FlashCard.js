import "./FlashCard.css"
import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { SaveAlt } from '@material-ui/icons';

export default class FlashCard extends Component {


    constructor(props) {
        super(props)
        this.state = {
            frontContent: this.props.frontContent,
            backContent: this.props.backContent
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleChange(evt) {
        evt.preventDefault()
        console.log(evt.target.name)
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    submitForm(evt) {
        // submitting form. this will pass data up to parent.
        evt.preventDefault()
        let content = this.props.showFront ? this.state.frontContent : this.state.backContent
        this.props.updateCard(content, this.props.current)
    }
    // najverojatno ima nekakov problem so submitform ili handlechange poradi toa sto smeniv promenlivi
    // TODO fix edit form when editting.
    render() {

        const { isForm, showFront } = this.props
        let { frontContent, backContent } = this.state

        const form = <form onSubmit={this.submitForm}>

            <label>
                <input
                    onChange={(evt) => this.handleChange(evt)}
                    type="text"
                    name={`${showFront ? 'frontContent' : "backContent"}`}
                    value={showFront ? frontContent : backContent}
                />
            </label>
            <br />
            <Button color="primary" type="submit" >
                <SaveAlt />
            </Button>
        </form>


        return (
            <div className="FlashCard_Content">
                {isForm ? form : (showFront ? frontContent : backContent)}
            </div>
        )
    }
}
