# Serverless Stack Tutorial
These files represent my completed app after following the VERY GOOD tutorial at http://serverless-stack.com/. I highly recommend it.

The completed app can be viewed at the following two urls...
- http://notes-app-client-geirman.s3-website-us-east-1.amazonaws.com
- http://kikitty.com

## Requires Config File
Create the following config file here `client/src/config.js` with the following structure

```javascript
export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    cognito: {
        USER_POOL_ID: 'YOUR_USER_POOL_ID',
        APP_CLIENT_ID: 'YOUR_CLIENT_ID',
        REGION: 'YOUR_REGION',
        IDENTITY_POOL_ID: 'YOUR_IDENTIY_POOL_ID',
    },
    s3: {
        BUCKET: 'YOUR_S3_BUCKET_NAME'
    },    
    apiGateway: {
        URL: 'YOUR_GATEWAY_API_BASE_URL',
    }
}
```