package main

import (
	"os"
)

func main() {

}

//func cleanName(className string) string {
//	className = strings.TrimPrefix(className, "Recipe_")
//
//	return strings.TrimSuffix(className, "_C")
//}
//
//func parseDuration(duration string) int {
//	var float, err = strconv.ParseFloat(duration, 32)
//	handleErr(err)
//
//	return int(float)
//}

func handleErr(err error) {
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}
}
