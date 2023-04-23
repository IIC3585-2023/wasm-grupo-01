package main

import (
    "fmt"
    "sort"
    "syscall/js"
)

//export GoAssignJobs
func GoAssignJobs(this js.Value, args []js.Value) interface{} {
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
    // fmt.Println("[GO] Log scheduler.go", M, durations)
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
}
