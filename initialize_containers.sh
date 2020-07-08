#!/bin/bash

if !(docker start postgres-vuttr); then
  printf "\nCreating docker postgres image... 🚀\n\n"
  docker run --name postgres-vuttr -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=vuttr -p 5432:5432 -d bitnami/postgresql:latest
  printf "\npostgres-vuttr image created! 🚀\n\n"
fi

if !(adonis migration:run); then
  printf "\nAdonis is not installed 🆘\n\n"
  printf "\nInstalling adonis... 🚀"
  printf "\nPlease enter password for global npm install 🤔\n\n"
  sudo npm i -g @adonisjs/cli
  adonis migration:run
fi

printf "\nSUCCESS! 🎉\n\n"
