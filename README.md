# API Project with Hexagonal Architecture

This project implements an API using hexagonal architecture, CQRS pattern, and serverless framework with Node.js, TypeScript, and DynamoDB.

## Local Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- AWS CLI configured with your credentials
- serverless (npm i serverless -g)

### Installation

1. Clone the repository:
   ```
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
   ```
   STAGE=dev
   REGION=us-east-1
   DYNAMODB_TABLE=your-table-name
   ```

4. Install DynamoDB Local:
   ```
   serverless dynamodb install
   ```

### Running Locally

1. Start the local server:
   ```
   npm run dev
   ```

   This command will start both serverless-offline and serverless-dynamodb-local.

2. The API will be available at `http://localhost:3000`

## Deployment

1. Ensure your AWS CLI is configured with the correct credentials.

2. Deploy to AWS:
   ```
   npm run deploy
   ```

   This will deploy your application to AWS using the serverless framework.

3. After successful deployment, you'll receive the API endpoint URLs in the console.

## Testing

Run the tests using:
```
npm test
```

