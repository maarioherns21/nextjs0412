import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"



interface UseFetchReturnType {
  userData: any
}

const useFetch = (): UseFetchReturnType => {
  const [userData, setUserData] = useState<any>([]);
   
  const handleSubmit = async () => {
   try {
    const data: any = await getSession();
    setUserData(data?.session.user);
   } catch (error: any ) {
     console.log(error.message)
   }
  };


  useEffect(() => {
    handleSubmit();
  }, []);

  return {
    userData,
  };
};

export default useFetch;