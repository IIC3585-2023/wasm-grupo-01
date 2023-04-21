use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn assign_jobs(bins: usize, durations: &[u32]) -> u32 {
    let mut total_times = vec![0; bins];
    let mut clusters = vec![Vec::new(); bins];

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

    *total_times.iter().max().unwrap()
}
