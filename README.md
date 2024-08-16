<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="  https://media.tenor.com/sYQmA3r2NEgAAAAi/tkthao219-bubududu.gif" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation without docker 
```bash
$ npm install
```

## Running the app with docker

```bash
# development
$ docker compose up --build 

# just to run server 
$ docker compose up

# production mode
$ npm run start:prod
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Configuration Instructions

1. **Running the Project in Docker:**
   - Use the default URL specified in the `.env` file for Docker.

2. **Running the Project Outside Docker:**
   - Configure your custom URL in the `.env` file.

3. **Running the Project Outside Docker but Using a Dockerized Database:**
   - Uncomment the URL in the `.env` file to ensure proper connectivity.
```bash
# unit tests
$ npm run test
 
# Unit test 
```
# Unit Testing Integration

Unit tests are automatically integrated and executed during the app build process. However, if you want to run tests on your local machine, you can do so by using the following command after installing node_module into local directory:

```bash
npx test
```
## Debugging
 if you encounter the error like below while building the project:
 ```bash 
 /app/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node: invalid ELF header
 ```
 ```bash
 rm -rf node_modules package-lock.json
 ```
 ```bash 
  $ docker compose run --rm app npm rebuild bcrypt
 ```
 ```bash 
  $ docker compose build --no-cache  
 ```
```bash 
  $ docker compose build up  
 ```

## Api-Doc
Api Doc is available at the following address:
```bash  
   http://localhost:3000/api/docs
 ```

## App work flow 
```bash 
                     +--------------------+
                     |  User Registration |
                     +--------------------+
                              |
                              | (1) Fill out registration form
                              |
                              v
                     +--------------------+
                     |  Frontend:         |
                     |  POST /register    |
                     |  (email, password) |
                     +--------------------+
                              |
                              v
                     +--------------------+
                     |  Backend:          |
                     |  - Validate Input  |
                     |  - Hash Password   |
                     |  - Save User       |
                     |  - Respond Success |
                     +--------------------+
                              |
                              v
                     +--------------------+
                     |  User Login        |
                     +--------------------+
                              |
                              | (2) Fill out login form
                              |
                              v
                     +--------------------+
                     |  Frontend:         |
                     |  POST /login       |
                     |  (email, password) |
                     +--------------------+
                              |
                              v
                     +--------------------+
                     |  Backend:          |
                     |  - Validate Input  |
                     |  - Find User       |
                     |  - Verify Password |
                     |  - Generate Token  |
                     |  - Respond Token   |
                     +--------------------+
                              |
                              v
                     +--------------------+
                     |  Store Token       |
                     |  Redirect to       |
                     |  Main/Dashboard    |
                     +--------------------+
                              |
                              | (3) Access Protected API Endpoints
                              |
                              v
                     +--------------------+
                     |  Frontend:         |
                     |  GET/POST /protected|
                     |  (Authorization:   |
                     |  Bearer <token>)   |
                     +--------------------+
                              |
                              v
                     +--------------------+
                     |  Backend:          |
                     |  - Validate Token  |
                     |  - Verify Token    |
                     |  - Authorize Request |
                     |  - Process Request |
                     +--------------------+
                              |
                     +-------------------------+
                     |  Create Patient         |
                     +-------------------------+
                                |
                                v
                     +-------------------------+
                     |  Check Patient Data     |
                     +-------------------------+
                                |
                                | (4) Patient Data exists?
                                |
                                +------ No ------> X (Cannot create appointment or prescription)
                                |
                                v
                               Yes
                                |
                                |
                     +--------------------+                 +--------------------+
                     |       Create       |                 |     Create         |
                     |     Appointment    |                 |   Prescription     |
                     +--------------------+                 +--------------------+
                              |                                      |
                     Fill out appointment form               Fill out Prescription
                              |                                      |
                              v                                      v
                     +--------------------+                 +--------------------+
                     |  Frontend:         |                 |  Frontend:         |
                     |  POST /appointments|                 |  POST /prescription|
                     |  (Authorization:   |                 |  (Authorization:   |     
                     |  Bearer <token>)   |                 |  Bearer <token>)   |
                     +--------------------+                 +--------------------+
                              |                                      |
                              v                                      v
                     +--------------------+                 +---------------------+
                     |  Backend:          |                 |  Backend:           |
                     |  - Validate Input  |                 |  - Validate Input   |
                     |  - Save Appointment|                 |  - Save Prescription|
                     |  - Respond Success |                 |  - Respond Success  |
                     +--------------------+                 +---------------------+
                              |                                      |
                              v                                      v
                     +--------------------+                 +---------------------+
                     |  List Appointments |                 |  List Prescription  |
                     |  or Get Appointment|                 |  or Get Prescription|
                     +--------------------+                 +---------------------+
                              |                                      |
                     Query parameters                       Query parameters
                              |                                      |
                              v                                      v
                     +--------------------------+         +-------------------------+
                     |  Backend:                |         |  Backend:               |
                     |  - Retrieve Appointments |         |  - Retrieve Prescriptions|
                     |  - Filter by Query       |         |  - Filter by Query      |
                     |  - Respond with Data     |         |  - Respond with Data    |
                     +--------------------------+         +-------------------------+

```

# Application Workflow

## 1. User Registration

### Frontend:
- **Registration Form**: The user fills out a registration form with required fields such as email, password, and name.
- **Submit Registration**: The apiclient tool sends a POST request to the backend API with the registration details.
- The request body and response are below:
  
```bash  
 #Request body

{
	"name":"Jhon Doe",
	"email": "jhon@health.com",
	"password":"password123"
}
#Response body
{
	"name": "Jhon Doe",
	"email": "jhon@health.com",
	"_id": "66bf5403737a26dc35419ad8",
}
 ```

### Backend:
- **Validate Input**: Ensure the email is unique and the password meets the security requirements.
- **Hash Password**: Hash the password using a library like bcrypt.
- **Save User**: Store the user's details (email, hashed password, etc.) in the database.
- **Respond**: Return a success response with user details and with status code 200

## 2. User Login

### Frontend:
- **Login API**: The user fills out a login info with their email and password.
- **Submit Login**: The api  sends a POST request to the backend API with the login credentials.

### Backend:
- **Validate Input**: Check if the email and password are provided.
- **Find User**: Retrieve the user from the database by email.
- **Verify Password**: Compare the provided password with the hashed password stored in the database.
- **Generate Token**: If credentials are valid, generate a JSON Web Token (JWT) or similar authentication token.
- **Respond**: Return the token to in the response.

```bash
# Api endpoint for login 
POST http://localhost:3000/api/auth/login

# Request body 
{"email":"jhon@health.com","password":"password123"}

#Response Body
{
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impob25AaGVhbHRoLmNvbSIsInN1YiI6IjY2YmY1NDAzNzM3YTI2ZGMzNTQxOWFkOCIsImlhdCI6MTcyMzgxNTcyOCwiZXhwIjoxNzIzODE5MzI4fQ._CA4QU-4oBWJ6CLUtM4LakZ1_jU4fbGQppnQBCGsxpw",
	"user": {
		"id": "66bf5403737a26dc35419ad8",
		"name": "Jhon Doe",
		"email": "jhon@health.com"
	}
}

# Token remains valid for 1 hours, for this project their is no logout or refresh token 
```

## 3. Accessing Protected API Endpoints

### Frontend or API Client tool:
- **Include Token**: For each request to protected endpoints, include the token in the Authorization header (e.g., `Bearer <token>`).

### Backend:
- **Validate Token**: Check the Authorization header for a valid token.
- **Verify Token**: Decode and verify the token to ensure it is valid and not expired.
- **Authorize Request**: If the token is valid, proceed with the request; otherwise, return an authentication error.
- **Process Request**: Handle the request (e.g., fetch user data, process actions).
  

### Reasons:
   I need to create a user table in the database and implement user registration and login functionalities to obtain tokens. While this was not a requirement for the app assignment, it is necessary because, without an authentication system, we cannot secure the API endpoints with tokens.

### 3. Create Patient 
  The next step is to create patient record or patient entity with the valid token, the patient has the requet body as below.

  ```bash
    # Request body
    {
      "name": "Jikl Doe",
      "age": 19,
      "gender": "Male",
      "contact": "123-456-7890",
      "nhs": "SWDERY9346QW"
    }

    #Response Body
    {
      "id": 1,
      "name": "Jikl Doe",
      "age": 19,
      "gender": "Male",
      "contact": "123-456-7890",
      "nhs": "SWDERY9346QW"
    }

    #already exsist 
    {
      "message": "A patient with this NHS number already exists.",
      "error": "Conflict",
      "statusCode": 409
    }

    # validation error
    {
      "message": [
        "name must be a string"
      ],
      "error": "Bad Request",
      "statusCode": 400
    }
  ```
  The NHS (National Health Service) number was not specified as a key requirement in the assignment, but I added it to prevent data duplication. While contact information could be used, it’s not as reliable since it can be the same for different individuals or may change over time. Additionally, the NHS number is also used as a primary key in the other two tables..

### 4. Create Appointment
  To create appointments, a patient must exist; otherwise, the appointment cannot be created. The request and response bodies are as follows:
```bash 
   #endPoints 
    Post  .../api/appointments
   # Request Body:
   {
    "patient_id": 1,
    "doctor": "Dr. Smith",
    "appointment_date": "2024-08-15T15:00:00+02:00",
    "reason": "Routine check-up"
  }

   # Response Body:
  {
    "id": 1,
    "patient_id": 1,
    "doctor": "Dr. Smith",
    "appointment_date": "2024-08-15T13:00:00.000Z",
    "reason": "Routine check-up"
  }  

  # Patient not found Error:
  {
    "message": "Patient with ID 6 not found",
    "error": "Not Found",
    "statusCode": 404
  } 
  
  # validation fail error
  {
    "message": [
      "appointment_date should not be empty",
      "appointment_date must be a string"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }

  #get Appointment

  #endPoints 
  GET  ...api/appointments

   #get By Id
  GET ...api/appointments/1

  #getByQuery
  GET ...api/appointments?patient_id=1&doctor=Dr.%20Smith
  ```
### 5. Create Prescriptions

To create a new Prescriptions is same as creating a new appointments. there are differece in the request body and the parameters of response body, they are following as:

```bash 
   #endPoints 
    Post  .../api/prescriptions
   # Request Body:
   {
    "patient_id": 1,
    "medication": "Amoxicillin",
    "dosage": "500mg",
    "prescribed_date": "2024-08-15T08:30:00Z"  //date are in ISO 8601 format
  }

   # Response Body:
  {
    "id": 1,
    "patient_id": 1,
    "medication": "Amoxicillin",
    "dosage": "500mg",
    "prescribed_date": "2024-08-15T08:30:00.000Z"     //date are in ISO 8601 format
  }  

  # Patient not found Error:
  {
    "message": "Patient with ID 6 not found",
    "error": "Not Found",
    "statusCode": 404
  } 
  
  # validation fail error
  {
    "message": [
      "medication must be a string"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }

  #get Appointment

  #endPoints 
  GET  ...api/prescriptions

   #get By Id
  GET ...api/prescriptions/1

  #getByQuery
  GET ...api/prescriptions?patient_id=1&medication=Amoxicillin
  ```

## Project directory structure

```bash
┣ 📂appointments
┃ ┣ 📂dto
┃ ┃ ┣ 📜create-appointment-response.dto.d.ts
┃ ┃ ┣ 📜create-appointment-response.dto.js
┃ ┃ ┣ 📜create-appointment-response.dto.js.map
┃ ┃ ┣ 📜create-appointment.dto.d.ts
┃ ┃ ┣ 📜create-appointment.dto.js
┃ ┃ ┣ 📜create-appointment.dto.js.map
┃ ┃ ┣ 📜find-appointment.dto.d.ts
┃ ┃ ┣ 📜find-appointment.dto.js
┃ ┃ ┗ 📜find-appointment.dto.js.map
┃ ┣ 📂schema
┃ ┃ ┣ 📜appointment.schema.d.ts
┃ ┃ ┣ 📜appointment.schema.js
┃ ┃ ┗ 📜appointment.schema.js.map
┃ ┣ 📜appointments.controller.d.ts
┃ ┣ 📜appointments.controller.js
┃ ┣ 📜appointments.controller.js.map
┃ ┣ 📜appointments.module.d.ts
┃ ┣ 📜appointments.module.js
┃ ┣ 📜appointments.module.js.map
┃ ┣ 📜appointments.service.d.ts
┃ ┣ 📜appointments.service.js
┃ ┗ 📜appointments.service.js.map
┣ 📂auth
┃ ┣ 📜auth.controller.d.ts
┃ ┣ 📜auth.controller.js
┃ ┣ 📜auth.controller.js.map
┃ ┣ 📜auth.module.d.ts
┃ ┣ 📜auth.module.js
┃ ┣ 📜auth.module.js.map
┃ ┣ 📜auth.service.d.ts
┃ ┣ 📜auth.service.js
┃ ┣ 📜auth.service.js.map
┃ ┣ 📜jwt-auth.guard.d.ts
┃ ┣ 📜jwt-auth.guard.js
┃ ┣ 📜jwt-auth.guard.js.map
┃ ┣ 📜jwt.strategy.d.ts
┃ ┣ 📜jwt.strategy.js
┃ ┗ 📜jwt.strategy.js.map
┣ 📂id-sequence
┃ ┣ 📂schema
┃ ┃ ┣ 📜id-sequence.schema.d.ts
┃ ┃ ┣ 📜id-sequence.schema.js
┃ ┃ ┗ 📜id-sequence.schema.js.map
┃ ┣ 📜id-sequence.module.d.ts
┃ ┣ 📜id-sequence.module.js
┃ ┣ 📜id-sequence.module.js.map
┃ ┣ 📜id-sequence.service.d.ts
┃ ┣ 📜id-sequence.service.js
┃ ┗ 📜id-sequence.service.js.map
┣ 📂patients
┃ ┣ 📂dto
┃ ┃ ┣ 📜create-patient-response.dto.d.ts
┃ ┃ ┣ 📜create-patient-response.dto.js
┃ ┃ ┣ 📜create-patient-response.dto.js.map
┃ ┃ ┣ 📜create-patient.dto.d.ts
┃ ┃ ┣ 📜create-patient.dto.js
┃ ┃ ┗ 📜create-patient.dto.js.map
┃ ┣ 📂schema
┃ ┃ ┣ 📜patient.schema.d.ts
┃ ┃ ┣ 📜patient.schema.js
┃ ┃ ┗ 📜patient.schema.js.map
┃ ┣ 📜patients.controller.d.ts
┃ ┣ 📜patients.controller.js
┃ ┣ 📜patients.controller.js.map
┃ ┣ 📜patients.module.d.ts
┃ ┣ 📜patients.module.js
┃ ┣ 📜patients.module.js.map
┃ ┣ 📜patients.service.d.ts
┃ ┣ 📜patients.service.js
┃ ┗ 📜patients.service.js.map
┣ 📂prescriptions
┃ ┣ 📂dto
┃ ┃ ┣ 📜create-prescription.dto.d.ts
┃ ┃ ┣ 📜create-prescription.dto.js
┃ ┃ ┣ 📜create-prescription.dto.js.map
┃ ┃ ┣ 📜find-prescription.dto.d.ts
┃ ┃ ┣ 📜find-prescription.dto.js
┃ ┃ ┗ 📜find-prescription.dto.js.map
┃ ┣ 📂schema
┃ ┃ ┣ 📜prescription.schema.d.ts
┃ ┃ ┣ 📜prescription.schema.js
┃ ┃ ┗ 📜prescription.schema.js.map
┃ ┣ 📜prescriptions.controller.d.ts
┃ ┣ 📜prescriptions.controller.js
┃ ┣ 📜prescriptions.controller.js.map
┃ ┣ 📜prescriptions.module.d.ts
┃ ┣ 📜prescriptions.module.js
┃ ┣ 📜prescriptions.module.js.map
┃ ┣ 📜prescriptions.service.d.ts
┃ ┣ 📜prescriptions.service.js
┃ ┗ 📜prescriptions.service.js.map
┣ 📂users
┃ ┣ 📂dto
┃ ┃ ┣ 📜login-response.dto.d.ts
┃ ┃ ┣ 📜login-response.dto.js
┃ ┃ ┣ 📜login-response.dto.js.map
┃ ┃ ┣ 📜login-user.dto.d.ts
┃ ┃ ┣ 📜login-user.dto.js
┃ ┃ ┣ 📜login-user.dto.js.map
┃ ┃ ┣ 📜register-user.dto.d.ts
┃ ┃ ┣ 📜register-user.dto.js
┃ ┃ ┣ 📜register-user.dto.js.map
┃ ┃ ┣ 📜user.dto.d.ts
┃ ┃ ┣ 📜user.dto.js
┃ ┃ ┗ 📜user.dto.js.map
┃ ┣ 📜user.schema.d.ts
┃ ┣ 📜user.schema.js
┃ ┣ 📜user.schema.js.map
┃ ┣ 📜users.controller.d.ts
┃ ┣ 📜users.controller.js
┃ ┣ 📜users.controller.js.map
┃ ┣ 📜users.module.d.ts
┃ ┣ 📜users.module.js
┃ ┣ 📜users.module.js.map
┃ ┣ 📜users.service.d.ts
┃ ┣ 📜users.service.js
┃ ┗ 📜users.service.js.map
┣ 📂utils
┃ ┣ 📂decorators
┃ ┃ ┣ 📜public.decorator.d.ts
┃ ┃ ┣ 📜public.decorator.js
┃ ┃ ┗ 📜public.decorator.js.map
┃ ┣ 📂pipes
┃ ┃ ┣ 📜ParseIntPipe.d.ts
┃ ┃ ┣ 📜ParseIntPipe.js
┃ ┃ ┗ 📜ParseIntPipe.js.map
┃ ┗ 📂validators
┃   ┣ 📜is-utc-date-time.validator.d.ts
┃   ┣ 📜is-utc-date-time.validator.js
┃   ┗ 📜is-utc-date-time.validator.js.map
┣ 📜app.controller.d.ts
┣ 📜app.controller.js
┣ 📜app.controller.js.map
┣ 📜app.module.d.ts
┣ 📜app.module.js
┣ 📜app.module.js.map
┣ 📜app.service.d.ts
┣ 📜app.service.js
┣ 📜app.service.js.map
┣ 📜main.d.ts
┣ 📜main.js
┣ 📜main.js.map
┗ 📜tsconfig.build.tsbuildinfo
```
### Project Structure 
  All the secrets—project files, architecture, methods, and functions—will be revealed in the interview. Stay tuned, it’s like a tech mystery waiting to be solved!


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="  https://media.tenor.com/MTyONzJHiXAAAAAi/tkthao219-bubududu.gif" width="200" alt="Nest Logo" /></a>
</p>