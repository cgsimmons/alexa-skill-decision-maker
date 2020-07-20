#! /bin/bash

rm decisionMaker.zip 
npm ci
zip -r decisionMaker.zip .
aws lambda update-function-code --region $AWS_REGION  --function-name $AWS_FUNCTION_NAME --zip-file fileb://$(pwd)/decisionMaker.zip 