################################################################################
# Set minimum required version of cmake, project name and compile options
################################################################################
cmake_minimum_required(VERSION 2.8.3)

# Mention your package name 
project(jetbot_sim_app)


################################################################################
# Find catkin packages and libraries for catkin and system dependencies
################################################################################
find_package(catkin REQUIRED COMPONENTS
  rospy
  std_msgs
  gazebo_ros
  sensor_msgs
)

################################################################################
# Setup for python modules and scripts
################################################################################
catkin_python_setup()

################################################################################
# Declare ROS messages, services and actions
################################################################################

################################################################################
# Declare ROS dynamic reconfigure parameters
################################################################################

################################################################################
# Declare catkin specific configuration to be passed to dependent projects
################################################################################
catkin_package(
  CATKIN_DEPENDS
    rospy
    std_msgs
    gazebo_ros
    sensor_msgs
)

################################################################################
# Build
################################################################################
include_directories(
  include
  ${catkin_INCLUDE_DIRS}
)

include_directories(/usr/include/gstreamer-1.0 /usr/include/glib-2.0 /usr/include/libxml2 /usr/lib/aarch64-linux-gnu/gstreamer-1.0/include /usr/lib/x86_64-linux-gnu/gstreamer-1.0/include/ /usr/lib/aarch64-linux-gnu/glib-2.0/include/ /usr/lib/x86_64-linux-gnu/glib-2.0/include/)

################################################################################
# Install
################################################################################
# Add your custom nodes here. 
catkin_install_python(PROGRAMS 
  nodes/circle.py
  nodes/notifier
  nodes/object_detector
  nodes/teleop.py
  DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)

install(DIRECTORY launch
    DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}
)

install(DIRECTORY config
	DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}
)

install(DIRECTORY deploymentScripts
  DESTINATION ${CATKIN_GLOBAL_SHARE_DESTINATION}
)

################################################################################
# Test
################################################################################
