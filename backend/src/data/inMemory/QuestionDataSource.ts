import { DataSource } from "apollo-datasource";
import { readFileSync } from "fs";
import { IQuestionDataSource, QuestionModel } from "../types";

export class QuestionDataSource
  extends DataSource
  implements IQuestionDataSource
{
  #questions: QuestionModel[];

  constructor() {
    super();
    this.#questions = JSON.parse(
      readFileSync("../../../../trivia.json", "utf-8")
    );
  }

  getQuestion(id: string): Promise<QuestionModel | undefined> {
    return Promise.resolve(this.#questions.find((q) => q.id === id));
  }

  async getQuestions() {
    return Promise.resolve(this.#questions.slice(0, 10));
  }
}
