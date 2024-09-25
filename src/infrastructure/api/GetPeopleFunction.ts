import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import { PeopleRepository } from '../../domain/repositories/PeopleRepository'
import { DynamoDBPeopleRepository } from '../repositories/DynamoDBPeopleRepository';

const peopleRepository: PeopleRepository = new DynamoDBPeopleRepository();

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log(JSON.stringify(event));
  const { id } = event.pathParameters || {};
  console.log("Id from pathParameters:", id)
  // Busca en la base de datos
  let people = await peopleRepository.findById(id);
  console.log(process.env.AWS_ACCESS_KEY_ID);
  console.log('people from DB',people);
  if (!people) {
    // Si no se encuentra, consulta SWAPI
    const response = await axios.get(`https://swapi.dev/api/people/${id}`);
    console.log('response swapi',response);
    if (response.status === 200) {
      people = {
        id,
        name: response.data.name,
      };
      // Guarda el personaje en la base de datos
      await peopleRepository.save(people);
    } else {
      return { statusCode: 404, body: 'People not found' };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(people),
  };
};
