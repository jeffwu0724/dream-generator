"use client";
import React from "react";
import Forms from "./form";
import Results from "./results";

const Dream_generator_main: React.FC = () => {
  const [story, setStory] = React.useState("");
  const [keyword, setKeyword] = React.useState([]);
  const [enriched_story, setEnriched_stroy] = React.useState("");
  const [picture_url, setPictureUrl] = React.useState("");
  const [hasResult, setHasResult] = React.useState(false);
  const ENDPOINT: string =
    "https://m8gmbpw6uc.execute-api.us-west-1.amazonaws.com/prod/generate_keyword_and_story";

  const onSubmit = () => {
    fetch(`${ENDPOINT}?story=${story}`)
      .then((result) => result.json())
      .then(onResult);
  };

  const onResult = (data: any) => {
    // console.log()
    console.log(data.keyword)
    setKeyword(data.keyword);
    setEnriched_stroy(data.enriched_story);
    // setPictureUrl(data.picture_url)
    setPictureUrl("https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350");
    setHasResult(true);
  };

  const onBack = () => {
    setStory("");
    setKeyword([]);
    setPictureUrl("");
    setHasResult(false);
  };

  let displayedElement = null;

  if (hasResult) {
    displayedElement = (
      <Results enriched_story={enriched_story} onBack={onBack} story={story} keyword={keyword} picture_url={picture_url}/>
    );
  } else {
    displayedElement = <Forms setStory={setStory} onSubmit={onSubmit} />;
  }

  //   console.log(story);

  return (
    <>
      <h1>Dream Generator</h1>

      {displayedElement}
    </>
  );
};

export default Dream_generator_main;
