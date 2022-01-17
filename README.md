Run "npm install" to install packages locally

Ensure Mysql is up and running by running "brew services mysql start"

Run seed file: ":npx sequelize-cli db:seed:all"

May need to install sequelize-cli: "npm install --save-dev sequelize-cli"

Start the app "node src/app.js"

Run test with "mocha"


Tools
- Sequelize: ORM
- Mocha: Test
- Framework: Express
- Interactor: For services
- jsonwebtoken: To create JWT
- JWTs: For authenticaiton/authorization


Tried But Did Not Have Time To
- make use of services
- had a hard time use the NestJS framework
- Would add param validation and model validation to a couple places
- make use of transactions when creating polls and poll runs
- would have made more test for the various services

