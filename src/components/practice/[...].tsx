import { useRouter } from "next/router"




const FullPost = () => {
  const router = useRouter();

  console.log(router);

  return (
    <>
      <h1>Full Post</h1>
    </>
  );
};

export default FullPost;