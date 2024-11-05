+++
title = "Tech Share: AI Image Generator"
author = ["Chop Tr (chop.dev)"]
summary = "A tech sharing session in LINE Corporation for Front-End Team about AI Image Generator."
date = 2024-11-05T00:00:00+07:00
tags = ["ai", "image", "generator", "tech share", "stable diffusion", "comfyui"]
draft = false
+++

## Slides

[Slides](/slides/tech-share--ai-image-generator/)

## Introduction to AI Image Generators

Hello everyone! Today, I will talking AI Image Generators. These are advanced
software systems that use artificial intelligence to either create images from
scratch or modify existing ones. They leverage powerful techniques like deep
learning and neural networks to create images in ways we couldn't imagine a few
years ago. These tools are becoming increasingly significant, transforming how
we approach tasks in sectors like marketing, entertainment, and design.

## Brief History and Evolution of AI Image Generators

Let's take a quick look at how AI Image Generators have evolved over time. Back
in 2014, we saw the introduction of Generative Adversarial Networks, or GANs.
These were groundbreaking but had their challenges.

Who knows about the website [thispersondoesnotexist.com](https://thispersondoesnotexist.com)?

This is a 2021 website that powered by StyleGAN, a neural network developed by
Nvidia in 2018.

These faces are really realistic and looks like real people. And back in 2020s
GANs was able to do these thing. But one challenge when using GANs is that they
are prone to mode collapse. Once the network (generator) success in guessing
the correct human face to fool the training network (discriminator) it likely
to produce the same face again and again.

Fast forward to today, we use more advanced techniques such as tools like
Stable Diffusion. This technique work by noise guessing mechanism which is much
easier, to control and refine, allowing for the generation of highly detailed
and diverse images.

The evolution of these models includes:

**Diffusion Models**: Diffusion models, like DALL-E 2 and Stable Diffusion,
have gained attention. These models work by gradually transforming noise into
coherent images. They are praised for their ability to generate detailed and
diverse images with fewer artifacts.

**Transformer-based Models**: Inspired by advancements in natural language
processing, it uses CLIP (Contrastive Language–Image Pre-training) use
transformers to understand and generate images from text prompts. This
integration of language and vision has opened new possibilities for creative AI
applications.

## How to Use AI Image Generators

Now that we have a bit of background, let's explore
how AI Image Generators can be utilized. There are
two main approaches: using pre-built systems and
self-hosted solutions. Each has its own set of
advantages and disadvantages.

### Pre-built Systems (e.g., AWS Titan, GCP Imagen)

**Overview of Pre-built Systems:**

Pre-built systems are ready-made solutions provided by cloud service providers
like Amazon Web Services (AWS) and Google Cloud Platform (GCP).

**Advantages:**

-   **Ease of Use and Quick Deployment:** These systems are user-friendly and can
    be set up quickly without needing extensive technical knowledge.
-   **High Scalability and Reliability:** Since they are cloud-based, they can
    easily handle large workloads and offer reliable performance.
-   **Access to Cutting-edge Technology and Regular Updates:** Users benefit from
    the latest advancements in AI as these platforms are frequently updated.
-   **Integration with Other Cloud Services:** They can seamlessly integrate with
    other tools and services offered by the cloud provider.

**Disadvantages:**

-   **Cost Considerations and Potential for High Expenses:** While convenient,
    these services can become expensive, especially with high usage.
-   **Limited Customization and Control:** Users may face restrictions in
    customizing the system to meet specific needs.
-   **Dependency on Third-party Providers:** Relying on external providers means
    less control over the infrastructure.
-   **Data Privacy and Security Concerns:** Storing data on third-party servers
    can raise privacy and security issues.

### Self-Hosted Image Generators

**Overview of Self-Hosted Solutions:**

Self-hosted systems are those that you set up and manage on your own
infrastructure. This approach offers more control and flexibility.

**Advantages:**

-   **Full Control Over the System and Customization Options:** Users can tailor
    the system to their specific requirements.
-   **Potentially Lower Long-term Costs:** Once set up, ongoing costs can be
    lower compared to cloud services.
-   **Enhanced Data Privacy and Security:** With data stored locally, there are
    fewer concerns about privacy breaches.
-   **Ability to Optimize and Tailor the System to Specific Needs:** Users can
    tweak the system for optimal performance.

**Disadvantages:**

-   **Requires Significant Technical Expertise and Resources:** Setting up and
    maintaining the system can be complex and resource-intensive.
-   **Maintenance and Updates are the User's Responsibility:** Users need to
    handle all updates and troubleshooting.
-   **Scalability Challenges:** Scaling up the system can be more challenging
    compared to cloud solutions.
-   **Initial Setup Can Be Time-consuming and Complex:** The setup process can be
    lengthy and require significant effort.

## Deploying an Image Generator Model Using ComfyUI

OK because we have cover how to use pre-built system like AWS Titan image
generator in the previous sharing section. For this one I will focus on the
self-hosted system. Using ComfyUI.

### Key Features and Benefits

In the demo you will see how ComfyUI is known for its ease of use and
flexibility, allowing users to tailor the interface to their specific needs. It
provides a seamless experience for deploying and managing AI image generation
models.

## Demo

-   Simple Image generation using Flux Dev model.
-   In-painting with more advanced workflow.
-   Workflow sharing community
