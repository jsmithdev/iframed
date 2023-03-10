# iFramed

An LWC component to embed a URL in an iframe in Salesforce via Builder

## Usage

### Builder

1. Add the iFramed component to a page via Builder
2. Set the URL to the URL you want to embed
3. Set the Height to the height of the iframe using css acceptable values (500px, 100%, 50vh, etc)
4. Set the Width to the width of the iframe using css acceptable values (500px, 100%, 50vw, etc)

> Be sure the URL you are embedding is accessible from the Salesforce domain by adding the domain to the CSP Trusted Sites setting in Setup

![iFramed in Builder](https://i.imgur.com/Q0jRFRQ.png)

## Deployment

### Deploy via Click

[![Deploy to Salesforce](https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png)](https://githubsfdeploy.herokuapp.com?owner=jsmithdev&repo=iframed)

### Deploy via SFDX

`sfdx force:source:deploy -p force-app`

---

Written with <3 by [Jamie Smith](https://jsmith.dev)
