import { createAppContainer ,createDrawerNavigator,createBottomTabNavigator} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'

import Splash from './Splash.js';
import Zomato from './Zomato.js';
import Home from './Home.js';
import CItyViewController from './CItyViewController.js';
import { createStackNavigator } from 'react-navigation-stack';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Alert,
    Dimensions,
    ImageBackground,
    SafeAreaView,

} from 'react-native';


const RecentM = createMaterialTopTabNavigator({
        CItyViewController: { screen: CItyViewController,
            navigationOptions : {
                title:'Offer & Discount',

                tabBarLabel: 'Offer & Discount',

                swipeEnabled: true,
                gesturesEnabled: false,
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.

            }
        },
        Zomato: { screen: Zomato ,
            navigationOptions : {
                title:'Recommended',
                tabBarLabel: 'Recommended',
                swipeEnabled: true,
                gesturesEnabled: false,
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.

            }
        },





    },


    {
        defaultNavigationOptions: ({ navigation }) => ({

            title: 'MY TITLE',
            headerStyle: {
                backgroundColor: '#f54653',
            },


            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            swipeEnabled: true,
            gesturesEnabled: false,


        }),
        tabBarOptions: {
            labelStyle: {
                fontSize: 15,
                marginTop:-20,
                color:'#f54653',

            },

            indicatorStyle: {
                backgroundColor: 'red',
                borderBottomColor: '#f54653',
                borderBottomWidth: 2
            },
            tabStyle: { height: 40 },
            style: {
                backgroundColor: 'white',
            },

            swipeEnabled: true,
            gesturesEnabled: false,
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            inactiveBackgroundColor:'red',
            activeBackgroundColor:'red',
            showIcon:'false'
        },



    }
);



const StackNavigator = createStackNavigator({
    Home: {screen: Home},
    Splash: {screen: Splash},
    RecentM: {screen: RecentM,

        navigationOptions: {
            header: (
                <View>
                <SafeAreaView style={{ flex:0, backgroundColor: '#f54653' }} />
                <ImageBackground
                    source={require('./splash.png')}
                    style={{width: '100%', height: 50}}
                >

                    <Image style = {{alignSelf:'center',resizeMode:'contain',width:200,height:40,marginTop: 5}}
                           source={require('./insta.png')}
                           />

                </ImageBackground>
                </View>
            ),
        },

    },
    CItyViewController: {screen: CItyViewController},
    
},{

    mode: 'card',
    navigationOptions: params => ({
        gesturesEnabled: false,


        gesturesDirection: 'inverted',
    }),
    transitionConfig: () => ({
        screenInterpolator: sceneProps => {
            const {layout, position, scene} = sceneProps;
            const {index} = scene;

            const width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });

            return {opacity, transform: [{translateX: translateX}]};
        },
        headerTitleInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            return {
                opacity: position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [ 0, 1, 0],
                }),
                transform: [{
                    translateX: position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [-50, 0, 50],
                    }),
                }]
            };
        },
    }),


});

export default createAppContainer(StackNavigator);