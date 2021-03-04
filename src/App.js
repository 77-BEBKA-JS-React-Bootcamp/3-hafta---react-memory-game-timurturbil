
import React, { Component } from 'react';
import './App.scss'
import Card from './CardComp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rights: 5,
      puan: 0,
      cards: [
        { "id": 0, "front": "Click", "back": "Timur", "isFlipped": false, "framework": 'angular2' },
        { "id": 1, "front": "Click", "back": "Ahmet", "isFlipped": false, "framework": 'vue' },
        { "id": 2, "front": "Click", "back": "Timur", "isFlipped": false, "framework": 'react' },
        { "id": 3, "front": "Click", "back": "Mehmet", "isFlipped": false, "framework": 'grunt' },
        { "id": 4, "front": "Click", "back": "Mehmet", "isFlipped": false, "framework": 'phantomjs' },
        { "id": 5, "front": "Click", "back": "Ahmet", "isFlipped": false, "framework": 'phantomjs' },
        { "id": 6, "front": "Click", "back": "Merve", "isFlipped": false, "framework": 'grunt' },
        { "id": 7, "front": "Click", "back": "Merve", "isFlipped": false, "framework": 'react' },
        { "id": 8, "front": "Click", "back": "Haluk", "isFlipped": false, "framework": 'vue' },
        { "id": 9, "front": "Click", "back": "Haluk", "isFlipped": false, "framework": 'angular2' },
        { "id": 10, "front": "Click", "back": "Haluk", "isFlipped": false, "framework": 'ember' },
        { "id": 11, "front": "Click", "back": "Haluk", "isFlipped": false, "framework": 'ember' },
      ],
      flippedList: [],
    };
    /* this.shuffle(this.state.cards) */

  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setState({ cards: array })
  }



  changeItem = (id, isFlipped) => {
    /* this.setNullorfalse(null) */
    let myCard = this.state.cards.filter(card => card.id === id);
    if (myCard[0] == null) {
      return;
    }
    
    myCard[0].isFlipped = !isFlipped;
    let cardList = this.state.cards.filter(card => card.id !== id);
    let indexOfItem = this.state.cards.indexOf(myCard[0])
    cardList.splice(indexOfItem, 0, myCard[0])
    this.setState({ cards: cardList, flippedList: [...this.state.flippedList, myCard[0]], }, function () {
      setTimeout(this.check, 800);
    })

  }
  check = () => {
    if (this.state.flippedList.length === 2) {
      if (this.state.flippedList[0].framework === this.state.flippedList[1].framework && this.state.flippedList[0].id !== this.state.flippedList[1].id) {
        let newPuan = this.state.puan;
        newPuan++
        let indexOfItem1 = this.state.cards.indexOf(this.state.flippedList[0])
        let newList = this.state.cards;
        delete newList[indexOfItem1].isFlipped
        /* newList.splice(indexOfItem1, 1) */
        let indexOfItem2 = newList.indexOf(this.state.flippedList[1])
       /*  newList.splice(indexOfItem2, 1) */
       delete newList[indexOfItem2].isFlipped
        
        this.setState({ puan: newPuan, flippedList: [], cards: newList }, function(){
          console.log(newList)
        })
      } else {
        console.log(this.state.cards)
        this.setNullorfalse(false)
        let rights = this.state.rights;
        rights--
        this.setState({ flippedList: [], rights: rights })
        
      }
    } else if (this.state.flippedList.length > 2) {
      this.setState({ flippedList: [] })
    }
  }
  setNullorfalse = (value) => {
    let newListe = this.state.cards;
    for (let i = 0; i < this.state.cards.length; i++) {
      if(newListe[i].hasOwnProperty('isFlipped')){
        newListe[i].isFlipped = value;
      }
      
    }
    this.setState({ cards: newListe })
  }
  refreshPage = ()=>{
    window.location.reload();
  }

  render() {
    return (
      <div>
        <div className="Score">
        <button className="Score" onClick={this.refreshPage}> Try Again </button>
          <p> Rights to go Wrong: {this.state.rights}</p>
          <p> Your Score: {this.state.puan} out of 6 </p>
        </div>
        <div className="playground" >
          {this.state.cards.map((result, index) =>
            <Card key={index} rights={this.state.rights} framework={result.framework} cards={this.state.cards} id={result.id} front={result.front} back={result.back} isFlipped={result.isFlipped} click={(id, isFlipped) => this.changeItem(id, isFlipped)} />)}
           
        </div>
        <div className="refresh">
        
        </div>
        

      </div>

    )
  }
}
export default App;

