+++
title = "Locho: Access a Private Service on Another Machine as if it Were Local"
author = ["Chop Tr (chop.dev)"]
summary = "locho is a simple way to access a private service on another machine as if it were local."
tags = ["devops", "networking", "opensource", "rust"]
date = 2026-07-25T00:00:00+07:00
draft = false
cover = "cover.png"
+++

> local + echo = locho

Sometimes you don't need access to a machine.

You don't need a shell.

You don't need the whole network.

You just need to call one service.

![Access a Private Service as if It Were Local](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/u7962u81z99hb2c47tga.png)

---

## How it works

You define services on the host:

```toml
[[services]]
name = "api"
type = "tcp"
endpoint = "192.168.0.10:8080"
```

Start the host:

```bash
locho host --config locho.toml
```

Then from anywhere:

```bash
locho attach <host-id> api <secret> --listen 127.0.0.1:8765
```

Now you can call it like this:

```bash
curl http://127.0.0.1:8765
```

And it hits the remote service.

---

## The situation

I ran into this while working with services inside a private network - a friend's homelab.

Here’s what I had:

- an API running inside that private network (on my friend’s homelab)
- a host with access to that network (my laptop)
- another machine, located elsewhere (my desktop), without access

What I wanted was simple:

> Call that API from my machine as if I were inside the private network.

---

## The usual options (and why they didn't fit)

There are plenty of ways to solve this - but they all felt like overkill for this specific need.

### 1. SSH port forwarding

Using:

```bash
ssh -L 8765:localhost:8080 user@host
```

This works, but:

- requires managing SSH access
- gives full shell access (more than needed)
- not very ergonomic if you just want a quick service call

---

### 2. VPNs

Tools like Tailscale give you full network access.

But:

- you join the entire network
- you expose more than just one service
- setup can be heavier than necessary

---

### 3. Public tunneling

Tools like ngrok expose your service publicly.

But:

- the service becomes publicly reachable
- requires an external service
- not ideal for private/internal APIs

---

## The gap

All of these tools operate at a broader level:

- machine-level (SSH)
- network-level (VPN)
- public endpoint (tunnels)

But my need was narrower:

> I only want access to one specific service—nothing else.

---

## A simpler approach

So I built **locho**.

> locho is a simple way to access a private service on another machine as if it were local.

Instead of giving access to a machine or network, locho gives you access to a **single service**, and binds it to your localhost.

![Why Locho is different](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/bkwc2fdvv47p6jt0co96.png)

---

## Try it

👉 [https://github.com/trchopan/locho](https://github.com/trchopan/locho)

I'd love to hear how you'd use it.
