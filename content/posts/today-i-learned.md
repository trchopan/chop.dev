+++
title = "Today I Learned"
author = ["Chop Tr (chop.ink)"]
description = "It is good to keep a note of things I learned during the day"
date = 2022-02-03T00:00:00+07:00
tags = ["today", "i", "learned"]
draft = false
cover = "/ox-hugo/today-i-learned_20220203_111606.png"
images = "/ox-hugo/today-i-learned_20220203_111606.png"
+++

I started using Emacs about a week ago <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-24 Mon&gt; </span></span> . With such powerful tool I should begin the habit to write things down. It will improve my workflow and help me into a more organise mode.


## Day 15 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-15 Tue&gt;</span></span> {#day-15}


### Syncthing {#syncthing}

<https://docs.syncthing.net/>

Found out this tool. It's awesome to sync up multiple machine. Opensource and developer friendly, You can ignores files just like `.gitignore`


### Seach and replace {#seach-and-replace}

<https://hungyi.net/posts/doom-emacs-search-replace-project/>

Awesome post, Now my search and replace workflow is just a string replace.

{{< figure src="/ox-hugo/search-replace_20220215_125502.png" width="720" >}}

Below is a copy of the original post.


#### &gt; {#cedf8d}

TL;DR:

<!--list-separator-->

-  for ivy module users

    `SPC s p foo C-c C-e :%s/foo/bar/g RET Z Z`

<!--list-separator-->

-  for vertico module users

    `SPC s p foo C-; E C-c C-p :%s/foo/bar/g RET Z Z`


## Day 14 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-13 Sun&gt;</span></span> {#day-14}


### Emacs terminals {#emacs-terminals}

I tried the emacs terminals into my workflow but both the `eshell` and `vterm` did not work out for me.

They feel very strange when using in combination with the evil mode. At first I was curious of editing the command by using normal vim keys, but there was a lot of bug while navigating between lines.

=&gt; Switch back to the terminal app instead of Emacs.


### Npm install from personal repo {#npm-install-from-personal-repo}

I'm using a public repo that ease the use of `cardano-cli` with Javascript but it has some bugs as the maintainer not update so often.

I need to forked it and provide my own fix and learn to use my own version instead of the npm package.

This stackoverflow answer was the my solution: [LINK](https://stackoverflow.com/questions/40528053/npm-install-and-build-of-forked-github-repo)


## Day 13 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-12 Sat&gt;</span></span> {#day-13}


### Cardano TraceBlockFetchDecisions {#cardano-traceblockfetchdecisions}

One of my Cardano node missing the `cardano_node_metrics_connectedPeers_int` . The culprit was the config `TraceBlockFetchDecisions`.

```js
// mainnet-config.json
"TraceBlockFetchDecisions": true
```


## Day 12 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-10 Thu&gt;</span></span> {#day-12}


### Dired {#dired}

Amazing experience with editable buffer using `C-x` `C-q`. When done just press `Z` `Z` to confirm or `Z` `Q` to discard the changes.

{{< figure src="/ox-hugo/dired-editable-buffer_20220210_194540.png" width="720" >}}


## Day 11 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-09 Wed&gt;</span></span> {#day-11}


### Yew {#yew}

<https://github.com/yewstack/yew>

Frontend built with Rust + WebAssembly.

Yew is a good play tool for me to learn Rust. I will allocate some time to make a project with it.


## Day 10 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-08 Tue&gt;</span></span> {#day-10}


### Inquirer {#inquirer}

Today I begin work on the Cardano Commands project. A tool to help me and the pool owner setup the pool securely by separate the authority into 2 part:

-   Pool Operator: manage the setup and health of the pool. Example: cardano-cli, cardano-node version, Monitor Graphana, Calculate Block schedule, etc.
-   Pool Owner: only one has access to the wallet key with the pledged ADA.

During the development, I found out [Inquirer](https://github.com/SBoudrias/Inquirer.js) . Very nice tool to make interactive console UX/UI.


## Day 9 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-05 Sat&gt;</span></span> {#day-9}


### DevDocs <https://devdocs.io/> {#devdocs-https-devdocs-dot-io}

This tool is awesome!!!

> DevDocs combines multiple developer documentations in a clean and organized web UI with instant search, offline support, mobile version, dark theme, keyboard shortcuts, and more.
>
> DevDocs is free and open source. It was created by Thibaut Courouble and is operated by freeCodeCamp.


## Day 8 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-04 Fri&gt;</span></span> {#day-8}


### Back to PrismJS {#back-to-prismjs}

I figure out how to configurate PrismJS for the Hugo theme. It actually a static files that I can replace with the PrismJS downloadable configuration.

Just need to go to this pre-selected &gt;&gt; [Example](https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+bash+dart+firestore-security-rules+go+go-module+graphql+handlebars+haskell+http+ignore+json+json5+jsonp+lisp+lua+markdown+markup-templating+python+jsx+tsx+regex+rust+sass+scss+shell-session+solidity+toml+typescript+typoscript+vim+yaml&plugins=show-language+toolbar+copy-to-clipboard) &lt;&lt;

```nil
https://prismjs.com/download.html#
themes=prism-tomorrow&
languages=markup+css+clike+javascript+bash+dart+firestore-security-rules+go+go-module+graphql+handlebars+haskell+http+ignore+json+json5+jsonp+lisp+lua+markdown+markup-templating+python+jsx+tsx+regex+rust+sass+scss+shell-session+solidity+toml+typescript+typoscript+vim+yaml&
plugins=show-language+toolbar+copy-to-clipboard
```

Download the minified version and place it in the script tag to load PrismJS. Then let the theme handle the syntax highlight. Now my code block color is synced up with the theme color. Nice!


### Haskell Concurrency {#haskell-concurrency}

I begin to study about Haskell Concurrency. It feels a lot like Go, but much safer. Loving the experience.


## Day 7 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-03 Thu&gt;</span></span> {#day-7}


### Improvement of my English {#improvement-of-my-english}

I'm in the of the process of writing about the making my new website. It make me realize my English is... bad.

There is a tool call [Hemingway App](https://hemingwayapp.com/) (named after Ernest Hemingway). Which will grade your writing 'Readability'. I'd use it from now to improve my writing.


## Day 6 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-02 Wed&gt;</span></span> {#day-6}


### Disqus vs Utterances {#disqus-vs-utterances}

I got the comment section to work on [chop.ink](https://chop.ink). I setup [Disqus](https://disqus.com) but find out there much better option: [Utterances](https://utteranc.es/). It based on Github issues and much suited for my site because it more developer oriented.

I may use Disqus for my customers who would like some fine control over their site comments.


## Day 5 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-02-01 Tue&gt;</span></span> {#day-5}


### Remove PrismJS - no support for emacs-lisp {#remove-prismjs-no-support-for-emacs-lisp}

Checking back on the website, I realized there was no syntax highlight for the code block. Then I spent the morning to find out PrismJS is the culprit. It does not have the syntax for `emacs-lisp` scripts. So I disabled it, Turn out Hugo already handled the syntax highlight 👍. It not perfect match with the current theme but it is OK to use.


### A mini bug in Miniview trader {#a-mini-bug-in-miniview-trader}

I discovered a bug in the Miniview trader script. The MA calculation method will give wrong value when the length of result match the length of MA. Fix it by replacing the script with much simpler version. Lesson learned again and again: simplify everything.

```typescript
import {sum, last} from 'lodash';

const getTechnicals = (data: {close: number}[]) => {
  // Take off the last candle
  const candles = data.slice(0, -1);

  const calculateMa = (len: number) => {
    const _candles =
      len > candles.length ? candles : candles.slice(candles.length - len);
    const _maCloses = _candles.map(x => x.close);
    return sum(_maCloses) / _maCloses.length;
  };

  return {
    last: last(candles)!,
    ma20: calculateMa(20),
    ma55: calculateMa(55),
    ma100: calculateMa(100),
    ma200: calculateMa(200),
    candles,
  };
};
```


## Day 4 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-31 Mon&gt;</span></span> {#day-4}

Today is a good day. With a lot of things todo, I still managed to buy the new domain and spin up the website at <https://chop.ink> . It will be my site to dump all these writing to.

I started to learn Hugo. This tool is fast. I mean really really fast!!!

A side note, tonight is Luna New year eve. Happy New Year, may luck and health come to all.


## Day 3 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-30 Sun&gt;</span></span> {#day-3}


### Mix pitch and Zen mode {#mix-pitch-and-zen-mode}

Morning was more emacs setup. I solved the problem with `mix pitch mode` and  fonts serif and improve `zen mode` editing.


### Jumping keys is great now with a bit of configuration {#jumping-keys-is-great-now-with-a-bit-of-configuration}

I have the most awesome settings for avy-jumping keys. Most of the keys should be in the middle of key board, the difficult to reach should be the outer area.

{{< figure src="/ox-hugo/avy-keys_20220131_203804.png" width="720px" >}}


### Block schedule should be calculate with the new epoch snapshot {#block-schedule-should-be-calculate-with-the-new-epoch-snapshot}

After chatting with Felix about his pool missing a block he had calculated. We realized that he used the old epoch sigma and stake to calculate the scheduled. Which make me nervous about the Cardano block scheduled for ARMADA pool at 18:20 next day. Luckily, after double checked using the `ScheduledBlocks` tool, I confirmed that it was correct and we did received the block.


## Day 2 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-29 Sat&gt;</span></span> {#day-2}


### What I working on {#what-i-working-on}

Mostly I config emacs doom follow my neovim today.

Nvim - treesitter cannot be install on my Raspberry Pi due to arch64 is not supported. Weird that they can be install with npm on my Macbook Air M1. I need to investigate more on this matter.

I'm setting up the Cardano testnet on my Raspberry Pi to debug the setup script that I wrote very long time ago. It now does not work with Alonzo Tx format. I suspect that TK using the address to receive many meme coins, that mess up the Tx calculation.

Update <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-31 Mon&gt;</span></span>

I knew why, need to check it out though. Must be because the version of `cardano-cli` / `cardano-node` I'm using on the secret node was old, I have not updated it for 5 months now.


### Emacs {#emacs}

`Zen-mode` is good. Give me focus on writing. Also the serif font face helps a bit.

Remember to `zz` to center the screen when writing. Otherwise the word suggestion will go crazy.


## Day 1 <span class="timestamp-wrapper"><span class="timestamp">&lt;2022-01-27 Thu&gt;</span></span> {#day-1}

My first day of writing in org mode

Recap of what I learned during the journey of setting up Emacs:


### Doom emacs is awesome {#doom-emacs-is-awesome}

All battery included. Tempting to do an Emacs from Scratch but it must comes later right not Doom Emacs is surficial.


### Setting up Vue - conflict and old package {#setting-up-vue-conflict-and-old-package}

Setting up Vue was a pain because the old package [vue-mode](https://github.com/AdamNiederer/vue-mode) &lt;= DO NOT USE this.

Vue has a new language server named [Volar](https://github.com/jadestrong/lsp-volar) &lt;= Use this instead.
