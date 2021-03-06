import React, { Component } from "react";
import Keypad from "./Keypad";
import Screen from "./Screen";
import "./Calculator.css";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      result: 0,
      prevValIsOperator: false
    };

    this.handleAppend = this.handleAppend.bind(this);
    this.handleAppendOp = this.handleAppendOp.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.handleCalc = this.handleCalc.bind(this);
    this.handlePercent = this.handlePercent.bind(this);
    this.handleNegate = this.handleNegate.bind(this);
  }

  handleAppend(num) {
    if (
      (num === "0" && this.state.display) === "" ||
      (num === "." && this.state.display.toString().slice(-1)[0] === ".") ||
      (num === "." && this.state.prevValIsOperator) ||
      (num === "." && this.state.display.toString().indexOf(".") !== -1)
    ) {
      return;
    }

    if (num === "." && this.state.display === "") {
      this.setState({
        display: "0" + num
      });
    }

    this.setState({
      display: this.state.display + num,
      prevValIsOperator: false
    });
  }

  handleAppendOp(op) {
    if (this.state.display === "") {
      return;
    }

    if (this.state.prevValIsOperator) {
      const newOp = this.state.display.slice(0, -1);
      this.setState({
        display: newOp + op
      });
      return;
    }

    this.setState({
      display: this.state.display + op,
      prevValIsOperator: true
    });
  }

  handleClear() {
    this.setState({
      display: ""
    });
  }

  handleClearAll() {
    this.setState({
      display: "",
      result: 0
    });
  }

  handleCalc() {
    if (this.state.display === "" || this.state.prevValIsOperator) {
      return;
    }
    this.setState({
      display: eval(this.state.display),
      result: eval(this.state.display)
    });
  }

  handlePercent() {
    if (this.state.display === "" || this.state.prevValIsOperator) {
      return;
    }
    this.setState({
      display: eval(this.state.display) / 100,
      result: eval(this.state.display) / 100
    });
  }

  handleNegate() {
    if (this.state.display === "" || this.state.prevValIsOperator) {
      return;
    }
    this.setState({
      display: "",
      result: this.state.display - this.state.display * 2
    });
  }

  render() {
    return (
      <main id="calculator_container">
        <Screen display={this.state.display} result={this.state.result} />
        <Keypad
          displayVal={this.state.display}
          resultVal={this.state.result}
          onClickNum={this.handleAppend}
          onClickOp={this.handleAppendOp}
          onClear={this.handleClear}
          onClearAll={this.handleClearAll}
          onCalc={this.handleCalc}
          onPercent={this.handlePercent}
          onNegate={this.handleNegate}
        />
      </main>
    );
  }
}
