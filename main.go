package main

import (
	"factory-calc/resources"
	"flag"
	"os"
	"strconv"
)

func main() {
	item := flag.String("rname", "", "resource name you want to calc, like: -rname=modular-engine")
	count := flag.Int("cnt", 1, "count of resources you want, like: -cnt=10")
	flag.Parse()
	if *item == "" {
		println("resource is not specified")
		os.Exit(1)
	}
	println("вы заказали " + strconv.Itoa(*count) + " " + *item)
	ii := resources.NewIronIngot()
	deps := ii.GetResources()
	for _, d := range deps {
		println("ii состоит из " + d.GetName())
	}
}
