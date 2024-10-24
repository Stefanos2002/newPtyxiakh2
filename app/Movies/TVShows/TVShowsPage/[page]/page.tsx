import Image from "next/legacy/image";
import Link from "next/link";
import TvShowPages from "@/app/components/Movie-components/TvShowPages";
import TvFilter from "@/app/components/Movie-components/TvFilter";
import { FaStar } from "react-icons/fa";
import AddToWatchlist from "@/app/components/Movie-components/AddToWatchlist";
import { getVotecolor, options } from "@/app/constants/constants";

const baseUrl = "https://api.themoviedb.org/3/";
const imageURL = "https://image.tmdb.org/t/p/w500";

interface TVShows {
  page: number;
  results: TVResult[];
}

interface TVResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

interface Seasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

const getTVShowData = async (page: string) => {
  const res = await fetch(
    `${baseUrl}discover/tv?include_adult=false&page=${page}&${process.env.MOVIE_API_KEY}`,
    options
  );
  const data = await res.json();
  return data;
};

const Page = async ({ params }: { params: TVShows }) => {
  const tvShowData: TVShows = await getTVShowData(`${params.page.toString()}`);
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="overflow-hidden">
      <TvFilter />
      <div className="grid msm:grid-cols-2 msm:gap-y-2 msm:mx-auto msm:w-[92%] md:grid-cols-3 lg:grid-cols-4 md:gap-8 lg:gap-8 lg:w-3/4 md:w-[80%] md:ml-32 lg:ml-64 mt-4 h-full not-search shows-grid">
        {/* Kanw Link oloklhrh th kartela */}
        {tvShowData.results
          .filter((item) => item.first_air_date <= currentDate)
          .map((item) => (
            <div
              key={item.id}
              className="lg:hover:scale-110 md:hover:scale-110 md:hover:border md:hover:shadow-2xl md:hover:shadow-gray-600 lg:hover:border lg:hover:shadow-2xl lg:hover:shadow-gray-600 transition msm:w-[85%] msm:h-[50%] msm:mb-52 duration-500 ease-in-out"
            >
              {/* image container */}
              <Link href={`/Movies/TVShows/${item.id}`}>
                <div className="msm:w-full msm:h-full md:w-full md:h-64 lg:w-full lg:h-96 relative">
                  <img
                    src={`${imageURL}${item.poster_path}`}
                    alt={item.name}
                    
                    className="w-full h-full absolute object-cover"
                    
                  />
                </div>
              </Link>
              {/* Text container */}
              <div className="bg-[#4c545b] flex flex-col h-44 cards msm:h-full">
                <Link
                  href={`/Movies/TVShows/${item.id}`}
                  className="flex lg:ml-4 h-10 text-white justify-between"
                >
                  <div className="msm:w-[55%]">
                    <h2>{item.name}</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className={`${getVotecolor(item.vote_average)}`}>
                      {item.vote_average.toString().slice(0, 3)}
                    </span>
                    <FaStar color="yellow" style={{ marginTop: "3px" }} />
                  </div>
                </Link>
                {/* watchlist and review container */}
                <div className="shows-buttons-container flex flex-col justify-center gap-4">
                  <div className="flex justify-center mt-4 ml-[-2rem]">
                    <AddToWatchlist movieId={item.id} />
                  </div>
                  <span className="text-white justify-center text-center">
                    Review
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="">
        <TvShowPages />
      </div>
    </div>
  );
};

export default Page;
