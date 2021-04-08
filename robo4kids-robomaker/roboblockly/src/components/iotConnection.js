import React, { useState } from 'react'
import Amplify from 'aws-amplify';
import awsconfig from './../aws-exports';
import '@aws-amplify/ui/dist/style.css';

import { PubSub, Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

//import direction_factory from '../customBlocks/direction_factory'

Amplify.configure(awsconfig);
Amplify.addPluggable(new AWSIoTProvider({
 aws_pubsub_region: 'us-west-2',
 aws_pubsub_endpoint: 'wss://ajlhtk9kwdt15-ats.iot.us-west-2.amazonaws.com/mqtt',
}));

async function send(linear, angular){
    var rawText = {
        linear: {
            x: linear,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: angular
        }}
    await PubSub.publish('jetbot_msg/joystick1', rawText);
    console.log('Sending: ' , rawText)
  }

export default send;
