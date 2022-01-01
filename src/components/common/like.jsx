import React from "react";

// Input: Liked: boolean
// Output: onClick
// Since this is a controlled component so make it statless functional component
// We can't use this in statless functional component so remove all this from props.
// Pass props as a parameter to statless functional component
const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }} // To change the cursor pointer to hand
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
