
import Link from "next/link"
import { useEffect, useState } from "react"
import useFetch from "../components/useFetch/useFetch"

const Home = () => {
      //here is all the info  that i need for my website
 const {userData } = useFetch()


  console.log(userData)
  
  return (
    <main>
      Home
    </main>
 
 )
}


export default Home
