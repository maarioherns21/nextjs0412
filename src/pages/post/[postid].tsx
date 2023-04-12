import { useRouter } from "next/router"


const PostDetails = () => {
const router = useRouter()
const { postid } = router.query 

console.log(router)

    return (
        <>POST DETails{postid}</>
    )
}

export default PostDetails