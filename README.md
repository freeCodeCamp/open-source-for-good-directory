# Open Source for Good Directory

A directory for freeCodeCamp's Open Source for Good Apps - Solutions for Nonprofits.

## Instructions for adding a Non-Profit Project

There are two steps to add an Open Source for Good Project to the directory:

1. Add the file `.osfg-dir-config.js` to the **root of the Project**. 
    * This will trigger an automatic build of the Project's page inside the directory.
    * Please **verify** that an **update** by CamperBot to `docs/[project-name]` has occurred in the master branch of the directory.
    * Fiels Fields:
      * **title:** Displayed at the top and as the webpage title
      * **demoVideo:** the YouTube video address
      * **liveDemo:** the address of the project's homepage
      * **description:** an ES6 template string that contains GitHub-flavored Markdown. Keep this relatively short - a paragraph tops.
      * **body:** an ES6 template string with GitHub-flavored Markdown. Please include the open source license, with the  freeCodeCamp copyright at the end.
      * If the `liveDemo` or the `demoVideo` aren't yet available, you can exclued them. They just won't be added to the project's page.

    * You can see a [**sample config file**](https://github.com/freeCodeCamp/open-source-for-good-directory/blob/master/.osfg-dir-config.js) at the root of this repository.

2. Edit the file `repo-list.json` at the root of the directory to include the project.
    * This file will tell the directory app to fetch the corresponding GitHub data and include a card for the project.
    * If you don't yet have permissions to update this repo, please **request the edit** from one of the project's  maintainers.
    * Instructions for the file: 
      * Please keep this file **alphabetically sorted** by repo name
      * **Everything** should be in **lower case**. This is critical to our search functionality
      * **name:** the GitHub repo's name in lower case (without the preceeding freecodecamp/)
      * **icon:** the Image to be displayed in the project's card. This string contains a
        [Font Awesome icon HTML class](http://fontawesome.io/icons/).
      * **tags:** tags will be visible to users who aren't authenticated (we assume these users are people at nonprofits)
      * **status:** choose between `'dev'` and `'prod'`. Projects in `'dev'` won't be displayed to nonprofits (unauthenticated users).

Please be paitient and while GitHub updates the directory - it will take a few minutes before the changes are reflected.


## Installation

Make sure you have installed a recent version of [NodeJS](https://nodejs.org/) and **npm**.

Open the folder you wish to install the project in using your terminal, and run:

`git clone https://github.com/freeCodeCamp/open-source-for-good-directory`

`cd` into the `open-source-for-good-directory` project that command created, then run `npm i` to install all the project dependencies. 

You'll need symbolic links inside the `public` folder that point to the corresponding `docs/[project-name]` directory. The bash script in the root of this repo. We've created a script to automate this process. Make sure the script is executable by running: `chmod +x .setup-symlinks.sh`. Then run `./.setup-symlinks.sh`.

For Windows users wanting to use the script, you'll probably need the [Linux Subsystem](https://msdn.microsoft.com/en-us/commandline/wsl/about). We haven't tested this, so if you get this working, let us know how you did so, and we can add those steps to this guide.

This directory is built using [Create React App](https://github.com/facebookincubator/create-react-app), so you can look for more info there if you run into trouble.

To deploy the directory, run `yarn build` or `npm run build`. Then commit the changes to Github.

### License

This computer software is licensed under the open source [BSD-3-Clause](https://github.com/freeCodeCamp/open-source-for-good-directory/blob/master/LICENSE.md).

Copyright (c) 2017, [freeCodeCamp](https://www.freecodecamp.org).
