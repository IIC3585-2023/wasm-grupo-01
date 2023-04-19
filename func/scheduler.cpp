#include <algorithm>
#include <iostream>
#include <vector>

struct Job {
  int duration;
  int index;
};

bool compareJobs(const Job& a, const Job& b) {
  return a.duration > b.duration;
}

struct Result {
  std::vector<std::vector<int>> clusters;
  int totalTime;
};

Result assignJobs(int N, const std::vector<int>& durations, int M) {
  std::vector<int> totalTimes(M, 0);
  std::vector<std::vector<int>> clusters(M, std::vector<int>());
  std::vector<Job> jobs;
  for (int i = 0; i < N; i++) {
    jobs.push_back({durations[i], i});
  }
  std::sort(jobs.begin(), jobs.end(), compareJobs);
  for (const auto& job : jobs) {
    int minTotalTimeCluster = std::min_element(totalTimes.begin(), totalTimes.end()) - totalTimes.begin();
    clusters[minTotalTimeCluster].push_back(job.index);
    totalTimes[minTotalTimeCluster] += job.duration;
  }
  int totalTime = *std::max_element(totalTimes.begin(), totalTimes.end());
  return {clusters, totalTime};
}

int main() {
  int N = 5;
  std::vector<int> durations = {30, 50, 10, 20, 90};
  int M = 2;

  Result result = assignJobs(N, durations, M);
  for (const auto& cluster : result.clusters) {
    for (int job : cluster) {
      std::cout << job << " ";
    }
    std::cout << std::endl;
  }
  std::cout << result.totalTime << std::endl;

  return 0;
}
