# Thumbnail Generator API

## What is it?

A cloud based image resizer. 

Note that this is just a proof of concept. Amazon already provides a solution for this:

https://aws.amazon.com/es/solutions/serverless-image-handler/

## Stack

- **AWS cloud stack**: *lambda* function (running _node 10.15 LTS_) + *API Gateway* + *S3 bucket*
- **Serverless framework** to deploy the (_CloudFormation_) stack easily. 

## Dependencies

### Docker & docker-compose
Even when you would be able to run this demo without **Docker**, it's highly recommended to execute all **npm** commands from within docker (because when deploying to _aws_, you could have problems with packages versions compatibility). 

Why *docker-compose*? It allows more fine tuning, that's it.

### AWS administrator account
You will need to create an administrative account, to allow _serverless framework_ to build the stack.

Check this handy video tutorial:
https://www.youtube.com/watch?v=KngM5bfpttA

Basically, your new user (eg: _serverless-admin_) should have the ***AdministratorAccess*** policy.

#### AWS credentials

Once you have your credentials, two temporary variables are needed. If you are already using **aws cli** (or _serverless framework_), you are supposed to have your credentials under `~/aws/credentials`. So, now just create the tmp variables like this:

```bash
export AWS_ACCESS_KEY_ID=$(aws --profile default configure get aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(aws --profile default configure get aws_secret_access_key)
```

If you don't, then just replace the words after `=` with your ID and Secret Key.

## Docker commands

From the project root folder, build the image:

`docker-compose build`

Run the container with:

`docker-compose up -d`

Now, the whole idea of having docker is execute *npm* scripts. But docker makes this verbose. So, create a temporary alias by typing this in the console:

`alias poc=docker-compose exec poc npm run`

Doing that, you'll be able to execute any npm script just like `poc test` or `poc deploy` (yeap, serverless deploys runs throw **npm**).

If you need to get into the running container: 

`docker-compose exec poc /bin/bash`

To stop it, run:

`docker-compose down`

To rebuild (if necessary):

`docker-compose build` or `docker-compose up --build`

## ENV vars
There's a `.env.template` file within this repo, with default values on it. Make a copy and name it just `.env`. Then change the values if needed.

- `STAGE` would be one of dev, test or prod. It's up to you.
- `AWS_S3_BUCKET` it's the name of the S3 bucket you wan't to create. Just notice that serverless config will attach the STAGE as a suffix. Eg: _my-bucket-dev_
- `AWS_STACK_REGION` Defaults to South América. Take a look at your aws account to see what's yours. Actually, the region should be as close to you (or the users) as possible.

## Endpoint

The stack exposes a single endpoint: `/images/resize`. It actually will look something like this:

`https://kf5ch22ckk.execute-api.sa-east-1.amazonaws.com/dev/images/resize`

You will see the actual endpoint after deploying the stack, so take note of it.

## Deploy 

Run `poc deploy`.

(There's another command related to serverless named _deploy:remove_. Check `package.json` to see all commands available, btw)

## Test

You can check if the stack is running via CURL. Run this single line from within `src` folder (you don't need to be inside docker container):

```bach
(echo -n '{"image": "'; base64 __tests__/alice.jpg; echo '"}') |
curl -H "Content-Type: application/json" -d @-  "https://kf5ch22ckk.execute-api.sa-east-1.amazonaws.com/dev/images/resize"
```

First part of the script allows curl to manage big files. Otherwise, it would complain. 

After that, you should be able to open any of the returned links, and see your resized image. Also, you should be able to see them in S3 bucket if you go to:
https://s3.console.aws.amazon.com/s3/home

To test that it validates file types, you can use another tests image (from __tests__ folder):

```bach
(echo -n '{"image": "'; base64 __tests__/cheshire-cat.gif; echo '"}') |
curl -H "Content-Type: application/json" -d @-  "https://kf5ch22ckk.execute-api.sa-east-1.amazonaws.com/dev/images/resize"
```