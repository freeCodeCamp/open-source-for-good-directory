/**
* NOTICE: the open-source-for-good-directory does not have a server Back-end.
* This is the reference code for a remote server that receives GitHub WebHooks.
* WORKING MODEL: The WebHook registers push events for all freeCodeCamp repos.
* Then, it sends a POST request (URL/event) to a server hosted in Glitch.com
* If there is an update to the configuration file '.osfg-dir-config.js', it
* downloads the file and builds an HTML file that is pushed to the
* open-source-for-good-directory repo inside the 'docs' folder.
* Everything inside this folder is automatically deployed to GitHub Pages.
*/

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const verifyGithubWebhook = require('verify-github-webhook').default;
const htmlAutoFormat = require('js-beautify').html;
const showdown = require('showdown');
const embed = require('embed-video');

const converter = new showdown.Converter();

const app = express();

app.use(bodyParser.json());

const configFile = '.osfg-dir-config.js';

// Listenning for the Github WebHook
app.post('/event', (req, res) => {
  if (
    verifySignature(req.body, req.headers) &&
    wasConfigUpdated(req.body, configFile)
  ) {
    let repoConfig;
    const fileURL = getFileUrl(req.body, configFile);

    fetch(fileURL)
      .then(res => res.text())
      // Fetch Contributors
      .then(repoConfigFile => {
        repoConfig = eval(repoConfigFile);
        repoConfig.url = getRepoURL(req.body);

        const contributorsURL = getContributorsURL(req.body);
        /* Header Inclusion mandatory for the
           GitHub API https://developer.github.com/v3/#user-agent-required */
        const reqOptions = {
          headers: {
            'User-Agent': 'open-source-for-good-directory'
          }
        };
        return fetch(contributorsURL, reqOptions);
      })
      .then(res => res.json())
      .then(contributorsData => {
        /*
          Building the HTML Web Page from the Fetched Data
        */
        const contributorsHTML = buildContributorsHtml(contributorsData);
        const repoName = req.body.repository.name;
        const page = buildPage(repoConfig, contributorsHTML);
        const formattedPage = htmlAutoFormat(page, { indent_size: 2 });

        /*
          Processing the File
        */
        writeHtmlFile(formattedPage);
        const encodedPage = base64EncodeString(formattedPage);

        /*
          Pushing to GitHub Repo
        */
        pushFileToRepo(encodedPage, repoName);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.get('/', (req, res) => {
  res.send('Automated Server for FreeCodeCamp Open Source For Good Directory');
});

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${server.address().port}`);
});

/*
  Verifications
*/
function verifySignature(body, headers) {
  const signature = headers['x-hub-signature'];
  return verifyGithubWebhook(
    signature,
    JSON.stringify(body),
    process.env.WEBHOOK_KEY
  );
}

function wasConfigUpdated(body, configFile) {
  // Checks Modifications to the README.md file in the Master Branch
  let test = false;
  const isMasterBranch = (/master$/).test(body.ref);
  if (isMasterBranch) {
    body.commits.forEach(commit => {
      commit.added.forEach(file => {
        if (file === configFile) {test = true;}
      });
      commit.modified.forEach(file => {
        if (file === configFile) {test = true;}
      });
    });
  }
  return test;
}

/*
  Data Parsing
*/
function getFileUrl(body, configFile) {
  const root = 'https://raw.githubusercontent.com/';
  const repo = body.repository.full_name;
  const file = `/master/${configFile}`;
  return root + repo + file;
}

function getContributorsURL(body) {
  const repo = body.repository.name;
  return `https://api.github.com/repos/freecodecamp/${repo}/contributors`;
}

function getRepoURL(body) {
  return `https://www.github.com/${body.repository.full_name}`;
}

/*
  Building WebPage
*/
function buildContributorsHtml(contribData) {
  let html = '';
  contribData.forEach(contributor => {
    html += `
    <div class="contributor">
      <a class="contributor-link" href="${contributor.html_url}" target="_blank">
        <img class="contributor-img" src="${contributor.avatar_url}"/>
      </a>
    </div>`;
  });
  return html;
}

function buildPage(repoConfig, contributors) {
  const { title, description, demoVideo, liveDemo, url, body } = repoConfig;
  return `
    <!DOCTYPE html>
    <html>
      <header>
        <link rel="stylesheet" href="../style.css">
        <!-- Font Awesome -->
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      </header>
      <body>
        <div class="wrapper">
          <a href="https://www.freecodecamp.org">
            <div class="fcc-banner">
              <img src="https://cdn.glitch.com/f9a9063e-4605-4536-942e-6a948a65598e%2Ffcc-logo-white.png?1491457226808"/>
            </div>
          </a>
          <div class="content-container">
            <h1 class="repo-name">${title}</h1>
            <div class="project-description">
              ${description ? converter.makeHtml(description) : ''}
            </div>
            ${demoVideo
              ? `<div class="project-video">
                  <div class="video-container">
                    ${embed(demoVideo, { attr: { width: 640, height: 360 } })}
                  </div>
                </div>`
              : ''}
            <div class="buttons-container">
              ${liveDemo
                ? `<a href="${liveDemo}" target="_blank">
                <button>
                  Live Demo 
                  <i class="fa fa-cube" aria-hidden="true"></i>
                </button></a>`
                : ''}
              <a href="${url}" target="_blank">
                <button>
                  Code Repo
                  <i class="fa fa-code" aria-hidden="true"></i>
                </button></a>
            </div>
            <div class="body-container">
              ${body ? converter.makeHtml(body) : ''}
            </div>
            <h2>Contributors</h2>
            <div class="contributors">
              ${contributors}
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
}

/*
  File Processing
*/
function writeHtmlFile(html) {
  const newPath = path.join(__dirname, '/views/index.html');
  fs.writeFile(newPath, html, 'utf-8', err => {
    if (err) {throw err;}
  });
}

function base64EncodeString(string) {
  return new Buffer(string).toString('base64');
}

/*
  Pushing to GitHub Repo
*/
function pushFileToRepo(webPage, repo) {
  const fileURL = `https://api.github.com/repos/freecodecamp/open-source-for-good-directory/contents/docs/${repo}/index.html`;
  const options = {
    headers: {
      'User-Agent': 'osfg-request'
    }
  };

  /*
    Request File to be Updated (Getting the SHA)
  */
  fetch(fileURL, options)
    .then(res => res.json())
    .then(data => {
      const sha = data.sha || '';
      // UPDATE or CREATE File
      const options = {
        headers: {
          'User-Agent': 'osfg-request',
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        },
        method: 'PUT',
        body: JSON.stringify({
          path: `docs/${repo}/index.html`,
          sha,
          message: `Camper Bot updating README.md for ${repo}`,
          committer: {
            name: 'Camper Bot',
            email: 'placeholder@test.com'
          },
          content: webPage,
          branch: 'master'
        })
      };
      return fetch(fileURL, options);
    })
    .then(res => {
      let log = {};
      if (res.status === 200) {
        log.message = `${repo} index.html updated`;
      } else if (res.status === 201) {
        log.message = `${repo} index.html created`;
      } else {
        log = {
          message: 'Invalid response from GitHub file creation',
          status: res.statusText,
          code: res.status
        };
      }
      console.log(log);
    })
    .catch(err => console.log(err));
}
