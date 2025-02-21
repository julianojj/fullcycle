package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/julianojj/fullcycle/microservices/balance/internal/repository"
	"github.com/julianojj/fullcycle/microservices/balance/internal/service"
)

func main() {
	balanceGateway := repository.NewBalanceRepositoryDatabase()
	balanceService := service.NewBalanceService(balanceGateway)

	r := gin.Default()

	r.GET("/balances/:id", func(ctx *gin.Context) {
		input := &service.GetBalanceInput{
			AccountID: ctx.Param("id"),
		}
		balance, err := balanceService.GetBalance(ctx.Request.Context(), input)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, balance)
	})

	http.ListenAndServe(":3003", r)
}
