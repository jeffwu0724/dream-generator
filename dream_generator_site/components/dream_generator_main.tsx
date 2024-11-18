"use client";
import React from "react";
import Forms from "./form";
import Results from "./results";
import DreamList from "./dreamList";

interface Dream {
  dream_id: string;
  keyword: string;
  story: string;
  picture_url?: string; // Optional since not all dreams may have a picture URL
}

const Dream_generator_main: React.FC = () => {
  const [story, setStory] = React.useState("");
  const [keyword, setKeyword] = React.useState([]);
  const [enriched_story, setEnriched_stroy] = React.useState("");
  const [picture_url, setPictureUrl] = React.useState("");
  const [hasResult, setHasResult] = React.useState(false);
  const [dreams, setDreams] = React.useState(""); // Ensure it's always an array

  const [hasList, setHasList] = React.useState(false);

  let temp_pic_url = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"

  const GENERATOR_ENDPOINT: string =
    "https://e8hwug3wkg.execute-api.us-west-1.amazonaws.com/prod/generate_keyword_and_story";

  const onSubmit = () => {
    fetch(`${GENERATOR_ENDPOINT}?story=${story}`)
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
      temp_pic_url
    );
    setHasResult(true);
  };

  const LIST_ENDPOINT: string =
    "https://9081imoip0.execute-api.us-west-1.amazonaws.com/prod/fetch_dreams";

  const onShowLists = () => {
    fetch(`${LIST_ENDPOINT}`)
      .then((result) => result.json())
      .then(onDisplay);
  };

  const onDisplay = (data: any) => {
    // console.log()
    console.log(data.body);
    console.log("??????????????????????");
    // console.log(data.Items)
    setDreams(data.body);
    setHasList(true);
  };

  const Add_ENDPOINT: string =
    "https://9081imoip0.execute-api.us-west-1.amazonaws.com/prod/add_dream";

  const onClickAdd = () => {
    console.log(keyword)
    console.log(story)
    console.log(picture_url)
    setPictureUrl(temp_pic_url)
    console.log(`${Add_ENDPOINT}?keyword=${keyword}&story=${enriched_story}&picture_url=${picture_url}`)
    
    fetch(`${Add_ENDPOINT}?keyword=${keyword}&story=${enriched_story}&picture_url=${picture_url}`);
      // .then((result) => result.json())
      // .then(onAddDream);
  };


  const onBack = () => {
    setStory("");
    setKeyword([]);
    setPictureUrl("");
    setHasResult(false);
    setHasList(false);
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
        onClickAdd={onClickAdd}
      />
    );
  } else if (hasList) {
    displayedElement = <DreamList dreams={dreams} onBack={onBack} />;
  } else {
    displayedElement = (
      <Forms
        setStory={setStory}
        onSubmit={onSubmit}
        onShowLists={onShowLists}
      />
    );
  }

  //   console.log(story);

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black to-blue-900">
        <div className="max-w-md w-full p-4">
          <div className="bg-blue-950 p-8 rounded-lg shadow-xl text-white">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold tracking-wide mb-4 text-blue-300">
                Dream Generator
              </h1>
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
