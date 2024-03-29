import React, { useState } from "react";
import PostsServer from "./PostsServer";

import "./Posts.scss";
import PostsFront from "./PostsFront";
import Button from "../ui/button/Button";

type PropsType = {};

const Posts: React.FC<PropsType> = () => {
  const [isServerMode, setIsServerMode] = useState(true);

  const handleToggleMode = () => {
    setIsServerMode((prev) => !prev);
  };
  return (
    <div className="posts-container">
      <Button onClick={handleToggleMode}>Toggle</Button>
      <div className="mode-container">
        {isServerMode ? <PostsServer /> : <PostsFront />}
      </div>
    </div>
  );
};

export default Posts;
