use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn assign_jobs(m: usize, durations: &[u32]) -> Vec<u32> {
    let mut total_times = vec![0; m];
    let mut clusters = vec![Vec::new(); m];
    let mut jobs: Vec<(usize, u32)> = durations
        .iter()
        .enumerate()
        .map(|(i, &duration)| (i, duration))
        .collect();
    jobs.sort_by_key(|&(_, duration)| duration);

    for (index, duration) in jobs.iter().rev() {
        let min_total_time_cluster = total_times
            .iter()
            .enumerate()
            .min_by_key(|&(_, &total_time)| total_time)
            .unwrap()
            .0;
        clusters[min_total_time_cluster].push(*index);
        total_times[min_total_time_cluster] += duration;
    }

    let total_time = *total_times.iter().max().unwrap();
    let mut result = Vec::new();
    for cluster in clusters {
        result.extend(cluster.iter().map(|&index| index as u32));
    }

    result.push(total_time);
    result
}
