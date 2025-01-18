import { useState } from "react";

import { Footer } from "./components/Footer";
import { Headr } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { MessageList } from "./components/MessageList";
import { ChatBotProvider } from "./context/ChatBotContext";

function App() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <ChatBotProvider>
      <div className="h-screen flex flex-col">
        <Headr userName="Snow" />
        <div className="flex flex-1 overflow-hidden">
          <div
            className={`transition-all duration-300 ease-in-out
                       ${showSidebar ? "w-64" : "w-0"}`}
          >
            <SideBar
              toggleSidebar={() => setShowSidebar(!showSidebar)}
              isSidebarOpen={showSidebar}
            />
          </div>
          <MessageList />
        </div>
        <Footer
          toggleSidebar={() => setShowSidebar(!showSidebar)}
          isSidebarOpen={showSidebar}
        />
      </div>
    </ChatBotProvider>
  );
}

export default App;
