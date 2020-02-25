import React,{useState} from 'react';
import {
    View, 
    Text,
     FlatList, 
     StyleSheet, 
     Image, 
     Switch,
     Modal, 
     Button,
     TextInput,
     Picker
    } from 'react-native';
import InfoText from './info-text';
import SubjectItem from './subject_item'

export default function Profile(){
 
    const userProfile={
        info:{
            avatar:'https://iap.poly.edu.vn/user/ph/PH09025.jpg',
            name:'B N ',
            email:'',
            address:'HN',
            phone:'4165',
            active: true
        },
        subject:[
            {
                name:'ReactNative1',
                identity:'MOB306',
                classname:'PT10111'
            },
            {
                name:'ReactNative2',
                identity:'MOB307',
                classname:'PT21501'
            },
            {
                name:'ReactNative3',
                identity:'MOB308',
                classname:'PT14322'
            }
        ]
    };
    const [showModal,setShowModal]=useState(false);

    const [showInfo,setShowInfo]=useState(true);

    const [user, setUser]=useState(userProfile);

    const [nameP,setnameP]=useState("");
    const [identityP,setidentityP]=useState("");
    const [classP,setclassP]=useState("");

    const add=()=>{
        let newProfilelist=user.subject;
        const subject={
            name: nameP.toString(),identity: identityP.toString(),
            classname: classP.toString()
        };
        newProfilelist=newProfilelist.push(subject);
    }

    const handleDeleteSub=(identity)=>{
        let newSubjectList=user.subject;
        newSubjectList=newSubjectList.filter((subject)=> subject.identity != identity);
        userProfile.subject=newSubjectList;
        setUser(userProfile);
    }
  
    return(
        <View>
            <View>
                <Image style={style.image} source={{uri: user.info.avatar}} />
                <Switch value={showInfo} onValueChange={()=>setShowInfo(!showInfo)}/>
            </View>
            <Text>-------------------</Text>
            <View>
                {
                    showInfo ?
                <InfoText data={user.info}/>
                : null
                }   
                <Text>------------------</Text>
                <Button title="Add Subject" onPress={()=>{
                    setShowModal(true);
                }}/>
                <FlatList
                    data={user.subject}
                    renderItem={({item})=><SubjectItem item={item} 
                                handledelete={handleDeleteSub} /> }
                    keyExtractor={(item,index)=> index}
                />
            </View>
            <Modal visible={showModal}>
                <View>
                    <Text>Modal Add Subject</Text>
                <Text>Name: </Text>
                    <TextInput onChangeText={(valueName)=>setnameP(valueName)} />
                    <Text>Identity: </Text>
                    <TextInput onChangeText={(valIdentity)=>setidentityP(valIdentity)} />
                    <Text>Select Class Name: </Text>
                <Picker selectedValue="PT1234" onValueChange={() => ()}>
                    <Picker.Item value="PT1234" label="PT1234" />
                    <Picker.Item value="PT1235" label="PT1235" />
                    <Picker.Item value="PT1236" label="PT1236" />
                </Picker>
                <Button
                    title="Cancle"  onPress={() => {setShowModal(false);}}
                />
                <Button title="Subject" onPress={()=>{add(),setShowModal(false)}}/>
          </View>
        </Modal>
        </View>
    );
}
const style=StyleSheet.create({
    profileContainer: {},
    avatar:{},
    image:{
       width: 200,
       height: 200,
       borderRadius: 200 
    }
});
