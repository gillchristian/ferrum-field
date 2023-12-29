---
title: Tokio spawn vs. select!
created_at: 2023-12-29T13:07:39+01:00
publish: true
---

TL;DR;

- `Tokio::spawn`: new task, different threads, no borrowing.
- `select!`: same task/thread, borrowing.

> Both `tokio::spawn` and `select!` enable running concurrent asynchronous operations. However, the strategy used to run concurrent operations differs. The `tokio::spawn` function takes an asynchronous operation and spawns a new task to run it. A task is the object that the [[Tokio]] runtime schedules. Two different tasks are scheduled independently by Tokio. They may run simultaneously on different operating system threads. Because of this, a spawned task has the same restriction as a spawned thread: no borrowing.
> 
> The `select!` macro runs all branches concurrently on the same task. Because all branches of the `select!` macro are executed on the same task, they will never run simultaneously. The `select!` macro multiplexes asynchronous operations on a single task.

Reference: [Select](https://tokio.rs/tokio/tutorial/select)