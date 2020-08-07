## Prism Application Programming Interface (API)

## Running the GO API for Local Development

Either of these options starts the API at `localhost:3030`. The API uses JSON Web tokens (JWT) for authorization by default. To disable JWT for testing or development, you can set the environment variable `PRISM_JWTAUTHDISABLED=TRUE`.

**With Visual Studio Code Debugger**

You can use the launch.json file in this repository in lieu of `go run root/main.go` to run the API in the VSCode debugger. This takes care of the required environment variables to connect to the database.

**Without Visual Studio Code Debugger**

Set the following environment variables and type `go run root/main.go` from the top level of this repository.

    * PRISM_DBUSER=postgres
    * PRISM_DBPASS=postgres
    * PRISM_DBNAME=postgres
    * PRISM_DBHOST=localhost
    * PRISM_DBSSLMODE=disable
    * PRISM_LAMBDACONTEXT=FALSE
    * PRISM_JWTAUTHDISABLED=FALSE

Note: When running the API locally, make sure environment variable `PRISM_LAMBDACONTEXT` is either **not set** or is set to `PRISM_LAMBDACONTEXT=FALSE`.

## Testing

Regression tests for URL endpoints developed using Postman are available in the [/tests](tests) directory of this repository
