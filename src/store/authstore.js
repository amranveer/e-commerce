import {create} from "zustand"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL


export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signup: async(email, password,name) =>{
       set({isLoading:true, error:null});
       try {
          const response = await axios.post(`${API_URL}/signup`,{email,password,name},{
            withCredentials:true,
        })
          set({user:response.data.user, isAuthenticated:true,isLoading:false});
       } catch (error) {
        set({error:error.response.data.message || "Error signing up", isLoading:false})
        throw error
        
       } 
    },
    verifyEmail: async (code) =>{
        set({isLoading:true, error:null})
        try{
            const response = await axios.post(`${API_URL}/verify-email`,{code},{
                withCredentials:true,
            })
            set({user:response.data.user,isAuthenticated:true, isLoading:false})
            return response.data
        } catch(error){
            set({error:error.response.data.message || "Error verifying email", isLoading:false})
            throw error;
        }
    },

    checkAuth: async() =>{
        set({isCheckingAuth:true, error:null})
        try {
            const response = await axios.get(`${API_URL}/api/auth/check-auth`,{
                withCredentials:true,
            });
            set({user:response.data.user, isAuthenticated:true, isCheckingAuth:false})
        } catch (error) {
            set({error:null, isCheckingAuth:false, isAuthenticated:false})
        }
    },

    login: async (email,password) =>{
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`,{email,password} ,{
                withCredentials:true,
            })
            set({user:response.data.user, isAuthenticated:true, isLoading:false})
            
        } catch (error) {
            set({error:error.response.data.message || "Error verifying user", isLoading:false})
            throw error;
        }
    },
    logout: async () => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${API_URL}/logout`,{
                withCredentials:true,
            })
            set({user:null, isAuthenticated:false, isLoading:false})
          
        } catch (error) {
            set({error: "Error logging out", isLoading:false})
            throw error;
        }
    }
}))