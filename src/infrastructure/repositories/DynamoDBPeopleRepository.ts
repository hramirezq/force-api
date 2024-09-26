import AWS from 'aws-sdk';
import { PeopleRepository } from '../../domain/repositories/PeopleRepository';
import { PeopleEntity } from '../../domain/entities/PeopleEntity';
import { v4 as uuidv4 } from "uuid";

AWS.config.update({
    region: process.env.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    ...(process.env.STAGE === 'prod' ? {} : { endpoint: process.env.DATABASE_URL || "http://localhost:9000" }),
});

export class DynamoDBPeopleRepository implements PeopleRepository {
  private readonly tableName = 'Peoples';

  async save(people: PeopleEntity): Promise<void> {
    console.log("repo people before updates: ", JSON.stringify(people, null, 2));
    const uuid = uuidv4();
    people.uuid = uuid;
      console.log("repo people after updates: ", people.toJSON());
    await dynamoDB.put({
      TableName: this.tableName,
      Item: people.toJSON(),
    }).promise();
  }

  async findByUuid(id: string): Promise<PeopleEntity | null> {
    const result = await dynamoDB.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();

    return result.Item as PeopleEntity || null;
  }

  async findById(id: number): Promise<PeopleEntity | null> {
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
              return result.Items[0] as PeopleEntity;
          }
          return null;
      } catch (error) {
          console.error('Error finding people by id:', error);
          throw error;
      }
  }
  async findAll(): Promise<Array<PeopleEntity> | null > {
    const params = {
        TableName: this.tableName,
    };
    const result = await dynamoDB.scan(params).promise();
    return result.Items as Array<PeopleEntity> || null;
  }
}

