import React  from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';


function instrLvl2(props){
	return (
		<>
			<Col>
		        <Row>
		          <ul class="list-unstyled">
		            <li class="list-title">The House</li>
		            <li><em>Find the people on the house.</em></li>
		          </ul>
		        </Row>
		        <Row>
		          <Image src="help-icon.png" />
		          <hr class="my-4"></hr>
		        </Row>
		        <Row>
		          <ul class="list-unstyled">
		            <li>Control the robot using <strong>Direction</strong> blocks:
		              <ul>
		                <li>Move: You can select wheter you want to rotate.
		                  <ul>
		                    <li style={{fontSize:'12px'}}>Use the dropdown list to select the direction you</li>
		                    <li class="list-unstyled" style={{fontSize:'12px'}}>want the robot to rotate.</li>
		                  </ul>
		                </li>
		                <li>Forward: Make the robot move forward one step.</li>
		                <li>Reverse: Make the robot move behind one step.</li>
		                <li>Loop: Repeat the sequence of blocks indefinitely.
		                  <ul>
		                    <li style={{fontSize:'12px'}}>Use the little number block to indicate how many times</li>
		                    <li class="list-unstyled" style={{fontSize:'12px'}}>you want to repeat the actions inside the Loop block.</li>
		                  </ul>
		                </li>
		              </ul>
		            </li>
		            <li>Control the sensor using <strong>Sensor</strong> blocks:
		              <ul>
		                <li>Block 1:
		                  <ul>
		                    <li><small>Description</small></li>
		                    <li class="list-unstyled"><small>block 1</small></li>
		                  </ul>
		                </li>
		                <li>Block 2:</li>
		                <li>Block 3:</li>
		              </ul>
		            </li>
		          </ul>
		          <p>Use the <strong>Run Code</strong> button to let know your robot the sequence of tasks to do.</p>
		        </Row>
		      </Col>
	      </>
		)
};

export default instrLvl2;