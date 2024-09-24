import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from "uuid";
import { CharacterRepository } from '../../domain/repositories/CharacterRepository';
import { DynamoDBCharacterRepository } from '../repositories/DynamoDBCharacterRepository';

const characterRepository: CharacterRepository = new DynamoDBCharacterRepository();

export const handler: APIGatewayProxyHandler = async (event) => {
  const { name, species, gender } = JSON.parse(event.body || '{}');
  const character = { id: uuidv4(), name, species, gender };
  console.log(character)
  await characterRepository.save(character);

  return {
    statusCode: 201,
    body: JSON.stringify(character),
  };
};
