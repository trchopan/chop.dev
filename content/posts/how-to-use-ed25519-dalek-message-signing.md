+++
title = "How To Use Ed25519 Dalek Message Signing"
author = ["Chop Tr (chop.ink)"]
description = "Pure Rust example for using Edwards 25519 to sign and verify message"
date = 2022-07-11T00:00:00+07:00
tags = ["ed25519", "dalek", "message", "signing", "signature", "cryptography"]
draft = false
+++

## Use Case {#use-case}

I'm developing a authentication system to connect the traditional Auth system with blockchain wallet. In this system, User can login into his / her account in tradional services like Google, Facebook, Line app, etc. Then connect this with a web3 wallet.

I use a smart contract to keep a map between the User Id and the wallet address. And a Backend to very the authenticity of the user on the traditional system.

The UX flow is as follow:

{{< figure src="/ox-hugo/connect-auth-ux_20220711_113755.png" width="700" >}}

This user flow need away to:

-   Produce a Signature Proof that the message is valid
-   Verify the Signature Proof using the message + public key

=&gt; A good use case for Elliptic curve application. I choose edward 25519 as it has a pure implementation in Rust which can be compiled into wasm. Other implementations has dependency on third party library such as openssl and rust still has trouble compile those into wasm for some blockchain smart contract.


## The draft drawing of the steps {#the-draft-drawing-of-the-steps}

{{< figure src="/ox-hugo/connect-auth-proof-and-verify_20220711_114210.png" width="700" >}}


## Example Rust code {#example-rust-code}


### Cargo.toml {#cargo-dot-toml}

```nil
[dependencies]
clap = { version = "3.2.8", features = ["derive"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
ed25519-dalek = "1.0.1"
rand = { version = "0.7.0", features = ["std"] } # ed25519-dalek depends on this old version of rand
hex = "0.4.3"
```


### main.rs {#main-dot-rs}

```rust
use std::fs;

use clap::Parser;

extern crate ed25519_dalek;
extern crate rand;

use ed25519_dalek::Keypair;
use ed25519_dalek::Verifier;
use ed25519_dalek::{PublicKey, SecretKey};
use ed25519_dalek::{Signature, Signer};
use rand::rngs::OsRng;

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
enum KeyScheme {
    Ed25519Public,
    Ed25519Secret,
    Unknown(String),
}

#[derive(Serialize, Deserialize)]
struct KeyFile {
    name: KeyScheme,
    hex: String,
}

/// Handle deriving VRF public key
#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(subcommand)]
    command: Commands,
}

#[derive(Debug, clap::Subcommand)]
enum Commands {
    /// Generate secret and public key pair into files
    GenKey {
        /// The secret key file path
        #[clap(long, parse(from_os_str))]
        secret_key: std::path::PathBuf,

        /// The public key file path
        #[clap(long, value_parser)]
        public_key: std::path::PathBuf,
    },

    /// Sign the message with both Public and Secret key
    Sign {
        /// The secret key file path
        #[clap(long, parse(from_os_str))]
        secret_key: std::path::PathBuf,

        /// The public key file path
        #[clap(long, value_parser)]
        public_key: std::path::PathBuf,

        /// The message to verify
        #[clap(long, value_parser)]
        message: String,
    },

    /// Verify the message with public key
    Verify {
        /// The public key string
        #[clap(long, value_parser)]
        public_key: String,

        /// The signature produced by `sign` command
        #[clap(long, value_parser)]
        signature: String,

        /// The message to verify
        #[clap(long, value_parser)]
        message: String,
    },
}

fn read_key_file(fp: std::path::PathBuf) -> KeyFile {
    let contents = fs::read_to_string(fp).expect("Something went wrong reading the file");

    serde_json::from_str::<KeyFile>(&contents).expect("Cannot parse key file")
}

fn main() {
    let args = Args::parse();

    match args.command {
        Commands::GenKey {
            public_key,
            secret_key,
        } => {
            let mut csprng = OsRng {};
            let keypair: Keypair = Keypair::generate(&mut csprng);
            let secret_key_file = KeyFile {
                name: KeyScheme::Ed25519Secret,
                hex: hex::encode(&keypair.secret),
            };
            let secret_key_string =
                serde_json::to_string(&secret_key_file).expect("secret keyfile failed");
            fs::write(secret_key, secret_key_string).expect("write secret keyfile failed");

            let public_key_file = KeyFile {
                name: KeyScheme::Ed25519Secret,
                hex: hex::encode(&keypair.public),
            };
            let public_key_string =
                serde_json::to_string(&public_key_file).expect("public keyfile failed");

            fs::write(public_key, public_key_string).expect("write public keyfile failed");

            println!("keypair saved!");
        }
        Commands::Sign {
            secret_key,
            public_key,
            message,
        } => {
            let secret_key_file: KeyFile = read_key_file(secret_key);
            let secret_key_string =
                hex::decode(secret_key_file.hex).expect("Cannot decode secret_key");
            let secret_key =
                SecretKey::from_bytes(&secret_key_string).expect("Cannot decode secret_key bytes");

            let public_key_file: KeyFile = read_key_file(public_key);
            let public_key_string =
                hex::decode(public_key_file.hex).expect("Cannot decode public_key");
            let public_key =
                PublicKey::from_bytes(&public_key_string).expect("Cannot decode public_key bytes");

            let key_pair = Keypair {
                secret: secret_key,
                public: public_key,
            };

            let signature = key_pair.sign(message.as_bytes());
            println!("proof>> {:?}", hex::encode(signature.to_bytes()));
        }
        Commands::Verify {
            public_key,
            signature,
            message,
        } => {
            let signature_bytes = hex::decode(signature).expect("Cannot decode signature");
            let signature_ = Signature::from_bytes(&signature_bytes)
                .expect("Cannot create signature from bytes");
            let public_key_decode = hex::decode(public_key).expect("Cannot decode public_key");
            let public_key =
                PublicKey::from_bytes(&public_key_decode).expect("Cannot create public_key bytes");

            match public_key.verify(message.as_bytes(), &signature_) {
                Ok(_) => println!("proof is truthful"),
                Err(err) => println!("bad signature {:?}", err),
            }
        }
    }
}
```

```bash
$ cargo run --bin cli -- gen-key --public-key example.vkey --secret-key example.skey

$ cargo run --bin cli -- sign --public-key example.vkey --secret-key example.skey --message "hello world"
proof>> "e0ce82de565b6db2e4aa35e803135ad256b97df211cac2bfd248ab2a00cee4e012ece08342b3cf6e0290e477162e60f480efcf29df22e5de0412152ef6b45a0e"

$ cargo run --bin cli -- verify --public-key $(cat example.vkey|jq -r '.hex') \
    --signature "e0ce82de565b6db2e4aa35e803135ad256b97df211cac2bfd248ab2a00cee4e012ece08342b3cf6e0290e477162e60f480efcf29df22e5de0412152ef6b45a0e" \
    --message "hello world"
proof is truthful
```
