import { userConstans } from "./constans"
import firebase from 'firebase'
const firestore=firebase.firestore;
const storage =firebase.storage()

export const  getRealtimeuser=(uid)=>{
    return async dispatch=>{
        dispatch({
            type:`${userConstans.GET_REAL_TILME_USER}_REQUEST`
        })
        const db=firestore();
        db.collection("user")
        //.where("uid", "!=", uid)
        .onSnapshot((querySnapshot)=>{
            const user= [];
            querySnapshot.forEach(function(doc) {
              if(doc.data().uid != uid){
                  user.push(doc.data());
              }
            });
            //console.log(user);
            dispatch({type:`${userConstans.GET_REAL_TILME_USER}_SUCCESS`,
                payload:{user}
        
        })
        });

        }

}




export const getRealTimeConversation= (users)=>{
    return async dispatch =>{
        const db= firestore()
        db.collection('conversation')
        .where('user_uid_1' ,'in',[users.uid_1,users.uid_2])
        .orderBy('createdAt','asc')
        
        
        
        .onSnapshot(querySnapshot=>{
            const conversations= [];
            querySnapshot.forEach(doc=>{
                if((doc.data().user_uid_1== users.uid_1 && doc.data().user_uid_2===users.uid_2)
                || (doc.data().user_uid_1==users.uid_2 && doc.data().user_uid_2===users.uid_1)
                )
                
                {conversations.push(doc.data())
                }
                if(
                    (doc.data().user_uid_1==users.uid_2 && doc.data().user_uid_2===users.uid_1))
                    { 
                        
                    }
                })
                console.log(conversations);
                if(conversations.length>0){
                    dispatch({
                        type:userConstans.GET_REAL_TILME_MESSAGES,
                        payload:{conversations}
                        
                        
                    })
                    
                    
                }else{
                    dispatch({
                        type:`${userConstans.GET_REAL_TILME_MESSAGES}_FAILURE`,
                        payload:{conversations}
                    })
                }
                
            })
        }
    }
    export const updateMessage =(msgObj) =>{
        return async  dispatch=>{
            const db =firestore()
            db.collection('conversation')
            .add({
                ...msgObj,
                isView:false,
                createdAt: new Date()
            })
            .then((data)=>{
                
                
            })
            .catch(error=>{
                console.log(error)}
            )
        }
    }
export const addPublication=(p,image)=>{
   console. log(image.name)
    if(image!=''){
    return async dispatch=>{const uploadTask = storage.ref(`images/${image.name}`).put(image,image.type);
          uploadTask.on(
            "state_changed",
            snapshot=>{},
            error=>{console.log(error)},
            ()=>{
              storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url=>{
                  p.url=url
                  
                    firebase.firestore().collection('publication').add(p)
              })
            }
          )
        
        }}
        else{
            return async dispatch=>{
                 firebase.firestore().collection('publication').add(p)
            }
        }
    }

    export const updatePublication=(id,p,image)=>{
        console. log(image.name)
         if(image!=''){
         return async dispatch=>{const uploadTask = storage.ref(`images/${image.name}`).put(image,image.type);
               uploadTask.on(
                 "state_changed",
                 snapshot=>{},
                 error=>{console.log(error)},
                 ()=>{
                   storage
                   .ref("images")
                   .child(image.name)
                   .getDownloadURL()
                   .then(url=>{
                       p.url=url
                       
                         firebase.firestore().collection('publication').doc(id).update(p);
                   })
                 }
               )
             
             }}
             else{
                 return async dispatch=>{
                      firebase.firestore().collection('publication').doc(id).update(p);
                 }
             }
         }
    export const addCommantaire=(c)=>{
        return async disparch=>{
            firebase.firestore().collection('commantaire').add(c)
        }
    }

    export const getCommantaire=()=>{
        return async dispatch=>{
            firebase.firestore().collection('commantaire').orderBy('createdAt','desc').get()
            .then(snapshot=>{
                const commantaire=[]
                snapshot.forEach(doc=>{
                    commantaire.push(doc.data())
                })
                dispatch({type:"getCommantaire",
                payload:{commantaire}
        
        })
            }).catch(error=>{
                console.log(error);
            })
        }
    }
    export const deletePublication=(id)=>{
        return async dispatch=>{
            firebase.firestore().collection('publication').doc(id).delete()
        }
    }
        export const getPublication=()=>{
            return async dispatch=>{
            firebase.firestore().collection('publication').orderBy('sort','desc').get().then(snapchot=>{
                console.log(snapchot);
                const publication =[]
                snapchot.forEach(doc=>{
                   let data={
                        id:doc.id,
                        name:doc.data().name,
                        text:doc.data().text ,
                        createdAt :doc.data().createdAt,
                        url:doc.data().url,
                        userId:doc.data().userId


                    }
                    
                    publication.push(data)
                })
                console.log(publication);
                dispatch({type:"add",
                payload:{publication}
        
        })
            }).catch(error=>console.log(error))
        
            }
        }