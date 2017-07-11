# Open Source for Good Directory

A directory for freeCodeCamp's Open Source for Good Apps - Solutions for Non-Profits.

## Instructions for adding a Non-Profit Project

To add an Open Sorce for Good Project to the Directory there are 3 steps necessary:

1. Add the file `.osfg-dir-config.js` to the **root of the Project**. 
    * This will trigger an automatic build of the Project's page inside the directory.
    * Please **verify** an **update** by CamperBot to `docs/[project-name]` has occurred in the master branch of the Directory.
    * For information about the file's format, checkout the [**sample config file**](https://github.com/freeCodeCamp/open-source-for-good-directory/blob/master/.osfg-dir-config.js) at the root of this repo.

2. Edit the file `src/config/repo-list.js` to include the Project.
    * Install the Directory with the instructions bellow, and edit the file.
    * This file is a **Redux Initial State** that will instruct the Directory App to fetch the Github data and include a Card for the project.
    * For instructions on how to make an edit check [**the file**](https://github.com/freeCodeCamp/open-source-for-good-directory/blob/master/src/config/repo-list.js).
    * If you **don't have permissions** to update this repo, please **request the edit** to one of the main contributors.

3. Re-build the Directory after making the edit.
    * Make sure you're in the **master branch** since it's the only one connected to Github WebPages.
    * Build with `yarn build` or `npm run build`.
    * Commit the changes to Github.
    * Verify an update to the Directory has occurred.

## Installation

Make sure you have installed a recent version of [NodeJS](https://nodejs.org/) and **npm**.

Open the Terminal in the folder you wish to install the project and run:

`git clone https://github.com/freeCodeCamp/open-source-for-good-directory`

Move to the `open-source-for-good-directory` project just created and run `npm i` to install all the project dependencies. 

You'll need Symbolic links inside the `public` folder pointing to the corresponding `docs/[project-name]` directory. The bash script in the root of this repo `.setup-symlinks.sh` is provided to automate this process.

Make sure the file is executable with: `chmod +x .setup-symlinks.sh`, then run with `./.setup-symlinks.sh`.

For Windows users wanting to use the script you'll probably need the [Linux Subsystem](https://msdn.microsoft.com/en-us/commandline/wsl/about). This has never been tested.

The Directory is built with [Create React App](https://github.com/facebookincubator/create-react-app), so you can look for more info if you run into troubles.

### License

This computer software is licensed under the open source [BSD-3-Clause](https://github.com/freeCodeCamp/open-source-for-good-directory/blob/master/LICENSE.md).
Copyright (c) 2017, freeCodeCamp.
