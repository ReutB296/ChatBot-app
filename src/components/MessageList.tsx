import { FC, useEffect, useRef } from "react";
import { MessageType, useChatBotContext } from "../context/ChatBotContext";
import { Message } from "./Message";

export const MessageList: FC = () => {
  const { messages } = useChatBotContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message: MessageType) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
