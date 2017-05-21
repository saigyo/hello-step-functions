# Hello Step Functions

A sample project to demonstrate/exercise the usage of AWS Step Functions
in [Serverless](https://github.com/serverless/serverless), with AWS Lambda Functions, 
Amazon API Gateway and DynamoDB.

## How to build and deploy

Before you can deploy, please make sure that you configured AWS credentials for a profile 
named ``hello``. 
 
Install all dependencies, including serverless:

```bash
npm install
```

Package and deploy:

```bash
./sls.sh deploy -v
```

If you already specified a _Custom Domain Name_ in the API Gateway console, you can 
have the deployment create a custom domain mapping too, by specifying the domain name as
env variable:

```bash
HELLO_DOMAIN=your.domain.name ./sls.sh deploy -v
```

## License

[MIT License](../blob/master/LICENSE)