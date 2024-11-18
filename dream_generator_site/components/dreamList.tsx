interface Dream {
  dream_id: string;
  keyword: string;
  story: string;
  picture_url?: string; // Optional since not all dreams may have a picture URL
}

interface DreamListProps {
  dreams: string;
  onBack: any;
}

const DreamList: React.FC<DreamListProps> = (props) => {
//   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//   console.log(props.dreams);
  console.log(typeof props.dreams);

  const parsedDreams: Dream[] = JSON.parse(props.dreams);

  return (
    <>
      <div className="p-6 max-w-lg mx-auto bg-blue-900 text-white rounded-lg shadow-lg space-y-4">
        {parsedDreams.map((dream) => (
          <div
            key={dream.dream_id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "10px 0",
            }}
          >
           <div>
  <h3>
    <span className="text-xl font-bold text-blue-500">Keyword:</span> {dream.keyword}
  </h3>
  <p>
  <span className="text-xl font-bold text-blue-500">Story:</span>
  <span
  className="block max-h-20 overflow-y-auto mt-2 text-gray-300 border border-gray-400 rounded p-2"
  style={{
    display: "inline-block",
    wordWrap: "break-word",
  }}
>
  {dream.story.split(' ').slice(0, 50).join(' ')}
  {dream.story.split(' ').length > 70 && (
    <span>
      ... <span className="text-sm italic">Scroll to view more</span>
    </span>
  )}
</span>

</p>

</div>

            {dream.picture_url && (
              <img
                src={dream.picture_url}
                alt={dream.keyword}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
          </div>
        ))}

        <button
          onClick={props.onBack}
          className="w-full mt-4 p-2 rounded-md text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transition ease-in-out duration-200"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default DreamList;
