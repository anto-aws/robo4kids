import './App.css';
import './components/customBlocks/directionblocks'
import React, { useState, useEffect }  from 'react'
import ReactBlockly from 'react-blockly'
import Blockly from 'blockly';
import Button from 'react-bootstrap/Button';

//
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col'

import RunCode from './components/runCode';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import '@aws-amplify/ui/dist/style.css';
import { PubSub, Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

import Level1 from './components/levels/level1';
import Level2 from './components/levels/level2';
import Level3 from './components/levels/level3';
import Level0 from './components/levels/level0';



Amplify.configure(awsconfig);

Amplify.addPluggable(new AWSIoTProvider({
 aws_pubsub_region: 'us-west-2',
 aws_pubsub_endpoint: 'wss://ajlhtk9kwdt15-ats.iot.us-west-2.amazonaws.com/mqtt',
}));



function App() {
  const [level, setLevel] = useState(-1);

  function level_1(){
    setLevel(1);
  };
  function level_2(){
    setLevel(2);
  };
  function level_3(){
    setLevel(3);
  };
  function level_0(){
    setLevel(0);
  };

  function Render_level(props){
     const level = props.level;
    if (level==1){
      return( <Level1/>)
    }
    if (level==2){
      return( <Level2/>)
    }
    if (level==3){
      return( <Level3/>)
    }
    if (level==0){
      return( <Level0/>)
    }
    else{
      return(
        <div>
          <Button onClick={level_1} > Level 1 </Button>
          <Button onClick={level_2} > Level 2 </Button>
          <Button onClick={level_3} > Level 3 </Button>
          <Button onClick={level_3} > Free Level </Button>
        </div>
      )
    }
  }
  return (
    <div>
      <div> hola</div>
      <div>
        <Render_level level={level}/ >
      </div>
    </div>
  )
}

export default App;