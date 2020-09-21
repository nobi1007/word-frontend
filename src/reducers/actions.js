export const GET_WORDS = "store_words";

export const onGetWordsAction = (wordList) => {
  return (dispatch, getState) => {
    const wordIdList = [];
    const wordById = {};
    if (wordList && wordList.length) {
      wordList.forEach((word) => {
        if (wordIdList.indexOf(word.wordName) === -1) {
          wordIdList.push(word.wordName);
        }
        wordById[word.wordName] = word;
      });
      dispatch({
        type: GET_WORDS,
        payload: {
          wordIdList,
          wordById,
        },
      });
    }
  };
};

export const addWordAction = (word, mutation) => {
  return (dispatch, getState) => {
    const state = getState();
    mutation({
      variables: {
        wordName: word,
      },
    })
      .then((response) => {
        // console.log("Saveed data", response);
        if (response && response.data && response.data.addWord) {
          const wordIdList = state.MainReducer.word.allIds;
          const wordById = state.MainReducer.word.byId;
          wordById[word] = response.data.addWord;
          if (wordIdList.indexOf(word) === -1) {
            wordIdList.splice(0, 0, word);
          }
          dispatch({
            type: GET_WORDS,
            payload: {
              wordIdList,
              wordById,
            },
          });
        }
      })
      .catch((error) => {
        // console.error("Error in saving word", error);
      });
  };
};
export const findWordById = (word) => {
  return (dispatch, getState) => {
    const state = getState();
    const wordById = state.MainReducer.word.byId;
    if (wordById && wordById[word]) {
      return wordById[word];
    }
  };
};
