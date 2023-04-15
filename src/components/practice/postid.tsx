import { useRouter } from "next/router"



const  Posting = () => {
const router = useRouter()
const  userId = router.query.postid

    return <>{userId}</>
}

export default Posting