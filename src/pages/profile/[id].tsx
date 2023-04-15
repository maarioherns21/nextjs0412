import { GetServerSideProps } from "next";
import { FC } from "react";

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

// https://jsonplaceholder.typicode.com/users/
export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  query,
}) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${query.id}`
  );
  const data = await res.json();
  console.log(data)
  return {
    props: {
      user: data || null,
    },
  };
};

const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
  if (!Object.keys(user!).length) {
    return <h1>No Results!</h1>;
  }

  return (
    user && (
      <>
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
      </>
    )
  );
};

export default ProfilePage;

