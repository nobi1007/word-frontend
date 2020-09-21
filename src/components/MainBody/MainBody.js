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

import { getWords } from "../../reducers/selector";

class MainBody extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wordOptions: [],
      isAddWordOpened: false,
      inputValue: "",
      isSaving: false,
    };
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
      this.setState({
        isSaving: true,
      });

      addWordAction(inputValue.toLowerCase(), addWordMutation);
      setTimeout(() => {
        this.setState({
          isSaving: false,
          inputValue: "",
        });
        this.onClose();
      }, 500);
    }
  };

  getType = (typeList) => {
    return map(typeList, (typeData, index) => {
      return (
        <div key={index} style={{ display: "flex", fontSize: "14px" }}>
          <div className="words-list-type-container">({typeData.type})</div>
          {typeData.meanings &&
            typeData.meanings.length &&
            this.getMeanings(typeData.meanings)}
        </div>
      );
    });
  };

  getMeanings = (meanings) => {
    let meaningData = "";
    meanings.forEach((meaning) => {
      meaningData = `${meaning}; `;
    });
    return <div>{meaningData}</div>;
  };

  getWords = () => {
    const { allIds, findWordById } = this.props;
    return map(allIds, (wordId, index) => {
      const wordData = findWordById(wordId);
      return (
        <div key={index} style={{ color: "#000", marginBottom: "20px" }}>
          <div className="word-list-heading">{wordData.wordName}</div>
          {wordData.desc && wordData.desc.length && this.getType(wordData.desc)}
        </div>
      );
    });
  };

  render() {
    const { isAddWordOpened, inputValue, isSaving } = this.state;
    const { wordValue, handleWordChange, handleSearchValue } = this.props;
    return (
      <div className="main-body">
        <div className="header">
          <div className="title">Vocab</div>
          <div className="input-btn">
            <Dropdown
              className="word-picker"
              fluid
              selection
              clearable
              search={true}
              options={this.getAllOptions()}
              value={wordValue}
              placeholder="Search"
              onChange={handleWordChange}
              onSearchChange={handleSearchValue}
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
              loading={isSaving}
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
    allIds: getWords(state, props),
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
