import { gql } from "apollo-boost";

export const fetchWordsQuery = gql`
  query fetchWords {
    getWords {
      wordName
      desc {
        type
        meanings
      }
    }
  }
`;
