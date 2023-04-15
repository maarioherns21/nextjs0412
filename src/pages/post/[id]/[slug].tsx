import { useRouter } from "next/router"
import { FC } from "react";



export const getServerSideProps = async (ctx: any) => {
    const { query } = ctx;
    
    try {
      const res = await fetch(`http://localhost:3000/api/post/${query.id}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch post');
      }
      
      const data = await res.json();

      return {
        props: {
          post: data,
        },
      };
    } catch (error) {
      console.error(error);
      
      return {
        props: {
          post: null,
        },
      };
    }
  };




const PostDetails: FC<any> = ( {post}) => {
// const router = useRouter()
// const  profileId = router.query.slug

console.log(post)
    return (
        <div className="max-w-md  ">
            <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">{post.title} </h1>
            <img
                  src={`http://localhost:3000/uploads/${post.image}`}
                  className="mb-4 rounded-lg"
                  alt="Image 1"
                />
                <h3 className="mb-4 font-light text-gray-500 dark:text-gray-400">{post.body}</h3>
        </div>
    )
}

export default PostDetails