<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/gaur-abhi524/Codeforces-calendar-generator/">
    <img src="/backend/public/images/favicon.ico" alt="Logo" width="48" height="48">
  </a>

  <h3 align="center">Codeforces calendar generator</h3>

  <p align="center">
    A simple chrome extension to automaticaly add upcoming contests as events to your google calendar.
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project includes a chrome extension that helps you to automatically check for new codeforces contests and creates events on your google calendar whenever a new contest is announced.<br/><br/>
Chrome extension connects with backend written in nodejs which utlizes google calendar api and codeforces api to generate events.<br/>


### Built With

<ol>
  <li>Backend</li>
    <ul>
      <li>Nodejs</li>
      <li>express</li>
      <li>google api</li>
     </ul>
  <li>Chrome extension</li>
    <ul>
      <li>Vanilla js</li>
    </ul>
 </ol>
  


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Nodejs
* Chrome or chromium based web browser

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/gaur-abhi524/Codeforces-calendar-generator.git
   ```
   
2. Enter your browser extension settings by typinng the following in your browser address bar
    browser_name://extensions
    
3. Toggle developer mode on in extensions tab

4. Click on *load unpacked* option and select *chrome-extension* folder from your cloned repo.
5. Enable extension.
6. To run backend on your local machine as well perform the following steps.
7. cd over to backend folder and run npm install in terminal to download all dependencies
8. Create a .env file with following values set : CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS<br/><br />
    to obtain these values create a project in your google developer console and set calendar api as a required api.
11. run the backend by typing npm start in terminal.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

