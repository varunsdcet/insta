import React, {Component} from 'react';
import { StyleSheet,TextInput,FlatList,Text, View,Image, Linking,Button ,Alert,AsyncStorage,Dimensions ,TouchableOpacity,Animated,  Easing,AppState,ImageBackground,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
export default class CItyViewController extends Component {
    constructor(props) {

        super(props)
        this.state = {
            moviesList: [],
            eventLists :[],
            brandLists: [],
            moviesLists: [],
            beer: [],
            count : "0",
            oldpass:'',
            newpass:'',
            confpass:'',
        }


    }
    static navigationOptions = ({ navigation }) => {
        return {
            header:    // Your custom header
                <View
                    style={{
                        flexDirection: "row",
                        height: 80,
                        marginTop: Platform.OS == "ios" ? 20 : 0 // only for IOS to give StatusBar Space
                    }}
                >

                    <Text> My Header </Text>
                </View>
    };
    }



    onRegister(token) {



    }

    headHome=()=>{
        const url = GLOBAL.BASE_URL +  'city'

//        this.showLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID : GLOBAL.user_id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({moviesList:responseJson[0].city})

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
    }


    _renderItems = ({item,index}) => {

        return (
            <View>
            {index % 2 == 1 && (

                <View   style  = {{width:window.width,height :30,margin:4,backgroundColor:'white'
                }}
                >

                    <Text style = {{fontSize:16,marginTop:3,color:'black',fontWeight:'bold'}}>
                        {item.city}

                    </Text>






            </View>

        )}

                {index % 2 != 1 && (

                    <View   style  = {{width:window.width,height :30,margin:4,backgroundColor:'#e1e1e1'
                    }}
                    >

                        <Text style = {{fontSize:16,marginTop:3,color:'black',fontWeight:'bold'}}>
                            {item.city}

                        </Text>






                    </View>

                )}

            </View>
        )}


    render() {

        // {/*<ImageBackground*/}
        // {/*    source={require('./splash.png')}*/}
        // {/*    style={{width: '100%', height: 54}}*/}
        // {/*>*/}
        //
        //
        //
        //
        // {/*</ImageBackground>*/}
//recommended
        return (

            <View>
                <SafeAreaView style={{ flex:0, backgroundColor: '#f54653' }} />


                <View style={{ flex: 1, backgroundColor: 'white' }} />






                <FlatList
                          data={this.state.moviesList}
                          keyExtractor = { (item, index) => index.toString() }
                          renderItem={this._renderItems}
                          extraData={this.state}
                />

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
    }
});
