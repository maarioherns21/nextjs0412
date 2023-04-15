import useFetch from "@/components/useFetch/useFetch"
import { useRouter } from "next/router"
import { useEffect } from "react";



const Users = () => {
    const router = useRouter();
    const { userData } = useFetch();
    const userId = router.query.userId;
    
    console.log(userData)

  /// i added  rerouting to log out
    if (userData) {
        return userData && (
            <>
              <h1>{userData.name}</h1>
              <h1>{userData.email}</h1>
              <img src={userData.image} alt={userData.name} />
            </>
          );
    } 
    else {
        return  null
    }
   
  };


export default Users