import Nav from "@/components/Nav/Nav"
import { FC } from "react"


interface Props {
    children: any
}

///this creates the layout for the Navbar to be able to use and wrap around  the app // the children is the pages 
const Layout:FC<Props> = ({ children }) => {


    return (
        <>
        <Nav />
        {children}
        </>
    )
}

export default Layout