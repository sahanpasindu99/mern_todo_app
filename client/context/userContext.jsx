import axios from "axios";
import { createContext,useEffect,useState} from 'react';
import { useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
export const UserContext=createContext({})

export function UserContextProvider({children}){
    const [isLoading,setIsLoading]=useState(true)
    const navigate=useNavigate();
      const [user,setUser]=useState(null);

      const validateUser=async()=>{
        setIsLoading(true);
        let token
        if(!localStorage.getItem("Sahan_ToDoItem")){
            setIsLoading(false)
            return 
        }
        token=localStorage.getItem("Sahan_ToDoItem")
        const res=await axios.get('/validateUser',{headers:{
            'authorization':'Bearer '+token
            }})
        if(res.status==200){
           setUser(res.data.user)  
           setIsLoading(false)        
          } 
          else{
            setIsLoading(false)   
            setUser(null)
          }
        }
        const signOut=async()=>{
            console.log("signout")
            localStorage.removeItem("Sahan_ToDoItem")
            setUser(null)
           navigate('/login')
           validateUser()
         }
       

         const loginUser=async(email,password)=>{
            try {
                const response = await axios.post('/login', {
                  email,password
                })
                if (response.status ===404) {
                  toast.error(response.data.error);
                }
                if (response.status === 200) {
                  localStorage.setItem('Sahan_ToDoItem', response.data.token);
                  setUser(response.data.user);
                  toast.success('Logged in successfully');
                  navigate('/dashboard');
                } else {
                  toast.error('Login Error');
                }
              } catch (error) {
                console.log(error);
                toast.error('Login Error');
              }
         }
    
         useEffect(()=>{      
            validateUser()
         },[])

    return(
        <UserContext.Provider value={ {user ,setUser,validateUser,signOut,isLoading,loginUser}}>
            {children}
        </UserContext.Provider>

    );
}