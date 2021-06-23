import { userConstans } from "../Actions/constans"

const intialsatate={
    users:[],
    conversations:[],
    publication:[],
    commantaire:[],
    likes:[]
}


export default (state = intialsatate,action)=>{

    switch(action.type){
        
        case `${userConstans.GET_REAL_TILME_USER}_REQUEST`:
         break ;

        
        
        case `${userConstans.GET_REAL_TILME_USER}_SUCCESS`:
            state={
                ...state,
                users:action.payload.user,
                

            }
        
        break ;

        case `${userConstans.GET_REAL_TILME_USER}_FAILURE`:

         break ;
        
        case userConstans.GET_REAL_TILME_MESSAGES:
            state= {
                ...state,
                
                conversations:action.payload.conversations
                
                

            }
            break;
            
        case "add":
            state= {
                ...state,
                
                publication:action.payload.publication,
                
                
                

            }
            break;
        case "like":
                state={
                    ...state,
                    likes:action.payload.likes
                }
                break;

        case "getCommantaire":
            state={
                ...state,
                commantaire:action.payload.commantaire
            }
            break;
            
    }
    return state;
    
        

}