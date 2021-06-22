
import { authCaonstant } from "../Actions/constans"


const intialstate={
    firstname:'',
    lastname:'',
    eamil:'',
    authenticating:false,
    authenticated:false,
    isOnline:false,
    error:null
}



export default (state=intialstate,action)=>{
   console.log(action)
   
   
   
    switch(action.type){


        case`${authCaonstant.USER_LOGIN}_REQUEST`:

            state ={
                ...state,
                authenticating:true
            }

            break;
        case`${authCaonstant.USER_LOGIN}_SUCCESS`:

            state ={
                ...state,
                ...action.payload.user,
                authenticated:true,
                authenticating:false,
                isOnline:true
            }

            break;
        case`${authCaonstant.USER_LOGIN}_FAILURE`:

            state ={
                ...state,
                error:action.payload.error,
                authenticated:false,
                authenticating:false
            }

            break;
            case `${authCaonstant.USER_LOGOUOT}_REQUEST`:
                break;

            case `${authCaonstant.USER_LOGOUOT}_SUCCESS`:
                state={
                    ...intialstate,
                    isOnline:false,


                }
                break;

                case`${authCaonstant.USER_LOGOUOT}_FAILURE`:
                    state={
                        ...state,
                        error:action.payload.error
                    }
                    break;

        
    }
    

    return state;

}