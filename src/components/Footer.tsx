import { FC, useState } from "react";
import { useChatBotContext } from "../context/ChatBotContext";

interface FooterProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Footer: FC<FooterProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { addMessage } = useChatBotContext();

  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = () => {
    setIsLoading(true);
    addMessage(inputValue);
    setInputValue("");
    const timeoutId = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeoutId);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() && !isLoading) {
      handleSend();
    }
  };

  return (
    <footer className="flex items-center gap-4 p-4 bg-gray-200">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-32"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 border rounded focus:outline-none"
      />
      <button
        className={`px-4 py-2 rounded ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
        onClick={handleSend}
        disabled={isLoading || !inputValue.trim()}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </footer>
  );
};
