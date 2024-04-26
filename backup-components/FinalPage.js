import { useState } from "react";
const FinalPage = ({ onNext }) => {
    const [feedback, setFeedback] = useState('');
  
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onNext({ feedback });
      }}>
        <label>Feedback: <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} /></label>
        <button type="submit">Submit</button>
      </form>
    );
  };

export default FinalPage;