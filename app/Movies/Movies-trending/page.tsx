import Link from "next/link";
import Image from "next/legacy/image";
import { ImTv } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import Filter from "@/app/components/Movie-components/Filter";
import AddToWatchlist from "@/app/components/Movie-components/AddToWatchlist";
import { options, getVotecolor } from "@/app/constants/constants";

const baseUrl = "https://api.themoviedb.org/3/";
const ApiURL =
  baseUrl + "trending/movie/day?page=1&language=en-US&" + process.env.API_KEY;
const imageURL = "https://image.tmdb.org/t/p/w500";



interface Movie {
  page: number;
  results: MovieResult[];
}

interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const getMovieData = async (url: string) => {
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
};

const Trending = async () => {
  const movieData: Movie = await getMovieData(ApiURL);
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="overflow-hidden">
      <Filter />
      <div className="flex justify-end mr-10 mt-2">
        <Link
          href={"/Movies/TVShows/Trending"}
          className="flex flex-row gap-2 mt-2 items-center justify-end p-2 rounded hover:opacity-85 transition duration-200 bg-[#4c545b] cursor-pointer text-[#d1d1d1] not-search trending-button"
        >
          <ImTv style={{ flexShrink: 0, fontSize: "1.4rem" }} />
          <span>TV Shows</span>
        </Link>
      </div>
      <div className="grid msm:grid-cols-2 msm:gap-y-2 msm:mx-auto msm:w-[29rem] md:grid-cols-3 lg:grid-cols-4 md:gap-8 lg:gap-8 lg:w-3/4 md:w-[80%] md:ml-32 lg:ml-64 mt-4 h-full not-search movies-grid">
        {/* Check gia ama exei kykloforisei h tainia akoma */}
        {movieData.results
          .filter((item) => item.release_date <= currentDate)
          .map((item) => (
            <div
              key={item.id}
              className="lg:hover:scale-110 md:hover:scale-110 md:hover:border md:hover:shadow-2xl md:hover:shadow-gray-600 lg:hover:border lg:hover:shadow-2xl lg:hover:shadow-gray-600 transition msm:w-[85%] msm:h-[50%] msm:mb-52 duration-500 ease-in-out"
            >
              {/* image container */}
              <Link href={`/Movies/${item.id}`}>
                <div className="msm:w-full msm:h-full md:w-full md:h-64 lg:w-full lg:h-96 relative">
                  <img
                    src={`${imageURL}${item.poster_path}`}
                    alt={item.title}
                    className="absolute object-cover w-full h-full"
                  />
                </div>
              </Link>
              {/* Text container */}
              <div className="bg-[#4c545b] flex flex-col h-44 cards msm:h-full">
                <Link
                  href={`/Movies/${item.id}`}
                  className="flex lg:ml-4 h-10 text-white justify-between"
                >
                  <div className="msm:w-[55%]">
                    <h2>{item.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className={`${getVotecolor(item.vote_average)}`}>
                      {item.vote_average.toString().slice(0, 3)}
                    </span>
                    <FaStar color="yellow" style={{ marginTop: "3px" }} />
                  </div>
                </Link>
                {/* watchlist and review container */}
                <div className="movies-buttons-container flex flex-col justify-center gap-4">
                  <div className="flex justify-center mt-4 ml-[-2rem]">
                    <AddToWatchlist movieId={item.id} />
                  </div>
                  <span className="text-white justify-center text-center">
                    <Link href={`/Movies/${item.id}/reviews`}>Review</Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Trending;
