+++
title = "Tech Share: Using MediaPipe in Web Applications"
author = ["Chop Tr (chop.dev)", "dummy@example.com"]
summary = "A tech sharing session in LINE Corporation for Front-End Team"
date = 2024-09-22T00:00:00+07:00
tags = ["media pipe", "tech share"]
draft = false
+++

## Slides

[Slides](/slides/tech-share--media-pipe/)

## Introduction (2 minutes)

**Welcome and Speaker Introduction**

---

"Hello everyone, and welcome to today's tech sharing session. My name is Quang, and I'm a front-end developer at LINE Corporation. I've been working with web applications for over five years now, and recently, I've been exploring some exciting new technologies. One of these is MediaPipe, a cross-platform framework for building multimodal machine learning pipelines.

I had the chance to dive into MediaPipe during a recent hackathon in Japan, and it was an incredible experience. Today, I'm excited to share some of what I've learned with you."

**Session Overview**

---

"In this session, we're going to focus on how you can apply MediaPipe in your web applications. We'll discuss some of the practical uses of MediaPipe, why it's a great tool for front-end developers, and how it can add value to your projects.

While we won't go into the nitty-gritty details of how MediaPipe works or the specific code for implementation, we will cover enough to get you inspired and ready to explore MediaPipe on your own.

So, let's get started!"

## Why MediaPipe? (3 minutes)

**Brief Explanation**

---

"First, let's talk about what MediaPipe is. MediaPipe is a cross-platform framework developed by Google for building multimodal machine learning pipelines. It allows you to process and analyze different types of data like video, audio, and sensor data in real-time."

**Key Features**

---

"Now, why should you consider using MediaPipe in your web applications? Here are a few key features that make it stand out:"

-   **Efficiency**

    -   "MediaPipe is optimized for real-time performance. It offers low latency, hardware acceleration, and efficient resource management. This makes it ideal for applications that require immediate feedback, such as real-time video processing or interactive web apps."

-   **Flexibility**

    -   "One of the great things about MediaPipe is its modular design. This allows you to easily customize and build on top of existing components. You can create custom calculators and modify data processing pipelines to fit your specific needs."

-   **Portability**

    -   "MediaPipe is incredibly versatile when it comes to platform compatibility. It works seamlessly across Android, iOS, web, and desktop environments. This means you can build a solution once and deploy it across multiple platforms with minimal changes."

-   **Community and Support**
    -   "Lastly, MediaPipe is backed by Google, which means you have access to extensive documentation, an active community, and regular updates. This ensures robust support and continuous improvement, making it easier for you to find solutions and stay up-to-date with the latest advancements."

## Why Use MediaPipe in Web Applications? (3 minutes)

**Speaker:**

"Now, let's talk specifically about why you might want to use MediaPipe in your web applications.

**Advantages for Front-End Developers:**

1. **Simplifies Integration of Complex ML Models:** MediaPipe abstracts away many of the complexities involved in integrating machine learning models. This allows you to focus on building the user interface and user experience without getting bogged down by the intricacies of ML.

2. **Enhances User Experience with Real-Time Processing:** With its real-time processing capabilities, MediaPipe can significantly enhance user experiences. Imagine applications that can process video or sensor data in real-time, providing immediate feedback or interaction.

3. **Supports a Variety of Media Inputs:** Whether you're dealing with video, audio, or sensor data, MediaPipe has you covered. This makes it incredibly versatile for various types of web applications.

**Common Use Cases:**

1. **Real-Time Face and Hand Tracking:** You can use MediaPipe for real-time face and hand tracking. This can be particularly useful for applications in virtual meetings, gaming, or even virtual try-ons in e-commerce.

2. **Gesture Recognition:** MediaPipe can recognize gestures, allowing for more interactive and intuitive user interfaces. This is great for applications in education, entertainment, and more.

3. **Augmented Reality Effects:** With its real-time processing capabilities, MediaPipe can be used to create impressive augmented reality effects. This can be a game-changer for marketing, social media, and other creative applications.

So, to sum it up, MediaPipe offers a powerful, flexible, and efficient way to integrate advanced machine learning capabilities into your web applications. It's a tool that can help you deliver more engaging and interactive experiences for your users."

## Setting Up MediaPipe for Web (5 minutes)

#### Installation Steps

**Speaker:**

Alright, let's dive into setting up MediaPipe for your web applications. First, we'll cover the installation steps.

1. **Installing MediaPipe via npm:**
   To get started, you'll need to install the MediaPipe package via npm. Open your terminal and run the following command:

    ```bash
    npm install @mediapipe/tasks-vision
    ```

    This will download the necessary libraries to your project.

2. **Importing MediaPipe modules in your project:**
   If you prefer using a CDN, you can include MediaPipe directly in your HTML file. Add this script tag within the `<head>` section of your HTML file:
    ```html
    <head>
        <script
            src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"
            crossorigin="anonymous"
        ></script>
    </head>
    ```
    This approach is useful if you want to quickly prototype without setting up a full build environment.

#### Basic Project Setup

**Speaker:**

Next, let's set up a basic project structure.

1. **Creating a simple HTML page:**
   Create an `index.html` file in your project directory. This will be the main page where we'll implement our MediaPipe functionality.

2. **Linking MediaPipe and other necessary libraries:**
   Ensure your HTML file includes the MediaPipe script tag we discussed earlier. Additionally, you might want to include a simple structure for displaying video input and results. Here’s a basic example:
    ```html
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>MediaPipe Gesture Recognition</title>
            <script
                src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"
                crossorigin="anonymous"
            ></script>
        </head>
        <body>
            <h1>Hand Gesture Recognition Demo</h1>
            <video id="webcam" autoplay></video>
            <canvas id="outputCanvas"></canvas>
            <script src="app.js"></script>
        </body>
    </html>
    ```

## Example Use Case: Hand Gesture Recognition (5 minutes)

#### Overview of the Example

**Speaker:**

Now, let's look at a practical example. Our goal is to implement real-time hand gesture recognition using MediaPipe. Imagine a scenario where you can use hand gestures to enter a password and open a secret web page.

#### Code Walkthrough

**Speaker:**

Let's walk through the code step by step.

1. **Initializing the MediaPipe Gesture Recognition module:**
   In your `app.js` file, start by initializing the Gesture Recognizer:

    ```javascript
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                'https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task',
        },
        numHands: 2,
    });
    ```

2. **Capturing video input from the webcam:**
   Set up the webcam feed:

    ```javascript
    const videoElement = document.getElementById('webcam');
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        videoElement.srcObject = stream;
    });
    ```

3. **Processing the video stream with MediaPipe:**
   Process each frame from the webcam to detect gestures:

    ```javascript
    videoElement.addEventListener('loadeddata', async () => {
        while (true) {
            await gestureRecognizer.recognize(videoElement);
            requestAnimationFrame(renderResults);
        }
    });
    ```

4. **Displaying the results on the web page:**
   Render the results on a canvas overlay:

    ```javascript
    function renderResults(results) {
        const canvas = document.getElementById('outputCanvas');
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        // Draw landmarks and gestures
        // ...
    }
    ```

5. **Handle the gesture recognition sequence:**
   Implement logic to handle recognized gestures and match them to a predefined password sequence:

    ```javascript
    const passwordSequence = ['gesture1', 'gesture2', 'gesture3'];
    let currentSequence = [];

    function handleGesture(gesture) {
        currentSequence.push(gesture);
        if (currentSequence.length === passwordSequence.length) {
            if (currentSequence.join('') === passwordSequence.join('')) {
                alert('Password correct! Redirecting...');
                window.location.href = 'secret.html';
            } else {
                alert('Password incorrect. Try again.');
            }
            currentSequence = [];
        }
    }
    ```

#### Live Demo

**Speaker:**

Finally, let's see it in action! I'll show you a live demo of the hand gesture recognition example. [Run the demo and demonstrate the gesture recognition process.]
