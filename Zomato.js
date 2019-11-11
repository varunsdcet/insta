import React, {Component} from 'react';
import { StyleSheet,TextInput,FlatList,Text, View,Image, Linking,Button ,Alert,AsyncStorage,Dimensions ,TouchableOpacity,Animated,  Easing,AppState,ImageBackground,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
export default class Zomato extends Component {
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
            header: ( /* Your custom header */
                <View
                    style={{
                        height: 80,
                        marginTop: 20,
                        backgroundColor:'red' /* only for IOS to give StatusBar Space */
                    }}
                >
                    <Text>This is CustomHeader</Text>
                </View>
            ),
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }



    onRegister(token) {



    }

    headHome=()=>{
        var pizza = 'beer'
        var lat = '28.8'
        var lon = '77'
        var url = 'https://developers.zomato.com/api/v2.1/search?q='+pizza+'&lat='+lat+'&lon='+lon+'&radius=10000&sort=real_distance'

        fetch(url, {
            method: 'GET',
            headers: {
                'user-key': '70562d7dd9c57ed0b09ab40b8f3da802',
                'Content-Type': 'application/json'
            },
        })

            .then((response) => response.json())
            .then((responseData) => {


             this.setState({moviesList:responseData.restaurants})
            })
            .catch((error) =>{
                console.error(error);
            })

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
        alert(JSON.stringify(item.restaurant))
        var rest = item.restaurant
        return (

            <View   style  = {{width:window.width,flexDirection:'row',margin:4,shadowColor: "#000",borderWidth:1,borderColor:'#efefef',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
            >
                <Image source={{ uri: rest.thumb }}
                       style  = {{width:100, height:100,
                       }}

                />



         <View style = {{width:window.width - 120}}>

                <Text style = {{fontSize:16,margin:5,color:'black',fontWeight:'bold'}}>
                    {rest.name}

                </Text>

                <Text style = {{fontSize:14,margin:5,color:'grey'}}>
                    {rest.location.address}

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



                <ImageBackground
                    source={require('./foods.png')}
                    style={{width: '100%', height: 200,resizeMode: 'contain'}}
                >

                    <Text style = {{alignSelf:'center',color:'black',fontSize:34,marginTop:80,fontWeight:'bold'}}>
                        PIZZA DAY
                    </Text>

                    <Text style = {{alignSelf:'center',color:'black',fontSize:28,marginTop:10,fontWeight:'bold'}}>
                        18 Sep
                    </Text>

                </ImageBackground>

                <Text style = {{alignSelf:'center',color:'black',fontSize:22,marginTop:20,fontWeight:'bold'}}>
                    RECOMMENDATIONS
                </Text>

                <Text style = {{alignSelf:'center',color:'grey',fontSize:18,marginTop:10}}>
                    LIST OF BEST OUTLET IN YOUR AREA
                </Text>


                <FlatList style= {{marginTop:20}}
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
