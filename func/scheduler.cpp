#include <algorithm>
#include <iostream>
#include <vector>

std::vector<int> myVector;

struct Job {
  int duration;
  int index;
};

bool compareJobs(const Job& a, const Job& b) {
  return a.duration > b.duration;
}

extern "C" void write_vector(int X) {
  myVector.push_back(X);
}

extern "C" int assignJobs(int M, int N) {
  // std::cout << "[C++] Log scheduler.cpp" << std::endl;
  // std::cout << M << std::endl;
  // for (int i = 0; i < N; i++) {
  //   std::cout << myVector[i] << " ";
  // }
  // std::cout << std::endl;
  // std::cout << N << std::endl;

  std::vector<int> totalTimes(M, 0);
  std::vector<std::vector<int>> clusters(M, std::vector<int>());
  std::vector<Job> jobs;
  for (int i = 0; i < N; i++) {
    jobs.push_back({myVector[i], i});
  }
  std::sort(jobs.begin(), jobs.end(), compareJobs);
  for (const auto& job : jobs) {
    int minTotalTimeCluster = std::min_element(totalTimes.begin(), totalTimes.end()) - totalTimes.begin();
    clusters[minTotalTimeCluster].push_back(job.index);
    totalTimes[minTotalTimeCluster] += job.duration;
  }
  int totalTime = *std::max_element(totalTimes.begin(), totalTimes.end());
  return totalTime;
}

int main() {
  std::cout << "[C++] Cargando..." << std::endl;
  return 0;
}
