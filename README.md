# frontend-challenge-api

Welcome to the coding challenge for frontend candidates at Peach Finance! This codebase contains a backend API server and the boilerplate for a frontend React app, both of which you will run locally as you test your solution. You will not need to make any changes in the backend folder. All your changes should be within the frontend folder, which contains a React app created with `create-react-app`

# Initial setup

This codebase uses `docker` and `docker-compose` to build and run inside virtual
containers. To get started, all you need is to have `docker` installed (see
docs.docker.com for installation instructions).

# Installing JS dependencies

If you make any changes to package.json, make sure to `docker-compose down` and then
`docker-compose up` again to get the docker container to rebuild and restart. This will
trigger the JS dependencies to be updated.

# Running locally

Run `docker-compose up` to build and launch both the web server and the frontend app. The server is located at http://localhost:4100. The frontend server is located at http://localhost:3000.

If you prefer running the apps directly (without the use of docker), it will likely work with your local installation of `node`, but we don't guarantee it. You'll have to install `yarn` or use the equivalent `npm` commands. You can run the backend app directly by going to the backend folder, running `yarn` to build the dependencies, running `./bin/migrate.sh` to migrate the database (it uses sqlite, so no need to run a database server), and running `yarn start` to launch it. You can run the frontend app directly by going to the frontend folder, running `yarn` to build the dependencies, and running `yarn start` to launch it.

# Editing in VS Code

We recommend you use VS Code as your editor for this codebase. Make sure the plugins
`prettier` and `docker` are installed, and for your convenience, set your preferences
to always format your code when saved. This will make use of the Prettier settings
specific to this codebase, and it will make it easier for VS Code to find imports and
verify correct TypeScript types as you code.

# Coding challenge instructions

The only changes you need to make to this repository are in the frontend folder. Feel free to add more dependencies to the package.json in that folder if they help you complete the challenge. You will see examples of how to fetch and modify data in the commented section of `App.tsx`.

Your objective is to build a web page to manage multiple task lists. Please follow these steps:

1. Build a way to create a new list, providing it a name. It should only allow the user to submit if there is at least one non-white-space character for the name.
2. Show all lists that have been created in an accordian-style stack of headers with the names. The headers should also have a simple button to the right of the names (and right-aligned) that can delete that list. If a list is expanded, other lists are collapsed. If a list is expanded, it shows an input and a button to add a new task to that list. Have clicking on the header toggle expanding and collapsing.
3. When building the input and button for adding a new task to a list, make sure it is only enabled if the input for the text has at least one non-white-space character for the name.
4. Show all tasks in a list when that list is expanded. The tasks should appear above the input to create a new task for that list. Each task must have a simple button to the right (and right-aligned) to delete the task.
5. Add to the left of each "delete list" button an "edit list" button (also right-aligned). It should open a modal that takes a new name to update that list to, with a "Save" button and a "Cancel" button.
6. Make the layout responsive to multiple screen sizes.
7. Make the list headers have a dark blue background with the name having white bold text.
8. Use reasonable margins and padding throughout the page.
9. Make sure when the page is reloaded, it shows any existing lists and tasks that were persisted to the database from before.

For CSS styling, use whichever tool you are comfortable with. In the boilerplate, we have already included styled-components, and App.tsx has a simple use case for it for your convenience. But you don't have to use styled-components at all. You may add any additional packages you find helpful for styling, layout, icons, or anything else.

Make sure to write all your code in Typescript, and try to avoid using the `any` type if you can.

OPTIONAL BONUS CHALLENGE: Find a way to make the react-query hooks more efficient with which API endpoints get called and when refetches get triggered for which related endpoints. There is no single right answer to this. Just be prepared to explain the changes you made, if you decide to make any changes.

# Notes for repository maintainers

If you are a candidate taking the coding challenge, you can ignore everything below here.

## Updating dependencies and migrations locally

As you make local changes, keep in mind you will need to install any new packages added in
package.json and migrate if you add a new migration. You can do these things by killing
the instance of `docker-compose up` gracefully (or running `docker-compose down`) and then
once again running `docker-compose up`. However, if you wish to leave it up and running,
or if you aren't running it in the first place, you still need to install the new dependencies
and run migrations. It is important that these and basically all command-line operations
are run in the context of the docker container. For convenience, the top-level executable `./api`
is shorthand for `docker-compose run api $1` (to run a shell command for the backend server),
and `./webapp` is shorthand for `docker-compose run webapp $1` (to run a shell command for
the frontend server).

To install all dependencies, simply run `./api yarn` for backend or `./webapp yarn` for
frontend. To add new dependencies, please do
not use `install` commands on the command line. Instead, type the version directly in
`package.json`, and do not use carets (`^`). We prefer to pin the versions of all
dependencies exactly so we have control of when we want to upgrade them manually.

To create a new, empty migration file that you can then edit, run
`./api ./bin/makeNewEmptyMigrationFile.sh`. The format for a migration file is
`YYYYMMDDHHMMSS_NNNN.ts`, and they are kept in `./src/migrations`. Our database management
library `knex` generates the timestamp in the filename to keep things in order, and we
have elected to also give a numerical order `NNNN` to each file. This script figures out
which number is next and creates the appropriate arg to the `knex` call.

You can pattern match off of earlier migration files when filling out a new one. Make
sure to fill out the `down()` function to fully reverse whatever the `up()` function
does, in case a rollback needs to happen.

After creating a new migration file, it hasn't been applied to the database yet. If you
wish to do this separately (and not by rerunning `docker-compose up`), you can run
`./api ./bin/migrate.sh`.

Note that running the commands within the docker containers means they'll each have their
own working directory, which happens to correspond to the directories backend and frontend.
This means, for example, that we don't type `./api ./backend/bin/migrate.sh` but instead
`./api ./bin/migrate.sh`.

## Upgrading node

The version of node is determined by the images chosen for the api and webapp services
in `docker-compose.yml`. If you wish to upgrade to a newer version of node, simply change
them to a newer image name availabe from Docker Hub. We prefer the alpine variants because
they are light-weight.

## Writing route handlers

Any route handler that mutates the database should be wrapped in a transaction.
You can pattern match off of existing examples in the code, where a mutating request
(i.e. POST, PUT, DELETE) has all database-related actions inside of `runTransaction`,
found in `backend/src/db.ts`.
