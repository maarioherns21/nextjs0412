import useFetch from "@/components/useFetch/useFetch";
import axios from "axios";
import mongoose , {ObjectId} from "mongoose";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, FormEvent, useEffect, useState } from "react";

interface formtp {
  title: string;
  body: string;
}

const data = { title: " ", body: "" };

const PostsForm: () => void = () => {
  const [formData, setFormData] = useState<formtp>({ ...data });
  const [file, setFile] = useState("");
  const [error, setError] = useState<null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { userData } = useFetch();
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      //this session allowed me to add userID to the file from the client
      const { session }: any = await getSession();
      // const user = parseInt(session?.user?.id)  <--- another way to  relate Schemas from the front end "many to may relationship"
      // const user = parseInt(session?.user?.id)
      const user = session?.user?.id
      console.log(user)
      // const user = JSON.parse(session?.user?.id)
      const newId = mongoose.Types.ObjectId.createFromHexString(user);
      const article = { ...formData, image: file, user: newId };
      setIsPending(true);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post(
        "http://localhost:3000/api/post/add",
        article,
        config
      );
      console.log(res);
      router.push("/")
      setError(null);
      setIsPending(false);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setIsPending(false);
    }
  };

  if (!userData) {
    return (
      <>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p>Page can only be access login in</p>
          <br />
          <Link
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            href="/auth/login">
            Log in
          </Link>
        </div>
      </>
    );
  }

  // if(!userData) {
  //   return  router.push("/auth/login")

  // }

  return (
    <>
      <section className=" bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div>{error && <p>{error}</p>}</div>
          <div>{isPending && <p>Loading...</p>}</div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a Article
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    autoComplete="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jonh Doe"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Information
                  </label>
                  <textarea
                    value={formData.body}
                    onChange={(e) =>
                      setFormData({ ...formData, body: e.target.value })
                    }
                    autoComplete="body"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Super creazy...."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={(e: any) => setFile(e.target.files[0])}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div></div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {" "}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostsForm;
