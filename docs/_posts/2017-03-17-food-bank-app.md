---
layout: post
title:  "Food Bank App"
desc: "A web app that enables food banks to manage clients, deliveries, and donations"
image: food-bank.jpg
date:   2017-03-17 00:13:44 -0700
categories: jekyll update
---

## Features

* Online application so clients can apply for aid
* Dashboard to view, modify, and track client records
* Option to print or export client records
* Manages inventory based on scheduled deliveries
* Generate packing lists using current inventory and client preferences
* User roles allows custom permissions
* Assign deliveries to drivers based on location using Google maps
* Dashboard to view volunteers and availability
* Dashboard to view donors and generate tax receipts with a click

## Getting Started

Make sure you have the following:

* Git installed
* npm installed
* Node.js installed
* MongoDB installed

To copy the app to your local computer, enter the command:

`$ git clone https://github.com/FreeCodeCamp/food-bank-app.git`

Then install dependencies and run with:

`$ cd food-bank-app`

`$ npm install`

`$ npm start`

Now open a browser and navigate to `http://localhost:3000`

Alternately, you can 1-click deploy the app in the cloud on AWS or Heroku:

<a id="aws-btn" href="#">AWS Button</a>
<a id="heroku-btn" href="#">Heroku Button</a>

## Video Demo

[![Alt text for video](https://i.vimeocdn.com/video/525146269.webp?mw=900&mh=563)](https://vimeo.com/132467437)

## Contributers

<div class="contributers">
{% for member in site.data.team %}  
  [![Alt text for contributer]({{ member.avatar_url }})]({{ member.html_url }}){: .contributer}
{% endfor %}
</div>
