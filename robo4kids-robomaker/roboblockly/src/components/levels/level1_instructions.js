import React  from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';


function instrLvl1(){
	return (
		<>
			<Col>
	            <Row>
	              <ul class="list-unstyled">
	                <li class="list-title">The Maze</li>
	                <li><em>Find the mailbox lost in the maze.</em></li>
	              </ul>
	            </Row>
	            <Row>
	              <img style={{width:"60px"}} />
	              <hr class="my-4"></hr>
	            </Row>
	            <Row>
	              <ul class="list-unstyled">
	                <li>Control the robot using <strong>Direction</strong> blocks:
	                  <ul>
	                    <li>Move: You can select wheter you want to rotate.
	                      <ul>
	                        <li style={{fontSize:'12px'}}>Use the dropdown list to select the direction you</li>
	                        <li class="list-unstyled"  style={{fontSize:'12px'}}>want the robot to rotate.</li>
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
	              </ul>
	              <p>Use the <strong>Run Code</strong> button to let know your robot the sequence of movements to do.</p>
	            </Row>
	         </Col>
         </>
		)
};

export default instrLvl1;