+++
title = "1 Program, 3 Languages"
author = ["Chop Tr (chop.ink)"]
description = "Same program written in 3 programming languages: Typescript, Haskell, Rust. Thereby experiencing environment and gaining new knowledge."
date = 2022-03-22T00:00:00+07:00
tags = ["haskell", "typescript", "rust", "programing"]
draft = false
cover = "/ox-hugo/one-program-three-language_20220324_215135.png"
images = "/ox-hugo/one-program-three-language_20220324_215135.png"
+++

## Introduction {#introduction}

Learning programing is a journey. Everyday I learned new things and experience new wonder. And by keep exploring new places, new corner of the landscape, I rediscover many things that I didn't know before.

Since last year, I have put on my TODO list to learn `Haskell` and `Rust` along side of my main job where I do programing in `Typescript`.

It was a wonderful journey with both.

`Haskell` functional programing is a new world with a lot new concepts. I learn to love the logic behind the language, the reasoning in the design and the intuition to think in term of use my code to explain the business logic to other programer rather than tell the computer what to do.

`Rust` has great idea with ownership and borrowing reference, which solve a lot of problem in system programing. And their document is super great the best in all the document / tutorial I've ever read. They say it is a scary and difficult language and you should avoid when starting your software development career but my oppinion is the opposite. With so well written book and tutorial, only myself stopping me from learning it.

In this article, I would like to express the beauty of all 3 language (and 3 developing environments) I use most by implement the same program program `MineSweeper`.


## The program - Minesweeper {#the-program-minesweeper}

This picture will be very familiar with anyone who has a computer in the 90s.

{{< figure src="/ox-hugo/minesweeper_20220323_132137.png" width="380" >}}

In this game you try to guess where the mines are given the number as `hint`. The goal is to identify all the mines without triggering them.

The program we going to do is a simple calculation of those hint numbers. The number should be the total number of adjacent mines.


### Example {#example}

```nil
// Mines: *
// Empty: .
·*·*·
··*··
··*··
·····

// The output should be
1*3*1
13*31
.2*2.
.111.
```


### Solution {#solution}

The solution should be an easy mapping and calculating program with a mapping pattern for checking the adjacent.


#### The `Adjacent` map. {#the-adjacent-map-dot}

Let say we have the mines in 2d array of characters like above. We can identify the pattern for adjacent checking like below, with `i` for the column index and `j` for the row index:

```nil
// The checking pattern is all the cell surround the mine
???
?.?
???

// Convert to i, j is

[
  (i-1, j-1), ( i , j-1), (i+1, j-1),
  (i-1,  j ), ( i ,  j ), (i+1,  j ),
  (i-1, j+1), ( i , j+1), (i+1, j+1),
]
```

There is one caveat for this adjacent map is when we are checking the corners `(i, j) = (0, 0)` for example. The map for the top left would be `(-1, -1)` which is out-of-bound for the array check. Therefore we have to filter out all the value less than `0` and greater than the `columns` and `rows` for the 2d array.


#### Calculate the sum {#calculate-the-sum}

With the Adjacent map identified. We should be able to calculate the adjacent mines of a given cell by a simple `sum` opperation.

```nil
The number of a cell is
  -> the sum of adjacent cells
     -> that has mine.
```


## Source code {#source-code}

<https://github.com/trchopan/video-2022-23-03>


## Video {#video}

<https://www.youtube.com/watch?v=jl_mMBn7oJ8>
