+++
title = "Tech Share: Genius AI Brain"
author = ["Chop Tr (chop.dev)"]
summary = "A tech sharing session in LINE Corporation for Genius AI team about the Brain service."
date = 2024-12-25T00:00:00+07:00
tags = ["ai", "genius ai project", "genius ai brain", "tech share"]
draft = false
+++

## Slides

[Slides](/slides/tech-share--geninus-ai-brain/)

## Structure

The talk will be broken into 3 parts:

- The Brain service
    - Why brain service?
        - Brain is separate from other services, separate of concern
        - Streamline the process of development by focusing on the improvement
          work by collaborating with the domain expert instead of focusing on
          manage users
        - Narrow down the analytics and easy performance tracking
    - What other service should expect from brain service?
        - A stateless (mostly) service
        - User Interface for domain experts
        - AI response quality records
- What are Large Language Models (LLMs)?
    - Introduction
        - Text in - Text out
            - Multimodal can handle Image out, Audio out, Video out
        - Prompting strategy
            - Agent
            - Chain of Thought
            - Tree of Thought
        - Database
            - Vector Database
            - Graph Database
    - Usages for the project
        - Prompting
            - Code Generation
            - Workflow Automation
            - Error checking and Exploration
        - Knowledge Base
            - Manage and Retrieval
            - Question Answering
            - Self auto improve
- Development Plan
    - Stage one: Initial Workflow
        - Domain experts: the QA team
        - Content platform: Landpress Content service
        - Observation tool: Langsmith
    - Stage two: Quality Improvement
        - Framework for Prompting strategies
        - Agent Tools development
    - Stage three: RAG system
        - Knowledge Base using Vector Database or Graph Database

## Introduction

Welcome, everyone. Today, I'm excited to introduce you to the Brain Service of
our project Genius AI.

This talk will be in 3 parts:

- What is Brain Service?
- What are Large Language Model (LLMs) and how to use them?
- Development Plan for the Brain Service

## The Brain Service

**What Brain Service?**

The development of AI platform is a complex and evolving process. Where the
main focus in on the domain expert who knows about the domain and know about
how to improve the interaction with AI or LLMs to improve the quality of the
our service.

Therefore it needs to be develop in a environment that is easy to use by the
experts and easy to maintain with strong support from the AI community. In our
case we will use Python and Langchain to build this system instead of Java like
with our Back End team.

**What Can Other Services Expect from the Brain Service?**

Now, what should other services expect from the Brain Service? Primarily, it is
designed to be a mostly stateless service, which means it efficiently handles
requests without retaining unnecessary data between interactions.

I noted mostly here because I expect to use some method of caching and in
memory optimization to improve the output speed and backup for failure.

Other than that, the Brain Service provides an easy way for domain experts to
interact with the prompts and workflow. This empowers experts to work with the
AI models, offering insights and feedback that drive continuous improvement.

Lastly, the Brain Service records AI response quality, enabling us to track and
analyze performance over time. This feature is crucial for maintaining high
standards and ensuring that our AI consistently meets user expectations.

In summary, the Brain Service is a dedicated platform. It is a part of our
system design focusing on deliver the AI response accurately by focusing on
innovation, collaboration, and performance

## What are Large Language Models (LLMs)?

We will move to the topic of Large Language Models, or LLMs.

As our team are all aware of these models and their capabilities. So today I
will just briefly introduce them. The main focus is on how to use them by
Prompting Strategy and Database integration.

**Introduction to LLMs**

At their core, Large Language Models are AI systems designed to understand and
generate human-like text. They operate on a simple principle: text in, text
out. This means that given a textual input, LLMs can produce coherent and
contextually relevant text as output. However, their capabilities extend beyond
text. Some models are multimodal, meaning they can process and generate not
just text, but also images, audio, and even video.

**Prompting Strategy**

Effective use of LLMs often involves sophisticated prompting strategies. These
strategies guide the model's responses to align with specific tasks or
objectives. Common approaches include:

- **Agents**: Autonomous entities that perform tasks based on prompts.
- **Chain of Thought**: A method where the model is prompted to explain its
  reasoning step-by-step.
- **Tree of Thought**: An approach that explores multiple reasoning paths to
  arrive at a solution.

**Database Integration**

To enhance the functionality of LLMs, they can be integrated with databases.
Two popular types are:

- **Vector Databases**: Ideal for handling high-dimensional data, which is
  crucial for tasks like similarity search and recommendation systems.
- **Graph Databases**: Used for managing and querying complex relationships
  between data points, enhancing the model's contextual understanding.

**Usages for the Project**

Now, let's discuss how LLMs can be applied to our projects:

**Prompting:**

- **Code Generation:** Automate the creation of code snippets, reducing
  development time and errors.
- **Workflow Automation:** Streamline processes by generating sequences of
  actions based on input prompts.
- **Error Checking and Exploration:** Assist in identifying errors and
  exploring potential solutions.

**Knowledge Base:**

- **Manage and Retrieval:** Efficiently organize and retrieve information,
  enhancing data accessibility.
- **Question Answering:** Provide accurate and context-aware responses to user
  queries.
- **Self Auto Improve:** Enable the system to learn and adapt over time,
  improving its performance autonomously.

## Development Plan

Next, we will present the Development Plan for the Brain Service in the Genius
AI project. We will outline the strategic stages we intend to take to maximize
the potential of AI in the QA workflow.

**Stage One: Initial Workflow**

Begins with establishing a robust initial workflow. This stage focuses on
integrating domain expertise and leveraging existing platforms to set a strong
foundation:

- **Domain Experts: The QA Team**: We will collaborate closely with our quality
  assurance team, who will provide invaluable insights and feedback to refine our
  AI services.
- **Content Platform: Landpress Content Service**: By integrating with the
  Landpress Content Service, we ensure that our QA team AI can seamlessly
  interact with and enhance the prompts and workflow withouth the need for
  intervention from the dev team.
- **Observation Tool: Langsmith**: Utilizing Langsmith, we will monitor and
  analyze AI interactions, allowing us to gather essential data for ongoing
  improvements.

**Stage Two: Quality Improvement**

The second stage is dedicated to refining our AI capabilities and enhancing
response quality through targeted strategies:

- **Framework for Prompting Strategies**: We will develop a comprehensive
  framework that defines and optimizes prompting strategies, ensuring that our
  LLMs deliver precise and contextually relevant outputs.
- **Agent Tools Development**: By creating specialized agent tools, we aim to
  automate complex tasks and enhance the efficiency of our AI systems.

**Stage Three: RAG (Retrieval-Augmented Generation) System**

The final stage involves establishing a robust Retrieval-Augmented Generation
(RAG) system to bolster our knowledge management capabilities:

- **Knowledge Base Using Vector or Graph Database**: We will implement a
  sophisticated knowledge base using either vector or graph databases, allowing
  for efficient data storage, retrieval, and contextual understanding. This
  system will empower our AI to provide accurate and insightful responses to user
  queries.
