# Rest API
Basic rules:
- JSON API Using Bearer Authorization
- The default Content-Type is application/json

# Open Endpoints

Open endpoints require no Authentication.

## Login
```
POST /login

{
  email: 'warrenbot@gmail.com',
  password: 'mypassword' // Password isn't necessary (yet)
}
```
### Login Response
```
{
  name: 'Some name Here',
  token: 'SOME_JWT_TOKEN'
}
```

Use the token in the endpoint who requires authentication.
HTTP Headers:

```
  Authorization: Bearer SOME_JWT_TOKEN_HERE
```


## Account creating
```
POST /account

{
  name: 'Warren Bot',
  email: 'warrenbot@gmail.com',
  password: 'mypassword'
}
```


# Endpoints that require Authentication

## Account Summary
Returns the summary of account: deposits, withdraws, profits and payments.

```
GET /account/summary
```

#### Response
```
{
    "account": {
        "id": 1,
        "balance": 1050,
        "lastUpdate": "2020-08-27T15:29:37.694Z"
    },
    "summary": [
        {
            "id": 1,
            "value": 350,
            "operation": 0,
            "paymentDetail": "Deposit has done at Saque e pague",
            "date": "2020-08-27T15:29:48.147Z"
        },
        {
            "id": 2,
            "value": 350,
            "operation": 0,
            "paymentDetail": "Deposit has done at Saque e pague",
            "date": "2020-08-27T15:29:49.102Z"
        },
        {
            "id": 3,
            "value": 350,
            "operation": 0,
            "paymentDetail": "Deposit has done at Saque e pague",
            "date": "2020-08-27T15:29:49.700Z"
        }
    ]
}
```


## Account Deposit
Deposit cash to the account

```
POST /account/deposit
{
  "value": 180.50,
  "machine": "Saque e Pague Nilo Peçanha"
}
```

## Account Withdraw
Withdraw from the account

```
POST /account/withdraw
{
  "value": 50.00,
  "machine": "Saque e Pague Nilo Peçanha"
}
```

## Account Withdraw
Pay a default payment slip

```
POST /account/payment
{
  "value": 129.00,
  "barCode": "123321123321123321"
}
```
