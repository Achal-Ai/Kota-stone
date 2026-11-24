import { useChat } from './hooks/useChat'
import { FloatingChatTrigger } from './components/FloatingChatTrigger'
import { ChatWindow } from './components/ChatWindow'

export function FloatingChat() {
  const {
    isOpen,
    isThinking,
    unreadCount,
    messages,
    toggleChat,
    closeChat,
    clearChat,
    sendMessage,
    submitQuotation,
  } = useChat()

  return (
    <>
      <FloatingChatTrigger
        isOpen={isOpen}
        unreadCount={unreadCount}
        onToggle={toggleChat}
      />

      <ChatWindow
        isOpen={isOpen}
        isThinking={isThinking}
        messages={messages}
        onClose={closeChat}
        onClear={clearChat}
        onSend={sendMessage}
        onLeadSubmit={submitQuotation}
      />
    </>
  )
}
