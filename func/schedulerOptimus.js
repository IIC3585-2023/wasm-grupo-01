export function assignJobs(M, durations) {
  // console.log("[JSO] Log schedulerOptimus.js");
  const totalTimes = new Array(M).fill(0);

  const clusters = new Array(M).fill(null);
  for (let i = 0; i < M; i++) clusters[i] = [];

  const jobs = durations.map((duration, index) => ({ duration, index })).sort((a, b) => b.duration - a.duration);
  for (const job of jobs) {
    const minTotalTimeCluster = totalTimes.indexOf(Math.min(...totalTimes));
    clusters[minTotalTimeCluster].push(job.index);
    totalTimes[minTotalTimeCluster] += job.duration;
  }
  const totalTime = Math.max(...totalTimes);
  return totalTime;
}
