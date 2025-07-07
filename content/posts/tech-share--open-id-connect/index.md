+++
title = "Tech Share: Open ID connect"
author = ["Chop Tr (chop.dev)"]
summary = "lalala"
date = 2025-07-06T00:00:00+07:00
tags = ["oidc", "open-id-connect", "authentication", "tech-share"]
draft = false
+++

## Slides

[Slides](/slides/tech-share--open-id-connect/)

## Introduction

Hello everyone! Today, we're going to checkout OpenID Connect.

But before we get into that, let's start by thinking about a simple user login
flow. Imagine you have a website where users log in by entering their username
and password. The website then queries a database to verify this information
and grant access to the user. This is a straightforward and traditional way of
handling user authentication.

However, as web applications have grown more complex, there has been a shift
towards allowing users to log in using third-party services.

Why you think we need third-party Authentication? Why do we need a method that
the resource provider can authenticate the user without rely on the
Authentication Provider? I will leave you thinking about it and at the end
hopefully we will have the full picture of the answer.

## Understanding OAuth 2.0

To understand OpenID Connect, first I would like to talk about OAuth 2.0.

OAuth allows users to grant access to their information stored with a third
party, like Google or Facebook, without sharing their credentials with the
requesting service. Enables a application to obtain limited access to a user's
resources. It does this through a series of interactions between the client,
the resource owner, and the authorization server.

### OAuth Flow

The OAuth 2.0 flow is a critical component of understanding how third-party
authentication and authorization work. Here's a simplified breakdown of the
typical OAuth 2.0 flow:

1. **Authorization Request**: The process begins when a user tries to access a
   resource or service that requires authentication. The application (referred
   to as the "client") redirects the user to an authorization server (like Google
   or Facebook) with an authorization request. This request includes information
   such as the client ID, the scope of access, and a redirect URI.

2. **User Authentication**: The authorization server then prompts the user to
   authenticate themselves. This usually involves logging in with their
   credentials on the authorization server's platform, perform 2FA, etc.

3. **Authorization Grant**: Once the user is authenticated, the authorization
   server asks the user to grant or deny permission for the requested access.
   If the user consents, an authorization grant is issued. This grant is typically
   in the form of an authorization code.

4. **Access Token Request**: The client then sends a request to the
   authorization server to exchange the authorization code for an access token.
   This request includes the client ID, client secret, the authorization code, and
   the redirect URI.

5. **Access Token Response**: If the authorization server validates the
   request, it issues an access token to the client. This token represents the
   user's authorization to access specific resources.

6. **Access Resource**: The client uses the access token to request resources
   from the resource server. The resource server validates the token and, if
   valid, provides access to the requested resources.

7. **Refresh Token (Optional)**: In some cases, the authorization server may
   also issue a refresh token alongside the access token. This refresh token
   can be used to obtain a new access token once the original one expires, without
   requiring the user to re-authenticate.

OAuth 2.0 defines several flows to accommodate different scenarios. Two of the
most common flows are:

1. **Backchannel Flow**: Also known as the Authorization Code Flow, this is
   used for server-side applications where an authorization code is first
   returned and then exchanged for an access token.
2. **Implicit Flow**: This is typically used for client-side applications where
   the access token is returned directly to the client without an intermediate
   authorization code.

### Demo OAuth flow

Do you all go to watch movies in the cinema, right? I would like to conduct a
thought experiment involving cinema, as it is something everyone should be
familiar with.

Imagine a cinema, how would you design the ticket and checking in system?

Let's use the cinema analogy to illustrate the OAuth 2.0 flow. This analogy
will help make the complex process more relatable and easier to understand.
Here's how you might design a ticket and checking system for a cinema,
paralleling the OAuth 2.0 flow:

| OAuth 2.0 Role       | Cinema Analogy           |
| -------------------- | ------------------------ |
| Resource Owner       | Moviegoer / Customer     |
| Authorization Server | Ticket Counter           |
| Client               | Theater Entrance Staff   |
| Resource Server      | Cinema Theatre           |
| Access Token         | Movie Ticket             |
| Refresh Token        | Re-entry Pass/Hand Stamp |
| Protected Resource   | Movie                    |

1. **Authorization Request**: The moviegoer (resource owner) decides to watch a
   movie (access a resource). They approach the ticket counter (authorization
   server) and request a ticket (authorization request) for a specific movie. The
   request includes details such as the movie they want to watch, the time, and
   their identification (client ID).

2. **User Authentication**: The ticket counter (authorization server) asks the
   moviegoer to present their ID or membership card (user authentication). This
   ensures the person is eligible to buy a ticket.

3. **Authorization Grant**: Once the moviegoer's identity is verified, the
   ticket counter asks if they agree to watch the movie at the specified time
   and theater (grant permission). If the moviegoer agrees, they receive a ticket
   (authorization grant), which is akin to an authorization code in OAuth.

4. **Access Token Request**: The moviegoer takes the ticket to the theater
   entrance staff (client) and presents it as proof of purchase (access token
   request). The theater entrance staff checks the ticket to ensure it's valid and
   matches the movie and time (client ID, client secret, authorization code, and
   redirect URI).

5. **Access Token Response**: If everything checks out, the theater entrance
   staff allows the moviegoer to enter the cinema (access token response),
   granting them access to watch the movie.

6. **Access Resource**: Once inside, the moviegoer can enjoy the movie (access
   resource) in the cinema theater (resource server).

7. **Refresh Token (Optional)**: If the moviegoer needs to leave the theater
   temporarily (e.g., to use the restroom), they might receive a hand stamp or
   re-entry pass (refresh token). This allows them to re-enter the theater without
   buying a new ticket (re-authenticating).

Another flow that I would like to mention here is the backchannel
communication. The Cinema Entrance serves as a backchannel, meaning that the
staff at the entrance must have a prior agreement with the ticket counter on
how to check the authenticity of the ticket to ensure that it is valid and
issued by the ticket counter. In the OAuth 2.0 flow, this is settled by the
client ID and client secret.

{{< mermaid >}}
sequenceDiagram
participant Moviegoer as Moviegoer (Resource Owner)
participant TicketCounter as Ticket Counter (Authorization Server)
participant EntranceStaff as Theater Entrance Staff (Client)
participant CinemaTheatre as Cinema Theatre (Resource Server)

    Moviegoer->>TicketCounter: Request ticket for movie (Authorization Request)
    TicketCounter->>Moviegoer: Request ID/membership (User Authentication)
    Moviegoer->>TicketCounter: Provide ID/membership
    TicketCounter->>Moviegoer: Issue ticket (Authorization Grant)
    Moviegoer->>EntranceStaff: Present ticket (Access Token Request)
    EntranceStaff->>TicketCounter: Validate ticket (Backchannel: Client ID/Secret)
    TicketCounter->>EntranceStaff: Confirm ticket validity
    EntranceStaff->>Moviegoer: Allow entry (Access Token Response)
    Moviegoer->>CinemaTheatre: Watch movie (Access Resource)
    Note over Moviegoer,EntranceStaff: (Optional) Moviegoer leaves temporarily
    EntranceStaff->>Moviegoer: Issue re-entry pass/hand stamp (Refresh Token)
    Moviegoer->>EntranceStaff: Present re-entry pass to re-enter

{{< /mermaid >}}

## Introduction to OpenID Connect

OpenID Connect builds on top of OAuth 2.0 to provide a standardized way of
handling authentication. While OAuth 2.0 is primarily focused on authorization
(granting access to resources), OpenID Connect adds an identity layer on top of
it, allowing clients to verify the identity of the end-user based on the
authentication performed by an authorization server.

> A fun fact about OAuth 2.0 is that it was not designed with Authentication focus.
> It mainly about delegated Authorization.

In our cinema analogy, the ticket that the user purchases does not contain any
information about the user. It is simply a piece of paper that allows the user
to access a movie (the resource). While this may be sufficient for the cinema
scenario, it may not be adequate for more complex situations where verifying
the user's identity is necessary, such as at a tech conference or in a
corporate environment.

That is when OpenID Connect comes in. OpenID Connect provides a standardized
way to include user identity information in the authentication process. This is
achieved by introducing an ID token, which is a JSON Web Token (JWT) that
contains claims about the user, such as their unique identifier, name, email,
and other profile information.

Again, in relation to the ticket system, think of the ID token, instead of
thinking of it as a ticket, it is more like an employee badge or a membership
card.

### Key Features of OpenID Connect

1. **Identity Tokens**: OpenID Connect introduces the concept of an ID token,
   which contains information about the user, such as their unique identifier,
   name, and email address. This token is encoded as a JSON Web Token (JWT).

2. **UserInfo Endpoint**: OpenID Connect provides a UserInfo endpoint that
   allows clients to retrieve additional information about the user, such as
   profile details, after they have authenticated.

3. **Standardized Scopes**: OpenID Connect defines standard scopes like
   `openid`, `profile`, `email`, etc., which specify the level of access and
   information the client is requesting.

4. **Discovery and Dynamic Registration**: OpenID Connect supports discovery,
   allowing clients to dynamically discover information about the OpenID
   Provider (OP), such as its endpoints and supported features. It also supports
   dynamic client registration, enabling clients to register with the OP at
   runtime.

5. **Session Management**: OpenID Connect provides mechanisms for managing user
   sessions, allowing clients to detect when a user logs out or when their
   session expires.

### JSON Web Token (JWT)

A quick overview of JSON Web Token (JWT)

JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be
transferred between two parties. The claims in a JWT are encoded as a JSON
object that is used as the payload of a JSON Web Signature (JWS) structure or
as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims
to be digitally signed or integrity protected with a Message Authentication
Code (MAC) and/or encrypted.

#### Structure of a JWT

A JWT is composed of three parts, separated by dots (.):

1.  **Header**: The header typically consists of two parts: the type of the
    token, which is JWT, and the signing algorithm being used, such as HMAC
    SHA256 or RSA.

        Example:

        json { "alg": "HS256", "typ": "JWT" }

2.  **Payload**: The payload contains the claims. Claims are statements about an
    entity (typically, the user) and additional data. There are three types of
    claims: registered, public, and private claims.

        Example:

        json { "sub": "1234567890", "name": "John Doe", "admin": true }

3.  **Signature**: To create the signature part, you have to take the encoded
    header, the encoded payload, a secret, the algorithm specified in the
    header, and sign that.

        Example:

        HMACSHA256( base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

#### How JWT Works

1. **Creation**: A JWT is created by the server after a user successfully logs
   in. The server creates the JWT and sends it to the user.

2. **Storage**: The client stores the JWT, usually in local storage or a secure
   cookie.

3. **Usage**: On subsequent requests, the client sends the JWT, typically in
   the Authorization header using the Bearer schema.

4. **Verification**: The server verifies the JWT's signature and checks the
   claims to determine the user's identity and access rights.

#### Benefits of JWT

- **Compact**: JWTs are compact and can be easily sent through a URL, POST
  parameter, or inside an HTTP header.

- **Self-contained**: The payload contains all the information needed about the
  user, reducing the need for repeated database lookups.

- **Secure**: JWTs can be signed and optionally encrypted to ensure the
  integrity and confidentiality of the claims.

JWTs are a key component of OpenID Connect, as they are used to represent the
ID token that contains the user's identity information. This allows clients to
securely verify the identity of the user and access their profile data.

## Conclusion

OK that was my brief overview of OAuth 2.0 and OpenID Connect. I hope now you
can think of the question I had in the beginning of the talk.

> Why do you think we need third-party authentication?

It offers numerous benefits for developers. There are several advantages to
using OAuth 2.0 and OIDC for developers:

- **Separation of Concerns**: By separating the service server from the
  authentication server, developers can focus on building their application while
  relying on an Identity Provider to handle authentication securely.

- **Ease of Implementation**: OAuth 2.0 and OIDC provide standardized protocols
  that are widely supported by many Identity Providers, making it easier for
  developers to implement and integrate authentication and authorization into
  their applications.

- **Standardization**: Using a standardized protocol ensures compatibility and
  interoperability with various services and platforms, reducing the complexity
  and potential security risks associated with custom authentication solutions.

> Why do we need a method that the resource provider can authenticate the user
> without rely on the Authentication Provider?

It a cleaver way to use cryptography to reduce the load on the authentication server.

1. **Reduced Load on Authentication Servers**: By allowing resource servers to
   authenticate users independently, you can reduce the load on the central
   authentication server. This is especially useful in systems with high traffic,
   where the authentication server might become a bottleneck.

2. **Improved Performance**: Direct authentication between the user and the
   resource provider can reduce latency, as it eliminates the need for
   back-and-forth communication with the authentication server for each request.

3. **Resilience and Availability**: If the authentication server experiences
   downtime or connectivity issues, having a mechanism for resource providers
   to authenticate users independently can help maintain service availability.

### Reference resource

Small segment highlighting my development journey. I am the creator of
[firebase-auth](https://crates.io/crates/firebase-auth), a widely used library
in the Rust ecosystem for authenticating users through the Firebase
Authentication service. It functions as a plugin for two of the most popular
web frameworks in the Rust ecosystem, Actix and Axum.

You can visit the link to learn more about the library and its capabilities.
