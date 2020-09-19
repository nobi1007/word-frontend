import { gql } from "apollo-boost";

export const addWordMutation = gql`
  mutation($wordName: String!) {
    addWord(wordName: $wordName) {
      wordName
      desc {
        type
        meanings
      }
    }
  }
`;
