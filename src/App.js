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
        className="card flex flex-col items-center justify-center w-[400px] h-[200px] p-20 border border-gray-300 rounded mb-10 cursor-pointer"
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
    <div className="flex flex-col items-center justify-center mt-10">
      <Input value={githubUsername} onChange={handleInputChange} />
      <Button onClick={handleButtonClick} />

      <div>
        <h2>Non-Followers for {githubUsername}:</h2>
        <div className="card-container flex items-center justify-center flex-wrap">
          {nonFollowers.length > 0 ? (
            <div className="m-auto">
              {nonFollowers.length} non-followers found.
              <div className="flex flex-wrap items-center justify-center gap-2">
                {nonFollowers.length > 0 &&
                  renderNonFollowers().map((followerGroup, index) => (
                    <div key={index}>{followerGroup}</div>
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
