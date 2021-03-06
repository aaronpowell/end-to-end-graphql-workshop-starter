import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { ApolloContext } from "../../apolloContext";
import { arrayRandomiser } from "../../utils";
import { IQuestionDataSource, ModelType, QuestionModel } from "../types";

export class QuestionDataSource
  extends CosmosDataSource<QuestionModel, ApolloContext>
  implements IQuestionDataSource
{
  async getQuestions(): Promise<QuestionModel[]> {
    const questions = await this.findManyByQuery({
      query: "SELECT * FROM c WHERE c.modelType = @type",
      parameters: [{ name: "@type", value: ModelType.Question }],
    });

    return arrayRandomiser(questions.resources).slice(0, 10);
  }
  async getQuestion(id: string) {
    const question = await this.findOneById(id);

    return question;
  }
}
