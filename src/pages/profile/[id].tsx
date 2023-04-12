import { GetServerSideProps } from "next";
import { FC } from "react"


interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface ProfilePageProps {
  user: User | null;
}


///this generates properties form the Server 
export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ query }) => {
  
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${query.id}`);
  const data = await res.json();

  return {
    props: {
      user: data || null,
    },
  };
};

const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
  
  if (!Object.keys(user!).length) {
    return <h1>User not found!</h1>;
  }

  return user && (
    <>
      <h1>{user.name}</h1>
      <h3>{user.email}</h3>
    </>
  );
};


export default  ProfilePage