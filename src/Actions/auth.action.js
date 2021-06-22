
import firebase from 'firebase'

import { authCaonstant } from './constans';

import "firebase/auth";
import   'firebase/firestore'
var firebaseConfig = {
  apiKey: "AIzaSyAqBERurSD-zbZXbdMOwQaajai92pBhcgU",
  authDomain: "oxygene-b7763.firebaseapp.com",
  projectId: "oxygene-b7763",
  storageBucket: "oxygene-b7763.appspot.com",
  messagingSenderId: "400341398086",
  appId: "1:400341398086:web:2c0c85d4bd484dc96c9047"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth
const firestore = firebase.firestore

export const signup =(user) =>{
    return async (dispatch)=>{
        const db=firestore();
        dispatch({type:`${authCaonstant.USER_LOGIN}_REQEST`})


        auth()
        .createUserWithEmailAndPassword(user.email,user.password)
        .then(data=>{
            console.log(data);
           const name = `${user.firstName} ${user.lastName}`
            const currentUser =auth().currentUser;
            currentUser.updateProfile({
                displayName: name
             } )
             .then(()=>{
                    // if you are here means you are update successfully
                    db.collection('user')
                    
                    .doc(data.user.uid)
                    .set({
                        firstName:user.firstName,
                        lastName:user.lastName,
                        uid:data.user.uid,
                        createdAt:new Date(),
                        isOnline:true,
                        email:user.email,
                    })
                    .then(()=>{
                        //successful 
                        const loggedinuser={
                            firstName:user.firstName,
                            lastName:user.lastName,
                            uid:data.user.uid,
                            email:user.email,
                            isOnline:true

                        }
                        localStorage.setItem('user',JSON.stringify({loggedinuser} ));
                        console.log('usser logged in succecfuly');
                        dispatch({
                            type:`${authCaonstant.USER_LOGIN}_SUCCESS`,
                            payload :{user :loggedinuser}
                        })
                    })
                    .catch(error=>{
                        console.log(error);
                        dispatch({type:`${authCaonstant.USER_LOGIN}_FAILURE`,
                    payload:{error}})
                        
                    })

             })
            
        })
        .catch(error =>{
            dispatch({type:`${authCaonstant.USER_LOGIN}_FAILURE`,
            payload:{error}})
            
        });
        
    }
}

export const signin =(user)=>{
    return async dispatch =>{
        dispatch({
            type:`${authCaonstant.USER_LOGIN}_REQUEST`});
            auth()
            .signInWithEmailAndPassword(user.email,user.password)
            .then((data)=>{
                console.log(data);


                const db=firestore()
                db.collection('user')
                .doc(data.user.uid)
                .update({
                    isOnline:true
                })
                .then(()=>{
                    const name=data.user.displayName.split(" ");
                    const firstName=name[0]
                    const lastName=name[1]
                    const loggedinuser={
                        firstName,
                        lastName,
                        uid:data.user.uid,
                        email:user.email,
                        isOnline:true
                        
                    }

                    localStorage.setItem('user',JSON.stringify(loggedinuser))


                    dispatch({
                        type:`${authCaonstant.USER_LOGIN}_SUCCESS`,
                        payload:{user:loggedinuser}
                })
                console.log('logged in user ',loggedinuser);
            }).catch(error=> dispatch({
                type:`${authCaonstant.USER_LOGIN}_FAILURE`,
                payload:{error}
            }))
})
                .catch( error=>dispatch({
                    type:`${authCaonstant.USER_LOGIN}_FAILURE`,
                    payload:{error:error.message}
                })
                )




                
            
                
                
               
                
        
    }
}



export const addMessage=(m)=>{
    return async dispatch=>{
        firebase.firestore().collection('conversation').add(m)
    }

}


                            

export const isLoggedinUser=()=>{
    return async dispatch => {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if(user){
            dispatch({
                type: `${authCaonstant.USER_LOGIN}_SUCCESS`,
                payload: { user }
            });
        }else{
            dispatch({
                type: `${authCaonstant.USER_LOGIN}_FAILURE`,
                payload: { error: 'Login again please' }
            });
        }

    }
}
export const deleteUser=(id)=>{
    return async dispatch=>{
        firebase.firestore().collection('user').doc(id).delete().catch(error=>{
            console.log(error);
        })
    }
}

export const Logout=(uid)=>{
    return dispatch=>{
        dispatch({type:`${authCaonstant.USER_LOGOUOT}_REQUEST`})
        const db = firestore();
        db.collection('user')
        .doc(uid)
        //.where('uid','==',uid)
        .update({
            isOnline:false
        })
        .then(()=> {
            auth()
            .signOut()
            .then(()=>{
                localStorage.clear();
                dispatch({type:`${authCaonstant.USER_LOGOUOT}_SUCCESS`})
    
            })
            .catch(error=>{
                console.log(error);
                dispatch({
                    type:`${authCaonstant.USER_LOGOUOT}_FAILURE`,
                    payload: {error}
                })
                
            })

        })
        .catch(error=>{
            console.log(error);
        })
       
    }
}