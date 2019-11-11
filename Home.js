import React, {Component} from 'react';
import { StyleSheet,TextInput,FlatList,Text, View,Image, Linking,Button ,Alert,AsyncStorage,Dimensions ,TouchableOpacity,Animated,  Easing,AppState,ImageBackground,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ParsedText from 'react-native-parsed-text';
type Props = {};
import LinearGradient from 'react-native-linear-gradient';
import SlidingPanel from 'react-native-sliding-up-down-panels';
const { width, height } = Dimensions.get('window');
export default class Home extends Component {
    constructor(props) {

        super(props)
        this.state = {
            moviesList: [],
            eventLists :[],
            brandLists: [],
            moviesLists: [],
            memberList:[],
            sharestate:false,

            beer: [],
            count : "0",
            oldpass:'',
            newpass:'',
            confpass:'',
        }


    }
    static navigationOptions = ({ navigation }) => {
        return {
            header:null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }


    likeFollower = ()=>{

        const url = GLOBAL.BASE_URL +  'list_followers'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                "userID":GLOBAL.user_id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                alert(JSON.stringify(responseJson))
                var responseDict = responseJson[0]
                if (responseDict.result == "success"){
                    this.setState({memberList:responseDict.users})
//moviesList
                }
                alert(JSON.stringify(responseJson))
            })
            .catch((error) => {
                console.error(error);

            });
    }
likeHome = (key)=>{

    const url = GLOBAL.BASE_URL +  'action_like'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            "userID":GLOBAL.user_id,
            "key":key

        }),
    }).then((response) => response.json())
        .then((responseJson) => {
            var responseDict = responseJson[0]
            if (responseDict.result == "success"){
//moviesList
            }
            alert(JSON.stringify(responseJson))
        })
        .catch((error) => {
            console.error(error);

        });
}

    headHome=()=>{
        const url = GLOBAL.BASE_URL +  'home_activity'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                "userID":GLOBAL.user_id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                var responseDict = responseJson[0]
                if (responseDict.result == "success"){
                    this.setState({eventLists:responseDict.events})
                    this.setState({moviesList:responseDict.posts})
//moviesList
                }
                alert(JSON.stringify(responseJson))
            })
            .catch((error) => {
                console.error(error);

            });

    }

    onNotif(notif) {
        //   alert(AppState.currentState)

        //   alert(JSON.stringify(notif))
        console.log(notif);
        //Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
        Alert.alert("Permissions", JSON.stringify(perms));
    }
    componentDidMount(){

        this.headHome()
        this.likeFollower()
    }

    _onPressButtons = (item,index) => {


        var s = this.state.memberList[index]
        if (item.check == ""){
            s.check = "Y"

        }else{
            s.check = ""

        }
        this.state.memberList[index] = s

        this.setState({memberList:this.state.memberList})

    }

    _onPressButton = (item,index) => {
        this.likeHome(item.key)

        var s = this.state.moviesList[index]
        if (item.like_status == "N"){
         s.like_status = "Y"
            s.like_count = parseInt(item.like_count) + 1
        }else{
            s.like_status = "N"
            s.like_count = parseInt(item.like_count) - 1
        }
   this.state.moviesList[index] = s

        this.setState({moviesList:this.state.moviesList})

    }

    share = (item,index) => {
        this.setState({sharestate:true})


    }

    _renderItemss = ({item,index}) => {
        var postheight;
        var postheights;

        if (item.post_type == "2" || item.post_type == "4" )  {

            var multiplier = window.width / parseFloat(item.post_width)
            if (item.post_height == ""){
                 postheight = parseFloat(1000) * multiplier
                 postheights = parseInt(postheight)

            }else {
                 postheight = parseFloat(item.post_height) * multiplier
                 postheights = parseInt(postheight)
            }



        }



        return (
            <View>

                {item.post_type != "1" && (


            <View   style  = {{width:window.width - 8,margin:4,shadowColor: "#000",borderWidth:1,borderColor:'#efefef',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                borderRadius:20,
            }}
            >

                <View style = {{flexDirection:'row'}}>
                <Image
                    source={{uri:item.related_userimage}}
                    style={{width: 40, height: 40,resizeMode: 'stretch',borderRadius:25,marginLeft:20,borderWidth:1,borderColor:'#eb4f51',marginTop:20}}
                >
                </Image>

                    <View>
                        <Text style = {{color:'black',fontSize:18 ,fontWeight:'bold',marginLeft:8,marginTop:12}}>
                            {item.related_username}

                        </Text>

                        <Text style = {{color:'grey',fontSize:12,marginLeft:8,marginTop:2}}>
                            {item.location}

                        </Text>




                    </View>


                </View>




                { ((item.post_type == "2" || item.post_type == "4" ) && item.image != '') &&  (
                <Image
                    source={{uri:item.image}}
                    style={{width: window.width - 10, height: postheights,resizeMode: 'stretch',marginTop:6}}
                >


                </Image>

                )}
                { (item.post_type == "2" || item.post_type == "4") && (
                <View>


                    <View style = {{marginLeft:10,marginTop:10,flexDirection:'row'}}>


                        <Image style = {{width:22,height:22,resizeMode:'contain'}}

                            source={require('./eathere.png')} />

                        <Text style = {{color:'black',fontSize:16,marginLeft:8,marginTop:2}}>
                     {item.eat_here}

                    </Text>
                    </View>


                    <View style = {{marginLeft:10,marginTop:10,flexDirection:'row'}}>


                        <Image style = {{width:22,height:22,resizeMode:'contain'}}

                               source={require('./star.png')} />

                    <Text style = {{color:'black',fontSize:16,marginLeft:8,marginTop:2}}>
                        {item.rating}

                    </Text>
                    </View>

                    <View style = {{marginLeft:10,marginTop:10,flexDirection:'row'}}>


                        <Image style = {{width:22,height:22,resizeMode:'contain'}}

                               source={require('./cost.png')} />

                    <Text style = {{color:'black',fontSize:16,marginLeft:8,marginTop:2}}>
                        {item.cost}

                    </Text>
                    </View>

                    <ParsedText
                        style={{width:window.width - 20,marginLeft:10,marginTop:10,fontSize:16,color:'grey'}}
                        parse={
                            [
                                {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
                                {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
                                {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
                                {pattern: /@(\w+)/,              style: styles.name, onPress: this.handleNamePress},
                                {pattern: /\[(@[^:]+):([^\]]+)\]/i, style: styles.name, onPress: this.handleNamePress, renderText: this.renderText},
                                {pattern: /42/,                     style: styles.magicNumber},
                                {pattern: /#(\w+)/,                 style: styles.hashTag},
                            ]
                        }
                        childrenProps={{allowFontScaling: false}}
                    >
                        {item.wall_text}
                    </ParsedText>

                    <View style = {{flexDirection:'row',justifyContent: 'space-around',marginTop:10,marginBottom:10}}>


                        <TouchableOpacity onPress={() => this._onPressButton(item,index)
                        }>
                        <View style = {{flexDirection:'row'}}>
                            {item.like_status == "N" && (

                                <Image style = {{width:22,height:22,resizeMode:'contain'}}

                                       source={require('./heart.png')} />


                            )
                            }

                            {item.like_status != "N" && (
                                <Image style = {{width:22,height:22,resizeMode:'contain'}}

                                       source={require('./heart-fill.png')} />
                            )
                            }
                            <Text style = {{color:'grey',fontSize:16,marginLeft:8,marginTop:2}}>
                                {item.like_count} Like

                            </Text>
                        </View>

                        </TouchableOpacity>

                        <View style = {{flexDirection:'row'}}>
                            <Image style = {{width:22,height:22,resizeMode:'contain'}}

                                   source={require('./chat.png')} />

                            <Text style = {{color:'grey',fontSize:16,marginLeft:8,marginTop:2}}>
                                {item.like_comment} Comments

                            </Text>
                        </View>




                        <TouchableOpacity onPress={() => this.share(item,index)
                        }>
                        <View style = {{flexDirection:'row'}}>
                            <Image style = {{width:22,height:22,resizeMode:'contain'}}

                                   source={require('./share.png')} />


                        </View>
                        </TouchableOpacity>

                    </View>
                </View>
                )}


            </View>
                )}

                {item.post_type == "1" && (


                    <LinearGradient colors={['#FF5F6D','#FF5F6D','#FFC371']} style = {{margin :10 ,backgroundColor:'white',height:'auto',alignSelf: 'center',shadowColor: 'black',width:window.width - 20}}>

                        <View style = {{flexDirection:'row'}}>
                            <Image
                                source={{uri:item.related_userimage}}
                                style={{width: 40, height: 40,resizeMode: 'stretch',borderRadius:25,marginLeft:20,borderWidth:1,borderColor:'black',marginTop:20}}
                            >
                            </Image>

                            <View>
                                <Text style = {{color:'white',fontSize:18 ,fontWeight:'bold',marginLeft:8,marginTop:12}}>
                                    {item.related_username} Create a Poll

                                </Text>

                                <Text style = {{color:'white',fontSize:12,marginLeft:8,marginTop:2}}>
                                    {item.location}

                                </Text>




                            </View>


                        </View>


                        <Text style = {{fontSize: 16,color:'white',backgroundColor:'transparent', width:'95%', textAlign:'left', marginBottom:10, marginTop:10, marginLeft:10, marginRight:10}}>
                            {item.wall_text}
                        </Text>


                        {item.poll[0].options.map((prop, key) => {

                            //alert(a)


                            return (
                                <View style={{marginTop:5}}>



                                            <View style = {{width:'97%',height:50,borderWidth:2,borderColor:'white',
                                                color:'white',alignSelf:'center',
                                                margin:2,marginBottom:10, flexDirection:'column', justifyContent:'center',borderRadius:8}} >


                                                <Text style = {{color:'white',fontSize:17,textAlign:'left', marginLeft:20,}} >
                                                    {prop.options}
                                                </Text>


                                            </View>



                                </View>
                            );
                        })}




                    </LinearGradient>

                )}
                    </View>

        )}

    _renderMember = ({item,index}) => {

        return (
            <TouchableOpacity onPress={() => this._onPressButtons(item,index)
            }>
            <View style = {{flexDirection:'row',backgroundColor:'white',width:width,height:50,borderBottomColor:'#e1e1e1',borderBottomWidth:1}}>

                <Image
                    source={{uri:item.image}}
                    style={{width: 40,margin:4, height: 40,resizeMode: 'stretch',borderRadius:20}}
                />

                <Text style = {{color:'black',fontSize:16,margin:12,width:width - 120}}>
                    {item.username}
                </Text>

                {item.check == "" && (

                    <Image style = {{width:22,height:22,resizeMode:'contain',marginTop:15}}

                           source={require('./chat.png')} />

                )}

                {item.check != "" && (

                    <Image style = {{width:22,height:22,resizeMode:'contain',marginTop:15}}

                           source={require('./unfill.png')} />

                )}

            </View>
            </TouchableOpacity>

        )

    }
    _renderItems = ({item,index}) => {

        return (

            <View   style  = {{width:150,margin:4,shadowColor: "#000",borderWidth:1,borderColor:'#efefef',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                borderRadius:20,
            }}
            >
                <Image
                    source={{uri:item.event_image}}
                    style={{width: 150, height: 150,resizeMode: 'stretch',borderRadius:20}}
                >
                </Image>
                    <View style = {{backgroundColor:'rgba(0,0,0,0.8)',width:150,height:150,marginTop:-150,borderRadius:20}}>

                        <Text style = {{marginTop:100,color:'white',fontSize:20,alignSelf:'center'}}>
                            {item.event}
                        </Text>

                        <Text style = {{marginTop:2,marginLeft:5,color:'white',fontSize:13}}>
                            {item.start_on}
                        </Text>

                    </View>





            </View>
        )}


    render() {
//recommended
        return (

            <View>
                <SafeAreaView style={{ flex:0, backgroundColor: '#f54653' }} />


                <View style={{ flex: 1, backgroundColor: 'white' }} />




<KeyboardAwareScrollView>
                <Text style = {{marginTop:2,marginLeft:7,color:'black',fontSize:20,fontWeight:'bold'}}>
                   Events Near you
                </Text>



                <FlatList style= {{marginTop:4}}
                          data={this.state.eventLists}
                          horizontal={true}
                          keyExtractor = { (item, index) => index.toString() }
                          renderItem={this._renderItems}
                          extraData={this.state}
                />

                <FlatList style= {{marginTop:4}}
                          data={this.state.moviesList}

                          keyExtractor = { (item, index) => index.toString() }
                          renderItem={this._renderItemss}
                          extraData={this.state}
                />
</KeyboardAwareScrollView>

    {this.state.sharestate == true && (
        <SlidingPanel
            headerLayoutHeight = {70}
            headerLayout = { () =>
                <View style={styles.headerLayoutStyle}>
                    <Text style={styles.commonTextStyle}>Share With</Text>
                </View>
            }
            slidingPanelLayout = { () =>
                <FlatList style= {{marginTop:-10,height:window.height - 100,backgroundColor:'white'}}
                          data={this.state.memberList}

                          keyExtractor = { (item, index) => index.toString() }
                          renderItem={this._renderMember}
                          extraData={this.state}
                />
            }
        />
    )}





            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: "#000000",
        margin: 5,
        padding: 5,
        width: "70%",
        backgroundColor: "#DDDDDD",
        borderRadius: 5,
    },
    textField: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        margin: 5,
        padding: 5,
        width: "70%"
    },
    spacer: {
        height: 10,
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    url: {
        color: 'red',
        textDecorationLine: 'underline',
    },

    email: {
        textDecorationLine: 'underline',
    },

    text: {
        color: 'black',
        fontSize: 15,
    },

    phone: {
        color: 'blue',
        textDecorationLine: 'underline',
    },

    name: {
        color: '#f54653',
    },

    username: {
        color: 'green',
        fontWeight: 'bold'
    },

    magicNumber: {
        fontSize: 42,
        color: 'pink',
    },

    hashTag: {
        color: '#3f729b',
    },
    headerLayoutStyle: {
        width,
        height: 60,
        backgroundColor: '#f54653',
        justifyContent: 'center',
        alignItems: 'center',
    },
    slidingPanelLayoutStyle: {
        width,
        height,
        backgroundColor: '#7E52A0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonTextStyle: {
        color: 'white',
        fontSize: 18,
    },
});
