class Job {
  duration: i32;
  index: i32;

  constructor(duration: i32, index: i32) {
    this.duration = duration;
    this.index = index;
  }
}

function findMax(arr: i32[]): i32 {
  let max: i32 = arr[0];
  for (let i = 0 + 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

function findMinIndex(arr: i32[]): i32 {
  let min: i32 = arr[0];
  let min_i = 0;
  for (let i = 0 + 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
      min_i = i;
    }
  }
  return min_i;
}

export function assignJobs(M: i32, durations: i32[]): i32 {
  const totalTimes = new Array<i32>(M).fill(0);

  const clusters = new Array<Array<i32>>(M);
  for (let i: i32 = 0; i < M; i++) clusters[i] = [];

  const jobsUnsorted = durations.map<Job>((duration, index) => new Job(duration, index));
  const jobs = jobsUnsorted.sort((a, b) => b.duration - a.duration);

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const minTotalTimeCluster = findMinIndex(totalTimes);
    clusters[minTotalTimeCluster].push(job.index);
    totalTimes[minTotalTimeCluster] += job.duration;
  }

  const totalTime = findMax(totalTimes);
  return totalTime;
}
