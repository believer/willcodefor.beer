---
layout: post.njk
title: 'Advent of Code 2021: Day 1 - Sonar Sweep'
excerpt: Solve day 1 of Advent of Code 2021 using Rust
date: 2021-12-01
tags:
  - post
  - rust
  - advent-of-code
---

It's that time of year again. [Advent of Code](https://adventofcode.com/) is
here! Advent of Code is an advent calendar of programming puzzles. It's been
held from December 1st to December 25th since 2015.

Last year I did the solutions using Rust and had such a great time doing
them that I'm going to use Rust again this year. This year, if I got the time
for it, I'll try to do a post about my solution each day. My hope is that it
might help someone and make me retain the solution better. A bit of [Learning in
public](https://devlog.willcodefor.beer/pages/learning-in-public/).

## Part 1

The puzzles usually start out simple and get harder as we get closer to
Christmas. The first solution was straight-forward. We're given a list of
integers and told to find how many times the value increases between each step.

```rust
// I'm using cargo-aoc to set up boilerplate and handle inputs
#[aoc(day1, part1)]
pub fn solve_part_01(input: &[u32]) -> u32 {
    // Create a value for number of increases
    let mut increases = 0;
    // Use the first value from our input data as the initial value
    let mut previous_value = input[0];

    for i in input {
        // Add one to increases if the current value
        // is bigger than the last value
        if i > &previous_value {
            increases += 1
        }

        // Update the last value
        // *i dereferences i. This means that we are
        // getting the actual value. This is needed since the
        // loop returns a reference to i (&i)
        previous_value = *i
    }

    // Return the number of increases
    increases
}
```

This was my fastest solve ever with a time of `04:17` putting me at rank 2376.
My previous fastest time was 11 minutes last year, albeit with a better rank.

## Part 2

The second part of each puzzle always builds on or slightly alters the solution of part 1. This
time we're told to compare sums of a three-measurement sliding window instead of
each single entry.

We're given the hint to use "sliding window" which is a technique that can help
reduce the amount of time a calculation takes by making it run in linear, or
close to, time. Or in other words, using one loop instead of nested loops. To
learn more about sliding windows read [this great article](https://levelup.gitconnected.com/an-introduction-to-sliding-window-algorithms-5533c4fe1cc7).

Luckily for us Rust has a built-in [windows()](https://doc.rust-lang.org/std/slice/struct.Windows.html) method for slices.

```rust
#[aoc(day1, part2)]
pub fn solve_part_02(input: &[u32]) -> u32 {
    // Set the initial value to the sum of the first
    // window, i.e. sum of the first three values
    let mut previous_sum: u32 = input.windows(3).next().unwrap().iter().sum();
    let mut increases = 0;

    // Loop over the windows with three values in each window
    for i in input.windows(3) {
        // Sum the values
        let new_sum = i.iter().sum();

        // Add one to increases if the new sum
        // is larger than the last
        if new_sum > previous_sum {
            increases += 1;
        }

        // Update the last sum
        previous_sum = new_sum;
    }

    // Return the number of increases
    increases
}
```

### Performance

For fun, and since it's included in [cargo-aoc](https://github.com/gobanos/cargo-aoc), I like to run benchmarks on my solutions. It's also hilarious to see how fast Rust is.

| Part | Time                                  |
| ---- | ------------------------------------- |
| 1    | 272.11 ns (that's nanoseconds, 10^-9) |
| 2    | 923.48 ns                             |
