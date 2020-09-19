/**
 * @author Shyam Mittal
 * @email mittalshyam1007@gmail.com
 * @create date 2020-04-22 23:51:30
 * @modify date 2020-04-22 23:51:30
 * @desc [description]
 */

import initialState from "./initialState";
import { GET_WORDS } from "./actions";

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORDS:
      const { wordIdList, wordById } = action.payload;
      state = {
        ...state,
        word: {
          allIds: [...wordIdList],
          byId: { ...wordById },
        },
      };
      break;

    default:
      break;
  }
  return state;
};

export default MainReducer;
