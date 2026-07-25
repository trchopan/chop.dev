# Hi, I'm Quang Tran aka. Chop

I am a software engineer who is passionate about creating software solutions, developing technology to empower people, and fostering community. Some of the technologies I enjoy working with include Svelte, React, Vue, Deno, Golang, Rust, Haskell, and Elixir.

In 2024, I'm focusing on AI applications. I'm particularly interested in the intersection of AI and user experience, exploring how intelligent systems can be seamlessly integrated into everyday applications to provide more intuitive experiences.

Find me around the web:

[github](https://github.com/trchopan)

[email](mailto:m@chop.dev)

[telegram](https://t.me/choptran)

[youtube](https://www.youtube.com/c/ChopTRAN)

## Development

```
hugo server -D
```

## Publishing

Open a pull request for every content or code change. CI builds the site and
validates slide content before the pull request can be merged.

Merging to `main` builds the same site again and deploys it to Firebase
Hosting. Production deployment does not use release tags. To redeploy `main`
or roll back to a known commit, run **Deploy to Firebase Hosting** manually
from the GitHub Actions tab and provide its full 40-character commit SHA in
the `ref` field.

The production workflow requires the `FIREBASE_SERVICE_ACCOUNT_HERMES_7B876`
repository secret. Configure `production` as a protected environment and
require the CI check on the `main` branch before merging.
