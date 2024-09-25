import AWS from 'aws-sdk';
import { PeopleRepository } from '../../domain/repositories/PeopleRepository';
import { PeopleEntity } from '../../domain/entities/PeopleEntity';
import { v4 as uuidv4 } from "uuid";

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
    const uuid = uuidv4();
    people.uuid = uuid;
    console.log("repository people ", people);
    await dynamoDB.put({
      TableName: this.tableName,
      Item: people,
    }).promise();
  }

  async findByUuid(id: string): Promise<PeopleEntity | null> {
      console.log('repository id:', id);
    const result = await dynamoDB.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();

    return result.Item as PeopleEntity || null;
  }
  async findById(id: number): Promise<PeopleEntity | null> {
    console.log('repository id:', id);
    const params = {
        TableName: this.tableName,
        Limit : 1,
        FilterExpression: 'id = :id',
        ExpressionAttributeValues: {
             ':id': 'id'
        }
    };
    const result = await dynamoDB.scan(params).promise();
    let firstItem = null;
    if (result.Items && result.Items.length > 0)
    firstItem = result.Items[0];
    return firstItem as PeopleEntity || null;
  }
  async findAll(): Promise<Array<PeopleEntity> | null > {
    const params = {
        TableName: this.tableName,
    };
    const result = await dynamoDB.scan(params).promise();
    return result.Items as Array<PeopleEntity> || null;
  }
}
