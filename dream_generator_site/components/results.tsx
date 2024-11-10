interface ResultProps {
  story: string;
  enriched_story: string;
  picture_url: string;
  onBack: any;
}
const Results: React.FC<ResultProps> = (props) => {
  return (
    <>
      <div>
        <div>
          <b>Your story</b>
        </div>
        <div>{props.story}</div>
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
