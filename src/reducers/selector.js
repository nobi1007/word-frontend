export const getWords = (state, props) => {
  const allIds = state.MainReducer.word.allIds;
  let list = [...allIds];
  if (props.wordValue) {
    list = [];
    allIds.forEach((wordId) => {
      if (wordId.includes(props.wordValue.toLowerCase())) {
        list.push(wordId);
      }
    });
  }
  return list;
};
