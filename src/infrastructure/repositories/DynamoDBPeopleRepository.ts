import AWS from 'aws-sdk';
import { PeopleRepository } from '../../domain/repositories/PeopleRepository';
import { PeopleEntity } from '../../domain/entities/PeopleEntity';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DATABASE_URL,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
export class DynamoDBPeopleRepository implements PeopleRepository {
  private readonly tableName = 'Peoples';

  async save(people: PeopleEntity): Promise<void> {
    await dynamoDB.put({
      TableName: this.tableName,
      Item: people,
    }).promise();
  }

  async findById(id: string): Promise<PeopleEntity | null> {
      console.log('repository id:', id);
    const result = await dynamoDB.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();

    return result.Item as PeopleEntity || null;
  }
}
