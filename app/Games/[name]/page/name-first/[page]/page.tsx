import React from "react";
import Buttons from "@/app/Components/Game-components/Buttons";
import MainPage from "@/app/Components/Game-components/MainPage";
import NavBar from "@/app/Components/Game-components/NavBar";
import SearchBar from "@/app/Components/Game-components/SearchBar";
import { pageSize } from "@/app/Constants/constants";
import {
  paginateGames,
  fetchGameDetails,
  fetchByNameConsole,
  extractGenres,
} from "@/app/Game Collection/functions";
import SortConsole from "@/app/Components/Game-components/SortConsole";
import GenresConsole from "@/app/Components/Game-components/GenresConsole";
import GameList from "@/app/Components/Game-components/GameList";
import Footer from "@/app/Components/Footer";

const Posts = async ({ params }: { params: any }) => {
  try {
    const gameData = await fetchByNameConsole(params.name);
    const genres = await extractGenres();
    const paginatedGames = paginateGames(gameData, params.page, pageSize);

    const platforms = Array.from(
      new Set(
        gameData.flatMap((game) =>
          game.parent_platforms.map((p) => JSON.stringify(p.platform))
        )
      )
    ).map((str) => ({ platform: JSON.parse(str) }));

    //fetch game description only for the paginated games not for all the games
    const detailedGames = await Promise.all(
      paginatedGames.map((item) => fetchGameDetails(item))
    );

    return (
      <div>
        <MainPage>
          <NavBar parent_platforms={platforms} />
          <SearchBar games={gameData} />
          <SortConsole currentName={params.name} />
          <GenresConsole genres={genres} currentName={params.name} />
          <GameList paginatedGames={detailedGames} />
          <Buttons gamesLength={gameData.length} />
          <Footer />
        </MainPage>
      </div>
    );
  } catch (error) {
    console.log("Error fetching render:", error);
    return <div>Error fetching game data</div>;
  }
};
// Export the Posts component
export default Posts;
