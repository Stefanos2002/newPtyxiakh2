"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const UserOptions = () => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string>("");

  // // Fetch the user's details from the database on component mount
  useEffect(() => {
    const fetchProfileDetails = async () => {
      if (session?.user?.email) {
        try {
          // Fetch response using the email as a query param
          const response = await fetch(
            `/api/getUserDetails?email=${session.user.email}`
          );

          if (!response.ok) {
            console.error("Error fetching user details:", response.statusText);
            return;
          }

          // Parse the response as JSON
          const data = await response.json();

          // Check if the data contains a valid id
          if (data?._id) {
            setUserId(data._id);
          } else {
            console.log("No profile found for this user.");
          }
        } catch (error) {
          console.error("Failed to fetch profile details:", error);
        }
      }
    };

    fetchProfileDetails();
  }, [session?.user?.email]); // Only re-run this effect if the session changes\

  return (
    <div className="bg-[#23232e] sm:rounded-l-2xl sm:border-b-0 border-b-2 border-white sm:rounded-tr-sm rounded-t-md">
      <ul className="text-[#b6b6b6] sm:pt-2 pt-0 sm:text-md text-md divide-y sm:divide-x-0 divide-x sm:border-none border border-white flex sm:flex-col flex-row flex-wrap">
        <Link href={`/account/${userId}/info`} className="grow">
          <li className="cursor-pointer w-full transition-all grow duration-200 hover:text-white sm:p-4 p-6">
            Account Details
          </li>
        </Link>
        <Link href={`/account/${userId}/games`} className="grow">
          <li className="cursor-pointer w-full transition-all grow duration-200 hover:text-white sm:p-4 p-6">
            Games
          </li>
        </Link>
        <Link href={`/account/${userId}/movies`} className="grow">
          <li className="cursor-pointer w-full transition-all duration-200 hover:text-white sm:p-4 p-6">
            Movies
          </li>
        </Link>
        <li
          className="cursor-pointer w-full transition-all flex-1 duration-200 hover:text-white sm:p-4 p-6"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </li>
      </ul>
    </div>
  );
};

export default UserOptions;
