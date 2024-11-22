import Avatar from "react-avatar";
import account from "../assets/account.png";
import question from "../assets/question.png";
import pen from "../assets/pen.png";
import edit from "../assets/edit.png";
import comment from "../assets/comment.png";
import { auth, storage } from "../firebase/setup";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostPopup from "./PostPopup";

type searchProp = {
  search: any;
  menu: any;
};

const Rightbar = (props: searchProp) => {
  const questionRef = collection(storage, "questions");
  const [questionData, setQuestionData] = useState<any>([]);
  const [commentToggle, setCommentToggle] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [answers, setAnswers] = useState("");
  const [post, setPost] = useState(false);

  const getQuestion = async () => {
    try {
      const data = await getDocs(questionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuestionData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const answerDoc = doc(
    storage,
    "questions",
    `${questionId ? questionId : Math.random()}`
  );
  const answerRef = collection(answerDoc, "answers");

  const addAnswer = async () => {
    try {
      await addDoc(answerRef, {
        ans: answers,
        email: auth?.currentUser?.email,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getQuestion();
  }, [questionData]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Ask Section */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center">
          {auth?.currentUser?.emailVerified ? (
            <Avatar
              round
              size="35"
              className="cursor-pointer"
              name={auth?.currentUser?.email ?? account}
            />
          ) : (
            <Avatar
              round
              size="35"
              className="cursor-pointer"
              src={account}
            />
          )}
          <input
            onClick={() => setPost(true)}
            placeholder="What do you want to ask or share?"
            className="bg-gray-50 border border-gray-300 rounded-full w-full ml-4 px-4 py-2 placeholder-gray-600 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-around mt-4 text-sm text-gray-600">
          <div
            onClick={() => setPost(true)}
            className="flex items-center cursor-pointer hover:text-blue-500"
          >
            <img src={question} alt="Ask" className="w-5 h-5" />
            <h1 className="ml-2">Ask</h1>
          </div>
          <h1>|</h1>
          <div className="flex items-center hover:text-blue-500">
            <img src={edit} alt="Answer" className="w-5 h-5" />
            <h1 className="ml-2">Answer</h1>
          </div>
          <h1>|</h1>
          <div
            onClick={() => setPost(true)}
            className="flex items-center cursor-pointer hover:text-blue-500"
          >
            <img src={pen} alt="Post" className="w-5 h-5" />
            <h1 className="ml-2">Post</h1>
          </div>
        </div>
      </div>

      {/* Display Questions */}
      {questionData
        .filter((data: any) =>
          props?.search
            ? data?.question.includes(props?.search)
            : data?.question?.includes(props?.menu)
        )
        .map((data: any) => {
          return (
            <div
              key={data.id}
              className="bg-white mt-4 p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex items-center">
                <Avatar
                  round
                  size="35"
                  className="cursor-pointer"
                  name={data?.email ?? account}
                />
                <h1 className="ml-3 font-medium text-gray-700">
                  {data?.email?.substring(0, data.email.indexOf("@"))}
                </h1>
              </div>
              <h1 className="mt-4 ml-2 font-semibold text-gray-800">
                {data?.question}?
              </h1>
              <hr className="mt-3" />
              <div className="flex items-center mt-3 text-sm text-blue-600">
                <img
                  src={comment}
                  alt="Comment"
                  onClick={() => {
                    setQuestionId(data?.id);
                    setCommentToggle(true);
                  }}
                  className="w-5 h-5 cursor-pointer ml-3"
                />
                <Link to="/answers" state={{ id: data?.id }}>
                  <button className="border border-blue-400 text-blue-600 px-4 py-1 rounded-full ml-3 hover:bg-blue-100">
                    Answers
                  </button>
                </Link>
              </div>
              {commentToggle && (
                <div className="flex items-center mt-4">
                  <Avatar
                    round
                    size="35"
                    className="cursor-pointer"
                    name={auth?.currentUser?.email ?? account}
                  />
                  <input
                    onChange={(e) => setAnswers(e.target.value)}
                    placeholder="Add a comment"
                    className="bg-gray-50 border border-gray-300 rounded-full w-full ml-4 px-4 py-2 placeholder-gray-600 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    onClick={() => {
                      addAnswer();
                      setCommentToggle(false);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600"
                  >
                    Add comment
                  </button>
                </div>
              )}
              <hr className="mt-4" />
            </div>
          );
        })}
      {post && <PostPopup setPost={setPost} />}
    </div>
  );
};

export default Rightbar;
