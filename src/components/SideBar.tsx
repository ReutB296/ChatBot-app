import { FC } from "react";
import { MessageType, useChatBotContext } from "../context/ChatBotContext";

interface SideBarProps {
  toggleSidebar: () => void;
}

export const SideBar: FC<SideBarProps> = ({ toggleSidebar }) => {
  const { messages, deleteMessage, resendMessage } = useChatBotContext();
  const userMessages = messages.filter((m) => m.isUser);

  return (
    <div className="w-64 bg-gray-50 border-l p-4">
      <div
        className="
                   cursor-pointer bg-white rounded-full 
                   shadow-md hover:shadow-lg
                   w-8 h-8 flex items-center justify-center
                   border border-gray-200
                   text-gray-600 hover:bg-gray-50"
        onClick={toggleSidebar}
      >
        <span className="text-xl font-semibold translate-y-[-2px]">‹</span>
      </div>

      <h2 className="font-bold mb-4 mt-2">Recent Messages</h2>
      <div className="space-y-2">
        {userMessages.map((message: MessageType) => (
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
