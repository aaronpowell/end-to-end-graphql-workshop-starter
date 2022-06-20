import { QuestionResolvers } from "../generated/graphql";
import { arrayRandomiser } from "../utils";

export const Question: QuestionResolvers = {
  answers(question) {
    return arrayRandomiser(
      question.incorrect_answers.concat(question.correct_answer)
    );
  },
};
