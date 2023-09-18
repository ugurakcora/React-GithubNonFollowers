import React, { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import axios from "axios";

const App = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [nonFollowers, setNonFollowers] = useState([]);

  const handleInputChange = (value) => {
    setGithubUsername(value);
  };

  const handleButtonClick = async () => {
    try {
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
      setNonFollowers(nonFollowersList);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  const renderNonFollowers = () => {
    return nonFollowers.map((follower, index) => (
      <div
        key={index}
        className="card flex flex-col items-center justify-center p-20 border border-gray-300 rounded mb-10 cursor-pointer w-3/4 h-[100px] xl:w-[400px] xl:h-[200px]"
      >
        <img
          src={`https://avatars.githubusercontent.com/${follower}`}
          alt={`${follower} avatar`}
          className="rounded-full w-[50%] mr-[10px]"
        />
        <a
          href={`https://github.com/${follower}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {follower}
        </a>
      </div>
    ));
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-10">
      <div className="flex gap-2">
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
