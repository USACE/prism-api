package main

import (
	"log"
	"net/http"

	"api/root/appconfig"
	"api/root/handlers"

	"github.com/apex/gateway"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	_ "github.com/lib/pq"
)

func main() {
	//  Here's what would typically be here:
	// lambda.Start(Handler)
	//
	// There were a few options on how to incorporate Echo v4 on Lambda.
	//
	// Landed here for now:
	//
	//     https://github.com/apex/gateway
	//     https://github.com/labstack/echo/issues/1195
	//
	// With this for local development:
	//     https://medium.com/a-man-with-no-server/running-go-aws-lambdas-locally-with-sls-framework-and-sam-af3d648d49cb
	//
	// This looks promising and is from awslabs, but Echo v4 support isn't quite there yet.
	// There is a pull request in progress, Re-evaluate in April 2020.
	//
	//    https://github.com/awslabs/aws-lambda-go-api-proxy
	//

	cfg := appconfig.GetConfig()
	// db := appconfig.Connection(cfg)

	e := echo.New()
	
	// Middleware for All Routes
	e.Use(middleware.CORS())

	// Restricted Routes
	g := e.Group("")
	g.Use(middleware.JWTWithConfig(*appconfig.JWTConfig(cfg)))

	// Public Routes
	e.GET("prism/test", handlers.GetTest())
	// e.GET("prism/locations", handlers.ListLocations(db))

	// Restricted Routes
	g.GET("prism/test2", handlers.GetTest())
	// g.POST("prism/locations", handlers.CreateLocation(db))

	// Start server
	lambda := cfg.LambdaContext
	log.Printf("starting server; Running On AWS LAMBDA: %t", lambda)
	if lambda {
		log.Fatal(gateway.ListenAndServe("localhost:3030", e))
	} else {
		log.Fatal(http.ListenAndServe("localhost:3030", e))
	}
}
