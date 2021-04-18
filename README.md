## gatsby-mui-netlifycms-template

this project was created using a gatsby starter, to generate a project with the same starter use:

```sh
$> gatsby new myproject https://github.com/fes300/gatsby-mui-netlifycms-template.git
```

## setup

- init git: `git init` (N.B. it is important to do this before the deps install so that husky can write its custom hooks)
- install deps: `yarn`
- rename your project: `make rename name=$(YOUR_WEBSITE_NAME)`

## start project

- start you local git repo (for local netlify admin): `npx netlify-cms-proxy-server`
- start project: `yarn start`

### N.B.

`yarn start` triggers the command `netlify dev` that does a lot of things (like injecting the dev env set in netlify backoffice into your local runtime, simulating locally your lambda functions and more)

## start project with docker

- make sure you have docker and docker-compose installed
- run `make start` from the project root
- access your local enwironment at `${YOUR_WEBSITE_NAME}.lvh.me` (`${YOUR_WEBSITE_NAME}.lvh.me/admin` for the cms backoffice)

### N.B.

at the moment starting the project with docker only runs `yarn develp` triggers the command `gatsby develop`, which means that some things will not be mocked (especially your lambda functions).

## Conventions & processes

- [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [trunk based development](https://trunkbaseddevelopment.com/)

## TODO

### add custom fonts

### add google fonts

### modify cms
