import React, { useEffect, useState } from "react";
import "./Answer.css";
import moment from "moment";
import "react-quill/dist/quill.snow.css";
import { createAnswer, getAnswers } from "../../api";
import { useOutletContext } from "react-router-dom";
import UserProfile from "../Userprofile/UserProfile";
const Answer = () => {
  const { questionid, addCommentCount } = useOutletContext();
  const [answers, setAnswers] = useState([]);
  const token = localStorage.getItem("token");
  const [answer, setAnswer] = useState({
    answer: "",
  });
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await createAnswer(answer, token, questionid);
      setAnswer({
        answer: "",
      });
      addCommentCount();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getAnswers(token, questionid)
        .then((data) => {
          setAnswers(data.answer);
          addCommentCount(data.answer.length);
        })
        .catch((err) => console.log(err));
    };
    // console.log(answers);
    fetchData();
  }, [token, questionid, answer]);

  const handleChange = (e) => {
    // setAnswer({ ...answer, answer: e });
    const { name, value } = e.target;
    setAnswer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="answer">
      <form onSubmit={handlePost}>
        <textarea
          className={`${!answer.answer && "comment-area"}`}
          name="answer"
          id=""
          cols="20"
          rows="6"
          value={answer.answer}
          onChange={handleChange}
          required
        ></textarea>
        {/* <ReactQuill
          className="text-area"
          value={answer.answer}
          onChange={handleChange}
          theme="snow"
          name="answer"
          placeholder="Answer Description"
        /> */}
        <button type="submit">Add To Comment</button>
      </form>
      <div className="small-height">
        {answers.length > 0 ? (
          answers?.map((data) => (
            <div className="question">
              <div className="question-header">
                <div className="question-user">
                  <div className="user-profile">
                    <UserProfile
                      username={data.username}
                      userid={data.userid}
                    />
                  </div>
                  <div className="user-name">
                    <h3>
                      by <span>{data.username}</span>
                    </h3>
                  </div>
                  <div className="created-at">
                    <h3>{moment(data.createdAt).fromNow()}</h3>
                  </div>
                </div>
              </div>
              <div className="question-body question-border">
                <p>{data.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Answer;
