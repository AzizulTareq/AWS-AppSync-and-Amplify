import React from "react";
import "../../configureAmplify";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Auth, Hub } from "aws-amplify";

const Navbar = () => {
  const [signedUser, setSignedUser] = useState(false);

  useEffect(() => {
    authListener();
  }, [1]);

  const authListener = async () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedUser(true);
        case "signOut":
          return setSignedUser(false);
      }
    });
  };

  return (
    <nav
      className=" flex justify-center pt-3 pb-3
      space-x-4 border-b bg-cyan-500 border-gray-300s"
    >
      {[
        ["Home", "/"],
        ["Create Post", "/create-post"],
        ["Profile", "/profile"],
      ].map(([title, url], index) => (
        <Link href={url} key={index}>
          <a
            className="rounded-lg px-3 py-2
            text-slate-700 font-medium hover:bg-slage-100
            hover:text-slate-900"
          >
            {" "}
            {title}
          </a>
        </Link>
      ))}

      {signedUser && (
        <Link href="/my-posts">
          <a
            className="rounded-lg px-3 py-2 text-slate-700
                font-medium hover:bg-slage-100
                hover:text-slate-900"
          >
            My Post
          </a>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
