interface ResultProps {
  story: string;
  keyword: string[]
  enriched_story: string;
  picture_url: string;
  onBack: any;
}
const Results: React.FC<ResultProps> = (props) => {
  const keywordElements = [];
  // for (let i = 0; i < props.keyword.length; i++) {
  //   const element = <div key={i}>{props.keyword[i]}</div>;
  //   keywordElements.push(element);
  // }
  // Join the keywords with a space
  const keywordsString = props.keyword.join(', ');

  // Render the keywords in a single div
  const element = <div key="keywords">{keywordsString}</div>;
  keywordElements.push(element);

  return (
    <>
      <div>
        <div>
          <b>Your story</b>
        </div>
        <div>{props.story}</div>
        <div>
          <b>Keyword</b>
        </div>
        <div>{keywordElements}</div>
        <div>
          <b>Enriched story</b>
        </div>
        <div>{props.enriched_story}</div>
        <div>
          <b>picture</b>
        </div>
        <div><img 
      src={props.picture_url}
      alt="new"
      /></div>

        <button onClick={props.onBack}>Back</button>
      </div>
    </>
  );
};

export default Results;
