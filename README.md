
## Perquisites

- [Adobe I/O CLI](https://github.com/adobe/aio-cli) : `npm install -g @adobe/aio-cli`
- A project in Developer Console: See how to create one [here](#how-to-create-a-project-in-developer-console)

## Setup

- Populate `.env` and `manifest.yml` file in the project root and fill it as shown [below](#env)


## Deploy & Cleanup

- `aio login` to login with your Adobe ID
- `aio app deploy` to build and deploy the action on Runtime
- `aio app undeploy` to undeploy the app

## Config

### `.env`

```bash
# This file must not be committed to source control

## please provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
```
See how to obtain the credentials [here](#how-to-obtain-adobe-io-runtime-credentials)

### `manifest.yml`

Only has to edit `inputs` field:

```bash
inputs:
  LOG_LEVEL: debug
  ## Specify the environment to which this action should react
  ENVIRONMENT: 
  ## DataTrue api key
  DATATRUE_API_KEY: 
  Tests:
    ## "Test" or "Suite"
    test_class: 
    ## ID of the test or suite to run
    test_id: 

```

## How to create a project in Developer Console
- Navigate to [Adobe Developer Console](https://console.adobe.io/).
- Under Quick Start, click on the option to `Create project from template`.
- Select `Project Firefly` from the list of templates. 
- Enter `Project Title` and `App Name` for your templated project.
- Click `Save` when ready.

Detailed info about each steps can be found [here](https://www.adobe.io/apis/experienceplatform/project-firefly/docs.html#!AdobeDocs/project-firefly/master/getting_started/first_app.md).
```
```


## How to obtain Adobe I/O Runtime credentials
The two variables `AIO_RUNTIME_NAMESPACE` and `AIO_RUNTIME_AUTH` and are obtained per workspace in Adobe I/O Developer Console via the Workspace’s Download All feature: 
![](https://experienceleague.adobe.com/docs/experience-manager-learn/assets/stage-auth-namespace.png?lang=en)