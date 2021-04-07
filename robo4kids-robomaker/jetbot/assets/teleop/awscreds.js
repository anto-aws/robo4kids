function getAWSCredentials() {
    var awsConfiguration = {
        host: "ajlhtk9kwdt15-ats.iot.us-west-2.amazonaws.com", // AWS MQTT Endpoint 
        region: "us-west-2", // AWS Region, ie. us-east-1
        accessKeyId: "", // AWS IAM User's Access Key
        secretAccessKey: "", // AWS IAM User's Secret Key
        sessionToken: null
     };

     return awsConfiguration;
}
