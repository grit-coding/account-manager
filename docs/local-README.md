## Running Locally

To run this repo locally, you need to follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started)

### Steps

1. **Clone the repo:** Clone this repository to your local machine.

2. **Install dependencies:** Navigate to the project directory and install the necessary dependencies.

    ```
    cd account-manager
    npm install
    ```

3. **Run Unit Tests:** Before you proceed, ensure that your code is working as expected by running the unit tests.

    ```
    npm test
    ```

4. **Start Serverless Offline:** Serverless Offline is a plugin for Serverless Framework that emulates AWS Lambda and API Gateway on your local machine to speed up your development cycles. To start Serverless offline, run:

    ```
    serverless offline
    ```

5. **Testing API Endpoints:** Now, your local setup is complete. You can test the API endpoints with your local setup by replacing `{BASE_URL}` in the documentation with the base URL that you see in the console.


6. **Deploy the application:** Use the serverless framework to deploy the application.

    ```
    serverless deploy
    ```

This command packages and deploys your service to AWS Lambda. Note down the base URL that the command prints out in the console.


**Note:** Make sure that your AWS credentials have the necessary permissions to create and manage resources related to AWS Lambda, API Gateway, and DynamoDB. If you encounter any permission-related errors, check your IAM policy in AWS Console.
