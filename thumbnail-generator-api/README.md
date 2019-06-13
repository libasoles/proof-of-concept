# Thumbnail Generator API

## Dependencies

As usual, run:

`npm install`

## Environment variables
You need aws credentials. Follow these steps to get them.
https://docs.aws.amazon.com/es_es/general/latest/gr/aws-sec-cred-types.html
https://docs.aws.amazon.com/es_es/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html

Important: don't use your root user to generate the key pair credentials. Create a new user from the IAM console, and generate the pair for that new user. You don't need to give the new user access to aWS console. Just development access (for SDK and APIs). See: 
https://console.aws.amazon.com/iam/home?#/home

Having the ID and secret key, write them down in .env file. There's a .env.template available so that should be an easy task.

## S3 buckets
Uploads goes to an S3 bucket. Make sure you have one created at:
https://console.aws.amazon.com/s3/home?region=us-east-1
