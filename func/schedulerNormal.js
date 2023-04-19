function assignJobs(N, durations, M) {
  const totalTimes = new Array(M).fill(0);
  const clusters = new Array(M).fill(null).map(() => []);
  const jobs = durations.map((duration, index) => ({ duration, index })).sort((a, b) => b.duration - a.duration);
  jobs.forEach((job) => {
    const minTotalTimeCluster = totalTimes.indexOf(Math.min(...totalTimes));
    clusters[minTotalTimeCluster].push(job.index);
    totalTimes[minTotalTimeCluster] += job.duration;
  });
  const totalTime = Math.max(...totalTimes);
  return { clusters, totalTime };
}

console.log('JSNormal');

const N = 5;
const durations = [30, 50, 10, 20, 90];
const M = 2;

const result = assignJobs(N, durations, M);
console.log(result.clusters);
console.log(result.totalTime);
