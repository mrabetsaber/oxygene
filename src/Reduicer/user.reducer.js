import { userConstans } from "../Actions/constans"

const intialsatate={
    users:[],
    conversations:[],
    publication:[],
    commantaire:[]
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
            
        case "add":
            state= {
                ...state,
                
                publication:action.payload.publication,
                
                
                

            }

        case "getCommantaire":
            state={
                ...state,
                commantaire:action.payload.commantaire
            }
            
    }
    return state;
    
        

}