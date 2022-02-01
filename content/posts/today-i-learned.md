+++
title = "Today I Learned"
author = ["Chop Tr (chop.ink)"]
description = "It is good to keep a note of things I learned during the day"
date = 2022-01-26T00:00:00+07:00
tags = ["today", "i", "learned"]
draft = false
+++

I started using Emacs about a week ago <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-24 Mon&gt; </span></span> . With such powerful tool I think I should begin the habbit to write things down. Hopefully it will improve my workflow and help me into a more organised mode.


## Day 5 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-01 Tue&gt;</span></span> {#day-5}

Spend the morning to find out the syntax highlight of the theme I'm using actually handled by PrismJS. Which does not have the syntax for `emacs-lisp` scripts. So I disabled it, Looks like Hugo already handled the syntax highlight 👍


## Day 4 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-31 Mon&gt;</span></span> {#day-4}

Today is a good day. With a lot of things todo, I still managed to purchage the new domain and spin up the website at <https://chop.ink> . It will be my site to dump all these writing to.

I started to learn Hugo. This tool is fast. I mean really really fast!!!

A side note, tonight is Luna New year eve. Happy New Year, may luck and health come to all.


## Day 3 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-30 Sun&gt;</span></span> {#day-3}


### Mix pitch and Zen mode {#mix-pitch-and-zen-mode}

Morning was more emacs setup. I solved the problem with `mix pitch mode` and  fonts serif and improve `zen mode` editing.


### Jumping keys is great now with a bit of configuration {#jumping-keys-is-great-now-with-a-bit-of-configuration}

I have the most awesome settings for avy-jumping keys. Most of the keys should be in the middle of key board, the difficult to reach should be the outer area.

{{< figure src="/ox-hugo/avy-keys_20220131_203804.png" width="720px" >}}


### Block schedule should be calculate with the new epoch snapshot {#block-schedule-should-be-calculate-with-the-new-epoch-snapshot}

After chatting with Felix about his pool missing a block that he had calculated to be scheduled for his pool. We realized that he used the old epoch sigma and stake to calculate the scheduled. Which make me nervous about the Cardano block scheduled for ARMADA pool at 18:20 next day. Luckily, after double checked using the `ScheduledBlocks` tool, I confirmed that it was correct and we did received the block.


## Day 2 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-29 Sat&gt;</span></span> {#day-2}


### Overall {#overall}

Mostly I config emacs doom follow my neovim today.


### What I working on {#what-i-working-on}

Nvim - treesitter cannot be install on my Raspberry Pi due to arch64 is not supported. Wierd that they can be install with npm on my Macbook Air M1. I need to investigate more on this matter.

I'm setting up the Cardano testnet on my Raspberry Pi to debug the setup script that I wrote very long time ago. It now does not work with Alonzo Tx format. I suspect that TK using the address to receive many meme coins, that mess up the Tx calculation.

Update <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-31 Mon&gt;</span></span>

I knew why, need to check it out though. Must be because the version of `cardano-cli` / `cardano-node` I'm using on the node was old, I have not updated it for 5 months now.


### Emacs {#emacs}

`Zen-mode` is good. Give me focus on writing. Also the serif font face helps a bit.

Remember to `zz` to center the screen when writing. Otherwise the word suggestion will go crazy.


## Day 1 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-27 Thu&gt;</span></span> {#day-1}

My first day of writing in org mode

Recap of what I learned during the journey of setting up Emacs:


### Doom emacs is awesome {#doom-emacs-is-awesome}

All battery included. Tempting to do a Emacs from Scratch but it must comes later right not Doom Emacs is surficial.


### Setting up Vue - conflict and old package {#setting-up-vue-conflict-and-old-package}

Setting up Vue was a pain because the old package [vue-mode](https://github.com/AdamNiederer/vue-mode) <= DO NOT USE this.

Vue has a new language server named [Volar](https://github.com/jadestrong/lsp-volar) <= Use this instead.
