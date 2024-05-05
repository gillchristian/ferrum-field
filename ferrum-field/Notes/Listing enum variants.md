---
title: Listing enum variants
created_at: 2024-05-06T01:28:15+02:00
publish: true
---

For the the [command](https://redis.io/docs/latest/commands/command/) command in [[Mini-Redis|Redis]] we want to display a list of all the available commands.

Doing so by hand is prone to forgetting to include a newly implemented command and have the list become outdated.

The following [[proc-macro]] adds a method to an `enum` which lists all its variants by deriving `VariantName`.

```rs
extern crate proc_macro;
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, Data, DeriveInput};

#[proc_macro_derive(VariantNames)]
pub fn enum_variant_names_derive(input: TokenStream) -> TokenStream {
    let input = parse_macro_input!(input as DeriveInput);

    let name = &input.ident;
    let variants = if let Data::Enum(ref data_enum) = input.data {
        data_enum
            .variants
            .iter()
            .map(|v| &v.ident)
            .collect::<Vec<_>>()
    } else {
        panic!("VariantNames can only be derived for enums");
    };

    let generated = quote! {
        impl #name {
            pub fn all_variants() -> &'static [&'static str] {
                &[
                    #(stringify!(#variants)),*
                ]
            }
        }
    };

    TokenStream::from(generated)
}
```

Here's how it's used:

```rs
#[derive(VariantNames)]
enum Foo {
  Bar,
  Baz,
}

fn main() {
    let variants = Foo::all_variants();

    assert_eq!(
        Foo::all_variants(),
        ["Bar", "Baz"]
    );
}
```