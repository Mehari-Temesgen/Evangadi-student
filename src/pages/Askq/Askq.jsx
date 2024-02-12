import React, { useState } from "react";
import "./Askq.css";
import { IoMdArrowDropleft } from "react-icons/io";
import { AiFillBackward } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createQuestion } from "../../api";
const Askq = () => {
  const [questions, setQuestions] = useState({
    title: "",
    description: "",
  });
  const { title, description } = questions;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await createQuestion(questions, token);
      setQuestions({
        title: "",
        description: "",
      });
      navigate("/forum");
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //forum
  return (
    <section className="forum">
      <div className="forum-main">
        <div className="forum-header askQ-header">
          <div className="askQ-rule">
            <h1>Step To Write A Good Questions</h1>
            <ul>
              <li>Summerize your problem in one-line title</li>
              <li>Describe your proble in more detail</li>
              <li>Describe what you tried and what you expected to happen</li>
              <li>Review your question and post it to the site</li>
            </ul>
          </div>
          <div>
            <Link to=".." relative="path">
              <IoMdArrowDropleft /> Back
            </Link>
          </div>
        </div>
        <div className="askQ-body">
          <div className="title">
            <h2>Ask A Public Questions</h2>
          </div>
          <form onSubmit={handlePost}>
            <input
              type="text"
              name="title"
              id=""
              placeholder="title"
              maxLength={50}
              value={title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              placeholder="Question Description"
              maxLength={500}
              value={description}
              onChange={handleChange}
            ></textarea>
            <div>
              <button
                type="submit"
                className="btn"
                disabled={questions.title.length === 0}
              >
                Post your Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Askq;
