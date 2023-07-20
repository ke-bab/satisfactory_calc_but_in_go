package main

import (
	"factory-calc/resources"
	"flag"
	"os"
	"strconv"
)

func main() {
	item := flag.String("i", "", "i=modular-engine")
	count := flag.Int("c", 1, "c=10")
	flag.Parse()
	if *item == "" {
		println("не указан желаемый предмет")
		os.Exit(1)
	}
	println("вы заказали " + strconv.Itoa(*count) + " " + *item)
	ii := resources.NewIronIngot()
	deps := ii.GetDeps()
	for _, d := range deps {
		println("ii состоит из " + d.GetName())
	}
}
