# Thumbnail Generator API

## What is it?

A cloud based image resizer. 

Note that this is just a proof of concept. Amazon already provides a solution for this:

https://aws.amazon.com/es/solutions/serverless-image-handler/

Also, I'm aware that uploading directly to S3, using pre-signed URLs is the preferred method because is less expensive (taking less lambda execution time).

## Stack

- **AWS**: *lambda* function (running _node 10.15 LTS_) + *API Gateway* + *S3 bucket*
- **Serverless framework** to deploy the (_CloudFormation_) stack easily. 

![stack](https://i.imgur.com/nCbc2BJ.png)

## Dependencies

### Docker & docker-compose
Even when you would be able to run this demo without **Docker**, it's highly recommended to execute all **npm** commands from within docker (because when deploying to _aws_, you could have problems with packages versions compatibility). 

Why *docker-compose*? It allows more fine tuning, that's it.

### AWS administrator account
If you don't have one, you will need to create an administrative account, to allow _serverless framework_ to build the stack.

Check this handy video tutorial:
https://www.youtube.com/watch?v=KngM5bfpttA

Basically, your new user (eg: _serverless-admin_) should have the ***AdministratorAccess*** policy.

#### AWS credentials

Once you have your credentials, two temporary variables are needed. If you are already using **aws cli** (or _serverless framework_), you are supposed to have your credentials under `~/aws/credentials`. So, now just create the _tmp_ variables like this:

```bash
export AWS_ACCESS_KEY_ID=$(aws --profile default configure get aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(aws --profile default configure get aws_secret_access_key)
```

If you don't, then just replace the content after `=` with your ID and Secret Key.

## Docker commands

From the project root folder, build the image:

`docker-compose build`

Run the container with:

`docker-compose up -d`

Now, the whole idea of having docker is the execution of **npm** scripts. But docker makes this verbose (like `docker-compose exec container_name npm run something`). So, create a temporary alias by typing this in the console:

`alias poc=docker-compose exec poc npm run`

Doing that, you'll be able to execute any npm script just like `poc test` or `poc deploy` 

(yeap, serverless deploys runs throw **npm**).

If you need to get into the running container: 

`docker-compose exec poc /bin/bash`

## Environment vars
There's an `.env.template` file within this repo, with default values on it. Make a copy and name it just `.env`, then change the values if needed.

- **`STAGE`** would be one of _dev_, _test_ or _prod_. It's up to you.
- **`AWS_S3_BUCKET`** it's the name of the S3 bucket you want to create. Just notice that _serverless.yml_ config will attach the `STAGE` as a suffix. Eg: _my-bucket-dev_
- **`AWS_STACK_REGION`** Defaults to South América. Take a look at your aws account to see what's yours. Actually, the region should be as close to you (as the end user) as possible.

## Endpoint

The stack exposes a single endpoint: `/images/resize`. It will look something like this:

`https://kf5ch22ckk.execute-api.sa-east-1.amazonaws.com/dev/images/resize`

You will see the actual endpoint after deploying the stack, so _take note of it_.

![stack](https://i.imgur.com/JMpAHP7.png)

_Check the endpoints > POST line_

Two things:
- your field _must_ be called `image`
- the field _must_ be base64 encoded.

## Deploy 

Run `poc deploy`

(There's another command related to _serverless_ named _deploy:remove_. Check `package.json` to see all commands available, btw)

## Test

You can check if the stack is running via CURL. Run this single line from `src` folder (you don't need to be inside docker container to do this):

```bach
(echo -n '{"image": "'; base64 __tests__/alice.jpg; echo '"}') |
curl -H "Content-Type: application/json" -d @-  "https://SOMETHING.execute-api.REGION.amazonaws.com/dev/images/resize"
```

_Remember: you get the actual endpoint after running the deploy command_

(First part of the script allows curl to manage big files. Otherwise, it would complain) 

After that, you should be able to open any of the returned links, and see your resized image. Also, you should be able to see them in S3 bucket if you go to:
https://s3.console.aws.amazon.com/s3/home

To test that it validates mime-types, you can use another tests image (from `__tests__` folder):

```bach
(echo -n '{"image": "'; base64 __tests__/cheshire-cat.gif; echo '"}') |
curl -H "Content-Type: application/json" -d @-  "https://SOMETHING.execute-api.REGION.amazonaws.com/dev/images/resize"
```

## Local development

Just a note. This script is intended to run _on the cloud_. If you run this in _localhost_, you'll get a terrible execution time, between 2000ms and 3000ms. That's really bad. But can be easily improved by letting `S3.putObject` run asynchronously, without _awaiting_ it to give the API response. That would give you an acceptable 40ms performance *. However, doing that is not possible with _lambda functions_, because after serving the user response, the environment just _disappears_... and so your uploads won't make it to S3 bucket (they will die, sorry). 

(*) Open `config.js` and set the 'aws-s3-async' storage as default. Run `poc local:performance` and see the difference. It's really a different story.