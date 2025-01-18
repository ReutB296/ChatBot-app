# ChatBot Application

## Features

- Interactive chat interface with user and bot messages
- Sidebar with recent message history
- Message actions (resend, delete)

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Context API for state management

## Component Structure

- **App**: Main component orchestrating the layout
- **Header**: Displays username and title
- **Footer**: Contains input field and controls
- **MessageList**: Displays chat messages
- **Message**: Individual message component
- **Sidebar**: Shows message history with actions

## Usage

- Type a message in the input field and press Enter or click Send
- Toggle the sidebar using the button in the footer
- View message history in the sidebar
- Use Resend/Delete actions in the sidebar to manage messages
- Messages from the user appear on the right
- Bot responses appear on the left
