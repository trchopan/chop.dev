+++
title = "How This Website Was Built"
author = ["Chop Tr (chop.dev)"]
summary = "New year. New website. New journey."
date = 2022-02-02T00:00:00+07:00
tags = ["howto", "build", "website"]
draft = false
+++

<img src="./howto-build-website_20220203_134312.png" width="600" />

🎉 Chúc mừng năm mới 🎉

I'm from Vietnam so Tet is a big holiday. I and my family, we had a lot of fun gathering together. This is the first year Lina had growed up enough for me and my wife to take her travel (last year Tet holiday she was only 1 month old so we had to stay home). This year, we spent the holiday with my parents in an AirBnB at the heart of Ho Chi Minh City, Landmark 81.

A long holiday also means I had some time to do what like most = learning new things. And man, did I enjoy what I found, `emacs`, `org mode`, `hugo`, `literate configuration`. I was having a great time.

The personal website was a bit old. 2 years now I think. So It was the right time to improve it. I determined and set out about 2 hours a day whenever I can to build a new website during the holiday. And here are my notes on it:


## Hugo {#hugo}


### Static site generator {#static-site-generator}

> Hugo is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again.

Yes. All of the quote from their website is true. It was speedy, it was fun ⚡

<img src="./quick-started_20220203_153847.png" alt="Hugo quick start" caption="<span class=\"figure-number\">Figure 1: </span>quick start" width="720" />

I went through the [Quick Start](https://gohugo.io/getting-started/quick-start/) with ease and got the site runing.

Then I replaced the Anake theme with [Terminal](https://themes.gohugo.io/themes/hugo-theme-terminal/) by [panr](https://twitter.com/panr).

And voilà, A cool looking website with a look and feel of my usual working environment as a software engineer.


### Go module or Git clone {#go-module-or-git-clone}

I was toying arround with `Go Module` at the start. But when try my hand on editting the theme, `Git clone` method was the better solution. It let me manage the theme implementation and kept track of my changes.

<img src="./hugo-partial_20220203_154732.png" alt="Hugo folder tree" width="300" />

Note to self, should move the changed from inside the `/themes/termial` folder to the `root folder` to apply custom changes.


### My understanding {#my-understanding}

My experience with Hugo was brief (1 week), but I feel the design was really well thought.

Hugo is the build tool that is very well documented, has incredible performance and has great community support. This act as a tool box for all your static website needs, all we have to do is provide the material (the content files) and the decoration (the theme).

<img src="./hugo-equation_20220203_210758.png" alt="Hugo equation" width="720" />


## Emacs and Org mode {#emacs-and-org-mode}


### Doom Emacs {#doom-emacs}

I got hooked on emacs by watching Distro Tube video [What Are The Benefits Of Emacs Over Vim?](https://www.youtube.com/watch?v=kRkp-uJTK7s) . Just a few demo of org-mode and I got down to my Macbook Air to it out. It was great experience: great help from the document from both Emacs GNU and Doom Emacs. Other than that, everytime I need something just need to ask Emacs it self by pressing `<leader>h`. Awesome!!!

I am a Vim user so I used to configure my own tool and tinker around all the internal parts and customization. The setup was not taking long, just a few days and I got the environment for typescript, vue and ready to spin up the website.


### Org mode {#org-mode}

One of the great feature of Emacs is `org-mode` I write all of my post in it.

As Emacs is a Graphical Editor it has the ability to display multiple font face, font type and even pictures. Editing in `org-mode` is a blast for me.


## The features {#the-features}

I'd like my personal website to be simple


### Posts {#posts}

Ofcouse, it should contains all my writings and posts are must have.

<img src="./post-in-dir_20220218_203256.png" width="300" />

I have all my post in org files and put in `/content-org/` folder. Every time I save, I have a script to automatically export to markdown for Hugo to consume. Using [ox-hugo](https:/..scripter.co/).

Below is my example setup for a post

```org
#+hugo_base_dir: ~/Sync/chop-ink/
#+hugo_tags: how howto build website
#+hugo_custom_front_matter: :cover ./howto-build-website_20220203_134312.png
#+hugo_custom_front_matter: :images ./howto-build-website_20220203_134312.png

#+TITLE: How This Website Was Built
#+AUTHOR: Chop Tr (chop.dev)
#+DATE: <2022-02-02 Wed>
#+DESCRIPTION: New year. New website. New journey.

...Page content...
```

Then everytime I need to export the post just press `C-c C-e H h`.

I know, it's a long keybind, I used to the acronyms method to remember so it comes very easy for me: Control &gt; Export &gt; Hugo -&gt; hugo away!!!


### Images {#images}

I have a small script to copy and paste image into the content of a post.

Require: `vips`, `vipsthumbnail`, `pngpaste`

```bash
#!/bin/bash

# Location: ~/bin/clipboard-image-paste
# Should be avaiable in PATH

function help() {
  echo "$0 <size> <output_file> <format>"
  echo "Example: $0 1280 example.png \"png[Q=85]\""
  echo "Note: The last argument need to have double quote"
}

if [[ -z $2 ]]; then
  help
  exit 1
fi

if [[ -z $3 ]]; then
  format="png[Q=85]"
else
  format=$3
fi

pngpaste "/tmp/pngpaste.png"

# Resize the image if greater than $1 with given $format
output=$(echo "out_pngpaste.$format"| sed -E 's/(out_.*\.)(png|jpg|jpeg|webp).*/\1\2/g')
vipsthumbnail -s "$1x$1>" -o "out_%s.$format" "/tmp/pngpaste.png"

rm /tmp/pngpaste.png
mv "/tmp/$output" $2

```

```emacs-lisp
(defun org-insert-clipboard-image (&optional file)
  (interactive "F")
  (setq filename (concat file (format-time-string "_%Y%m%d_%H%M%S") ".png"))
  (shell-command (concat "clipboard-image-paste 1280 " filename " \"png[Q=85]\""))
  (insert "#+attr_html: :width 720\n")
  (insert (concat "[[" filename "]]")))
```

Everytime I need to insert a image I just have to copy the image or screen select it. The image is temporary saved in the clipboard. Then I call the command `org-insert-clipboard-image` to save it to selected directory and paste the path to current position of the cursor.

My config for emacs for this feature is eplained more here: <https://chop.dev/posts/doom.d/config/#insert-clipboard-image-into-org-file>


### Source code highlight {#source-code-highlight}

My current theme is `terminal` by `panr` and it use `PrismJS` to hightlight the source code block.

A little edit and configuration from the PrisimJS site to choose the optimized features for my site then I replace the static file.

```
https://prismjs.com/download.html#
themes=prism-tomorrow&
languages=markup+css+clike+javascript+bash+dart+firestore-security-rules+go+go-module+graphql+handlebars+haskell+http+ignore+json+json5+jsonp+lisp+lua+markdown+markup-templating+python+jsx+tsx+regex+rust+sass+scss+shell-session+solidity+toml+typescript+typoscript+vim+yaml&
plugins=show-language+toolbar+copy-to-clipboard
```

<img src="./prism-static-file_20220314_155217.png" width="350" />


### Comments {#comments}

I was choosing between [Disqus](https://disqus.com) , [Utterances](https://utteranc.es/). And settle on the later as it use Github issue to manage the comment which is great for developer as all the information I get is in one place. I can check it more regularly than more social oriented solution like Disqus.

Setting it up is in the `/layouts/partials/comments.html` file

```html
<script src="https://utteranc.es/client.js"
        repo="trchopan/chop.dev"
        issue-term="pathname"
        theme="gruvbox-dark"
        crossorigin="chop.dev"
        async>
</script>
<style type="text/css"></style>
```

Then viewer of the site will have a nice window to leave comments like this

<img src="./utterances-comment_20220314_155945.png" width="720" />


### Image viewer {#image-viewer}

This bit is a bit more tricky. I found a minimal library <https://adrianklimek.github.io/views/> which is just 5.4k and not depends on jquery.

I had to make 2 edits:


#### Wrap my image (figues) in &lt;a&gt; tag {#wrap-my-image--figues--in-a-tag}

`/layouts/shortcodes/figure.html`

```html
{{ if .Get "src" }}
<a class="my-figure" href="{{ .Get "src" | safeURL }}">
<figure class="{{ with .Get "position"}}{{ . }}{{ else -}} center {{- end }}"
        {{ if .Get "width" }}
        style="max-width: {{ .Get "width" }}px"
        {{ end }}
>
  <img src="{{ .Get "src" | safeURL }}"
       {{ with .Get "alt" }} alt="{{ . | plainify }}" {{ end }}
       {{ with .Get "style" }} style="{{ . | safeCSS }}" {{ end }} />
    {{ if .Get "alt" }}
    <figcaption class="{{ with .Get "captionPosition"}}{{ . }}{{ else -}} center {{- end }}" {{ with .Get "captionStyle" }} style="{{ . | safeCSS }}" {{ end }}>
      {{ .Get "alt" | safeHTML }}
    </figcaption>
    {{ end }}
</figure>
</a>
{{ end }}
```

This will wrap all my images in a `<a>` tags and give it a class `my-figure`.


#### Script to activate the images viewer {#script-to-activate-the-images-viewer}

Then in the footer of the site I need to add in a small script so the library can find the images I want to show a nice looking image viewer.

`/layouts/partials/extended_footer.html`

```html
<script src="{{ "/views.min.js" | absURL }}"></script>
<script defer type="text/javascript">
const figures = document.querySelectorAll('.my-figure');
figures.forEach(f => {
   new Views(f);
 })
</script>
```


## Hosting {#hosting}

I use firebase hosting to host my site. It's a convinient and easy to use option with very low cost.

I have an existing firebase project that I used for my old website. I use the same project so I don't need to create one.

If you don't have one, It can be created by following this console page: <https://console.firebase.google.com/>


### Config and Deploy folder {#config-and-deploy-folder}

With the `firebase cli` and `firebase project` setup I just need to edit the `firebase.json` file to deploy the build directory from hugo.

`firebase.json`

```json
{
  "hosting": {
    "site": "chop-ink",
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "headers": [
      {
        "source": "**/*.@(json|ico|css|jpg|jpeg|gif|png)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=86400"
          }
        ]
      },
      {
        "source": "/prism.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=2592000"
          }
        ]
      }
    ]
  }
}
```

Above, I have config for the cache time of `images` and the `prism.js` files which will almost never change.

Then everytime I like to make a new publish to my website I just need to run the commands:

```bash
hugo && firebase deploy
```


## Conclusion {#conclusion}

The couple of weeks I spend on renewing my website was a great time. I learned a lot of new architecture and have a totally awesome new tool `Emacs` in my arsenal.

I think this year will be the year I focus on content creating and this website will be the place I put all my writting to.

Chào 🖖
