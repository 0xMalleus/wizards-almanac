# The Wizards' Almanac

## Description

The Wizards' Almanac is an API for [Forgotten Runes](https://www.forgottenrunes.com/).

## Motivation

Inspired by [PokéAPI](https://pokeapi.co/), The Wizards' Almanac aims to make creating for the Runiverse easier by providing a simple, easy to use API.

Web3 right now requires a lot of technical sophistication to build even simple web apps and we can unlock the passion and skills of the community by abstracting that complexity and lowering the barrier to create.

## Roadmap

This is very much a work in progress and things might get cut based on feedback/community asks.

Using the following labels to indicate status:

- <span style="color:#f87171;background-color:#fecaca;padding:0.125rem 0.25rem; border-radius:0.25rem">Didn't start</span>
- <span style="color:#fb923c;background-color:#fed7aa;padding:0.125rem 0.25rem; border-radius:0.25rem">Figuring it out</span>
- <span style="color:#8b4cf6;background-color:#ddd6fe;padding:0.125rem 0.25rem; border-radius:0.25rem">There's a plan</span>
- <span style="color:#4f46e5;background-color:#c7d2fe;padding:0.125rem 0.25rem; border-radius:0.25rem">Making it happen</span>
- <span style="color:#059669;background-color:#a7f3d0;padding:0.125rem 0.25rem; border-radius:0.25rem">Polishing</span>

Planned features for v1.0.0:

- <span style="color:#4f46e5;background-color:#c7d2fe;padding:0.125rem 0.25rem; border-radius:0.25rem"> Wizards</span>
- <span style="color:#8b4cf6;background-color:#ddd6fe;padding:0.125rem 0.25rem; border-radius:0.25rem">Souls</span>
- <span style="color:#8b4cf6;background-color:#ddd6fe;padding:0.125rem 0.25rem; border-radius:0.25rem">Ponies</span>
- <span style="color:#fb923c;background-color:#fed7aa;padding:0.125rem 0.25rem; border-radius:0.25rem">Owner Endpoint (`/owner/:address`)</span>

Reach goals for v1.0.0:

- <span style="color:#fb923c;background-color:#fed7aa;padding:0.125rem 0.25rem; border-radius:0.25rem">Affinity Data</span>
- <span style="color:#fb923c;background-color:#fed7aa;padding:0.125rem 0.25rem; border-radius:0.25rem">Images for Wizard traits (props, heads, etc.)</span>
- <span style="color:#fb923c;background-color:#fed7aa;padding:0.125rem 0.25rem; border-radius:0.25rem"> Images for Souls traits (props, heads, etc.)</span>
- <span style="color:#fb923c;background-color:#fed7aa;padding:0.125rem 0.25rem; border-radius:0.25rem"> Traits endpoints (ex. `/wizards/backgrounds`)</span>

Beyond v1.0.0:

- <span style="color:#f87171;background-color:#fecaca;padding:0.125rem 0.25rem; border-radius:0.25rem">GraphQL</span>
- <span style="color:#f87171;background-color:#fecaca;padding:0.125rem 0.25rem; border-radius:0.25rem">Full Text Search</span>
- <span style="color:#f87171;background-color:#fecaca;padding:0.125rem 0.25rem; border-radius:0.25rem">Lore API</span>

## FAQ

### Is this the official API?

This is a FRWC community project. There is an API for the Forgotten Runes the site ([example](https://portal.forgottenrunes.com/api/souls/img/100)) but that's meant for internal use by the team and isn't built for community consumption currently.

### I have a great idea for a feature! Where do I add a suggestion?

Feel free to [create an issue](https://github.com/0xMalleus/wizards-almanac/issues) on GitHub! Suggestions welcome!

### You're doing something wrong! Where do I report a bug or problem with your design?

Same as above! Create an issue or shoot me a message on FRWC Discord.

### Isn't this some heavy duty tech for a simple API?

Honestly it would have been much easier and way faster to do the current functionality with something like [JSON Server](https://github.com/typicode/json-server), however this is still very early stage.

In order to support features like ownership data and GraphQL, we'll need to have something more robust.

### Why did you use X, Y, Z coding pattern?

I'm using this as a learning opportunity to try new patterns, none of them are an explicit endorsement and most of them will likely changes to accommodate future functionality.

## Tech Stack

[Nest](https://github.com/nestjs/nest) framework.
[Prisma](https://www.prisma.io/) database.

## Contributing

### Help is welcome

The Runiverse is a big place and there's lots of things that can be added and improved.

Feel free to contribute either code, knowledge, or suggestions. Issues tagged with [help wanted](https://github.com/0xMalleus/wizards-almanac/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) often need knowledge as much as coding help.

If you have questions about the technology feel free to open an Issue or send a DM.

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

Tests are currently sporatic and mainly to assist with development.

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Making Commits

This repo uses `commitizen` for commit message conventions.

When you're ready to commit, run `npx cz` to generate a commit message.

## Brought to you by

- [Headmaster Aleister](https://www.forgottenrunes.com/lore/wizards/2633/0) aka [Malleus](https://twitter.com/0xMalleus)

## License

The Wizard's Almanac is [MIT licensed](LICENSE).
