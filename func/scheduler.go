package main

import (
	"fmt"
"sort"
    "syscall/js"
)

//export GoAssignJobs
func GoAssignJobs(this js.Value, args []js.Value) interface{} {
	// fmt.Println("[GO] Log scheduler.go", args[0].Int(), args[1])
	// return 10
	M := args[0].Int()
	durations := args[1]
	mappedDurations := make([]int, durations.Length())
	for i := 0; i < durations.Length(); i++ {
		mappedDurations[i] = durations.Index(i).Int()
	}
	return AssignJobs(M, mappedDurations)
}

//export AssignJobs
func AssignJobs(M int, durations []int) int {
	// (this js.Value, args []js.Value) 
	// fmt.Println("[GO] Log scheduler.go", M, durations)
	// return 10
	totalTimes := make([]int, M)
	clusters := make([][]int, M)
	for i := range clusters {
		clusters[i] = make([]int, 0)
	}
	jobs := make([]struct {
		duration int
		index    int
	}, len(durations))
	for i, duration := range durations {
		jobs[i] = struct {
			duration int
			index    int
		}{duration, i}
	}
	sort.Slice(jobs, func(i, j int) bool {
		return jobs[i].duration > jobs[j].duration
	})
	for _, job := range jobs {
		minTotalTimeCluster := 0
		for i := 1; i < M; i++ {
			if totalTimes[i] < totalTimes[minTotalTimeCluster] {
				minTotalTimeCluster = i
			}
		}
		clusters[minTotalTimeCluster] = append(clusters[minTotalTimeCluster], job.index)
		totalTimes[minTotalTimeCluster] += job.duration
	}
	totalTime := 0
	for _, time := range totalTimes {
		if time > totalTime {
			totalTime = time
		}
	}
	return totalTime
}


func main() {
	fmt.Println("[Go] Cargando...")
	done := make(chan struct{}, 0)
    js.Global().Set("GoAssignJobs", js.FuncOf(GoAssignJobs))
	<-done
	// global := js.Global()

	// Access the arguments passed from JavaScript
	// arg1 := global.Get("arg1").Int()
	// arg2 := global.Get("arg2").String()

	// fmt.Println("arg1:", arg1)
	// fmt.Println("arg2:", arg2)
	// M := 3
	// durations := []int{30, 50, 20, 10, 15, 20, 50, 90, 10, 15, 5, 25, 60, 40, 5, 70}
	// totalTime := assignJobs(M, durations)
	// fmt.Println("Total Time:", totalTime)
}
