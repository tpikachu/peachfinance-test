#!/bin/sh

npx knex migrate:latest --knexfile ./src/knexfile.ts
