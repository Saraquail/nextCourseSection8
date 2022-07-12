import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;

    const body = { email, feedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback Address</label>
          <textarea
            type="feedback"
            id="email"
            rows="5"
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
    </div>
  );
}

export default HomePage;
