interface FromsProps {
  setStory: any;
  onSubmit: any;
}

const Forms: React.FC<FromsProps> = (props) => {
  return (
    <>
      
      <p>Tell me your dream briefly, we will generate a detailed one</p>
      <input
        type="text"
        placeholder="A labrador is eating spaghetti"
        onChange={(e) => props.setStory(e.currentTarget.value)}
      ></input>
      <button onClick={props.onSubmit}>Submit</button>
    </>
  );
};

export default Forms;
