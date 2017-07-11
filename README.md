# Open Source for Good Directory

A directory for freeCodeCamp's Open Source for Good Apps - Solutions for Non-Profits.

## Instructions for adding a Non-Profit Project

To add an Open Sorce for Good Project to the Directory there are 2 steps necessary:

1. Add the file `.osfg-dir-config.js` to the **root of the Project**. 
    * This will trigger an automatic build of the Project's page inside the directory.
    * Please **verify** an **update** by CamperBot to `docs/[project-name]` has occurred in the master branch of the Directory.
    * Fiels Fields:
      * **title:** Displayed at the Top and as the WebPage Title
      * **demoVideo:** common YouTube address
      * **liveDemo:** address to the Homepage of the Project.
      * **description:** an ES6 Template String with Github Markdown. Keep it relatively short, a paragraph tops.
      * **body:** an ES6 Template String with Github Markdown. Please include the license and FreeCodeCamp copyright at the end.
      * If the `liveDemo` or the `demoVideo` aren't yet available you can exclued them, they just won't be added to the Project's page.

    * Checkout the [**sample config file**](https://github.com/freeCodeCamp/open-source-for-good-directory/blob/master/.osfg-dir-config.js) at the root of this repo.

2. Edit the file `repo-list.json` at the root of the Directory to include the Project.
    * This file will instruct the Directory App to fetch the corresponding Github data and include a Card for the Project.
    * If you **don't have permissions** to update this repo, please **request the edit** to one of the main contributors.
    * INSTRUCTIONS for the file: 
      * Please keep this file **ALPHABETICALLY SORTED** by repo name
      * **EVERYTHING** should be in **lower case**. Really important for Search Functionality
      * **name:** Github Repo name in lower case (without the preceeding freecodecamp/)
      * **icon:** Image to be displayed in the Project's Card. The string contains a
        [Font Awesome Icon HTML Calss](http://fontawesome.io/icons/).
      * **tags:** tags to be shown if the user is not authenticated (for NonProfits)
      * **status:** Choose between `'dev'` and `'prod'`. Projects in `'dev'` won't be displayed to NonProfits (unauthenticated users).


## Installation

Make sure you have installed a recent version of [NodeJS](https://nodejs.org/) and **npm**.

Open the Terminal in the folder you wish to install the project and run:

`git clone https://github.com/freeCodeCamp/open-source-for-good-directory`

Move to the `open-source-for-good-directory` project just created and run `npm i` to install all the project dependencies. 

You'll need Symbolic links inside the `public` folder pointing to the corresponding `docs/[project-name]` directory. The bash script in the root of this repo `.setup-symlinks.sh` is provided to automate this process.

Make sure the file is executable with: `chmod +x .setup-symlinks.sh`, then run with `./.setup-symlinks.sh`.

For Windows users wanting to use the script you'll probably need the [Linux Subsystem](https://msdn.microsoft.com/en-us/commandline/wsl/about). This has never been tested.

The Directory is built with [Create React App](https://github.com/facebookincubator/create-react-app), so you can look for more info if you run into troubles.

To Deploy the Directory run `yarn build` or `npm run build`. Then commit the changes to Github.

### License

This computer software is licensed under the open source [BSD-3-Clause](https://github.com/freeCodeCamp/open-source-for-good-directory/blob/master/LICENSE.md).

Copyright (c) 2017, [freeCodeCamp](https://www.freecodecamp.org).
