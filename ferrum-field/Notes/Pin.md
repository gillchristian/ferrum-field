---
title: Pin
created_at: 2023-12-29T13:10:45+01:00
publish: true
---

[core::pin::Pin](https://doc.rust-lang.org/nightly/core/pin/struct.Pin.html)

> A Rust value is "pinned" when it can no longer be moved in memory. A key property of a pinned value is that pointers can be taken to the pinned data and the caller can be confident the pointer stays valid.

Reference: [Streams](https://tokio.rs/tokio/tutorial/streams)