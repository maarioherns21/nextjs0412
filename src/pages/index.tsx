
import Link from "next/link"
import { useEffect, useState } from "react"
import useFetch from "../components/useFetch/useFetch"


const Home : () => void = () => {
  //here is all the info  that i need for my website
  //  const {userData } = useFetch()
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:3000/api/post");
      const data = await res.json();
      setData(data);
      console.log(data);
      setIsLoading(false);
      setError(null);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      {error && <>{error}</>}
      <aside
        aria-label="Related articles"
        className="py-8 lg:py-24 bg-gray-45 dark:bg-gray-700"
      >  
        <div className="px-4 mx-auto max-w-screen-xl">
        {isLoading && <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Loading...</h2>}
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related articles
          </h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {data && data.map((article: any) => (
              <article key={article._id} className="max-w-xs">
                <img
                  src={`http://localhost:3000/uploads/${article.image}`}
                  className="mb-5 rounded-lg"
                  alt="Image 1"
                />

                <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  <a href="#">{article.name}</a>
                </h2>
                <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                 {article.body.length > 100 ? article.body.slice(0, 100) : article.body} ...
                </p>
                <a
                  href="#"
                  className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                >
                  Read in 2 minutes
                </a>
              </article>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}


export default Home


