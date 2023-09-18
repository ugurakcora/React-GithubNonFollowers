import React, { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import axios from "axios";

const App = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [nonFollowers, setNonFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Her sayfada gösterilecek öğe sayısı

  const handleInputChange = (value) => {
    setGithubUsername(value);
  };

  const handleButtonClick = async () => {
    try {
      // GitHub API'den takipçi ve takip edilenleri çek
      const followersResponse = await axios.get(
        `https://api.github.com/users/${githubUsername}/followers`
      );

      const followingResponse = await axios.get(
        `https://api.github.com/users/${githubUsername}/following`
      );

      const followers = followersResponse.data.map(
        (follower) => follower.login
      );
      const following = followingResponse.data.map((follow) => follow.login);

      const nonFollowersList = following.filter(
        (user) => !followers.includes(user)
      );

      // İlk sayfayı göster
      setCurrentPage(1);
      setNonFollowers(nonFollowersList);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  const renderNonFollowers = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = nonFollowers.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map((follower, index) => (
      <div
        key={index}
        className="card flex flex-col items-center justify-center p-20 border border-gray-300 rounded mb-10 cursor-pointer  h-[100px] xl:w-[400px] xl:h-[200px]"
      >
        <img
          src={`https://avatars.githubusercontent.com/${follower}`}
          alt={`${follower} avatar`}
          className="rounded-full w-20 mb-4"
        />
        <a
          href={`https://github.com/${follower}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {follower}
        </a>
      </div>
    ));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(nonFollowers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-10">
      <div className="flex justify-center items-center gap-4">
        <Input value={githubUsername} onChange={handleInputChange} />
        <Button onClick={handleButtonClick} />
      </div>

      <div className="flex items-center justify-center flex-col">
        <h2 className="my-6">Non-Followers for {githubUsername}:</h2>
        <div className="card-container flex items-center justify-center flex-wrap">
          {nonFollowers.length > 0 ? (
            <div className="container mx-auto">
              <h3 className="text-center my-6">
                {nonFollowers.length} non-followers found.
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {nonFollowers.length > 0 &&
                  renderNonFollowers().map((followerGroup, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center"
                    >
                      {followerGroup}
                    </div>
                  ))}
              </div>
              <div className="pagination my-4 flex justify-center items-center cursor-pointer">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`${
                      currentPage === number
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    } px-4 py-2 mx-1 text-sm rounded`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>No non-followers found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
