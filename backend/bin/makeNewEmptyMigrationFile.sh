#!/bin/sh

FILE=`ls -1 ./src/migrations/ | tail -n 1`
NUM=`echo ${FILE:15:4} | awk '{ printf "%04d\n", $1+1 }'`
npx knex migrate:make $NUM -x ts --knexfile ./src/knexfile.ts
