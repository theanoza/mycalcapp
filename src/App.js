import React from 'react';
import './App.css';

  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const operators = ["/", "*", "-", "+"];
  const ids = {
    7: "seven",
    8: "eight",
    9: "nine",
    4: "four",
    5: "five",
    6: "six",
    1: "one",
    2: "two",
    3: "three",
    0: "zero",
    "/": "divide",
    "*": "multiply",
    "-": "subtract",
    "+": "add"
  };

  class App extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
      lastPressed: undefined,
      display: "0",
      operation: undefined
    };
  
    handleClick = (e) => {
      const { display, lastPressed } = this.state;
      const { innerText } = e.target;

      switch (innerText) {
        case "AC": {
          this.setState({
            display: "0"
          });
          break;
        }
  
        case ".": {
          const splitted = display.split(/[\+\-\*\/]/);
          const last = splitted.slice(-1)[0];
  
          if (!last.includes(".")) {
            this.setState({
              display: display + "."
            });
          }
          break;
        }
  
        case "=": {
          const answer = eval(display);
          this.setState({
            display: answer
          });
          break;
        }

        default: {
          let e = undefined;
          if (operators.includes(innerText)) {
            if (operators.includes(lastPressed) && innerText !== "-") {
              const lastNumberIdx = display.split("").reverse().findIndex((char) => char !== " " && numbers.includes(+char));
              e = display.slice(0, display.length - lastNumberIdx) + ` ${innerText} `;
            } else {
              e = `${display} ${innerText} `;
            }
          } else {
            e = display === "0" ? innerText : display + innerText;
          }
  
          this.setState({
            display: e
          });
        }
      }
  
      this.setState({
        lastPressed: innerText
      });
    };
  
    render() {
      const { display } = this.state;
      return (
        <div id="main-div">
          <div id="display">{display}</div>
          <div id="number-container">
            <div id="wrapper-div">
              <div id="numbers">
                <div id="ac-wrapper">
                  <button className="big-h light-grey ac" onClick={this.handleClick} id="clear" > AC </button>
                </div>
                {numbers.map((num) => (
                  <button id={ids[num]} key={num} onClick={this.handleClick} className="numbers">
                    {num}
                  </button>
                ))}
  
                <button onClick={this.handleClick} id="decimal" className="dot"> . </button>
              </div>
  
              <div id="operators-container">
                {operators.map((op) => (
                  <button id={ids[op]} key={op} onClick={this.handleClick} className="operations"> {op} </button>
                ))}
  
                <button onClick={this.handleClick} id="equals"> = </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default App;
  