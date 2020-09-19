import React, { PureComponent } from "react";
import { Dropdown, Input, Button, Modal } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import flowRight from "lodash/flowRight";
import map from "lodash/map";

import {
  onGetWordsAction,
  addWordAction,
  findWordById,
} from "../../reducers/actions";

import "./MainBody.scss";

//import query
import { fetchWordsQuery } from "../../graphql/query.graphql";
import { addWordMutation } from "../../graphql/mutation.graphql";

class MainBody extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wordValue: "",
      wordOptions: [],
      isAddWordOpened: false,
      inputValue: "",
    };
  }

  componentDidMount() {
    console.log("DId mount", this.props);
  }

  componentDidUpdate(oldProps) {
    const { onGetWordsAction, allIds, byId } = this.props;
    if (
      oldProps &&
      oldProps.data.loading &&
      this.props.data &&
      !this.props.data.loading &&
      this.props.data.getWords &&
      this.props.data.getWords.length
    ) {
      onGetWordsAction(this.props.data.getWords);
    }
  }

  handleWordChange = (e, data) => {
    this.setState({
      wordValue: data.value,
    });
    console.log("word changed", this.state.wordValue);
  };

  getAllOptions = () => {
    const { allIds } = this.props;
    const wordOptions = [];

    if (allIds && allIds.length) {
      allIds.forEach((word, inx) => {
        wordOptions.push({
          key: word,
          value: word,
          text: word,
        });
      });
    }
    return wordOptions;
  };

  onClose = () => {
    this.setState({
      isAddWordOpened: false,
    });
  };

  onOpen = () => {
    this.setState({
      isAddWordOpened: true,
    });
  };

  onChange = (e, data) => {
    this.setState({
      inputValue: data.value,
    });
  };

  postWord = () => {
    const { inputValue } = this.state;
    const { addWordMutation, addWordAction } = this.props;
    if (inputValue) {
      addWordAction(inputValue, addWordMutation);
      console.log("Input Value", inputValue);
    }
  };

  getWords = () => {
    const { allIds, findWordById } = this.props;
    return map(allIds, (wordId, index) => {
      const wordData = findWordById(wordId);
      return (
        <div style={{ color: "#000" }}>
          <div>{wordData.wordName}</div>
        </div>
      );
    });
  };

  render() {
    const { wordValue, wordOptions, isAddWordOpened, inputValue } = this.state;
    return (
      <div className="main-body">
        <div className="header">
          <div className="title">Vocab</div>
          <div className="input-btn">
            <Dropdown
              className="word-picker"
              fluid
              selection
              search={true}
              options={this.getAllOptions()}
              value={wordValue}
              placeholder="Search"
              onChange={this.handleWordChange}
            />
          </div>
        </div>
        <div className="display">
          <div className="header">Words List</div>
          <div className="main-content">
            <div className="word-list">{this.getWords()}</div>
            <div className="float-btn">
              <Button content="+" onClick={this.onOpen} />
            </div>
          </div>
        </div>
        <Modal open={isAddWordOpened} onClose={this.onClose}>
          <div className="add-word-modal-container">
            <div className="add-word-modal-input-container">
              <Input
                placeholder="Write your here..."
                fluid
                value={inputValue}
                onChange={this.onChange}
              />
            </div>

            <Button
              content="Add Word"
              disabled={inputValue ? false : true}
              onClick={this.postWord}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

const MainBodyQuery = graphql(fetchWordsQuery, {
  options: (props) => {
    return {
      variables: {},
    };
  },
})(MainBody);

const mapStateToProps = (state, props) => {
  return {
    allIds: state.MainReducer.word.allIds,
    byId: state.MainReducer.word.byId,
  };
};

const mapActionsToProps = {
  onGetWordsAction,
  addWordAction,
  findWordById,
};

const MainBodyMutation = flowRight(
  graphql(addWordMutation, { name: "addWordMutation" }),
)(MainBodyQuery);

export default connect(mapStateToProps, mapActionsToProps)(MainBodyMutation);
