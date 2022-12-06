+++
title = "Near Line Connect"
author = ["Chop Tr (blog.chop.dev)"]
description = "Preparation for Line Presentation Workshop"
date = 2022-08-01T00:00:00+07:00
tags = ["near", "line", "connect"]
draft = false
+++

## Introduction {#introduction}

A little bit of back story, we are 3 front-ends developer who enjoy learning new technology and exploring new domain of knowledge.

We come together on the same interest. It is blockchain technology. We have been exploring as engineers eager to learn new technology and applying them to our project.


## The Goals of this talk {#the-goals-of-this-talk}


### Demonstrate our progress of approaching and applying blockchain {#demonstrate-our-progress-of-approaching-and-applying-blockchain}


### Inspire developer to explore new technology {#inspire-developer-to-explore-new-technology}


## Traditional world and Blockchain world {#traditional-world-and-blockchain-world}

When we dived into blockchain space. We found out that there are 2 separated flow of information, or data, scrattered in 2 worlds. I call it `Traditional world` and `Blockchain world`.

I will give some of my own interpretation to identify the two:


### Traditional world {#traditional-world}

-   User's profile and identify that are kept with consensus and in centralized organization.

-   User normally would like to build his/her profile online to connect to other people such as friends or business contracts.

-   Data storage and processing are generally cheap, easy to access and exchange between server, using API and databases.

-   Examples for this are services like Line, Facebook, Twitter etc.


### Blockchain world {#blockchain-world}

-   User has a `"Wallet"` to identify his/herself this comes in form of key-pair secret and a hexadcimal public address such as `"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"`.

-   User send and verify a transaction that effect the blockchain. Common action such as sending fund, purchase token (either fungible token ie. coins or Non-fungible token ie. certificates).

-   Data is recorded in form of `Smart Contract` and `Transactions`. These can be viewed publicly using Blockchain Explorers.

-   All transations on the blockchains is charged with a fee (usually called gas fee) to maintain the network in decentralized fashion. Fee are paid toward the maintainer who keeps the blockchain ledger up and running.

-   There are many blockchains that provide public services and process millions of transactions every day such as Ethereum, Binance Smart Chain, Solana, Near Protocol, etc.


## Connect the 2 worlds {#connect-the-2-worlds}

Expanding the `traditional world` to `blockchain world` to quickly verify and identify has becoming a need for any business.

It will allow user to explore the `crypto currency market` and services with a sense of ownership in parallel of their connection with the traditional world. Where they can build their own social network and wealth just as normal.


### What we want to do {#what-we-want-to-do}

{{< figure src="/ox-hugo/near-line-connect-brow-nft_20220801_115058.png" width="350" >}}

Imagine where you can purchase a extreamly rare `Brown NFT` and share it to your feed. And anyone can use Blockchain `Smart Contract` to verify your authenticity of the purchase and connect it with your Line Account or Facebook account.

What we want to do is a system that can verify the authenticity of a NFT right on-chain. Preserve the correctness of the authorization that published the NFT and proven ownership of the owner.

{{< figure src="/ox-hugo/near-line-connect-authentic-check.gif" width="350" >}}


## Message Signing {#message-signing}

Given the above goal we need to perform 2 steps:

-   User verify him/herself with the Traditional Authentication system. In this case we will use LIFF - LINE Front-end Framework for example.

-   User request a certificate that is signed by Traditional Authentication and will be accepted by the Blockchain Smartcontract


### Signing a message {#signing-a-message}


#### Why we need to sign a message {#why-we-need-to-sign-a-message}

-   To prevent data modification in the middle of data transfer

-   Make sure the message come from the right source


#### How it works {#how-it-works}

1.  Signing the Message

{{< figure src="/ox-hugo/near-line-connect-sign-message_20220801_135935.png" width="720" >}}

-   `Server` calculate a hash from the messageM (the message you want to encrypt)

-   `Server` encrypt the hash by using `public and private key pair` (This is signing the message)

-   `Message` now can be sent together with the `Signature` to the `Smart Contract` to perform registration action

-   Open the Signed message

{{< figure src="/ox-hugo/near-line-connect-open-signed-message_20220801_140149.png" width="720" >}}

-   `Smart Contract` calculated the hash of the `Message` by using `public key`.

-   `Smart Contract` decrypt the `Signature`  using the `public key`.

-   Compare if two hash is the same, the `Message` is valid and not modified by third party in the middle of transfer.


### Quick word for the solution we choose - Ed25519. {#quick-word-for-the-solution-we-choose-ed25519-dot}

As mention above Near Protocol compile the  smart contract into wasm to execute them efficiently and correctly.

The SDK to write smart contract is provided in `AssemblyScript` and `Rust`. And we choose Rust to implement this part of the application for its correctness and safe memory management system during development.

(Which comes with a steep learning curve of a new language and system)

We need to compile the code, targeting `wasm32-unknown-unknown` in order to deploy our `Smart Contract`.

Which comes to some of problem of compatibility problems. We need to aware that the library we use must be able to compiled into wasm. We have learned it the hard way when implement the first version using a library that depends on openssl written in C and at the moment cannot compiled into wasm. We had to rewritten that part again.

`Ed25519` also provide a robust and fast execution compare to equivalent scheme.

{{< figure src="/ox-hugo/near-line-connect-ed25519_20220801_143541.png" width="720" >}}


#### Compare standards {#compare-standards}

| Standard | Note                                                                                                                                                                  |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RSA      | Slower option. Almost always available                                                                                                                                |
| ECDSA    | Better theoretical more security than RSA.                                                                                                                            |
|          | 1/ However it is difficult to implement without any mistake. Most errors will compromise the security.                                                                |
|          | 2/ USA Design: the curves standardized by NIST could have been tampered by NSA. The trustworthiness of those curves is not good enough for them to be used.           |
| ED25519  | About the same safety as ECDSA for practical purpose. The standard has been designed to allow simpler implementation. German design, with an open process. No patent. |


#### Benchmarks {#benchmarks}

Below are benchmarks from a Core-i5 6400 @ 2.7 GHz.

| Algorithm                    | Milliseconds/Operation | Megacycles/Operation |
|------------------------------|------------------------|----------------------|
| ed25519 Signature            | 0.018                  | 0.048                |
| ed25519 Verification         | 0.049                  | 0.132                |
| ECDSA secp256r1 Signature    | 0.515                  | 1.391                |
| ECDSA secp256r1 Verification | 1.805                  | 4.874                |

Source: <https://www.cryptopp.com/wiki/Ed25519#Benchmarks>


## The Concept Application {#the-concept-application}

With the solution of `Message Signing` we develop a scheme to allow user login to LINE and request us to sign the `Registration Message`.

User then can use that `Registration message` to register his/her `LINE Profile` with the `Near Protocol wallet` by sending it to designated `Smart Contract`.

{{< figure src="/ox-hugo/connect-auth-ux_20220711_113755.png" width="700" >}}

As you already expected, after the registration user will has the items and services on `Near Protocol` identified and connected with `LINE Profile`. And enjoy the extended features.


### Features {#features}


#### Near &amp; Line Connect {#near-and-line-connect}

(The main research of this presentation)


#### Fungible Token - LINE coin {#fungible-token-line-coin}


#### Non-fungible Token - Line NFT Shop {#non-fungible-token-line-nft-shop}


## Q&amp;A {#q-and-a}
