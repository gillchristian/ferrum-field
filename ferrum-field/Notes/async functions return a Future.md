---
title: async functions return a Future
created_at: 2023-12-29T12:32:42+01:00
publish: true
---

[[async-await is lazy in Rust]] / [[Rust futures are state machines]]

`async` functions do not run an operation immediately when called but rather they return a Future, which is a value representing the operation.

The operation runs when `.await` is called.

```rust
async fn say_world() {
  println! ("world");
}

#[tokio::main]
async fn main() {
  let op = say_world();

  println!("hello");

  op.await;
}
```

Prints:

```
hello
world
```

Reference: [Hello Tokio](https://tokio.rs/tokio/tutorial/hello-tokio)

> Unlike how futures are implemented in other languages, a Rust future does not represent a computation happening in the background, rather the Rust future **is** the computation itself.

Reference: [Async in depth](https://tokio.rs/tokio/tutorial/async)