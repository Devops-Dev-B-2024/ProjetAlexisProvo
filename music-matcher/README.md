# Music Matcher

## The goal

This is an API wrote in TypeScript using an Express.js server and using Deezer API.

Music Matcher is made to discover music that will match your tastes.

You create a profile, and then add a few songs, artists or albums you like. Using your likes, Music Matcher will recommend you new songs, artists and albums, to do this, it will analyze what people that are listening to the same things.

You can like or dislike what Music Matcher recommends you, this will make Music Matcher more precise about your tastes.

## How to run

### First start

Start by choosing a secret for your JWTs, to do this, remove "-example" from the `.env-example` file and replace the value by your secret.

To run the project, you need to run this command to install packages :

```bash
npm install
```

Once this is done, you can run this command to init the SQLite database and populate it :

```bash
npm run start:initdb-populate
```

If you don't want to populate the database, you can just run this command to init the database :

```bash
npm run start:init-db
```

### Next starts

Once the database is initialized, you can run this command on next starts to launch the server :

```bash
npm run start
```
