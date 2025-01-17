import { FC } from "react";
import { MessageType } from "../context/ChatBotContext";

type MessageProps = {
  message: MessageType;
};

export const Message: FC<MessageProps> = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`rounded-lg p-3 max-w-xs ${
          message.isUser ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <p>{message.text}</p>
        <span className="text-xs opacity-75">
          {message.timestamp.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
