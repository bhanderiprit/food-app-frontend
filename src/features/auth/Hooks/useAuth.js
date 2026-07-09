import { useContext } from "react"
import { Context } from "../context/AuthContext"
import { foodpartnerLogin, foodpartnerRegister, UserRegister, VerifyEmail,UserLogin, UserLogout, UserLogoutAll } from "../services/auth.api"



export  const useAuth =  () => {
 
    const {foodPartner,setFoodPartner,loading,setLoading,user,setUser} = useContext(Context)

    const handleFoodPartnerRegister = async ({ name, email, password }) => {
    try {
        setLoading(true);

        const data = await foodpartnerRegister({
            name,
            email,
            password
        });

        setFoodPartner(data.foodPartner);
    } catch (error) {
        console.log(error.response?.data);
    } finally {
        setLoading(false);
    }
};
   
    const handelFoodPartnerLogin = async ({email,password}) =>{
        setLoading(true)

        try {
            const response = await foodpartnerLogin({email,password})
            setFoodPartner(response.foodPartner)
            return response

        } catch (error) {
            console.log(error);
            throw error;
        } finally{
            setLoading(false)
        }
    }

    const handelUserRegister = async ({email,password,username}) => {
        setLoading(true)
        try {
            const response = await UserRegister({email,password,username})
            setUser(response.user)
            return response
        } catch (error) {
            console.log(error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handelUserLogin = async ({email,password}) => {
        setLoading(true)
        try {
            const response = await UserLogin({email,password})
            setUser(response.user)
            return response
        } catch (error) {
            console.log(error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handelUserLogout = async () => {
        setLoading(true)
        try {
            await UserLogout()
        } catch (error) {
            console.log(error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handelUserLogoutAll = async () => {
        setLoading(true)
        try {
            await UserLogoutAll()
        } catch (error) {
            console.log(error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handelVerifyEmail = async ({email, otp}) => {

        setLoading(true)
        try {
             const data = await VerifyEmail({email, otp})
             return data 
        } catch (error) {
            console.log(error);
            throw error
            
        } finally {
            setLoading(false)
        }
        
    }

    const handelFoodPartnerLogout = async () => {
        setLoading(true)
        try {
            const data = await FoodPartnerLogout()
            return data
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {foodPartner,
        loading,
        handleFoodPartnerRegister,
        handelFoodPartnerLogin,
        user,handelUserRegister ,
        handelVerifyEmail,
        handelUserLogin ,
        handelUserLogout,
        handelUserLogoutAll,
        handelFoodPartnerLogout}
}

