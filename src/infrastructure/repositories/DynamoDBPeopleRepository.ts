import AWS from 'aws-sdk';
import {PeopleModel} from "../models/PeopleModel";

AWS.config.update({
    region: process.env.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    ...(process.env.STAGE === 'prod' ? {} : { endpoint: process.env.DATABASE_URL || "http://localhost:9000" }),
});

export class DynamoDBPeopleRepository {
  private readonly tableName = 'Peoples';

  async save(people: PeopleModel): Promise<void> {
    await dynamoDB.put({
      TableName: this.tableName,
      Item: people.toJSON(),
    }).promise();
  }

  async findByUuid(id: string): Promise<PeopleModel | null> {
    const result = await dynamoDB.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();

    return result.Item as PeopleModel || null;
  }

  async findById(id: number): Promise<PeopleModel | null> {
      const params = {
          TableName: this.tableName,
          FilterExpression: '#id = :idValue',
          ExpressionAttributeNames: {
              '#id': 'id'
          },
          ExpressionAttributeValues: {
              ':idValue': id
          }
      };

      try {
          const result = await dynamoDB.scan(params).promise();
          if (result.Items && result.Items.length > 0) {
              return result.Items[0] as PeopleModel;
          }
          return null;
      } catch (error) {
          console.error('Error finding people by id:', error);
          throw error;
      }
  }
  async findAll(): Promise<Array<PeopleModel> | null > {
    const params = {
        TableName: this.tableName,
    };
    const result = await dynamoDB.scan(params).promise();
    return result.Items as Array<PeopleModel> || null;
  }
}

