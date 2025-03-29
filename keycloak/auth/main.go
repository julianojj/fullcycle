package main

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/gin-gonic/gin"
	"github.com/go-resty/resty/v2"
)

func main() {
	r := gin.Default()
	client := resty.New()

	r.GET("/login", func(ctx *gin.Context) {
		query := url.Values{}
		query.Set("client_id", "fullcycle-client")
		query.Set("redirect_uri", "http://localhost:8081/callback")
		query.Set("scope", "openid")
		query.Set("response_type", "code")
		location := fmt.Sprintf("http://localhost:8080/realms/fullcycle/protocol/openid-connect/auth?%s", query.Encode())
		ctx.Redirect(http.StatusTemporaryRedirect, location)
	})

	r.GET("/callback", func(ctx *gin.Context) {
		body := map[string]string{
			"client_id":    "fullcycle-client",
			"grant_type":   "authorization_code",
			"code":         ctx.Query("code"),
			"redirect_uri": "http://localhost:8081/callback",
			"scope":        "openid",
		}
		url := "http://localhost:8080/realms/fullcycle/protocol/openid-connect/token"
		response, err := client.R().
			SetFormData(body).
			Post(url)
		if err != nil {
			ctx.AbortWithStatusJSON(response.StatusCode(), map[string]any{
				"err": "invalid login",
			})
			return
		}
		ctx.JSON(http.StatusOK, string(response.Body()))
	})

	http.ListenAndServe(":8081", r)
}
