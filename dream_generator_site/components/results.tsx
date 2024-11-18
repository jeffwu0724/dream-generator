interface ResultProps {
  story: string;
  keyword: string[];
  enriched_story: string;
  picture_url: string;
  onBack: any;
  onClickAdd: any;
}
const Results: React.FC<ResultProps> = (props) => {
  const keywordElements = [];
  // for (let i = 0; i < props.keyword.length; i++) {
  //   const element = <div key={i}>{props.keyword[i]}</div>;
  //   keywordElements.push(element);
  // }
  // Join the keywords with a space
  const keywordsString = props.keyword.join(", ");

  // Render the keywords in a single div
  const element = <div key="keywords">{keywordsString}</div>;
  keywordElements.push(element);

  return (
    <>
      <div className="p-6 max-w-lg mx-auto bg-blue-900 text-white rounded-lg shadow-lg space-y-4">
        <div>
          <b className="text-blue-300 text-lg">Your story</b>
          <div className="mt-1 text-blue-100">{props.story}</div>
        </div>

        <div>
          <b className="text-blue-300 text-lg">Keyword</b>
          <div className="mt-1 text-blue-100">{keywordElements}</div>
        </div>

        <div>
          <b className="text-blue-300 text-lg">Enriched story</b>
          <div className="mt-1 text-blue-100">{props.enriched_story}</div>
        </div>

        <div>
          <b className="text-blue-300 text-lg">Picture</b>
          <div className="mt-1">
            <img
              src={props.picture_url}
              alt="new"
              className="rounded-md shadow-md"
            />
          </div>
        </div>

        <button
          onClick={props.onBack}
          className="w-full mt-4 p-2 rounded-md text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transition ease-in-out duration-200"
        >
          Back
        </button>

        <button
          onClick={props.onClickAdd}
          className="w-full mt-4 p-2 rounded-md text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transition ease-in-out duration-200"
        >
          Add to list
        </button>
      </div>
    </>
  );
};

export default Results;
