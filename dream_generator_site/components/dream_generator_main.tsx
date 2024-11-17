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
    "https://e8hwug3wkg.execute-api.us-west-1.amazonaws.com/prod/generate_keyword_and_story";

  const onSubmit = () => {
    fetch(`${ENDPOINT}?story=${story}`)
      .then((result) => result.json())
      .then(onResult);
  };

  const onResult = (data: any) => {
    // console.log()
    console.log(data.keyword);
    setKeyword(data.keyword);
    setEnriched_stroy(data.enriched_story);
    // setPictureUrl(data.picture_url)
    setPictureUrl(
      "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
    );
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
      <Results
        enriched_story={enriched_story}
        onBack={onBack}
        story={story}
        keyword={keyword}
        picture_url={picture_url}
      />
    );
  } else {
    displayedElement = <Forms setStory={setStory} onSubmit={onSubmit} />;
  }

  //   console.log(story);

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black to-blue-900">
  <div className="max-w-md w-full p-4">
    <div className="bg-blue-950 p-8 rounded-lg shadow-xl text-white">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-wide mb-4 text-blue-300">Dream Generator</h1>
        <div className="bg-blue-800 p-6 rounded-md text-blue-100 shadow-inner">
          {displayedElement}
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default Dream_generator_main;
