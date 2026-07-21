---
description: |
  Turn a Hugo post into a Reveal.js slide deck with illustration prompts.

  `$ARGUMENTS` should be a post path, for example:

  ```text
  content/posts/ai--ban-khong-con-suy-nghi-mot-minh-nua/index.md
  ```

agent: build
---

Create a presentation plan and slide deck from the source post specified in path: `$ARGUMENTS`.

If no path is supplied, ask the user to provide one. If the source post does not exist, stop and report the error.

## Workflow

1. Read the complete source post and inspect at least two existing files under `content/slides/` before drafting.
2. Distill the post into a 10–12 slide narrative. Keep one main idea per slide and preserve the author's voice.
3. Before writing files, present a concise outline with slide titles, key messages, and visual metaphors. Ask for confirmation if the user has not already supplied an outline.
4. Create the slide directory at `content/slides/<slug>/`, where `<slug>` matches the post slug unless the user specifies another name.
5. Create `index.md` using the repository's TOML front matter and Reveal.js Markdown conventions:
   - Separate slides with `---`.
   - Use `<!-- .slide: data-background-image="./filename.png" data-background-opacity="0.45" -->` for illustration backgrounds.
   - Keep slide text short enough to present aloud.
   - Put the prompt in a `Note:` block as `**AI Image Prompt:** ...`.
6. Create `prompts.md` containing a numbered copy-friendly version of every image prompt and its intended filename.
7. Do not generate images, add placeholder binary files, or overwrite an existing slide deck without explicit confirmation.
8. Use this visual system unless the user requests another one:
   - 16:9 landscape editorial illustration.
   - Dark charcoal background with warm amber/orange highlights and subtle teal accents.
   - One recurring human protagonist.
   - Abstract luminous AI companion instead of a generic humanoid robot.
   - Strong negative space for slide text.
   - No text, letters, logos, watermarks, or readable UI inside generated images.
9. Run the validator after writing:

```bash
bun run scripts/validate-slides.ts content/slides/<slug> --allow-missing-images
```

10. Run Hugo if practical and report the local preview URL. Do not publish, commit, or modify unrelated files.

## Prompt format

Every prompt must describe the subject, action, symbolism, composition, mood, palette, and negative constraints. Use English for image-generation prompts even when the slide text is Vietnamese. Include the intended negative-space direction, for example `negative space on the left for slide text`.

## Completion report

Report the created paths, slide count, image filenames still needing generation, validator result, and preview URL. Mention any existing files you intentionally left untouched.
