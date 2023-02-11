+++
title = "Projects"
author = ["Chop Tr (chop.dev)"]
description = "These are the projects I worked on over the years as a software engineer. I was mainly lead in coding as well as system design. Some of the projects I am still actively maintaining."
date = 2023-01-01T00:00:00+07:00
tags = ["porfolio", "projects", "showcase"]
draft = false
+++

[https://porfolio.chop.dev/](https://porfolio.chop.dev/)

Visit here for my fancy threejs site, I'm just a novice with threejs 😝.

WARNING: It takes sometime to load.

Otherwise here are projects I worked on over the years as a software engineer.

# Cardano Globe

<div style="text-align: center">
<video loop autoplay muted>
  <source src="/porfolio/cardano-globe.mp4" type="video/mp4">
</video>
</div>

## Client

LN₳TR - Cardano Stake Pool from Vietnam

## Year

2019

I use a Firebase Cloud Function to periodically pull the information of Stake Pools on Cardano blockchain.

Then I use a ip locator service to locate the country of each pool and store it to Firestore DB. The list of all the pool then cached on GCP Cloud Storage.

The live block production is taken from pool

## Technologies

- Cardano blockchain
- Firebase
- NodeJs
- Vue + Vite

## Link:

[https://cardano-globe.web.app](https://cardano-globe.web.app)

<hr />

# Near Line Connect

<div style="text-align: center">
<video loop autoplay muted>
  <source src="/porfolio/near-line-connect.mp4" type="video/mp4">
</video>
</div>

## Client

LINE UIT Workshop

## Year

2021

This is a 3 members presentation for LINE Chat app workshop

We prove a concept of connecting Line members with Near blockchain and allow them to purchase NFT

## Technologies

- Near Protocol Blockchain
- LINE Authentication Service
- Cryptographic algorithm Ed25519
- Near Smart Contract
- Rust
- Svelte

## Link

[https://chop.dev/posts/near-line-connect/](https://chop.dev/posts/near-line-connect/)

<hr />

# Mini View Trader

<div style="text-align: center">
<video loop autoplay muted>
  <source src="/porfolio/mini-view-trader.mp4" type="video/mp4">
</video>
</div>

## Client

TQP trading group

## Year

2020

In this project, I build a trading bot for a group of Vietnamese traders. The bot make and manage orders on Binance Exchange using its API.

The bot using Firebase Cloud Function to run scheduled jobs to check and sync the orders. Then report the result and monitor the trades using a Dashboard build using VueJs

## Technologies

- Binance API
- Crypto trading
- Google Cloud Platform
- Firebase

## Link
[https://mini-view-trader-v2.web.app/](https://mini-view-trader-v2.web.app/)

<hr />

# Cardano Commands

<div style="text-align: center">
<video loop autoplay muted>
  <source src="/porfolio/cardano-commands.mp4" type="video/mp4">
</video>
</div>

## Client

ARMDA Stake Pool - armadacardano.io

## Year

2021

As a Cardano Pool operator, I have setup stake pools both on testnets and mainnet since early 2021.

During my setups, the part where I need to manage the keys was the most confusing and error prone. So I wrote this tool to help me automate the steps in handling the pool keys.

## Technologies

- Cardano Blockchain
- NodeJs
- Google Cloud Platform

## Link

[https://github.com/trchopan/cardano-commands](https://github.com/trchopan/cardano-commands)

<hr />

# Scheduled Blocks

<div style="text-align: center">
<video loop autoplay muted>
  <source src="/porfolio/scheduled-blocks.mp4" type="video/mp4">
</video>
</div>

## Year

2022

Use the Epoch Nonce seeds and compare with the Pool sigma derived VRF key of the Pool to calculate the block assignment schedule.

Reduce the dependancy on running a complete Cardano node as data is taken from blockfrost.io and armada-alliance.com.

This is a rewritten in Haskell of the ScheduledBlocks in Python.

## Technologies

- Cardano Blockchain
- Haskell
- Cryptographic tool libsodium
- Verifiable random function

## Link

[https://github.com/trchopan/scheduled-blocks](https://github.com/trchopan/scheduled-blocks)

<hr />

# Web Scalpel in Haskell

<div style="text-align: center">
<video loop autoplay muted>
  <source src="/porfolio/web-scalpel.mp4" type="video/mp4">
</video>
</div>

## Year

2020

I start my study in Haskell with this fun project. Which serve me quite well as a hunting tool for good discount of electronic in Vietnam.

The tool live on my Rapsberry Pi and crawl the popular website selling products such as Macbook, Iphone, Samsung Galaxy, etc.

The data is present as a grid view so I can checkout the best prices for each product.

## Technologies

- Haskell
- Puppeteer
- Svelte
- Raspberry Pi

## Link

[https://github.com/trchopan/web-scalpel](https://github.com/trchopan/web-scalpel)

<hr />

# Chess using Bevy engine

<div style="text-align: center">
<video loop autoplay muted>
  <source src="/porfolio/chess-bevy.mp4" type="video/mp4">
</video>
</div>

## Year

2022

Learning Rust was fun. And the most exciting thing is applying what I learn to a real project.

I made this Chess game using Bevy Engine in Rust to try out my skill.

## Technologies

- Rust
- Bevy

## Link

[https://github.com/trchopan/chess-bevy](https://github.com/trchopan/chess-bevy)

<hr />

# Firebase Auth - Rust crate

<div style="text-align: center">
<video loop autoplay muted>
  <source src="/porfolio/firebase-auth.mp4" type="video/mp4">
</video>
</div>

## Year

2022

I work frequently with Firebase and when I begin to programing in Rust, there was no package for the Firebase tool. So I decided to crate one.

This crate will help initialize and integrate the Firebase Authentication service to the popular Actix web frame work (one of the fastest web frameworks out there)

## Technologies

- Rust
- Firebase

## Link

[https://crates.io/crates/firebase-auth](https://crates.io/crates/firebase-auth)
