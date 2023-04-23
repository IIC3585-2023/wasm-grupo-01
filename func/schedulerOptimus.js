function fastMapSorted(durations) {
  const mappedDurations = new Array(durations.length).fill(null);
  mappedDurations[0] = { duration: durations[0], index: 0 };
  for (let i = 1; i < durations.length; i++) {
    const item = { duration: durations[i], index: i };
    let j = 0;

    for (; j < i; j++) {
      if (mappedDurations[j].duration < item.duration) {
        for (let k = i; k > j; k--) mappedDurations[k] = mappedDurations[k - 1];
        mappedDurations[j] = item;
        break;
      }
    }
    if (j === i) mappedDurations[i] = item;
  }
  return mappedDurations;
}

function createOrderedClusters(size) {
  const orderedClusters = new Array(size).fill(null);
  for (let i = 0; i < size; i++) orderedClusters[i] = { index: i, totalTime: 0, jobs: [] };
  return orderedClusters;
}

function pushAllToOrderedClusters(orderedClusters, jobs) {
  for (const job of jobs) {
    orderedClusters[0].jobs.push(job.index);
    orderedClusters[0].totalTime += job.duration;

    for (let i = 0; i < orderedClusters.length - 1; i++) {
      if (orderedClusters[i].totalTime > orderedClusters[i + 1].totalTime) {
        const temp = orderedClusters[i];
        orderedClusters[i] = orderedClusters[i + 1];
        orderedClusters[i + 1] = temp;
      } else break;
    }
  }
}

export function assignJobs(M, durations) {
  const orderedClusters = createOrderedClusters(M);
  const jobs = fastMapSorted(durations);
  pushAllToOrderedClusters(orderedClusters, jobs);
  return orderedClusters[M - 1].totalTime;
}
