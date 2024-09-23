+++
title = "Today I Learned"
author = ["Chop Tr (chop.dev)"]
summary = "I begin the habit of writing things down when I find it interesting. It will improve my workflow and help me into a more organized mode."
date = 2022-10-14T00:00:00+07:00
tags = ["today", "learn"]
+++

I begin the habit of writing things down when I find it interesting. It will improve my workflow and help me into a more organized mode.

## Entry <2022-12-06 Tue>

Cloudflare default SSL/TLS mode is Flexible which result in looping redirect when use together with Firebase hosting or Caddy setup. I need to change it to Full for end-to-end encryption.

## Entry <2022-10-14 Fri>

### brew upgrade with missing Xcode

Today I ran into another problem with Xcode and brew upgrade this help:

[https://stackoverflow.com/questions/55939354/tool-xcodebuild-requires-xcode-but-active-developer-directory-library-devel](https://stackoverflow.com/questions/55939354/tool-xcodebuild-requires-xcode-but-active-developer-directory-library-devel)

```plaintext
[ XCode > Preferences > Locations > Command Line Tools ]
```

Then select a version of Xcode in `Command Line Tools` selection.

## Entry <2022-10-07 Fri>

### Neovim plugin - vim-abolish

It really nice to switch cases using just simple key stroke.

After install `vim-abolish`, put cursor at `snake_case` and press `crt` to turn it into `snakeCase`

How awesome is that.

Apart from the this Coercion feature (I still don’t understand why they name case switching that). vim-abolish also can help with replacement. Try things like this

```vim
:Subvert/blog{,s}/post{,s}/g
```

## Entry <2022-09-15 Thu>

### Xcode macOS upgrade

After upgrade to the new version, most my binary got broken, unable to start due to linking.

Includes: git, neovim, etc.

Pretty much anything install by brew.

The solution is I need to reinstall xcode and agree to the new Agreement for the new OS version.

Using following commands:

```bash
xcode-select --install

sudo xcode-select -switch /Library/Developer/CommandLineTools
```

## Entry <2022-09-08 Thu>

### Un-greedy Regex match

Today I learned about regex Un-greedy match while dealing with a buggy parser.

I had a org link parser for links

```plaintext
INPUT:
This is a link [[https://example.com] [Example]] and [[https://another.com] [Another]]

EXPECT OUTPUT:
This is a link Example and Another
```

### With greedy match

```javascript
\[\[(.*)\] \[(.*)\]\]
```

I keep getting

```plaintext
This is a link Another
```

Tryout: [https://regex101.com/r/7sQcoR/1](https://regex101.com/r/7sQcoR/1)

### Turn out I need to implement the un-greedy match to get the expected output.

```javascript
\[\[(.*?)\] \[(.*?)\]\]
```

Tryout: [https://regex101.com/r/fvx6fF/1](https://regex101.com/r/fvx6fF/1)

## Entry <2022-08-21 Sun>

### Haskell groupByKey

Haskell groupBy is not what I expected for `groupBy` that I normally use in `lodash`.

It is actually scan the list and group when the predicate evaluate to `True`.

So I google Stack Overflow a bit to come up with the `lodash` version:

```haskell
import qualified Data.Map as Map

groupByKey :: Ord k => (v -> k) -> [v] -> Map.Map k [v]
groupByKey key as = Map.fromListWith (++) as'
  where as' = map ((,) <$> key <*> (: [])) as

main :: IO ()
main = do
  print $ groupByKey fst [(1, "hi"), (2, "ho"), (1, "hey"), (1, "yo")]


-- OUTPUT: fromList [(1,[(1,"yo"),(1,"hey"),(1,"hi")]),(2,[(2,"lo")])]
```

## Entry <2022-07-06 Wed>

### Yarn SELF_SIGNED_CERT_IN_CHAIN

[https://github.com/yarnpkg/yarn/issues/892](https://github.com/yarnpkg/yarn/issues/892)

This is because Yarn reject invalid SSL certificate. Can be bypass by

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 yarn install
```

## Entry <2022-06-30 Thu>

### Haskell ByteString Cheat sheet

```haskell
import Data.ByteString.Lazy as BL
import Data.ByteString as BS
import Data.Text as TS
import Data.Text.Lazy as TL
import Data.ByteString.Lazy.UTF8 as BLU -- from utf8-string
import Data.ByteString.UTF8 as BSU      -- from utf8-string
import Data.Text.Encoding as TSE
import Data.Text.Lazy.Encoding as TLE

-- String <-> ByteString
BLU.toString   :: BL.ByteString -> String
BLU.fromString :: String -> BL.ByteString
BSU.toString   :: BS.ByteString -> String
BSU.fromString :: String -> BS.ByteString

-- String <-> Text
TL.unpack :: TL.Text -> String
TL.pack   :: String -> TL.Text
TS.unpack :: TS.Text -> String
TS.pack   :: String -> TS.Text

-- ByteString <-> Text
TLE.encodeUtf8 :: TL.Text -> BL.ByteString
TLE.decodeUtf8 :: BL.ByteString -> TL.Text
TSE.encodeUtf8 :: TS.Text -> BS.ByteString
TSE.decodeUtf8 :: BS.ByteString -> TS.Text

-- Lazy <-> Strict
BL.fromStrict :: BS.ByteString -> BL.ByteString
BL.toStrict   :: BL.ByteString -> BS.ByteString
TL.fromStrict :: TS.Text -> TL.Text
TL.toStrict   :: TL.Text -> TS.Text
```

## Entry <2022-06-02 Thu>

### Pi-hole and Cloud Flare handshake invalid

Today I had a weird bug in `scheduledblocks` . Turn out some how Cloud Flare reject the TSL connection from my Pi-Hole.

Temporary disable Pi-hole and everything good. I need to investigation more.

## Entry <2022-04-13 Wed>

### Build Emacs on MacOS with M1

Good news, now emacs 28.1 with `native-comp` can be run on Macbook with M1 chips. It needs to be built from source, I was able to build it using this repo [https://github.com/d12frosted/homebrew-emacs-plus](https://github.com/d12frosted/homebrew-emacs-plus). One bug took me an hour is the `gcc` and `libgccjit` test fail during build.

If you see this smoke test fail

```plaintext
configure: error: Installed libgccjit has failed passing the smoke test.
You can verify it yourself compiling:
.
Please report the issue to your distribution.
Here instructions on how to compile and install libgccjit from source:
.
```

It is because the MacOS was updated to new major version. While `gcc` and `libgccjit` was install by `homebrew` in previous MacOS version. An easy fix is to reinstall both of theem.

```bash
brew reinstall gcc libgccjit
```

## Entry <2022-04-10 Sun>

### Tree-sitter setup

First time success setup tree-sitter. Now my code looks much better.

[https://hungyi.net/posts/use-emacs-tree-sitter-doom-emacs/](https://hungyi.net/posts/use-emacs-tree-sitter-doom-emacs/)

## Entry <2022-04-06 Wed>

### Bug in rust-mode

In Doom Emacs, the config for rust has the option for `+lsp` for using `rust-analyzer`. Without, it will use racer which currently has some bugs of finding the correct tool and path for rust toolchain.

```lisp
:lang (rust +lsp)
```

## Entry <2022-03-15 Tue>

### Good source of data for economy by country

[https://atlas.cid.harvard.edu/explore/?year=2014&country=246&redirected=true](https://atlas.cid.harvard.edu/explore/?year=2014&country=246&redirected=true)

## Entry <2022-03-14 Mon>

### Problem with Bluetooth

Today my MacOS got bugged out of the Bluetooth. I cannot connect to any device. A quick search solve ti problem by reseting the settings. 2 files needs to be delete:

```plaintext
/Library/Preferences/com.apple.Bluetooth.plist

~/Library/Preferences/ByHost/com.apple.Bluetooth.(uuid).plist
```

Restart MacOS and let it regenerate the Bluetooth settings.

Then I need to re-pair all my devices but not many.

## Entry <2022-03-04 Fri>

### Begin of the functional journey

I decided to convert parts of the `mini-view-trader` app to functional. Also I will use `zod` for parsing. Let’s make some results 💪

## Entry <2022-03-02 Wed>

### It’s All about Monads

I found a great article that I keeps reference to while studying Haskell. Every time I read it Monad becomes more and more easier to understand.

[https://wiki.haskell.org/All_About_Monads](https://wiki.haskell.org/All_About_Monads)

> “Monad” enters English from ancient Greek philosophy, where it could mean “almost everything”. But then it comes in again later from the philosopher Leibniz, for whom it meant “almost nothing” – an irreducible particle of perceptual reality. Can’t philosophy make up its mind? (No. Has it ever?) Neither philosophical sense will help you understand the role of monads in Haskell. Nor are mathematicians riding to your rescue. Consider the introduction to the definition of “monad” in category theory. It could pound the last nail in the coffin of your ambitions to understand what “monad” means in Haskell. A monad is “an endofunctor (a functor mapping a category to itself), together with two natural transformations required to fulfill certain coherence conditions.” (Wikipedia) Admit it: unless you’re fresh from studying abstract algebra, you just died a little inside.

### Haskell and Tensorflow

2 things in my learning list. Must have time to try my hands on.

[https://mmhaskell.com/machine-learning](https://mmhaskell.com/machine-learning)

## Entry <2022-02-26 Sat>

### Haskell refactor

Today I refactor a bunch of http request code for the [scheduled-blocks](https://github.com/trchopan/scheduled-blocks) project. Haskell continue to amaze me with such easy to read and clean looking code.

```haskell
handleEitherFailOrResult :: Either String p -> p
handleEitherFailOrResult e = do
  case e of
    Left  err -> error $ printf "Failed to handle result. Error: %s\n" err
    Right v   -> v

requestAndDecode :: (MonadIO m, FromJSON a) => Request -> m a
requestAndDecode request =
  httpLBS request
    >>= return
    .   handleEitherFailOrResult
    .   eitherDecode
    .   getResponseBody
```

## Entry <2022-02-25 Fri>

### Haskell import must be first

The Haskell build tool - `cabal` - has a requirement to put the `import` as the first item. I’ve been struggle to understand why my build keep complaining package not found when I reorder the items 😓

![cabal file](/posts/today-i-learned/cabal-file.jpg)

cabal file

## Entry <2022-02-21 Mon>

### Haskell Cabal external-libraries

I have been scratching my head all days for the cabal tool to work with the `external-libraries` flag as I need to connect `libsodium` to my current project (`scheduled-blocks`).

Gone through a dozen of Stack Overflow questions but not thing works. I tried `LD_LIBRARY_PATH`, `LDFLAGS`, etc. Turn out for `MacOs` on M1 and `homebrew`, it is

```bash
export LIBRARY_PATH="/opt/homebrew/lib"
```

## Entry <2022-02-20 Sun>

### Haskell beauty of Functional

I’ve been working on the [scheduled-block](https://github.com/trchopan/scheduled-blocks) on and off for a week now. I even take sometime off work (don’t tell my boss) to tinker on it. The last couple of days, I’ve been struggle with the conversion of the seed function for verifying Cardano Slot Leader. Where we need 2 set of seed bytes, one from the Neutral Nonce and one from the Epoch Nonce, then combine them to make the seed.

The Python looks like this

```python
def mkSeed(slot, eta0):
    h = hashlib.blake2b(digest_size=32)
    h.update(bytearray([0, 0, 0, 0, 0, 0, 0, 1]))  # neutral nonce
    seedLbytes = h.digest()

    h = hashlib.blake2b(digest_size=32)
    h.update(slot.to_bytes(8, byteorder="big") + binascii.unhexlify(eta0))
    slotToSeedBytes = h.digest()

    seed = [x ^ slotToSeedBytes[i] for i, x in enumerate(seedLbytes)]
    return bytes(seed)
```

I’ve been working hard on learning Haskell and the solution at the end was so elegant I was in awe when I have it.

```haskell
hashBlake2b :: BS.ByteString -> Digest Blake2b_256
hashBlake2b = hash

seedLBytes :: Digest Blake2b_256
seedLBytes = hashBlake2b neutral
  where neutral = BA.pack [0, 0, 0, 0, 0, 0, 0, 1] :: ByteString

slotToSeedBytes :: Int64 -> ByteString -> Digest Blake2b_256
slotToSeedBytes slot nonce = hashBlake2b $ BS.append encodedSlot nonce
  where encodedSlot = LBS.toStrict $ Binary.encode slot

-- For every seedLBytes xor it with the slotSeedBytes
mkSeed :: Digest Blake2b_256 -> Digest Blake2b_256 -> [Word8]
mkSeed seedLBytes slotToSeedBytes = zipWith xor arrSeedLBytes arrSlotToSeedBytes
 where
  arrSeedLBytes      = B.unpack seedLBytes
  arrSlotToSeedBytes = B.unpack slotToSeedBytes
```

Loving the Haskell journey even more <3

## Entry <2022-02-18 Fri>

### Mark jumping in emacs

In `vim`, I was used to the marking jumping with `` ` `` (back-tick) key. It awesome to jumping around marks in a buffer it help a lot during my workflow. But in Emacs - evil mode, it use `'` (single tick) key.

## Entry <2022-02-15 Tue>

### Syncthing

[https://docs.syncthing.net/](https://docs.syncthing.net/)

Found out this tool. It’s awesome to sync up multiple machine. Open source and developer friendly, You can ignores files just like `.gitignore`

### Search and replace

[https://hungyi.net/posts/doom-emacs-search-replace-project/](https://hungyi.net/posts/doom-emacs-search-replace-project/)

Awesome post, Now my search and replace workflow is just a string replace.

![](/posts/today-i-learned/1.jpg)

Below is a copy of the original post.

### \>

TL;DR:

-   for ivy module users

    `SPC s p foo C-c C-e :%s/foo/bar/g RET Z Z`

-   for vertico module users

    `SPC s p foo C-; E C-c C-p :%s/foo/bar/g RET Z Z`

## Entry <2022-02-13 Sun>

### Emacs terminals

I tried the emacs terminals into my workflow but both the `eshell` and `vterm` did not work out for me.

They feel very strange when using in combination with the evil mode. At first I was curious of editing the command by using normal vim keys, but there was a lot of bug while navigating between lines.

\=> Switch back to the terminal app instead of Emacs.

### Npm install from personal repo

I’m using a public repo that ease the use of `cardano-cli` with Javascript but it has some bugs as the maintainer not update so often.

I need to forked it and provide my own fix and learn to use my own version instead of the npm package.

This Stack Overflow answer was the my solution: [LINK](https://stackoverflow.com/questions/40528053/npm-install-and-build-of-forked-github-repo)

## Entry <2022-02-12 Sat>

### Cardano TraceBlockFetchDecisions

One of my Cardano node missing the `cardano_node_metrics_connectedPeers_int` . The culprit was the config `TraceBlockFetchDecisions`.

```json
// mainnet-config.json
"TraceBlockFetchDecisions": true
```

## Entry <2022-02-10 Thu>

### Dired

Amazing experience with editable buffer using `C-x` `C-q`. When done just press `Z` `Z` to confirm or `Z` `Q` to discard the changes.

![](/posts/today-i-learned/2.jpg)

## Entry <2022-02-09 Wed>

### Yew

[https://github.com/yewstack/yew](https://github.com/yewstack/yew)

Frontend built with Rust + WebAssembly.

Yew is a good play tool for me to learn Rust. I will allocate some time to make a project with it.

## Entry <2022-02-08 Tue>

### Inquirer

Today I begin work on the Cardano Commands project. A tool to help me and the pool owner setup the pool securely by separate the authority into 2 part:

-   Pool Operator: manage the setup and health of the pool. Example: cardano-cli, cardano-node version, Monitor Graphana, Calculate Block schedule, etc.
-   Pool Owner: only one has access to the wallet key with the pledged ADA.

During the development, I found out [Inquirer](https://github.com/SBoudrias/Inquirer.js) . Very nice tool to make interactive console UX/UI.

## Entry <2022-02-05 Sat>

### DevDocs [https://devdocs.io/](https://devdocs.io/)

This tool is awesome!!!

> DevDocs combines multiple developer documentations in a clean and organized web UI with instant search, offline support, mobile version, dark theme, keyboard shortcuts, and more.

## Entry <2022-02-04 Fri>

### Back to PrismJS

I figure out how to configure PrismJS for the Hugo theme. It actually a static files that I can replace with the PrismJS downloadable configuration.

Just need to go to this pre-selected >> [Example](https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+bash+dart+firestore-security-rules+go+go-module+graphql+handlebars+haskell+http+ignore+json+json5+jsonp+lisp+lua+markdown+markup-templating+python+jsx+tsx+regex+rust+sass+scss+shell-session+solidity+toml+typescript+typoscript+vim+yaml&plugins=show-language+toolbar+copy-to-clipboard) <<

```plaintext
https://prismjs.com/download.html#
themes=prism-tomorrow&
languages=markup+css+clike+javascript+bash+dart+firestore-security-rules+go+go-module+graphql+handlebars+haskell+http+ignore+json+json5+jsonp+lisp+lua+markdown+markup-templating+python+jsx+tsx+regex+rust+sass+scss+shell-session+solidity+toml+typescript+typoscript+vim+yaml&
plugins=show-language+toolbar+copy-to-clipboard
```

Download the minified version and place it in the script tag to load PrismJS. Then let the theme handle the syntax highlight. Now my code block color is synced up with the theme color. Nice!

### Haskell Concurrency

I begin to study about Haskell Concurrency. It feels a lot like Go, but much safer. Loving the experience.

## Entry <2022-02-03 Thu>

### Improvement of my English

I’m in the of the process of writing about the making my new website. It make me realize my English is… bad.

There is a tool call [Hemingway App](https://hemingwayapp.com/) (named after Ernest Hemingway). Which will grade your writing ‘Readability’. I’d use it from now to improve my writing.

## Entry <2022-02-02 Wed>

### Disqus vs Utterances

I got the comment section to work on [chop.dev](https://chop.dev/). I setup [Disqus](https://disqus.com/) but find out there much better option: [Utterances](https://utteranc.es/). It based on Github issues and much suited for my site because it more developer oriented.

I may use Disqus for my customers who would like some fine control over their site comments.

## Entry <2022-02-01 Tue>

### Remove PrismJS - no support for emacs-lisp

Checking back on the website, I realized there was no syntax highlight for the code block. Then I spent the morning to find out PrismJS is the culprit. It does not have the syntax for `emacs-lisp` scripts. So I disabled it, Turn out Hugo already handled the syntax highlight 👍. It not perfect match with the current theme but it is OK to use.

### A mini bug in Miniview trader

I discovered a bug in the Miniview trader script. The MA calculation method will give wrong value when the length of result match the length of MA. Fix it by replacing the script with much simpler version. Lesson learned again and again: simplify everything.

```typescript
import {sum, last} from 'lodash';

const getTechnicals = (data: {close: number}[]) => {
    // Take off the last candle
    const candles = data.slice(0, -1);

    const calculateMa = (len: number) => {
        const _candles = len > candles.length ? candles : candles.slice(candles.length - len);
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

## Entry <2022-01-31 Mon>

Today is a good day. With a lot of things todo, I still managed to buy the new domain and spin up the website at [https://chop.dev](https://chop.dev/) . It will be my site to dump all these writing to.

I started to learn Hugo. This tool is fast. I mean really really fast!!!

A side note, tonight is Luna New year eve. Happy New Year, may luck and health come to all.

## Entry <2022-01-30 Sun>

### Mix pitch and Zen mode

Morning was more emacs setup. I solved the problem with `mix pitch mode` and fonts serif and improve `zen mode` editing.

### Jumping keys is great now with a bit of configuration

I have the most awesome settings for avy-jumping keys. Most of the keys should be in the middle of key board, the difficult to reach should be the outer area.

![](/posts/today-i-learned/3.jpg)

### Block schedule should be calculate with the new epoch snapshot

After chatting with Felix about his pool missing a block he had calculated. We realized that he used the old epoch sigma and stake to calculate the scheduled. Which make me nervous about the Cardano block scheduled for ARMADA pool at 18:20 next day. Luckily, after double checked using the `ScheduledBlocks` tool, I confirmed that it was correct and we did received the block.

## Entry <2022-01-29 Sat>

### What I working on

Mostly I config emacs doom follow my neovim today.

Nvim - treesitter cannot be install on my Raspberry Pi due to arch64 is not supported. Weird that they can be install with npm on my Macbook Air M1. I need to investigate more on this matter.

I’m setting up the Cardano testnet on my Raspberry Pi to debug the setup script that I wrote very long time ago. It now does not work with Alonzo Tx format. I suspect that TK using the address to receive many meme coins, that mess up the Tx calculation.

Update <2022-01-31 Mon>

I knew why, need to check it out though. Must be because the version of `cardano-cli` / `cardano-node` I’m using on the secret node was old, I have not updated it for 5 months now.

### Emacs

`Zen-mode` is good. Give me focus on writing. Also the serif font face helps a bit.

Remember to `zz` to center the screen when writing. Otherwise the word suggestion will go crazy.

## Entry <2022-01-27 Thu>

My first day of writing in org mode

Recap of what I learned during the journey of setting up Emacs:

### Doom emacs is awesome

All battery included. Tempting to do an Emacs from Scratch but it must comes later right now Doom Emacs is good enough.

### Setting up Vue - conflict and old package

Setting up Vue was a pain because the old package [vue-mode](https://github.com/AdamNiederer/vue-mode) <= DO NOT USE this.

Vue has a new language server named [Volar](https://github.com/jadestrong/lsp-volar) <= Use this instead.
