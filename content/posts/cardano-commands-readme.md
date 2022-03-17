+++
title = "Cardano Commands"
author = ["Chop Tr (chop.ink)"]
date = 2022-02-06T00:00:00+07:00
tags = ["cardano", "stake", "pool", "manage", "secret", "keys"]
draft = false
+++

As a Cardano Pool operator, I have setup stake pools both on testnets and mainnet since early 2021.

Most of the time I was following the 2 tutorials [Coincashdew](https://www.coincashew.com/coins/overview-ada/guide-how-to-build-a-haskell-stakepool-node) and [ARMada](https://docs.armada-alliance.com/learn/). Both of them are great detailed tutorials and are a must read when you first start to learn about stake pool operation.

During my setups, the part where I need to manage the keys was the most confusing and error prone. So I wrote this tool to help me automate the steps in handling the pool keys, hope it may help other pool operators when you guys need to setup and manage one.

This tool is written as part of toolbox to manage Armada Stake pool - ticker [ARMDA](https://armadacardano.io/).


## Requirements {#requirements}

-   Nodejs &gt; 14

Cardano tool will interact with the current Cardano blockchain therefore latest tool is needed to perform below operations.

-   cardano-cli
-   cardano-node

This tool create a stake pool with owner key extract from Mnemonic phrase. This has the benefit of managing the reward right from the Wallet tool like Yoroi or Daelus.

Additional requirement to extract the keys are:

-   cardano-address
-   bech32

All the tools must be present in the PATH for this scrip to access.


## Installation {#installation}

Clone the source code and install the dependencies

```bash
git clone https://github.com/trchopan/cardano-commands.git
```

```bash
cd cardano-commands
npm install
```


## Support operation {#support-operation}

-   [X] Register new Stake pool
-   [X] Edit pool certificate
-   [X] Retire Stake pool


## The setup {#the-setup}

I split the responsibility into 2: The Pool Operator and The Pool Owner.


### The Pool Operator {#the-pool-operator}

Is responsible of keeping the pool up and healthy. Manage the configuration, Update the `cardano-node` and `cardano-cli`, the Prometheus and Graphana setup etc. The keys Pool Operator will have are:

For operational:

-   kes.skey
-   vrf.skey
-   node.cert

For refresing the KES:

-   node.counter
-   node.skey
-   kes.vkey


### The Pool Owner {#the-pool-owner}

Is the one who has access to the pool pledge and no one else. Only him can have the payment and stake keys, his responsibility is to keep all the cold keys safe under a `Master Password`. The Pool Owner can perform operations:

-   Create new Pool
-   Update Pool information (certificate)
-   Retire the pool

He/She should use the 24 mnemonic words to gain the ownership of the keys. This way he can easily import the wallet to wallet software like Daelus or Yoroi to comfortably sending and receiving payment as well as withdraw rewards.


### Why not using already avaiable tool like CNTools {#why-not-using-already-avaiable-tool-like-cntools}

There is a awesome tool from the cardano-community &gt; [CNTools](https://cardano-community.github.io/guild-operators/basics) &lt; that will perform all the operation above with ease. I suggest if you first building a new pool, you can refer to them as the Swiss-army knife to interact with the Cardano Blockchain.

But I have extra requirements that I would like to keep for my setup.

1.  The `Pool Operator` have no access to the Payment keys and only the Ower himself can have those.
2.  The Owner no need to operate the `cardano-node` setup
3.  The Owner is the one building the transactions (safer compare to sign a transaction copy over from the block producer node)


### cardano-commands {#cardano-commands}

This tool also has 2 parts that follow the responsibilities above but mainly will be used by the Pool Owner for his/her operations.

{{< figure src="/ox-hugo/setup-diagram_20220220_232111.png" width="720" >}}

For an operation to perform, the `Core Node` will turn into a API server that serve queries from the `Secret Nodes` and also taking down the Keys after the secret node generate and combine those.

It's also act as a live `cardano-node` to talk with the blockchain itself for required information. The Secret Node get the information like `start KES period`, `protocol params`, etc. to conduct the operations.


## License {#license}

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-, Quang Tran.
