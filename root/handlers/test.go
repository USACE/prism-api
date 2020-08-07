package handlers

import (
	"net/http"

	"github.com/labstack/echo"
)

// GetTest returns a test endpoint to make sure everything is working
func GetTest() echo.HandlerFunc {
	return func (c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]interface{}{"test": "OK"})
	}
}
