import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import { CharacterRepository } from '../../domain/repositories/CharacterRepository'
import { DynamoDBCharacterRepository } from '../repositories/DynamoDBCharacterRepository';

const characterRepository: CharacterRepository = new DynamoDBCharacterRepository();

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log(JSON.stringify(event));
  const { id } = event.pathParameters || {};
  console.log("Id from pathParameters:", id)
  // Busca en la base de datos
  let character = await characterRepository.findById(id);
  console.log(process.env.AWS_ACCESS_KEY_ID);
  console.log('character from DB',character);
  if (!character) {
    // Si no se encuentra, consulta SWAPI
    const response = await axios.get(`https://swapi.dev/api/people/${id}`);
    console.log('response swapi',response);
    if (response.status === 200) {
      character = {
        id,
        name: response.data.name,
      };
      // Guarda el personaje en la base de datos
      await characterRepository.save(character);
    } else {
      return { statusCode: 404, body: 'Character not found' };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(character),
  };
};
