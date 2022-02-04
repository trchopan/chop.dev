+++
title = "How This Website Was Built"
author = ["Chop Tr (chop.ink)"]
description = "New year. New website. New journey."
date = 2022-02-02T00:00:00+07:00
tags = ["how", "howto", "build", "website"]
draft = false
cover = "/ox-hugo/howto-build-website_20220203_134312.png"
+++

🎉 Chúc mừng năm mới 🎉

I'm from Vietnam so Tet is a big holiday. I and my family, we had a lot of fun gathering together. This is the first year Lina had growed up enough for me and my wife to take her travel (last year Tet holiday she was only 1 month old so we had to stay home). This year, we spent the holiday with my parents in an AirBnB at the heart of Ho Chi Minh City, Landmark 81.

A long holiday also means I had some time to do what like most = learning new things. And man, did I enjoy what I found, `emacs`, `org mode`, `hugo`, `literate configuration`. I was having a great time.

The personal website was a bit old. 2 years now I think. So It was the right time to improve it. I determined and set out about 2 hours a day whenever I can to build a new website during the holiday. And here are my notes on it:


## Hugo {#hugo}


### Static site generator {#static-site-generator}

> Hugo is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again.

Yes. All of the quote from their website is true. It was speedy, it was fun ⚡

{{< figure src="/ox-hugo/quick-started_20220203_153847.png" alt="Hugo quick start" caption="Figure 1: quick start" width="720" >}}

I went through the [Quick Start](https://gohugo.io/getting-started/quick-start/) with ease and got the site runing.

Then I replaced the Anake theme with [Terminal](https://themes.gohugo.io/themes/hugo-theme-terminal/) by [panr](https://twitter.com/panr).

And voilà, A cool looking website with a look and feel of my usual working environment as a software engineer.


### Go module or Git clone {#go-module-or-git-clone}

I was toying arround with `Go Module` at the start. But when try my hand on editting the theme, `Git clone` method was the better solution. It let me manage the theme implementation and kept track of my changes.

{{< figure src="/ox-hugo/hugo-partial_20220203_154732.png" alt="Hugo folder tree" width="300" >}}

Note to self, should move the changed from inside the `/themes/termial` folder to the `root folder` to apply custom changes.


### My understanding {#my-understanding}

My experience with Hugo was brief (1 week), but I feel the design was really well thought.

Hugo is the build tool that is very well documented, has incredible performance and has great community support. This act as a tool box for all your static website needs, all we have to do is provide the material (the content files) and the decoration (the theme).

{{< figure src="/ox-hugo/hugo-equation_20220203_210758.png" alt="Hugo equation" width="720" >}}


## Emacs and Org mode {#emacs-and-org-mode}


### Doom emacs {#doom-emacs}

I got hooked on emacs for about a month now.

It was a great tool and environment to explore. I am a Vim user, in other words, I used to configure my own tool and tinker around all the internal parts and customization.

TOBE CONTINUE
