/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"ae/internal/application"
	"ae/internal/infra/adapters/cli"
	"ae/internal/infra/adapters/db"
	"context"
	"database/sql"
	_ "github.com/lib/pq"
	"github.com/spf13/cobra"
)

var (
	action          string
	productID       string
	productName     string
	productCategory string
	productPrice    float64
	productQuantity int
)

// cliCmd represents the cli command
var cliCmd = &cobra.Command{
	Use:   "cli",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.Background()
		conn, err := sql.Open("postgres", "postgres://juliano:12345678@localhost:5432/fullcycle?sslmode=disable")
		productRepository := db.NewProductRepositoryDb(conn)
		categoryRepository := db.NewCategoryRepositoryDb(conn)
		createProduct := application.NewCreateProduct(productRepository, categoryRepository)
		getProduct := application.NewGetProduct(productRepository, categoryRepository)
		if err != nil {
			panic(err)
		}
		input := &application.CreateProductRequest{
			Name:     productName,
			Category: productCategory,
			Price:    productPrice,
			Quantity: productQuantity,
		}
		output, err := cli.Run(ctx, createProduct, getProduct, action, input, productID)
		if err != nil {
			cmd.PrintErr(err)
		} else {
			cmd.Println(output)
		}
	},
}

func init() {

	cliCmd.Flags().StringVarP(&action, "action", "a", "", "Ação a ser executada")
	cliCmd.Flags().StringVarP(&productID, "product-id", "i", "", "ID do produto")
	cliCmd.Flags().StringVarP(&productName, "product-name", "n", "", "Nome do produto")
	cliCmd.Flags().StringVarP(&productCategory, "product-category", "c", "", "Categoria do produto")
	cliCmd.Flags().Float64VarP(&productPrice, "product-price", "p", 0, "Preço do produto")
	cliCmd.Flags().IntVarP(&productQuantity, "product-quantity", "q", 0, "Quantidade do produto")

	rootCmd.AddCommand(cliCmd)
}
