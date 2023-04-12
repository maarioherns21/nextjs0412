import { useRouter } from "next/router"




const Username = () => {
  const router = useRouter();
  const { username } = router.query;

  console.log(router);

  return (
    <>
      <h3> Username - {username}</h3>
    </>
  );
};

export default Username; 