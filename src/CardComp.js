import React, { Component } from 'react'
import ReactCardFlip from 'react-card-flip';

export default class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            isFlipped: true,
            front: this.props.front,
            back: this.props.back,
        };
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e) {
        e.preventDefault();
        if(this.props.rights > 0){
            this.props.click(this.props.id, this.props.isFlipped)
        }
    }

    render() {
        return (
            <div className="card">
                <ReactCardFlip isFlipped={this.props.isFlipped ?? this.state.isFlipped} flipDirection="horizontal">
                    <>
                    <button className="front" onClick={this.handleClick} > ? </button>
                    </>
                    <>
                    <img src={"https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" + this.props.framework + ".png"} alt="yok"/>
                    </>
                </ReactCardFlip>
            </div>
        )
    }
}
