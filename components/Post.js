import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BookmarkIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { async } from "@firebase/util";
import {
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImage, img, caption }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // const likethen = () => {
  //   setHasLiked(true);
  // };

  // const unlikethen = () => {
  //   setHasLiked(false);
  // };

  useEffect(
    //Likes
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.email) !== -1
      ),
    [likes]
  );

  // addLikes
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.email));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.email), {
        username: session.user.name,
        email: session.user.email,
      });
    }
  };

  useEffect(
    //Comments
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  //addcomments
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-6 border rounded-md">
      {/* Header */}
      <div className="flex items-center p-4">
        <Avatar src={userImage} className="mr-3" />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      {/* {hasliked ? ( */}
      <img
        src={img}
        onDoubleClick={likePost}
        className="object-cover w-full"
        alt=""
      />
      {/* ) : ( */}
      {/* <img */}
      {/* src={img} */}
      {/* onDoubleClick={(likePost, likethen)} */}
      {/* className="object-cover w-full" */}
      {/* alt="" */}
      {/* /> */}
      {/* )} */}

      {/* Buttons */}
      {session && (
        <div className="flex justify-between p-3 items-center">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {session &&
        likes.length > 0 &&
        (likes.length > 1 ? (
          <p className="pl-4 font-bold">{likes.length} likes</p>
        ) : (
          <p className="pl-4 font-bold">{likes.length} like</p>
        ))}

      {/* Captions */}
      <p className="pl-4 pb-3 pt-3 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* Comments */}
      {session && comments.length > 0 && (
        <div className="ml-6 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <Avatar
                className="h-7 w-7"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment className="text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <>
          {/* input Box */}
          <form className="flex p-4 items-center">
            <EmojiHappyIcon className="btn" />
            <input
              className="flex-1 border-none focus:ring-0 outline-none"
              type="text"
              value={comment}
              placeholder="Add a Comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              type="submit"
              disabled={!comment.trim()}
              onClick={sendComment}
              className="font-bold text-blue-400 normal-case"
            >
              Post
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

export default Post;
