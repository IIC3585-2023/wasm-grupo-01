export function assignJobs(M, durations) {
  // Los clusters se almacenan en un arreglo que siempre se mantendrá ordenado
  const orderedClusters = new Array(M).fill(null);
  for (let i = 0; i < M; i++) orderedClusters[i] = { index: i, totalTime: 0, jobs: [] };

  // Insertion sort de los jobs, mapeando a un objeto
  const jobs = [{ duration: durations[0], index: 0 }];
  for (let i = 1; i < durations.length; i++) {
    const job = { duration: durations[i], index: i };
    for (let j = 0; j < jobs.length; j++) {
      if (jobs[j].duration < job.duration) {
        jobs.splice(j, 0, job);
        break;
      }
    }
    if (jobs.length < i + 1) jobs.push(job);
  }

  for (const job of jobs) {
    // El primero siempre tendrá el menor tiempo total
    orderedClusters[0].jobs.push(job.index);
    orderedClusters[0].totalTime += job.duration;

    // Movemos el elemento modificado al lugar correcto
    for (let i = 0; i < orderedClusters.length - 1; i++) {
      if (orderedClusters[i].totalTime > orderedClusters[i + 1].totalTime) {
        const temp = orderedClusters[i];
        orderedClusters[i] = orderedClusters[i + 1];
        orderedClusters[i + 1] = temp;
      } else break;
    }
  }

  // El último elemento será el máximo
  return orderedClusters[M - 1].totalTime;
}
