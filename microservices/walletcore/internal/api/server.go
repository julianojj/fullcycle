package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type Server struct {
	*gin.Engine
}

func NewServer() *Server {
	r := gin.Default()
	return &Server{
		r,
	}
}

func (s *Server) Listen(port int) error {
	return s.Run(fmt.Sprintf(":%d", port))
}
