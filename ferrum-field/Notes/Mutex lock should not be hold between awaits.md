---
title: Mutex.lock should not be hold between awaits
created_at: 2023-12-29T12:57:43+01:00
publish: true
---

> You should not try to circumvent this issue by spawning the task in a way that does not require it to be [[Send]], because if [[Tokio]] suspends your task at an `.await` while the task is holding the lock, some other task may be scheduled to run on the same thread, and this other task may also try to lock that mutex, which would result in a deadlock as the task waiting to lock the mutex would prevent the task holding the mutex from releasing the mutex.

Reference: [Shared state](https://tokio.rs/tokio/tutorial/shared-state)