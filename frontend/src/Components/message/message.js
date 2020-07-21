import React from "react";

export const Message = (props) => {
  const { right, img, content, time } = props;

  return (
    <div className={right ? "right" : ""}>
      <div className={"message new"}>
        <figure className={"avatar"}>
          <img src={img} alt="" />
        </figure>
        {content}
        <div className={"timestamp"}>{time}</div>
      </div>
    </div>
  );
};
