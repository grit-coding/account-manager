# Account Manager API

This API allows you to manage user accounts.

## Base URL

The Base URL is the root URL for all of the API, if you ever see a reference to `{BASE_URL}` in the documentation, replace it with `https://leiws3k0k7.execute-api.eu-west-2.amazonaws.com/dev/`.

## API Endpoints

### `POST /account`

**Full URL:** `{BASE_URL}/account`

Creates a new account.

#### Request body

- `firstName` (string) **[required]**
- `lastName` (string) **[required]**
- `email` (string) **[required]**
- `address` (string) [optional]
- `phoneNumber` (number) [optional]

#### Example

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "address": "123 Oxford street, London",
    "phoneNumber": 1234567890
}
```

### `GET /account/{id}`

**Full URL:** `{BASE_URL}/account/{id}`

Retrieves account information for the given account ID.

### `PATCH /account/{id}`

**Full URL:** `{BASE_URL}/account/{id}`

Updates account information for the given account ID.

#### Request body

- `firstName` (string) [optional]
- `lastName` (string) [optional]
- `email` (string) [optional]
- `address` (string) [optional]
- `phoneNumber` (number) [optional]

#### Example

```json
{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "address": "123 Oxford street, Leeds",
    "phoneNumber": 0987654321
}
```

### `DELETE /account/{id}`

**Full URL:** `{BASE_URL}/account/{id}`

Deletes the account with the given account ID.

**Note:** Make sure to replace `{id}` with the actual account ID.

## API Key

To use this API, you will need to provide your API key in the header of your HTTP requests. The key should be included as the value for the `x-api-key` field.

## Local Setup and Deployment
For instructions on how to run this project locally and deploy to AWS Lambda, refer to the [Local Setup and Deployment Guide](https://github.com/grit-coding/account-manager/blob/main/docs/local-README.md).