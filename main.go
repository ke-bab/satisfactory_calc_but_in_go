package main

import (
	"os"
)

func main() {

}

func handleErr(err error) {
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}
}
