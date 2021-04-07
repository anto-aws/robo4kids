#!/usr/bin/env python

# python imports
import logging
import json
import os
import time
# ros imports
import rospy
import rospkg
from geometry_msgs.msg import Twist
from sensor_msgs.msg import NavSatFix,LaserScan
from std_msgs.msg import String
# aws imports
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient



#Set the verbosity of logs and the logger name
LOGLEVEL = logging.DEBUG 
LOGNAME = 'roslaunch'
#Set the name of the certicate files located in
#jetbot/simulation_ws/src/jetbot_sim_app/config
CAFILE = 'root.ca.pem'
KEYFILE = 'private.pem.key'
CERTIFICATEFILE = 'certificate.pem.crt'
#MQTT Settings
#ClientID and Topics should be unique for all MQTT connections
TOPIC = 'jetbot_msg'
CLIENTID = 'jetbot_sim_app1'
ENDPOINT = os.environ['IOT_ENDPOINT'].lower()
#ROS Settings, for example application name
ROSAPP = 'jetbot_sim_app'



def setup_logging(loglevel = LOGLEVEL, logname = LOGNAME):
    """
    Return a logger for this ROS node

    Logs can be viewed in AWS CloudWatch Logs
    /aws/robomaker/SimulationJobs/...RobotApplicationLogs
    """
    logger = logging.getLogger(LOGNAME)
    logger.setLevel(LOGLEVEL)
    ch = logging.StreamHandler()
    ch.setLevel(loglevel)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    ch.setFormatter(formatter)
    logger.addHandler(ch)
    return logger



class Teleop():
    def __init__(self):
        self._cmd_pub = rospy.Publisher('jetbot_diff_controller/cmd_vel', Twist, queue_size=1)
        self.twist = Twist()
        self.position = NavSatFix()
        self.string = String()
        self.laserscan = LaserScan()
        self.mqtt_client = self.mqtt_connect()

    def mqtt_connect(self):
        """
        Initializes the connection to AWS IoT MQTT then connects
        This is required for the simulation to receive data from the joystick app
        """
        logger.info('Initializing AWS IoT MQTT connection')
        self.mqtt_client = AWSIoTMQTTClient(CLIENTID)
        self.mqtt_client.configureEndpoint(ENDPOINT, 8883)
        self.mqtt_client.configureCredentials(self.path(CAFILE), self.path(KEYFILE), self.path(CERTIFICATEFILE))
        self.mqtt_client.configureConnectDisconnectTimeout(10)
        self.mqtt_client.configureMQTTOperationTimeout(5)
        logger.info('AWS IoT MQTT Connections status: %s', self.mqtt_client.connect())
        return self.mqtt_client

    def path(self, filename):
        """
        Creates the full path to the certificate files in the ROS application
        This is needed so the MQTT client can load the certs to authenticate with AWS IoT Core
        """
        rospack = rospkg.RosPack()
        return os.path.join(rospack.get_path(ROSAPP), 'config', filename)

    def joystick_callback(self, client, userdata, message):
        """
        Will be called each time there is a new message from the joy stick

        The MQTTClient handles this in the background once this call back is created

        The JSON message is read from the Teleop.MQTTTOPIC, converted to a Twist message
        and published to the Teleop.ROSTOPIC
        """
        logger.info('Received from %s, message: %s', TOPIC+'/joystick1', message.payload)
        payload = json.loads(message.payload)
        self.twist.angular.x = payload["angular"]["x"]
        self.twist.angular.y = payload["angular"]["y"]
        self.twist.angular.z = payload["angular"]["z"]
        self.twist.linear.x = payload["linear"]["x"]
        self.twist.linear.y = payload["linear"]["y"]
        self.twist.linear.z = payload["linear"]["z"]
        self._cmd_pub.publish(self.twist)
        logger.info('Joystick message published to ROS')
        return

    def subscribe_joystick(self):
        """
        Subscribe to the desired topic and register a callback

        Any new messages will be sent to the callback for processing
        """
        logger.info("Subsribing to topic %s", TOPIC+'/joystick1')
        self.mqtt_client.subscribe(TOPIC+'/joystick1', 1, self.joystick_callback)
        return
    
    def position_callback(self, message):

        payload = '{latitude: '+str(message.latitude)+', longitude: '+str(message.longitude)+'}'
        logger.info('Received from %s, message: %s', TOPIC+'/position', payload)

        logger.info('Position message published to IoT')
        self.mqtt_client.publish(TOPIC+'/position', payload, 0)
        return
    
    def camera_callback(self, message):
        found_objects = message.data
        logger.info('Deteccion: %s', found_objects)
        try:
            if "Human" in found_objects.split(','):
                payload = '{"message": "Human"}'
                logger.info('Received from %s, message: %s', TOPIC+'/camera', payload)
                logger.info('Camera message published to IoT')
                self.mqtt_client.publish(TOPIC+'/camera', payload, 1)
                logger.info('Received from %s, message: %s', TOPIC+'/camera', payload)
            else:
                payload = '{"message": "Searching"}'
                self.mqtt_client.publish(TOPIC+'/camera', payload, 1)
        except Exception as e:
            rospy.logerr('Error: {}'.format(e))
        return
    
    def laser_callback(self, message):
        near_objects = list(message.ranges)
        add = 0
        for i in range(46,54):
            if float('inf') == near_objects[i]:
                near_objects[i] = 0
            add =  (near_objects[i] + add)/8
            #logger.info(add)
        #logger.info('Resultado final: %s', add)
        payload = json.dumps({"distance": add})
        #logger.info('Received from %s, message: %s', TOPIC+'/laser', payload)

        logger.info('Distance message published to IoT')
        self.mqtt_client.publish(TOPIC+'/laser', payload, 1)
        return
    
    def publish_position(self):
        self._cmd_sus = rospy.Subscriber('fix', NavSatFix, self.position_callback)
    
    def publish_camera(self):
        self._camera_sus = rospy.Subscriber('/detected_objects', String, self.camera_callback)
    
    def publish_laser(self):
        self._laser_sus = rospy.Subscriber('/jetbot/laser_scan', LaserScan, self.laser_callback)
        
    def run_robot(self):
        """
        Starts the subscription and publishing and keeps the script running
        """
        self.subscribe_joystick()
        #time.sleep(5)
        self.publish_position()
        self.publish_camera()
        self.publish_laser()
        # this loop is needed to keep the script alive
        # while the script is running the callback is running
        # so messages from the topics are processed
        while True:
            time.sleep(5)
        return



def main():
    logger.info('jetbot_sim_app Teleop Node starting...')
    rospy.init_node('teleop')
    try:
        teleop = Teleop()
        teleop.run_robot()
    except rospy.ROSInterruptException:
        pass

if __name__ == '__main__':
    logger = setup_logging()
    main()
