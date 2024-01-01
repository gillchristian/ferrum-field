---
title: await yields control back to the thread
created_at: 2023-12-29T12:29:32+01:00
publish: true
---

> Any calls to `.await` within the `async fn` yield control back to the thread. The thread may do other work while the operation processes in the background.

Reference: [Hello Tokio](https://tokio.rs/tokio/tutorial/hello-tokio)