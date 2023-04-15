import { useRouter } from "next/router"




const Username = () => {
  const router = useRouter();
  const { userid } = router.query;

  console.log(router);
   
  return (
    <>
      <h3> Username - {userid}</h3>
    </>
  );
};

export default Username; 