import { createContext, FC, useContext, useState } from "react";

export type MessageType = {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
};

interface ChatBotContextType {
  messages: MessageType[];
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
  const [messages, setMessages] = useState<MessageType[]>([]);

  const addMessage = (text: string) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    const timeoutId = setTimeout(() => {
      const botMessage: MessageType = {
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
    const messageToDelete = messages.find((msg: MessageType) => msg.id === id);
    if (messageToDelete) {
      const messageIndex = messages.findIndex(
        (msg: MessageType) => msg.id === id
      );
      const botResponse = messages[messageIndex + 1];

      setMessages((prev) =>
        prev.filter(
          (msg: MessageType) => msg.id !== id && msg.id !== botResponse?.id
        )
      );
    }
  };

  const resendMessage = (id: string) => {
    const message = messages.find((msg: MessageType) => msg.id === id);
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
