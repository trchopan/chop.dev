+++
title = "Doom Emacs config file"
author = ["Chop Tr (chop.ink)"]
description = "My config and note during the awesome journey of getting to know Emacs and Doom Emacs"
date = 2022-01-26T00:00:00+07:00
tags = ["doom", "emacs", "config"]
draft = false
cover = "/ox-hugo/demo-doom_20220131_154814.png"
+++

<div class="ox-hugo-toc toc">
<div></div>

<div class="heading">Table of Contents</div>

- [Init.el](#init-dot-el)
- [Default doom setup](#default-doom-setup)
- [Automations](#automations)
- [LSP](#lsp)
- [Treemacs](#treemacs)
- [Avy - Jump mode](#avy-jump-mode)
- [Org mode](#org-mode)
- [Centaur tab](#centaur-tab)
- [Personal Keymaps](#personal-keymaps)
- [Font display](#font-display)
- [Zen mode](#zen-mode)
- [Disable packages](#disable-packages)

</div>
<!--endtoc-->



## Init.el {#init-dot-el}


### NOTICE {#notice}

This is kinda personal preference but it will effect the whole setup. I used to be a vim typer. I use `\` as keyleader instead of `Space`.

{{< figure src="/ox-hugo/leader-key_20220131_213628.png" class="center" width="720px" >}}

```emacs-lisp
;; .doom.d/init.el
(add-hook 'org-mode-hook #'+org-pretty-mode)
(setq doom-leader-key "\\"
      doom-leader-alt-key "M-\\"
      doom-localleader-key "M-,"
      doom-localleader-alt-key "M-,")

(doom! :input
       ;;chinese
       ;;japanese
       ;;layout            ; auie,ctsrnm is the superior home row

       :completion
       company           ; the ultimate code completion backend
       ;;helm              ; the *other* search engine for love and life
       ;;ido               ; the other *other* search engine...
       ;;ivy               ; a search engine for love and life
       (vertico +icons)           ; the search engine of the future

       :ui
       ;;deft              ; notational velocity for Emacs
       doom              ; what makes DOOM look the way it does
       doom-dashboard    ; a nifty splash screen for Emacs
       doom-quit         ; DOOM quit-message prompts when you quit Emacs
       ;;(emoji +unicode)  ; 🙂
       hl-todo           ; highlight TODO/FIXME/NOTE/DEPRECATED/HACK/REVIEW
       ;;hydra
       ;;indent-guides     ; highlighted indent columns
       ;;ligatures         ; ligatures and symbols to make your code pretty again
       ;;minimap           ; show a map of the code on the side
       modeline          ; snazzy, Atom-inspired modeline, plus API
       ;;nav-flash         ; blink cursor line after big motions
       ;;neotree           ; a project drawer, like NERDTree for vim
       ophints           ; highlight the region an operation acts on
       (popup +defaults)   ; tame sudden yet inevitable temporary windows
       tabs              ; a tab bar for Emacs
       (treemacs +lsp)          ; a project drawer, like neotree but cooler
       ;;unicode           ; extended unicode support for various languages
       vc-gutter         ; vcs diff in the fringe
       vi-tilde-fringe   ; fringe tildes to mark beyond EOB
       ;;window-select     ; visually switch windows
       workspaces        ; tab emulation, persistence & separate workspaces
       zen               ; distraction-free coding or writing

       :editor
       (evil +everywhere); come to the dark side, we have cookies
       file-templates    ; auto-snippets for empty files
       fold              ; (nigh) universal code folding
       ;;(format +onsave)  ; automated prettiness
       ;;god               ; run Emacs commands without modifier keys
       ;;lispy             ; vim for lisp, for people who don't like vim
       ;;multiple-cursors  ; editing in many places at once
       ;;objed             ; text object editing for the innocent
       ;;parinfer          ; turn lisp into python, sort of
       ;;rotate-text       ; cycle region at point between text candidates
       snippets          ; my elves. They type so I don't have to
       ;;word-wrap         ; soft wrapping with language-aware indent
       format

       :emacs
       dired             ; making dired pretty [functional]
       electric          ; smarter, keyword-based electric-indent
       ;;ibuffer         ; interactive buffer management
       undo              ; persistent, smarter undo for your inevitable mistakes
       vc                ; version-control and Emacs, sitting in a tree

       :term
       ;;eshell            ; the elisp shell that works everywhere
       ;;shell             ; simple shell REPL for Emacs
       ;;term              ; basic terminal emulator for Emacs
       ;;vterm             ; the best terminal emulation in Emacs

       :checkers
       syntax              ; tasing you for every semicolon you forget
       ;;(spell +flyspell) ; tasing you for misspelling mispelling
       ;;grammar           ; tasing grammar mistake every you make

       :tools
       ;;ansible
       ;;biblio            ; Writes a PhD for you (citation needed)
       ;;debugger          ; FIXME stepping through code, to help you add bugs
       ;;direnv
       ;;docker
       ;;editorconfig      ; let someone else argue about tabs vs spaces
       ;;ein               ; tame Jupyter notebooks with emacs
       (eval +overlay)     ; run code, run (also, repls)
       ;;gist              ; interacting with github gists
       lookup              ; navigate your code and its documentation
       lsp               ; M-x vscode
       magit             ; a git porcelain for Emacs
       ;;make              ; run make tasks from Emacs
       ;;pass              ; password manager for nerds
       ;;pdf               ; pdf enhancements
       ;;prodigy           ; FIXME managing external services & code builders
       ;;rgb               ; creating color strings
       ;;taskrunner        ; taskrunner for all your projects
       ;;terraform         ; infrastructure as code
       ;;tmux              ; an API for interacting with tmux
       upload            ; map local to remote projects via ssh/ftp

       :os
       (:if IS-MAC macos)  ; improve compatibility with macOS
       ;;tty               ; improve the terminal Emacs experience

       :lang
       ;;agda              ; types of types of types of types...
       ;;beancount         ; mind the GAAP
       ;;cc                ; C > C++ == 1
       ;;clojure           ; java with a lisp
       ;;common-lisp       ; if you've seen one lisp, you've seen them all
       ;;coq               ; proofs-as-programs
       ;;crystal           ; ruby at the speed of c
       ;;csharp            ; unity, .NET, and mono shenanigans
       ;;data              ; config/data formats
       ;;(dart +flutter)   ; paint ui and not much else
       ;;dhall
       ;;elixir            ; erlang done right
       ;;elm               ; care for a cup of TEA?
       emacs-lisp        ; drown in parentheses
       ;;erlang            ; an elegant language for a more civilized age
       ;;ess               ; emacs speaks statistics
       ;;factor
       ;;faust             ; dsp, but you get to keep your soul
       ;;fortran           ; in FORTRAN, GOD is REAL (unless declared INTEGER)
       ;;fsharp            ; ML stands for Microsoft's Language
       ;;fstar             ; (dependent) types and (monadic) effects and Z3
       ;;gdscript          ; the language you waited for
       ;;(go +lsp)         ; the hipster dialect
       (haskell +lsp)    ; a language that's lazier than I am
       ;;hy                ; readability of scheme w/ speed of python
       ;;idris             ; a language you can depend on
       json              ; At least it ain't XML
       ;;(java +meghanada) ; the poster child for carpal tunnel syndrome
       (javascript +lsp)        ; all(hope(abandon(ye(who(enter(here))))))
       ;;julia             ; a better, faster MATLAB
       ;;kotlin            ; a better, slicker Java(Script)
       ;;latex             ; writing papers in Emacs has never been so fun
       ;;lean              ; for folks with too much to prove
       ;;ledger            ; be audit you can be
       lua               ; one-based indices? one-based indices
       markdown          ; writing docs for people to ignore
       ;;nim               ; python + lisp at the speed of c
       ;;nix               ; I hereby declare "nix geht mehr!"
       ;;ocaml             ; an objective camel
       (org +pretty +hugo)               ; organize your plain life in plain text
       ;;php               ; perl's insecure younger brother
       ;;plantuml          ; diagrams for confusing people more
       ;;purescript        ; javascript, but functional
       python            ; beautiful is better than ugly
       ;;qt                ; the 'cutest' gui framework ever
       ;;racket            ; a DSL for DSLs
       ;;raku              ; the artist formerly known as perl6
       rest              ; Emacs as a REST client
       ;;rst               ; ReST in peace
       ;;(ruby +rails)     ; 1.step {|i| p "Ruby is #{i.even? ? 'love' : 'life'}"}
       rust              ; Fe2O3.unwrap().unwrap().unwrap().unwrap()
       ;;scala             ; java, but good
       ;;(scheme +guile)   ; a fully conniving family of lisps
       (sh +lsp)                ; she sells {ba,z,fi}sh shells on the C xor
       ;;sml
       ;;solidity          ; do you need a blockchain? No.
       ;;swift             ; who asked for emoji variables?
       ;;terra             ; Earth and Moon in alignment for performance.
       (web +lsp)               ; the tubes
       (yaml +lsp)              ; JSON, but readable
       ;;zig               ; C, but simpler

       :email
       ;;(mu4e +org +gmail)
       ;;notmuch
       ;;(wanderlust +gmail)

       :app
       ;;calendar
       ;;emms
       ;;everywhere        ; *leave* Emacs!? You must be joking
       ;;irc               ; how neckbeards socialize
       ;;(rss +org)        ; emacs as an RSS reader
       ;;twitter           ; twitter client https://twitter.com/vnought

       :config
       ;;literate
       (default +bindings +smartparens))
```


## Default doom setup {#default-doom-setup}

Some functionality uses this to identify you, e.g. GPG configuration, email clients, file templates and snippets.

```emacs-lisp
(setq user-full-name "Chop Tr (chop.ink)"
      user-mail-address "chop@chop.ink")
```

Doom exposes five (optional) variables for controlling fonts in Doom. Here are the three important ones:

-   `doom-font`
-   `doom-variable-pitch-font`
-   `doom-big-font` -- used for `doom-big-font-mode`; use this for
    presentations or streaming.

They all accept either a font-spec, font string ("Input Mono-12"), or xlfd font string. You generally only need these two: (setq doom-font (font-spec :family "monospace" :size 12 :weight 'semi-light) doom-variable-pitch-font (font-spec :family "sans" :size 13))

There are two ways to load a theme. Both assume the theme is installed and available. You can either set `doom-theme` or manually load a theme with the `load-theme` function. This is the default:

```emacs-lisp
(setq doom-theme 'doom-one)
```

If you use `org` and don't want your org files in the default location below, change `org-directory`. It must be set before org loads!

```emacs-lisp
(setq org-directory "~/org/")
```

This determines the style of line numbers in effect. If set to `nil`, line numbers are disabled. For relative line numbers, set this to `relative`.

```emacs-lisp
(setq display-line-numbers-type t)
```

Here are some additional functions/macros that could help you configure Doom:

-   `load!` for loading external \*.el files relative to this one
-   `use-package!` for configuring packages
-   `after!` for running code after a package has loaded
-   `add-load-path!` for adding directories to the `load-path`, relative to
    this file. Emacs searches the `load-path` when you load packages with
    `require` or `use-package`.
-   `map!` for binding new keys

To get information about any of these functions/macros, move the cursor over the highlighted symbol at press `K` (non-evil users must press `C-c c k`). This will open documentation for it, including demos of how they are used.

You can also try `gd` (or `C-c c d`) to jump to their definition and see how they are implemented.


## Automations {#automations}

Automatic tangle on save

```emacs-lisp
(add-hook 'org-mode-hook
          (lambda () (add-hook 'after-save-hook #'org-babel-tangle :append :local))
          ;; (setq-default line-spacing 6)
          )
```

Maximize the window upon startup. (May need to edit below depends on the monitor size)

```emacs-lisp
(setq initial-frame-alist '((top . 1) (left . 1) (width . 177) (height . 60)))
```


## LSP {#lsp}


### Format-all {#format-all}

If you are in a buffer with lsp-mode enabled and a server that supports textDocument/formatting, it will be used instead of format-all’s formatter.

-   To disable this behavior universally use: (setq +format-with-lsp nil)
-   To disable this behavior in one mode: (setq-hook! 'python-mode-hook +format-with-lsp nil)

<!--listend-->

```emacs-lisp
(setq +format-with-lsp nil)
```

The command format-all-ensure-formatter will ensure that a default formatter is selected in case you don't have one set; you can customize the default formatter for each language. To ensure a formatter is set whenever you enable format-all-mode, you can use: (add-hook format-all-mode-hook 'format-all-ensure-formatter).

```emacs-lisp
(add-hook 'format-all-mode-hook 'format-all-ensure-formatter)
```


### Vue {#vue}


#### Package {#package}

```emacs-lisp
(package! lsp-volar :recipe (:host github :repo "jadestrong/lsp-volar"))
```


#### Config {#config}

```emacs-lisp
(use-package! lsp-volar)
```


### Typescript {#typescript}


#### Package {#package}

```emacs-lisp
(package! ob-ts-node :recipe (:host github :repo "tmythicator/ob-ts-node"))
```


## Treemacs {#treemacs}


### Workspaces and perspectives {#workspaces-and-perspectives}

Projects are beautifully managed. Can be added with `<C-p><C-p>a`.

Edit workspaces by `treemacs-edit-workspaces`


### Additional keymaps {#additional-keymaps}

```emacs-lisp
(with-eval-after-load 'treemacs
  (define-key evil-treemacs-state-map "s" 'treemacs-visit-node-horizontal-split))
```


## Avy - Jump mode {#avy-jump-mode}

avy is a GNU Emacs package for jumping to visible text using a char-based decision tree. See also ace-jump-mode and vim-easymotion - avy uses the same idea.


### Package {#package}

```emacs-lisp
(package! avy)
```


### Keymaps {#keymaps}

```emacs-lisp
(map! :n "<SPC>" #'evil-avy-goto-word-0)
```


### Config {#config}


#### avy-keys {#avy-keys}

The list of the default decision chars.

```emacs-lisp
(setq avy-keys '(?q ?t ?e ?r ?y ?u ?o ?p
                    ?a ?s ?d ?w ?b ?n ?v
                    ?k ?l ?z ?x ?c ?j ?g
                    ?h ?f ?i ))
```


#### avy-style {#avy-style}

The default overlay display style.

This setting will be used for all commands, unless overridden in `avy-styles-alist`.

Six styles are currently available:

1.  `pre`: - full path before target, leaving all original text.
2.  `at`: - single character path on target, obscuring the target.
3.  `at-full`: full path on target, obscuring the target and the text behind it.
4.  `post`: full path after target, leaving all original text.
5.  `de-bruijn`: like at-full but the path is in a De Bruijn sequence.
6.  `words`: like at-full, but the path consists of words as defined by `avy-words`.

At first it seems that pre and post are advantageous over at and at-full, since you can still see the original text with them. However, they make the text shift a bit. If you don’t like that, use either at or at-full.

```emacs-lisp
(setq avy-style 'de-bruijn)
```


## Org mode {#org-mode}


### Insert clipboard image into org {#insert-clipboard-image-into-org}

```emacs-lisp
(defun org-insert-clipboard-image (&optional file)
  (interactive "F")
  (setq filename (concat file (format-time-string "_%Y%m%d_%H%M%S") ".png") )
  (shell-command (concat "pngpaste " filename))
  (insert "#+attr_html: :width 720px\n")
  (insert (concat "[[" filename "]]"))
  (org-display-inline-images))
```


## Centaur tab {#centaur-tab}

```emacs-lisp
(with-eval-after-load 'centaur-tabs
  (centaur-tabs-group-by-projectile-project))
```


## Personal Keymaps {#personal-keymaps}


### Tab moving and reordering {#tab-moving-and-reordering}

```emacs-lisp
(map! :n "H" #'+tabs:previous-or-goto)
(map! :n "L" #'+tabs:next-or-goto)
(map! :n "`h" #'treemacs-find-file)
```

For centaur tabs

```emacs-lisp
(map! :n "C-f h" #'centaur-tabs-move-current-tab-to-left)
(map! :n "C-f l" #'centaur-tabs-move-current-tab-to-right)
```


#### Combo key `n.` {#combo-key-n-dot}

Search current work > Jump back to it > Change it. After that you can redo the change by pressing `n.`

```emacs-lisp
(define-key evil-motion-state-map "C-f" nil)
(map! :n "C-f w" "*Nciw")
```


#### Change or subtitute should not replace the registers {#change-or-subtitute-should-not-replace-the-registers}

```emacs-lisp
(evil-define-operator evil-change-without-register (beg end type _ yank-handler)
  (interactive "<R><y>")
  (evil-change beg end type ?_ yank-handler))

(evil-define-operator evil-delete-without-register (beg end type _ _2)
  (interactive "<R><y>")
  (evil-delete beg end type ?_))

(evil-define-command evil-visual-paste-without-register (count &optional register)
  "Paste over Visual selection."
  :suppress-operator t
  (interactive "P<x>")
  ;; evil-visual-paste is typically called from evil-paste-before or
  ;; evil-paste-after, but we have to mark that the paste was from
  ;; visual state
  (setq this-command 'evil-visual-paste)
  (let* ((text (if register
                   (evil-get-register register)
                 (current-kill 0)))
         (yank-handler (car-safe (get-text-property
                                  0 'yank-handler text)))
         new-kill
         paste-eob)
    (evil-with-undo
      (let* ((kill-ring (list (current-kill 0)))
             (kill-ring-yank-pointer kill-ring))
        (when (evil-visual-state-p)
          (evil-visual-rotate 'upper-left)
          ;; if we replace the last buffer line that does not end in a
          ;; newline, we use ~evil-paste-after~ because ~evil-delete~
          ;; will move point to the line above
          (when (and (= evil-visual-end (point-max))
                     (/= (char-before (point-max)) ?\n))
            (setq paste-eob t))
          (evil-delete-without-register evil-visual-beginning evil-visual-end
                                        (evil-visual-type))
          (when (and (eq yank-handler #'evil-yank-line-handler)
                     (not (eq (evil-visual-type) 'line))
                     (not (= evil-visual-end (point-max))))
            (insert "\n"))
          (evil-normal-state)
          (setq new-kill (current-kill 0))
          (current-kill 1))
        (if paste-eob
            (evil-paste-after count register)
          (evil-paste-before count register)))
      (kill-new new-kill)
      ;; mark the last paste as visual-paste
      (setq evil-last-paste
            (list (nth 0 evil-last-paste)
                  (nth 1 evil-last-paste)
                  (nth 2 evil-last-paste)
                  (nth 3 evil-last-paste)
                  (nth 4 evil-last-paste)
                  t)))))

(evil-define-command evil-paste-after-without-register (count &optional register yank-handler)
  "evil paste before without yanking"
  :suppress-operator t
  (interactive "P<x>")
  (if (evil-visual-state-p)
      (evil-visual-paste-without-register count register)
    (evil-paste-after count register yank-handler)))
(define-key evil-motion-state-map "p" 'evil-paste-after-without-register)
(define-key evil-motion-state-map "s" 'evil-change-without-register)
(define-key evil-motion-state-map "c" 'evil-change-without-register)
```

Here I overwrite the built-in `evil-change` . Therefore, need to update when the official implement change (should not be too often).

```emacs-lisp
(with-eval-after-load 'evil
  (evil-define-operator evil-change
    (beg end type register yank-handler delete-func)
    "Change text from BEG to END with TYPE.
Save in REGISTER or the kill-ring with YANK-HANDLER.
DELETE-FUNC is a function for deleting text, default `evil-delete'.
If TYPE is `line', insertion starts on an empty line.
If TYPE is `block', the inserted text in inserted at each line
of the block."
    (interactive "<R><x><y>")
    (let ((delete-func (or delete-func #'evil-delete-without-register))
          (nlines (1+ (evil-count-lines beg end)))
          (opoint (save-excursion
                    (goto-char beg)
                    (line-beginning-position))))
      (unless (eq evil-want-fine-undo t)
        (evil-start-undo-step))
      (funcall delete-func beg end type register yank-handler)
      (cond
       ((eq type 'line)
        (setq this-command 'evil-change-whole-line) ; for evil-maybe-remove-spaces
        (if (= opoint (point))
            (evil-open-above 1)
          (evil-open-below 1)))
       ((eq type 'block)
        (evil-insert 1 nlines))
       (t
        (evil-insert 1)))
      (setq evil-this-register nil))))
```


#### Map the `s` key to change {#map-the-s-key-to-change}

```emacs-lisp
(define-key evil-motion-state-map "s" 'evil-substitute)
(define-key evil-motion-state-map "S" 'evil-change-whole-line)
```


## Font display {#font-display}


### Font face {#font-face}

```emacs-lisp
(setq doom-font (font-spec :family "FiraCode Nerd Font Mono" :size 13)
      doom-variable-pitch-font (font-spec :family "Source Serif 4" :size 13))
```


### Org pretty mode {#org-pretty-mode}

Hide emhasis marker and toggles pretty entities.

```emacs-lisp
(add-hook 'org-mode-hook #'+org-pretty-mode)
```


### Bigger heading {#bigger-heading}

```emacs-lisp
(custom-set-faces!
  '(org-document-title :height 1.2)
  '(outline-1 :weight extra-bold :height 1.25)
  '(outline-2 :weight bold :height 1.15)
  '(outline-3 :weight bold :height 1.12)
  '(outline-4 :weight semi-bold :height 1.09)
  '(outline-5 :weight semi-bold :height 1.06)
  '(outline-6 :weight semi-bold :height 1.03)
  '(outline-8 :weight semi-bold)
  '(outline-9 :weight semi-bold))
```


### Italic quote block {#italic-quote-block}

```emacs-lisp
(setq org-fontify-quote-and-verse-blocks t)
```


## Zen mode {#zen-mode}

Reduce zen mode zoom

```emacs-lisp
(setq +zen-text-scale 1.396)
```


## Disable packages {#disable-packages}

Not really a fan of this jump method

```emacs-lisp
(package! evil-snipe :disable t)
```
