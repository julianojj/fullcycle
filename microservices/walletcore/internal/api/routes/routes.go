package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/api"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/gateway"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/usecase"
)

type Routes struct {
	app               *api.Server
	createClient      *usecase.CreateClient
	createAccount     *usecase.CreateAccount
	createTransaction *usecase.CreateTransaction
	clientRepository  gateway.ClientGateway
	accountRepository gateway.AccountGateway
}

func NewRoutes(
	app *api.Server,
	createClient *usecase.CreateClient,
	createAccount *usecase.CreateAccount,
	createTransaction *usecase.CreateTransaction,
	clientRepository gateway.ClientGateway,
	accountRepository gateway.AccountGateway,
) *Routes {
	return &Routes{
		app,
		createClient,
		createAccount,
		createTransaction,
		clientRepository,
		accountRepository,
	}
}

func (r *Routes) Init() {
	r.app.POST("/clients", func(c *gin.Context) {
		var input *usecase.CreateClientInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		output, err := r.createClient.Execute(c.Request.Context(), input)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(201, output)
	})

	r.app.GET("/clients/:id", func(ctx *gin.Context) {
		id := ctx.Param("id")
		account, err := r.clientRepository.Find(ctx.Request.Context(), id)
		if err == sql.ErrNoRows {
			ctx.JSON(404, gin.H{"error": "Client not found"})
			return
		} else if err != nil {
			ctx.JSON(500, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(200, account)
	})

	r.app.POST("/accounts", func(c *gin.Context) {
		var input *usecase.CreateAccountInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		output, err := r.createAccount.Execute(c.Request.Context(), input)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(201, output)
	})

	r.app.GET("/accounts/:id", func(ctx *gin.Context) {
		id := ctx.Param("id")
		account, err := r.accountRepository.Find(ctx, id)
		if err == sql.ErrNoRows {
			ctx.JSON(404, gin.H{"error": "Account not found"})
			return
		} else if err != nil {
			ctx.JSON(500, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(200, account)
	})

	r.app.POST("/transactions", func(c *gin.Context) {
		var input *usecase.CreateTransactionInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		output, err := r.createTransaction.Execute(c.Request.Context(), input)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(201, output)
	})
}
