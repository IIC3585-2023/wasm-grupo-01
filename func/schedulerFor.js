export function assignJobs(M, durations) {
  // console.log("[JSN] Log schedulerNormal.js");
  const totalTimes = new Array(M).fill(0);
  const clusters = new Array(M).fill(null).map(() => []);
  const jobs = durations.map((duration, index) => ({ duration, index })).sort((a, b) => b.duration - a.duration);
  for (const job of jobs) {
    const minTotalTimeCluster = totalTimes.indexOf(Math.min(...totalTimes));
    clusters[minTotalTimeCluster].push(job.index);
    totalTimes[minTotalTimeCluster] += job.duration;
  }
  const totalTime = Math.max(...totalTimes);
  return totalTime;
}
