+++
title = "How To Structure App study note"
author = ["Chop Tr (chop.ink)"]
description = "How To Structure App study note"
date = 2022-04-24T00:00:00+07:00
tags = ["howto", "structure", "app"]
draft = false
cover = "/ox-hugo/implement-ddd-vernon_20220420_143420.png"
images = "/ox-hugo/implement-ddd-vernon_20220420_143420.png"
+++

## Inspiration and Reference {#inspiration-and-reference}

This talk is heavily inspired by many great other talks and examples about the DDD from over the years that I've study and practice it. There are 3 references that I would like to give credit to are


### Kat Zien talk: GopherCon 2018: Kat Zien - How Do You Structure Your Go Apps {#kat-zien-talk-gophercon-2018-kat-zien-how-do-you-structure-your-go-apps}

<https://www.youtube.com/watch?v=oL6JBUk6tj0>


### Reso Coder - Flutter Firebase &amp; DDD {#reso-coder-flutter-firebase-and-ddd}

<https://resocoder.com/2020/03/09/flutter-firebase-ddd-course-1-domain-driven-design-principles/>


### Domain Driven Design with Typescript {#domain-driven-design-with-typescript}

<https://khalilstemmler.com/articles/domain-driven-design-intro/>


## Git repository {#git-repository}

TODO Insert github link


## Demo app: A website for inputing user's health record {#demo-app-a-website-for-inputing-user-s-health-record}

So first let go through the App that we going to build. This will be the example for us to understand how I implement and the desion I make during my designing process for the architecture of the app.

{{< figure src="/ox-hugo/ddd-demo-1_20220608_112530.png" width="400" >}}

{{< figure src="/ox-hugo/ddd-demo-2_20220608_112616.png" width="400" >}}

{{< figure src="/ox-hugo/ddd-demo-3_20220608_112635.png" width="400" >}}

-   User can login by Line Front End framework (LIFF)

-   User can input weight and bloodpressure

-   User can record an entry by time

-   User can list records

-   User can save data into Local Storage or Database


## Questions {#questions}

To start up I would like to lay out some questions that everyone would have when first starting a code base (taken from the Kat Zien talks) that we will have some minute to think about them at the end of this talk.

-   Should I put everything in the main package?

-   Should I start with one package and extract other packages over time?

-   How do I decide if something should be in its own package?

-   Should I just use a framework?

-   What's the programming paradigm should I follow?

-   Microservices or Monolith?

-   How much should be shared between packages?


## Good Structure Goals {#good-structure-goals}

So what is a good structure. We need to define some goals to make our decisions during the design process.

-   Consistent
    How many time you visit a code-base and see the code is done in one way and then in another way. Code consistency will help greatly when you revisit or need to implement new feature. Without hesistation of how or where you put your code.

-   Easy to understand, navigate and reason about ("make sense")
    Something you just get it when reading through the code. Everything is has its own place. There is no ambiguous element.

-   Easy to change, loosely-coupled
    When you need to change something. You do it with the safety of not effecting other parts of the program. The code should be have their boundery very well defined.

-   Easy to test
    By isolation (ie. loosely-coupled) testing become easy and a pleasant to write. No need to heavily mock everything for small test.

-   "As simple as possible, but no simpler." - Albert Einstein
    This is a great goal to have when designing the code base architecture and a great philosophy idea to think about. We should approach thing at its simplicity.

-   Design reflects exactly how the software works

-   Structure reflects the design exactly

    The last two points would be very well explain in Kat Zien talk and I really love her insights about the feeling I want when I code in a well designed code base.

> Good code structure will make your life easier as a programer.
>
> Should make coding a pleasure because you know where everything should go and where everything is.


### Holy Grail {#holy-grail}

How the software works

☝

Design

☝

Structure

{{< figure src="/ox-hugo/holy-grail_20220424_214545.png" width="300" >}}

I present to you the Holy Grail of software architecture design. As a software developer learning about architecture design, this has blown my mind away. The idea of really closely follow the design with the stucture of your software as the basic.

I took this to heart everytime I write some piece of code. The code should very well show the intention of the programmer. It would reflect on everything even how to name your variable, how you compose your functions and how you pass the results around.

The code should work for you not the other way around.


## Domain-Driven Design {#domain-driven-design}

Now let me introduce the work of Mr Eric Evan and a great book on this topic by Mr Vaughn Vernon - Implement Domain-Driven Design.

Popularized by Vaughn Vernon - Implement Domain-Driven Design. Foreword by Eric Evans.

{{< figure src="/ox-hugo/implement-ddd-vernon_20220420_143420.png" width="300" >}}


### The idea {#the-idea}

-   Establish your domain and business logic

-   Define your bounded context(s), the models within each context and the ubiquitous language

-   Categorizing the building blocks of your system:
    -   Value Object
    -   Entity
    -   Domain Event
    -   Aggregate
    -   Service
    -   Repository
    -   Factory

Actually we don't need all of these in every projects and I will first explore the 2 basic concept of `Entities` and `Value Object` in the example project.


### Bounded Context {#bounded-context}

Before explaining about the Entities and VOs. We need to briefly defind the Context of our example app.


#### Example Context {#example-context}

-   `Context`: A web application for making health records

-   `Language`: record me, input records, weight, lower/upper bloodpressure ...

-   `Value Objects`: TimestampId, Weight, Bloodpressure, ...

-   `Entities`: InputRecord, ...

-   `Repository`: InputRecord repository

-   `Service/ Application`: Order adding, Account adding, Order listing, Account listing

-   `Domain Event`: Order added, Account added, Order already exists, Account not found, ...


### Entities and Value Objects {#entities-and-value-objects}

DDD can be divided into Strategic and Tactical Design where the Tactical Design is about the building blocks of DDD. The basic building blocks of DDD are Entities and Value Objects (VOs) besides Services and Domain Events.

{{< figure src="/ox-hugo/entities-valueobjects_20220501_130750.png" width="650" >}}


#### Entities {#entities}

This is how `Entities` are introduced in the DDD book by Eric Evans:

> Many objects are not fundamentally defined by their attributes, but rather by a thread of continuity and identity.

This sentence already introduces the main characteristics of an Entity: continuity (also often referred to as having a lifecycle) and identity.

> An object primarily defined by its identity is called an Entity.

When you think of an `Entity`, imagine something that needs to be tracked over time and whose attributes are likely to change over time. In order to be able to keep track of something you need a way of identifying the object and answer the question "Is this the same object?" after time has passed. A very strong indicator for something being an Entity is something like a status attribute (like `pending`, `active`, or `inactive`) or attribute prefixes like `current` or `last`.

To implement an `Entity` we need to create an abstract class which hold it's properties types and ID types. Properties type would defined the values this entity contain and the ID type will defined the which type the ID is, may be it's a `positive` number, a `uuid` string, or a `timestamp` number or `datetime` string.

```typescript
export abstract class Entity<Props, ID extends ValueObject<any>> {
  constructor(protected props: Props, protected _id: ID) {}

  public equals(object?: Entity<Props, ID>): boolean {
    return (
      !isUndefined(object) &&
      !isNull(object) &&
      isEntity(object) &&
      Boolean(this._id?.equals(object._id))
    )
  }
}
```

The point to pay attention to Entity is how to compare the 2 Entity Objects. They are compared by their `IDs`.

`UserProfile` Entity is then implemented with identity `UserId` . And 2 properties: `DisplayNameValue` and `UrlValue`, each will hold the value of, you guessed it, the name and the url of user profile.

```typescript
interface UserProfileProps {
  displayName: DisplayNameValue
  pictureUrl: UrlValue
}

export class UserProfile extends Entity<UserProfileProps, UserId> {
  constructor(props: UserProfileProps, _id: UserId) {
    super(props, _id)
  }

  get userId() {
    return this._id
  }

  get displayName() {
    return this.props.displayName
  }

  get pictureUrl() {
    return this.props.pictureUrl
  }
}
```


#### Value Objects {#value-objects}

Many objects have no conceptual identity. These objects describe some characteristics of a thing.

`Value Objects` do not have an identity. They are defined by their value instead of an identifier. You can think of Value Objects as a complex value of an Entity.

> An object that represents a descriptive aspect of the domain with no conceptual identity is called a `Value Object`. Value Objects are instantiated to represent elements of the design that we care about only for `what` they are, not `who or which` they are.

The value object base class can be implemented like so

```typescript
export abstract class ValueObject<T> {
  protected abstract readonly name: string
  protected abstract readonly schema: ZodSchema<T> | ZodEffects<ZodAny, T, any>
  private _value?: Either<ValueFailure, T>

  constructor(private _input: T) {}

  protected parse() {
    const _parsed = this.schema.safeParse(this._input)
    this._value = _parsed.success
      ? right(_parsed.data)
      : left(
          new ValueFailure(
            this._input,
            _parsed.error.issues.map(e => {
              return {
                path: e.path.join('-'),
                code: e.code,
                message: e.message,
              }
            })
          )
        )
    return this
  }

  get val() {
    if (!this._value) {
      throw new NotParsedError()
    }
    return this._value
  }

  get isLeft() {
    return isLeft(this.val)
  }

  get isRight() {
    return isRight(this.val)
  }

  get input() {
    return this._input
  }

  getOrCrash() {
    return pipe(
      this.val,
      fold(v => {
        throw v
      }, identity)
    )
  }

  fold<Result>(
    onLeft: (err: ValueFailure) => Result,
    onRight: (v: T) => Result
  ) {
    return pipe(this.val, fold(onLeft, onRight))
  }

  equals(vo?: ValueObject<T>): boolean {
    return (
      !isUndefined(vo) &&
      !isNull(vo) &&
      this.isRight &&
      vo.isRight &&
      isEqual(this.getOrCrash(), vo.getOrCrash())
    )
  }

  clone() {
    return cloneDeep(this)
  }

  toString(): string {
    return `${this.name}(${JSON.stringify(this._value, null, 2)})`
  }
}
```

I use Zod here as a validator tool for the VOs. But you can use any other tools like `Yup` or `io-ts`. with any tool, the object should be `parsed` immediately when it is initialized.

This will handle validate the value holded inside and the error if there is. The perfect usecase for `Either` type. Which simply just means either a value or error.

Then I have the ultility functions for identify the values `isLeft`, `isRight` or to "`fold`" by either case.

With the base class we can implement the 2 example VOs

```typescript
export class DisplayNameValue extends ValueObject<string> {
  protected name = 'DisplayName'
  protected schema = z.string().max(DisplayNameValue.MAX_LENGTH())

  constructor(_input: string) {
    super(_input)
    this.parse()
  }

  static MAX_LENGTH() {
    return 30
  }
}
```

```typescript
const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/

export class UrlValue extends ValueObject<string> {
  protected name = 'TimebasedId'
  protected schema = z.string().regex(urlRegex)

  constructor(_input: string) {
    super(_input)
    this.parse()
  }
}
```

Demo the app with usage of `getOrCrash` and `fold`. One can easily implement the front end to handle properly when the value also hold its fail state.


### Why should we care about the Entity and ValueObject {#why-should-we-care-about-the-entity-and-valueobject}

Because they are the things that get passed arround in our program. By taking care of it we ensure we have the correct value everywhere during it's lifetime.

We often does not taking the seriousness of handling these values inside the software. But when you imagine the program is like a factory and worker are at every stage in the conveyor belt working with data. If the data is carefully prepare in every step the less mistake can be occur down the line.

How many time you got passed a object with a string or number that supposed to be Date. Do you wish it to be a already converted to Date object in the upstream.

{{< figure src="/ox-hugo/charlie-chaplin-factory_20220608_172218.png" width="400" >}}


## Hexagonal Architecture {#hexagonal-architecture}

> Ports and Adapter

{{< figure src="/ox-hugo/hexagonal-architecture_20220420_153150.png" width="720" >}}

`Dependencies only point inwards`


### Layers {#layers}

{{< figure src="/ox-hugo/ddd-layers_20220503_145857.jpg" width="750" >}}


#### Domain {#domain}


#### Infrastructure {#infrastructure}


#### Application {#application}


#### Presentation {#presentation}


## Structure Demo app {#structure-demo-app}


### Layers: {#layers}


#### Domain {#domain}

-   Value Objects: Price, Quote, Base, ...

-   Entities: Order, Comment, ...

-   Aggregate: OrderComment, ...


#### Infrastructure {#infrastructure}

-   Http

-   LocalStorage


#### Repository {#repository}

-   Account

-   Order


#### Application {#application}

-   OrderAdd: orderAdding, orderAdded, orderAddError, ...

-   OrderList: orderListing, orderListed, orderListError, ...

-   CommentAdd: commentAdding, commentAdded, commentAddError, ...

-   CommentList: commentListing, commentListed, commentListError, ...


### <span class="org-todo todo TODO">TODO</span> Code the app {#code-the-app}

Video: &lt;link&gt;


## Naming {#naming}

-   Choose package names that suggest well what can be expected inside
    -   Communicate what the provide, as opposed to what they contain

-   Avoid generic names like `util`, `common`, etc.

-   Follow the usual conventions

-   Avoid stutter (eg: `strings.Reader` not `strings.StringReader`)


## Conclusion {#conclusion}

-   No single right answer

-   "Be like water"

-   "As simple as possible, but no simpler"

-   Maintain consistency

-   Experiment!

-   Share your ideas

{{< figure src="/ox-hugo/albert-einstein_20220420_160854.png" width="450" >}}

> Go for the simplicity of today. Don't code for the future.


## Read more {#read-more}

A good read about the pitfall when developer apply their knowledge
<https://andela.com/insights/simplify-code-programming-systems/>
