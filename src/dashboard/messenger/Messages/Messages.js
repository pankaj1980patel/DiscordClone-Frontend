import React from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./MessagesHeader";
import { connect } from "react-redux";
import Message from "./Message";
import DateSeparator from "./DateSeparator";
const MainContainer = styled("div")({
  height: "calc(100% - 64px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const convertDateToHumanRedable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};

const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MainContainer>
      <MessagesHeader name={chosenChatDetails?.name} />
      {messages.map((message, index) => {
        console.log("index === ", index);
        if (index > 0) {
          console.log(
            messages[index].author._id,
            "      ",
            messages[index - 1].author._id
          );
        }
        const sameAuthor =
          index > 0 &&
          messages[index].author._id === messages[index - 1].author._id;
        console.log(sameAuthor);
        const sameDay =
          index > 0 &&
          message.date.toString().slice(0, -14) ===
            messages[index - 1].date.toString().slice(0, -14);
        // console.log(message.date.toString().slice(0, -14));
        return (
          <div key={message._id} style={{ width: "97%" }}>
            {(!sameDay || index === 0) && (
              <DateSeparator date={message.date.toString().slice(0, -14)} />
            )}
            <Message
              key={message._id}
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              date={convertDateToHumanRedable(
                new Date(message.date),
                "dd/mm/yy"
              )}
              sameDay={sameDay}
            />
          </div>
        );
      })}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};
export default connect(mapStoreStateToProps)(Messages);
