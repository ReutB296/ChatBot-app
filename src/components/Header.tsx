import { FC } from "react";

interface HeaderProps {
  userName: string;
}

export const Headr: FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="bg-slate-500  shadow-md text-white py-4 px-6 text-center font-bold text-lg">
      <h1>Chatbot {userName}</h1>
    </header>
  );
};
