+++
title = "My journey configuring Editors (featuring Vim/Neovim)"
author = ["Chop Tr (chop.dev)"]
summary = "My talk for LINE UIT 2023 about my experience with Neovim and how configuring it helps me learn more about Software Development and feel more enjoyment for what I am doing"
date = 2023-12-14T00:00:00+07:00
tags = ["vim", "neovim", "configure", "journey", "no pain no gain"]
draft = false
+++

## Video



## Intro

Hi guys.

My name is Quang Tran, I'm in the Front End Dev Team, in LINE Vietnam, Ho Chi Minh.

Welcome to my talk.

Ok so this talk is about My journey Configuring Editors.

Right, so text editors. Have you ever thought about it? As a software developer, it is a very important tool in our day to day workflow right?

Let's talk about why would a developer care about the text editor, for some it is just a tool to perform the job, to write code, and that's it.

Yes it is, it is just a tool. A means to an end.

But have you ever heard a saying from Abraham Lincoln goes like this: If I only had an hour to chop down a tree, I would spend the first 45 minutes sharpening my axe.

A text editor for a developer also likes the axe. It is a deeply personal thing, like a chef with his knives or a painter with his brushes.

For a programmer, the editor is the thing I use everyday. In a sense it is the extension of my own body.

I've been using Neovim for the past 5 years. It was a journey for me to finally end up with Neovim.

### How did I end up with Neovim?

I've tried a few text editors over the years. I used Eclipse during my school year to edit Java and do some Android Programing.

I use Atom after that to do a little bit of web and python scripting.

Then I moved to VSCode when I landed a Frontend job in a Singapore-based company in Ho Chi Minh.

And I spend quite a long time using VSCode. The reason was that, in that team, most of the guys were using VSCode. And it was just a norm for everyone.

Then one day, I met my old mentor from the Computer Science class in University and showed him what I'm doing for work.

![](/posts/my-journey-configuring-editors--featuring-vim-neovim-/my-journey-configuring-editors--featuring-vim-neovim--0.jpg)

And I was like click click and moving around with Control and Shift arrow very fast, very quick. Kinda, I want to impress him. 

And you know what he said? "You are very fast. I think you would love using vim"

And I was like, what is Vim?

He said "It's just an editor that is very customizable and has a very intuitive way of moving around and editing code. You would love it if you enjoyed being in the flow of your program like you did just then."

Btw, that was the first time I heard of VIM.

And then, the professor opened his laptop and started up his environment and it was quick real fast.

He was moving around the files. making edits. jump back. select a section of the code. copy it and refactor somewhere else.

It was amazing!

And I tell you, the feeling is like watching a pro Starcraft player at his finest. If you guys play Starcraft you know what I mean.

At that time I also played a little bit of Starcraft 2, I was in Diamond League back then. I play Zerg and I was obsessed with being faster with micro management.

So I was immediately sold to the idea of an editor that can make me fast. Make me feel like a "Pro".

Then the rest is history I guess. I spend time learning Vim, learning how to configure editors to the way I like. I turned it into a game and it was really fun.

Along the way I also picked up Emacs. I spent 6 months with Emacs as my main editor and use it extensively with all the programing and workflow management.

But eventually I changed back to Vim. This time I use Neovim instead of vanilla Vim.

## Vim/Neovim introduction

So a brief introduction about Vim.

### Creation

Vim was created by Bram Moolenaar, the first version to the public in 1991.

The name Vim initially stood for "Vi Improved" to reflect its enhanced capabilities over the original Vi editor.

### Modes

Vim is famous for its modal nature, extensibility, and powerful editing capabilities.

It operates in different modes, the insert mode for entering text.

And the normal mode for executing commands,

which allows for efficient text manipulation and navigation.

Other than that, there is also the Visual mode for selecting text.

### Plugins and Scripting

Vim can be customized by a vast ecosystem of plugins and scripts.

Speaking of scripts. The evolution and development of Vim was not a smooth ride, the architecture is a bit messy and not so flexible and has trouble with asynchronous codes. So some plugins do not perform well when running concurrently.

So Neovim was created as a fork of Neovim. It keeps the original philosophy of editing but aggressively reworks all the internal systems.

Implement new architecture for plugins system, make it become more modular and introduce the support for Lua language as its main language for plugins.

Both Neovim and Vim support all the programing languages.

For Neovim, it is built in with great support for Language Server Protocol, For Vim you have to configure them a little bit with plugins.

## The advantage of using Vim

Well it would not be an editor talk if I don't show you some awesomeness of the editor right?

Let's get into it.

### Vim Motion

First let's see some Vim Motion.

In vim you move around with the "hjkl" keys for "left down up right".

Why is it? Because it keeps your hand in the home row of the keyboard. Instead of constantly moving to reach the arrow key.

I know, you guys think it is such a small thing. But multiply that to hundreds or thousands times a day. You are just straining your wrist or right hand without noticing it.

To move down 5 lines just 5j. To move up 5 lines is just 5k. Then check it out. Your hand is still in the home row for the next action.

Go a page up: <Ctrl> + u

Go a page down: <Ctrl> + d

To go to a specific line it is: semicolon plus the number.

How about movement when you are already in a line.

To jump between words, You no longer need to hold caret or option key to do it. You can do it with the w and b keys.

W to move forward one word.

B to move backward one word.

To move to the end of the line you can do $ (dollar key).

To move to the first of the line you can do ^ (caret key).

If you know regex syntax, you will find it right at home.

To select something, why would you need to hold your index finger for a second everytime you need to select something?

Just press V for visual mode and select away. Imagine how relieved your index finger would be. If it can talk it will give you a thank you speech.

![](/posts/my-journey-configuring-editors--featuring-vim-neovim-/my-journey-configuring-editors--featuring-vim-neovim--1.jpg)

### Vim has a natural language built in

Vim has its own language built in and it is not hard to learn. I will give you a few phrases, just like natural language, you'll see.

Visual select inside bracket: vi{

![](/posts/my-journey-configuring-editors--featuring-vim-neovim-/my-journey-configuring-editors--featuring-vim-neovim--2.jpg)

Then I can copy it. I can cut it. Move it somewhere else.

You can change the curly bracket with parentheses or square brackets and it still works.

Then how about changing things.

Let's see: Change inside quotes: ci"

![](/posts/my-journey-configuring-editors--featuring-vim-neovim-/my-journey-configuring-editors--featuring-vim-neovim--3.jpg)

No more mouse click drag to select then delete then type. Simple right?

How about taking it to another level.

Git Hunk Stage for me is: ghs

Git Blame is: ghb

![](/posts/my-journey-configuring-editors--featuring-vim-neovim-/my-journey-configuring-editors--featuring-vim-neovim--4.jpg)

Git Preview is just : gp

![](/posts/my-journey-configuring-editors--featuring-vim-neovim-/my-journey-configuring-editors--featuring-vim-neovim--5.jpg)

Let's see some programing language features.

Go to Reference is: gr

Go to Definition is: gd

Go to Declaration is: gD

Code action is: ca

Code format is: cf

Code diagnostics is: cd

And you absolutely can change it to any combination that suits how you remember it.

These are just some examples that very quickly become my muscle memory.

### Muscle Memory

That brings me to the topic of muscle memory.

The point of building muscle memory kinda got misunderstood quite a lot.

A lot of people I talk to when I bring up the point about muscle memory argue that they have already built theirs using their current editors.

But wait. Are you though? Do you have muscle memory or just memory? Think about it again, it may not be what you think.

![](/posts/my-journey-configuring-editors--featuring-vim-neovim-/my-journey-configuring-editors--featuring-vim-neovim--6.jpg)

Is the muscle memory in your hand where it should be? Or actually it is your "extraocular muscle".

I'm joking here. It is a Latin term to call the muscle around your eyes.

If you are the guy that uses your mouse to click the menu. I don't think you are building useful muscle memory.

Because what you are building is a memory of where the button is to click.

And the target is moving. They are the menu and the buttons that you always have to drag your mouse to.

What you build is again a very good index finger. And a very good memory remembering where the menus are.

![](/posts/my-journey-configuring-editors--featuring-vim-neovim-/my-journey-configuring-editors--featuring-vim-neovim--7.jpg)

With a typing focus mentality what I build is actual muscle memory. To a point where I don't even think about it because my fingers just do it.

Yes it is much harder to practice, much harder to get and understand.

It is like learning to ride a bike, you gotta fall and get annoyed a few times. But that is the progress of learning.

When you get it, it is like your second nature, you just do it without even thinking about it. That is muscle memory to me. 

### LSP

Next, I would like to talk about the aspect that makes Neovim great for programmers.

What is an editor for a software developer without the support for coding.

And I can tell you. Neovim has great support for software development.

Neovim can support many languages through LSP - Language Server Protocol.

Like I said before due to time limited I would not cover how to configure it all up.

I just want to mention that spending time doing so gives me a good understanding of programing languages.

OK I have a question for you to think about, what is the difference between definition and reference? <pause>

To be honest, I've never thought about them before I began using Neovim. All I did was just click click on the variables. And VSCode and IntelliJ made it so easy for me back then.

Is it good? Yes it is good for a junior coder who just began his career, but after 5 years you are still confused about the different definitions and references. You should be concerned about your ability as a developer.

Well, for me, I learned about them when I actually did the LSP configuration for Neovim.

### AST

Another knowledge I gained during configuring Neovim is AST - Abstract Syntax Tree or Syntax Tree for short. It is a technique that is used widely in all language processing tasks, not just programing languages.

It is what helps the editor to highlight the text and give you the beautiful colorscheme you have on a developer screen.

And it is very good to know if you are interested in AI. It will help you understand how machines look at languages and the syntax of different languages.

Well as you know I'm a Frontend Developer. My main job is crunching away Javascript/Typescript, some CSS and HTML for bread and butter for my family.

But as a software developer I'm also a polyglot, I can also code in Python, Go lang, Rust, Haskell. And Lua.

And Neovim, with a great toolkit for building my custom PDE or Personal Development Environment, makes me really enjoy learning new languages.

## The Arguments to not try another Editor

OK so that was the introduction about Vim and Neovim and how I got to configuring Editors and how I learned to love the craft.

Now let's talk about some of the arguments that I usually get when people are curious about why would I care about editors or why I spend time tinkering with it so much.

### 1. IDE is just a tool, use whatever makes you most productive

I heard that a lot. Yes it is just a tool. And yes if you talk about productivity, it is good to use whatever is familiar with you. That is what makes you most productive.

But this mindset misses one thing. If we all hold that argument to always be true, the tool you choose is always, I mean always, the one that you are familiar with. Right?

And you can see how limited it is. You are limited to only the one that is available in front of you.

What I mean is not that VSCode is bad, Intellij is bad. Vim is good. I don't mean it at all.

I just hate the argument that productivity stops you from trying new things. Because that argument makes you so limited.

Like if you are a Frontend developer and you only use Vue and React. Without trying Svelte, without trying out SolidJs or Qwik or Astro. You are missing out on the world.

Like there are a lot of great things out there for you to explore. And there are a lot of perspectives to look at things other than just what you used to.

And really you have to spend time with it a bit because anything new to you is hard. And with the hard part, the productivity will be way low. But that's what it takes to learn to grow.

Btw, I heard Angular is getting good again. I would love to use it in some projects when I have a chance.

### 2. NeoVim is hard. Why would I spend time learning it?

Well I got that a lot too.

And to those complaining about hardships, I would say if there is no pain there is no gain.

Learning is hard, it is really really hard actually. But for me it would not stop me exploring and experiencing the new horizon.

I will not stop learning. Because everytime I do, I get a new perspective on what I do. Gaining new knowledge and enjoying the world around me more.

![](/posts/my-journey-configuring-editors--featuring-vim-neovim-/my-journey-configuring-editors--featuring-vim-neovim--8.jpg)

I really like to show this graph when having a talk with someone about learning VIM. It is hard from the start. Yeh you would spend lots of time figuring out why things do not work. A lot of time reading the documents and a lot of trials and failures.

But as time goes by, the pain decreases and decreases, you would find yourself more and more productive. Because why?

Because you understand more about the tool you are using. You understand more about the environment you are working with.

Just like learning more and more Javascript frameworks and experiencing them first hand. It gives me more in-depth knowledge about my work as a Frontend Developer.

Learning about the editor's internal components gives me a totally new perspective about my environment, helps me optimize my workflow and brings me new insights into what I am doing.

Comparing that to what I used to do before. Where there are a bunch of Buttons and Menu to press. When I want to debug something, I press the bug icon. When I want to run something, I press the Play icon.

Well, I need to emphasize a little here that I'm not saying it is bad, I'm just trying to broaden the perspective, is that we as developers should be curious about what these buttons do.

And my time spending customizing Neovim gives me that knowledge. Satisfy my curiosity.

And it became my mindset, my mentality approaching any work. It changed from being a Consumer to being a Builder.

And in turn, I can assure you, with that mindset it makes me a much, much better developer.

## Conclusion

Ok so what should you take away from this talk. Well, I hope that I can inspire you to try new things.

Do not be satisfied with your current working environment. Try out new tools, new techniques to approach things.

As a Frontend Dev, try a new framework, try a new programing paradigm, like Functional programing.

As a programmer, try out a new programing language. New technology like new Database, New development stack like kubernetes, serverless, or build your own homelab etc.

Another thing is do not let the hardship discourage you from exploring.

Embrace the difference, embrace the thing that you don't know yet. Be curious.

And if you want to start your own Neovim journey. I hope this will be another encouragement for you to take your first step.

I will leave you with a quote from the late Steve Job: Stay Hungry, Stay Foolish

Thank you for your time.
