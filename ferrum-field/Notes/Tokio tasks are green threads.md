---
title: Tokio tasks are green threads
created_at: 2023-12-29T12:40:03+01:00
publish: true
---

> A Tokio task is an asynchronous green thread. [...]
>
> Tasks are the unit of execution managed by the scheduler. Spawning the task
submits it to the [[Tokio]] scheduler, which then ensures that the task executes
when it has work to do. The spawned task may be executed on the same thread
as where it was spawned, or it may execute on a different runtime thread. The
task can also be moved between threads after being spawned.
>
> Tasks in Tokio are very lightweight. Under the hood, they require only a single
allocation and 64 bytes of memory. Applications should feel free to spawn
thousands, if not millions of tasks.

Reference: [Spawning](https://tokio.rs/tokio/tutorial/spawning)