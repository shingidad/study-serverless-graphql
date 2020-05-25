# Serverless Graphql Study

## Graphql

### 회원가입

Mutation

```graphql
mutation RegisterUser($registerUser: RegisterInput!) {
  register(data: $registerUser) {
    id
    email
    nickname
    role
    createAt
  }
}
```

Query Variables

```json
{
  "registerUser": {
    "email": "shingidad@gmail.com",
    "nickname": "신기아빠",
    "password": "112tlsrldkQK@!123"
  }
}
```
