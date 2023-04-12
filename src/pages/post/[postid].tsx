import { useRouter } from "next/router"
import { FC } from "react"
import { GetStaticPaths, GetStaticProps } from 'next';


///if the fallback is set to true and add a loading router.isFallback the page will fetch the service side json
///if is off it will only fetch what is on the params

export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [
        {
          params: {
            postid: "4",
          },
        },
      ],
      fallback: true,
    };
  };
  
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  interface PostProps {
    post: Post | null;
  }
  
  export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
    //this check is  postid is undefined or not 
    const { postid } = params || {};
    
    ////if the postid is not found then is not true
    if (!postid) {
      return { notFound: true };
    }
  
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`);
    const data = await post.json();
   
    ///this return the  properties from the post the data that we will render
    return {
      props: {
        post: data || null,
      },
    };
  };
  
  interface Props {
    post: Post | null;
  }
  
  const PostDetails: FC<Props> = ({ post }) => {
    const router = useRouter();
    const { postid } = router.query;
  
    if (router.isFallback) {
      return <h1>Loading...</h1>;
    }
  
    if (!post) {
      return <h1>Post not found!</h1>;
    }
  
    return (
      <>
        POST Details{postid}
        <h1>{post.title}</h1>
        <h3>{post.body}</h3>
      </>
    )
}

export default PostDetails