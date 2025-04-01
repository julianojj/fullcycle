package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/go-resty/resty/v2"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

type ResponseKeycloakCallback struct {
	AccessToken      string `json:"access_token"`
	ExpiresIn        int    `json:"expires_in"`
	RefreshExpiresIn int    `json:"refresh_expires_in"`
	RefreshToken     string `json:"refresh_token"`
	TokenType        string `json:"token_type"`
	IDToken          string `json:"id_token"`
	SessionState     string `json:"session_state"`
	Scope            string `json:"scope"`
}

type DecodedIdToken struct {
	Nonce string `json:"nonce"`
}

func main() {
	r := gin.Default()
	client := resty.New()

	store := cookie.NewStore([]byte("secret"))
	store.Options(sessions.Options{
		Path:     "/",
		MaxAge:   3600 * 8, // 8 hours
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})
	r.Use(sessions.Sessions("mysession", store))

	r.GET("/login", func(ctx *gin.Context) {
		session := sessions.Default(ctx)
		nonce := uuid.NewString()
		state := uuid.NewString()
		if session.Get("nonce") == nil {
			session.Set("nonce", nonce)
			if err := session.Save(); err != nil {
				ctx.AbortWithError(http.StatusInternalServerError, err)
				return
			}
		} else {
			nonce = session.Get("nonce").(string)
		}
		if session.Get("state") == nil {
			session.Set("state", state)
			if err := session.Save(); err != nil {
				ctx.AbortWithError(http.StatusInternalServerError, err)
				return
			}
		} else {
			state = session.Get("state").(string)
		}
		query := url.Values{}
		query.Set("client_id", "fullcycle-client")
		query.Set("redirect_uri", "http://localhost:8081/callback")
		query.Set("scope", "openid")
		query.Set("response_type", "code")
		query.Set("nonce", nonce)
		query.Set("state", state)
		location := fmt.Sprintf("http://localhost:8080/realms/fullcycle/protocol/openid-connect/auth?%s", query.Encode())
		ctx.Redirect(http.StatusTemporaryRedirect, location)
	})

	r.GET("/callback", func(ctx *gin.Context) {
		session := sessions.Default(ctx)
		nonce := session.Get("nonce").(string)
		state := session.Get("state").(string)

		if state != ctx.Query("state") {
			ctx.AbortWithStatusJSON(http.StatusForbidden, map[string]any{
				"err": "user not allowed",
			})
			return
		}

		body := map[string]string{
			"client_id":    "fullcycle-client",
			"grant_type":   "authorization_code",
			"code":         ctx.Query("code"),
			"redirect_uri": "http://localhost:8081/callback",
			"scope":        "openid",
		}
		url := "http://localhost:8080/realms/fullcycle/protocol/openid-connect/token"
		var result *ResponseKeycloakCallback
		response, err := client.R().
			SetFormData(body).
			SetResult(&result).
			Post(url)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, map[string]any{
				"err": "invalid login",
			})
			return
		}

		if response.StatusCode() != http.StatusOK {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, map[string]any{
				"err": "invalid login",
			})
			return
		}

		idToken := result.IDToken
		parts := strings.Split(idToken, ".")
		if len(parts) != 3 {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, map[string]any{
				"err": "invalid id token format",
			})
			return
		}

		payload, err := jwt.DecodeSegment(parts[1])
		if err != nil {
			ctx.AbortWithStatusJSON(response.StatusCode(), map[string]any{
				"err": "error to decode token",
			})
			return
		}

		var decodedIdToken *DecodedIdToken

		if err := json.Unmarshal(payload, &decodedIdToken); err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, map[string]any{
				"err": "error to unmarshal token",
			})
			return
		}

		if decodedIdToken.Nonce != nonce {
			ctx.AbortWithStatusJSON(http.StatusForbidden, map[string]any{
				"err": "user not allowed",
			})
			return
		}

		ctx.JSON(http.StatusOK, result)
	})

	http.ListenAndServe(":8081", r)
}
