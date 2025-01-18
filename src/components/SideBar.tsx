import { FC, useMemo } from "react";
import { MessageInterface, useChatBotContext } from "../context/ChatBotContext";

interface SideBarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const SideBar: FC<SideBarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { messages, deleteMessage, resendMessage } = useChatBotContext();

  const userMessages = useMemo(
    () =>
      messages
        .filter((m) => m.isUser)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    [messages]
  );

  return (
    <div
      className={`w-64 bg-gray-50 border-r h-full p-4 
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div
        className="absolute right-4 top-2 cursor-pointer"
        onClick={toggleSidebar}
      >
        <span className="text-xl font-semibold">×</span>
      </div>
      <h2 className="font-bold mb-4">Recent Messages</h2>
      <div className="space-y-2 overflow-y-auto h-[calc(100%-3rem)]">
        {userMessages.map((message: MessageInterface) => (
          <div key={message.id} className="p-2 bg-white rounded shadow">
            <p className="text-sm truncate">{message.text}</p>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => resendMessage(message.id)}
                className="text-xs text-blue-500"
              >
                Resend
              </button>
              <button
                onClick={() => deleteMessage(message.id)}
                className="text-xs text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
