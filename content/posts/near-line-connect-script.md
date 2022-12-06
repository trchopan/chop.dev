+++
title = "Near Line Connect Script"
author = ["Chop Tr (blog.chop.dev)"]
description = "Preparation for Line Presentation Workshop Talk script"
date = 2022-08-09T00:00:00+07:00
tags = ["near", "line", "connect"]
draft = false
+++

## Line-Near Connect {#line-near-connect}

Thank you Khoa for a great overview on Blockchain and Near Protocol.

I will continue with the topic of LINE-Near Connect.

So I hope everyone here already know that Line is a global chat app

that continuously growing along side with other tech giants like

Google, Facebook, Twitter to build a kind of social network

to connect many people over the internet.

And in this talk we would like to connect LINE with blockchain,

to expand it's value and give our user all the benefit of a new type

of market, the decentralized market. Where you can buy and sell digital assets

such as NFT or Tokens without any central authority.

(change slide - Slide 15 - Line-Near diagram)

This diagram is taken from the LINE blockchain website that

I think it shows exactly what I mean, The connection between Blockchain &lt;-&gt; Line.

And our application serve like a proof of concept for this connection.

(change slide - Slide 16 - 2 Collumn describe difference between Line Profile and Blockchain Wallet)


## The two worlds {#the-two-worlds}

So when we talk entity and identity on the Internet.

There are 2 separate concept that I need to distinguish.

It is the Line Profile and the Blockchain Wallet.

(point to the left side picture)

Line Profile is a identification of a user that is kept in our database.

The user provide LINE his/her data, such as information about

activities and interactions. He/She can then build and expand

connections with friends and business contacts using LINE platform.

And the user normally would like this kind of fast interaction

normally through chat or simple messages.

This type of information is very easy to modify by authority such as LINE in this case.

And it is centralized in our server.

Examples of this side is not just LINE. Also Facebook, Twitter, Google etc.

But when you think about it, not all actions on the internet

should be temporary and under controlled like this.

Some time you need to finalize information

in a way that is permanant and secure.

And uncontrollable by any authority.

Then we need the solution of Blockhchain.

(point to the right side picture)

In this world, the user is identified by a Wallets.

Those are keypairs. secret and public keys.

that can be used to operate on the blockchain.

By operate I mean making transactions.

User can use this keypair together with his/her Wallet software

to send and verify transactions on the blockchain.

Essentially permanantly record his/her action the the decentralized world.

These transactions on the blockchain is has high cost

as it need the collaborative work of the whole network to finalize.

Please pay attention to this cost as it will be a factor in our solution later.

But what you get back is a very strong proof that your actions are valid and verifiable by anyone.

The examples for this are many public blockchains such as Ethereum, Solana and Near protocol.

For today application, we choose to build on Near

but it should be the same with other blockchain as well.

(point to the &lt;-&gt; arrow)

So. How to verify these Identities.

How do we connect the Social / Traditional world to the blockchain wallet?

It is the question that my team has been trying to solve for the last few of months

during our research about blockchain technology.

Keep in mind that we are 3 front-ends engineers that dive head first into this topic so

our solution may not be the best or standard of the industry but instead please look that it

as a Proof of Concept.


## The methods that we tried {#the-methods-that-we-tried}

(change slide - Slide 17 - 3 methods that we tried)


### Create Smart Contract to Connect {#create-smart-contract-to-connect}

{{< figure src="/ox-hugo/near-line-connect-script-method-1.org_20220809_192052.png" width="720" >}}

The first attemp was to create a Smart Contract with a simple KeyMap storage that user

can update by making a transaction into this smart contract.

```json
{
//  LINE ID     :  Wallet ID
    "U1a2b3c4de": "0x5b7d134df00..."
    "U542fdf34d": "0x34db3c8fcc4d..."
    ...
}
```

The problem with this attemp is anyone can send transation to record a LINE id.

We can restrict that only the owner of the wallet can create a record but we

have no control over the validity of the LINE id.

So ie, for this first attemp we don't have a valid check for LINE login

before record to the storage.

Let's check out the next attempt.


### Verify by Traditional Backend {#verify-by-traditional-backend}

{{< figure src="/ox-hugo/near-line-connect-script-method-2.org_20220809_192228.png" width="450" >}}

Yes we also this had this in the discussion.

This solve the problem of verify the LINE user.

And we use LINE normal login flow using the SDK or LINE app.

But, the problem of this method is that it is against what we aim for

It is centralized in our server and does not give the user the benefit of storing this record onto

Near blockchain and provide the strong proof of his/her identity and transactions etc.

So we also not going this.

Let's check out another attempt.


### Backend Verify and make transaction to record {#backend-verify-and-make-transaction-to-record}

{{< figure src="/ox-hugo/near-line-connect-script-method-3.org_20220809_192614.png" width="720" >}}

For this attempt, we make a Smart Contract as a KeyMap value like in attempt number 1.

But restrict only the Backend can send the transaction to record.

This make the data avaiable onto Near blockchain.

And also allow us to verify the authenticity of the login from LINE.

But it comes with a big cost.

You see, as I mention above making records on smart contract require

verification from the whole network and everytime we make a record,

we need to pay a small fee to the network.

This's normally called gas fee.

Therefore, for this method we subjectible to Spam attack.

Imagine there are multiple request for records,

which then cost us a lot transaction fee.

We don't want to pay this fee right.

We would like the blockchain wallet to be the one who finalize the transaction.

(change slide - Slide 18 - Message Signing)


## Message Signing {#message-signing}

Which bring us to the solution we feel most comfortable with.

`Message Signing`.

So Why do we need message signing?

How it helps us solve the problems above?

First It is a way to produce a message or any kind of data

to be transfered together with some sort of Signature.

These can ensure that we can prevent data modification during transfer.

Because only the author of the message can produce the Signature.

It also allow us to make sure it comes from the right source.

In this case, it should come from the LINE authentication service.

Then the best part is we can delegate the transaction to the user.

He/She will be the one to send the transaction to NEAR blockchain

and pay the gas fee.

Completely avoid the flow that will subjectable to spaming.

Let see how we apply this in our solution.

(change slide - Slide 19 - How we apply)

First, of couse, user need to sign in LINE and also sign in to NEAR wallet.

Then he/she can request the credential from our server by giving the access token

for verifying the LINE login.

Together with the wallet address that need to be connected.

The server then verify the access token and if Ok,

sign a message that contain the data to be sent to the smart contract.

We also implement an expire time so user cannot use this certificate forever.

We use Edward 25519 eliptic curve to perform the message signing.

As it is quite the industry standard and proven to be very strong cryptographic algorithm.

The signature together with the message then sent back to the user and he has upto

the expiration time to complete the transaction.

Record the data into the NEAR blockchain.

After that anyone can verify the connection of the Line ID and Wallet ID.


### How message Signing work {#how-message-signing-work}

(change slide - Slide 20 - How message signing work)

Ok. So this is a quick slide to further describe how message signing work under the hood.

This is very brief overview but I hope you get the picture of the process.

So the server is the one keeping the keys.

These should be created before hand.

Includes a Private Key and a Public Key.

Like the name imply, the Private Key can only be known by the server and

the Public key is the one that can verify the Signature.

And we also keep this Public key on the Smart Contract so it can perform the verification.

Ok so, First step is the server use both the keys to sign

the message and produce a Signature.

The signature and the message then can be put in a transaction and sent to the Smart Contract.

In side the Smart Contract we have the Public Key,

it will use the key to first hash the Message to produce a hash string.

Then will descrypt the Signature using the same key.

It also produce a hash string.

And finally, it compare the Hash strings together,

if they are the same the message is valid and not modified.

As you may known, this method is very popular in our day to day encrypttion

like TLS handshake, Payment system, etc.

Ok so let's get back to our Application.


## Application Features {#application-features}

(change slide - Slide 21 - Application fetures)

So after bridging the gap between LINE and NEAR blockchain,

we build full application for this presentation.

We spend about 3 weeks develop and publish it live.

Please forgive us if there's any bug as it is still a work in progress.

But you can use the link here to visit our app

(point to link)

As Khoa mention above NEAR provide us very great Developer experience with the NEAR SDK and

very friendly tutorials and documents.

Their toolchain is an absolute best compare to other blockchains.

They also have a bunch of standards Smart Contract that developed by the core team themself

so we can quarantee correctness and safety when using them.

We use some of those Smart Contract to implement the full features for our app includes:

-   Publish fungible tokens. we call it LINE token obviously :D

-   Then we provide the distribution service like Faucet and financial service like Staking.

-   We also create a NFT shop to test out our concept of Authentic verification for the NFT

    The user that has LINE account and NEAR wallet can purchase those NFT using the LINE tokens.

    And prove his/her ownership of the NFT using the app.


## Demo {#demo}

So this is the part where I give you a quick tour of the above functionalities.

(Open the browser to demo the app)

First I will sign in using my LINE account.

Then I will sign in using my NEAR wallet.

After the sign in preparation finishs.

And then I will request the Signature to make my Certification valid.

And then send the transaction to the blockchain.

Here it will navigate me to the NEAR wallet for me to send the transaction.

With this transaction it certify for me to connect LINE and NEAR.

Ok. so after the transaction success, we then navigated back to the app.

And give it sometime to verify the connection.

And Success.

We can enjoy the features of our app.

(change slide - Application fetures - Faucet)


### Faucet {#faucet}

First this is the Faucet

where LINE tokens are distributed.

We set a maxium that you can request upto 10,000 LINE tokens per wallet.

Now it is open freely so anyone can request the tokens,

but in real world you can imagine this is as reward for

some online game to distribute it fairly.


### Staking {#staking}

And here is the Staking tab.

It is a financial service.

Where you can stake your LINE token and enjoy the high interest rate that we have here.

This incentivise the holders of the LINE tokens to keep the token to increase its value.


### NFT shop {#nft-shop}

And here comes to the NFT shop.

It is a shop for collectible Non-Fungible Tokens or NFT.

It sells the NFT for Line items using the LINE tokens above.

If you click on one NFT, it will navigate you to the detail page.

Notice that the you can share this page you your friends or to LINE chat

using this Share to Line button.

Anyone who visite this link can check the authenticity of the NFT.

Even find out who is the owner and contact him/her to buy it using Line Chat

Because these NFT are resellable by the user themself.

There is another button to view the NFT on the NEAR blockchain explorer

to further prove the authenticity of the NFT.

So this NFT already owned by Tue

Let's go back and visit an NFT shop and look for what we can purchase.

(change slide - NFT Shop)

Cony is already taken so I will purchase Sally :D

To perform a purchase, first I check the price of this NFT,

which is 1,695 LINE tokens.

Then I click the "Purchase with LINE tokens" button.

And here it navigate me to the NEAR wallet to finish the transaction.

I also give it a check in the transaction details

that it really cost me 1,695 LINE tokens.

So I just use LINE tokens to buy a NFT from the shop.

And this should give the Authentic Check to show that it's now belong to me.

I now can be sure that the transaction is verify by Near blockchain

and the NFT is belong to me.


## Conclusion {#conclusion}

(Change back to the slides - Slide 23)

Ok, so I think that's it.

That our Concept App that we developed in the last few weeks

during our time learning about blockchain technology and how to

connect it with LINE.

It was very fun experience and very exciting journey.

We glad that we can share it with you today.

I hope that we will have many more oppotunities to learn more about this technology

and apply our knowledge.

Thank you for listening and thank you for having us today.
