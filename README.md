# Simple "ping/pong" example using Cordis

This example is very barebones. Normally you would have multiple micro-services doing various things, using Redis to hold any data, creating a necessity for "common" libraries and overall, the need for a monorepo. This repo simply deploys a single worker bot that only processes `MESSAGE_CREATE` packets.

NOTE: This layout will work even for single-sharded bots, the single worker here processing all the `MESSAGE_CREATE` packets from all shards.
___

### Requirements

- [pnpm](https://pnpm.js.org/)
- [docker](https://docker.com/)
___

### Usage

To get started, simply create an `.env` file and fill it out using the `.env.example` file as reference.

`docker-compose build` will build everything needed.

`docker-compose up -d` will start up the whole app.

### License

This repository is licensed under a modified version of the MIT license, allowing you to do whatever you want with the source code here without the need to provide credit/the original LICENSE file.
