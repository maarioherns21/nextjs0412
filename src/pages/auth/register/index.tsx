import useFetch from "@/components/useFetch/useFetch";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";

interface ProfileProps {
  name: string;
  email: string;
  password: string;
}

const userData = { name: "", email: "", password: "" };

const RegisterPage: FC = () => {
  const [data, setData] = useState<ProfileProps>({ ...userData });
  const [error, setError] = useState<null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter()
  const { userData : user} =useFetch()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = { ...data };
    setIsPending(true);
    const res = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if(res.ok) router.push("/auth/login")
    const dataJson = await res.json();
    console.log(dataJson);
    setError(null);
    setIsPending(false);
    setData(userData);
    try {
    } catch (error: any) {
      setError(error.message);
      setIsPending(false);
    }
  };
  ///this will reroute the page if the condition is met
  if (user) {
    router.replace("/");
    return null;
  } 

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {error && <p>{error}</p>}
        {isPending && <p>Loading...</p>}
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          DemoNews
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your name
                </label>
                <input
                  type="name"
                  value={data.name}
                  onChange={(e) => setData({...data, name: e.target.value})}
                  autoComplete="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Jonh Doe"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({...data, email: e.target.value})}
                  autoComplete="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData({...data, password: e.target.value})}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default RegisterPage;
