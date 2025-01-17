import { createContext, FC, useContext, useState } from "react";

type Message = {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
};

interface ChatBotContextType {
  messages: Message[];
  deleteMessage: (id: string) => void;
  resendMessage: (id: string) => void;
  addMessage: (text: string) => void;
}

const ChatBotContext = createContext<ChatBotContextType>({
  messages: [],
  deleteMessage: () => {},
  resendMessage: () => {},
  addMessage: () => {},
});

export const ChatBotProvider: FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    const timeoutId = setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text,
        timestamp: new Date(),
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg: Message) => msg.id !== id));
  };

  const resendMessage = (id: string) => {
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      setTimeout(() => addMessage(message.text), 1000);
    }
  };

  return (
    <ChatBotContext.Provider
      value={{ messages, deleteMessage, resendMessage, addMessage }}
    >
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBotContext = () => useContext(ChatBotContext);
