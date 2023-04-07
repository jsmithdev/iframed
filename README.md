# iFramed

An LWC component to embed a URL in an iframe with template syntax support

## Usage

### Builder

1. Add the iFramed component to a page via Builder
2. Set the URL to the URL you want to embed
3. Optionally, set the parameters to the params you want to add
4. Set the Height to the height of the iframe using css acceptable values (500px, 100%, 50vh, etc)
5. Set the Width to the width of the iframe using css acceptable values (500px, 100%, 50vw, etc)

> You use template syntax to pass in values from the current record e.g. `https://www.google.com/search?q={Account.Name}` or `https://example.com/{Contact.ExternalId__c}`

![iFramed in Builder](/docs/iframed.png)

> Be sure the URL you are embedding is accessible from the Salesforce domain by adding the domain to the CSP Trusted Sites setting in Setup

## Deployment

### Deploy via Click

[![Deploy to Salesforce](https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png)](https://githubsfdeploy.herokuapp.com?owner=jsmithdev&repo=iframed)

### Deploy via SFDX

Covert with SFDX; This creates a folder called `deploy`

```bash
sfdx force:source:convert -r force-app -d deploy
```

Now you can deploy from the resulting `deploy` directory

```bash
sfdx force:mdapi:deploy -d deploy -w -1 --verbose
```

📌 Above deploys to the default org set

- Add -u user@domain.com or -u alias to deploy else where
- To run tests add -l RunSpecifiedTests -r ApexTestName

Results should more or less mirror below

```bash
Using specified username me(a)jsmith.dev

Job ID | 0Af1U000015XR14SAG
MDAPI PROGRESS | ████████████████████████████████████████ | 10/10 Components

TYPE FILE NAME ID
──────────────────────── ──────────────────────────────────── ────────────────────────── ──────────────────
deploy/package.xml package.xml
ExampleClass deploy/classes/Example.cls Example 01p1U00000QWibCQAT
```

---

Written with <3 by [Jamie Smith](https://jsmith.dev)
