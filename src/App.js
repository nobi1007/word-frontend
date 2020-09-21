import React, { PureComponent } from "react";
import MainBody from "./components/MainBody";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wordValue: "",
    };
  }

  handleWordChange = (e, data) => {
    console.log("On Handle Chnage", data.value);
    this.setState({
      wordValue: data.value,
    });
  };

  handleSearchValue = (e, data) => {
    console.log("On Search Chnage", data.value);
    this.setState({
      wordValue: data.searchQuery,
    });
  };

  render() {
    const { wordValue } = this.state;
    return (
      <div className="app-container">
        <MainBody
          wordValue={wordValue}
          handleSearchValue={this.handleSearchValue}
          handleWordChange={this.handleWordChange}
        />
      </div>
    );
  }
}

export default App;
