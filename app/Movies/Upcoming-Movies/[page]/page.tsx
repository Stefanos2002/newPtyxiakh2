import Image from "next/legacy/image";
import { ImTv } from "react-icons/im";
import Link from "next/link";
import UpComingMoviesPages from "@/app/components/Movie-components/UpcomingMoviesPages";
import Filter from "@/app/components/Movie-components/Filter";
import { options } from "@/app/constants/constants";

const baseUrl = "https://api.themoviedb.org/3/";
const imageURL = "https://image.tmdb.org/t/p/w500";


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

//Kanw fetch tis upcoming tainies, to fetch ginetai apo pollaples selides an den ginei 20 tainiwn apo mia selida
//px. An to fetch ths selidas 1 logw tou filter emfanisei 10 tainies anti gia 20, tote tha kanei fetch tainies kai apo thn selida 2
const getMovieData = async (initialPage: number, moviesNeeded: number): Promise<MovieResult[]> => {
  let movies: MovieResult[] = [];
  const currentDate = new Date().toISOString().split("T")[0]; //metavlhth gia to shmerino date

  // Kanw fetch mexri 20 tainies gia to kathe page
  while (movies.length < moviesNeeded) {
    const res = await fetch(
      `${baseUrl}movie/upcoming?include_adult=false&page=${initialPage}&${process.env.MOVIE_API_KEY}`,
      options
    );
    const data = await res.json();

    //Krataw mono tis tainies pou den exoun kykloforisei akoma, ara to release_date na einai megalytero tou currentDate
    const filteredMovies = data.results.filter(
      (item: any) => item.release_date > currentDate
    );

    movies = movies.concat(filteredMovies); //Tis vazw sto array me ta movies
    initialPage++;  //Increment thn twrinh selida
    if (data.results.length === 0) break; // An den yparxoun alles tainies kanw break
  }
  return movies;
};

const UpComing = async ({ params }: { params: { page: string } }) => {
  const page = parseInt(params.page);
  const moviesPerPage = 20;
  const allMovies = await getMovieData(page, moviesPerPage * page); // Fetch enough movies to cover the current page

  const startIndex = (page - 1) * moviesPerPage;
  const movieData = allMovies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div className="overflow-hidden">
      <Filter />
      <div className="flex justify-end mr-10 mt-2">
        <Link
          href={"/Movies/TVShows/Upcoming-tvshows/1"}
          className="flex flex-row gap-2 items-center hover:opacity-85 transition duration-200 justify-end p-2 rounded mt-2 cursor-pointer text-[#d1d1d1] bg-[#4c545b] not-search"
        >
          <ImTv style={{ flexShrink: 0, fontSize: "1.4rem" }} />
          <span>TV Shows</span>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-3/4 sm:ml-20 md:ml-32 lg:ml-64 mt-4 h-full not-search movies-grid">
        {movieData.map((item) => (
          <Link
            key={item.id}
            href={`/Movies/${item.id}`}
      className="lg:hover:scale-110 lg:w-full md:w-[90%] transition duration-700 ease-in-out mb-6 card-link"
          >
             {/* Container for the image and content */}
             <div className="flex flex-col items-center">
                {/* Image container */}
                <div className="relative w-full h-56 sm:h-56 lg:h-96">
                  <Image
                    src={`${imageURL}${item.poster_path}`}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="absolute w-full h-full"
                    priority
                  />
                </div>

                {/* Text container */}
                <div className="bg-[#4c545b] w-full h-44 gap-4 p-4">
                  <div className="flex justify-between text-white">
                    <h2>{item.title}</h2>                   
                  </div>
                  <p className="mt-4 text-white">
                    {item.overview.slice(0, 30)}...
                  </p>
                </div>
              </div>
          </Link>
        ))}
      </div>
      <div>
        <UpComingMoviesPages />
      </div>
    </div>
  );
};

export default UpComing;
