import AWS from 'aws-sdk';
import { CharacterRepository } from '../../domain/repositories/CharacterRepository';
import { Character } from '../../domain/entities/Character';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DATABASE_URL,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
export class DynamoDBCharacterRepository implements CharacterRepository {
  private readonly tableName = 'Characters';

  async save(character: Character): Promise<void> {
    await dynamoDB.put({
      TableName: this.tableName,
      Item: character,
    }).promise();
  }

  async findById(id: string): Promise<Character | null> {
      console.log('repository id:', id);
    const result = await dynamoDB.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();

    return result.Item as Character || null;
  }
}
