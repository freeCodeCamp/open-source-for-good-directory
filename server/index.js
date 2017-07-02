/**
* Note, the open-source-for-good-directory does not have a server back-end.
* This is the reference code for a remote server that receives GitHub webhooks.
* Here's how it's used: The server receives incoming push events for all
* freeCodeCamp repos. The server captures the webhook POST request, determines
* if there is an update to a README file, and if so, downloads the file from the
* repo, transforms the file to an HTML template, remotely pushes the file to
* open-source-for-good-directory repo which is then automatically deployed to
* GitHub Pages.
*/

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const showdown = require('showdown');
const converter = new showdown.Converter();
const verifyGithubWebhook = require('verify-github-webhook').default;

const app = express();

app.use(bodyParser.json());

// Listenning for the Github WebHook
app.post('/event', (req, res) => {
  if (verifySignature(req.body, req.headers) && isReadmeUpdated(req.body)) {
    const readmeURL = getReadmeUrl(req.body);
    const contributorsURL = getContributorsURL(req.body);
    let rawReadme;

    fetch(readmeURL)
      .then(res => res.text())
      // Fetch Contributors
      .then(text => {
        rawReadme = text;
        /* Header Inclusion necessary for the 
           GitHub API https://developer.github.com/v3/#user-agent-required */
        const options = {
          headers: {
            'User-Agent': 'open-source-for-good-directory',
          },
        };
        return fetch(contributorsURL, options);
      })
      .then(res => res.json())
      .then(contributorsData => {
        /*
          Building the HTML Web Page from the Fetched Data
        */
        const contributors = buildContributorHtml(contributorsData);
        const body = converter.makeHtml(rawReadme);
        const repoName = req.body.repository.name;
        const page = buildPage(repoName, body, contributors);

        /*
          Processing the File
        */
        writeHtmlFile(page);
        const encodedPage = base64EncodeString(page);

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
  return verifyGithubWebhook(signature, JSON.stringify(body), process.env.WEBHOOK_KEY);
}

function isReadmeUpdated(body) {
  // Checks Modifications to the README.md file in the Master Branch
  const readme = 'README.md';
  let test = false;
  const isMasterBranch = /master$/.test(body.ref);
  if (isMasterBranch) {
    body.commits.forEach(commit => {
      commit.added.forEach(file => {
        if (file === readme) test = true;
      });
      commit.modified.forEach(file => {
        if (file === readme) test = true;
      });
    });
  }
  return test;
}

/*
  Data Parsing
*/
function getReadmeUrl(body) {
  const root = 'https://raw.githubusercontent.com/';
  const repo = body.repository.full_name;
  const file = '/master/README.md';
  return root + repo + file;
}

function getContributorsURL(body) {
  const repo = body.repository.name;
  return `https://api.github.com/repos/freecodecamp/${repo}/contributors`;
}

/*
  Building WebPage
*/
function buildContributorHtml(contributors) {
  let html = '';
  contributors.forEach(c => {
    html += `
    <div class="contributor">
      <a class="contributor-link" href="${c.url}">
        <img className="contributor-img" src="${c.avatar_url}"/>
      </a>
    </div>`;
  });
  return html;
}

function buildPage(name, body, contributors) {
  return `
    <!DOCTYPE html>
    <html>
      <header>
        <link rel="stylesheet" href="../style.css">
      </header>
      <body>
        <div class="wrapper">
          <div class="fcc-banner">
            <img src="https://cdn.glitch.com/f9a9063e-4605-4536-942e-6a948a65598e%2Ffcc-logo-white.png?1491457226808"/>
          </div>
          <div class="content-container">
            <h1 class="repo-name">${name}</h1>
            ${body}
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
    if (err) throw err;
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
      'User-Agent': 'osfg-request',
    },
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
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        method: 'PUT',
        body: JSON.stringify({
          path: `docs/${repo}/index.html`,
          sha,
          message: `Camper Bot updating README.md for ${repo}`,
          committer: {
            name: 'Camper Bot',
            email: 'placeholder@test.com',
          },
          content: webPage,
          branch: 'master',
        }),
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
          code: res.status,
        };
      }
      console.log(log);
    })
    .catch(err => console.log(err));
}
