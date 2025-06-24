// App.jsx
export default function ChatLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-md">
        <div className="p-4 font-bold text-xl border-b">Chats</div>
        <ul className="p-2 space-y-2 overflow-y-auto h-full">
          {["John", "Alice", "Bob"].map((name, i) => (
            <li key={i} className="p-2 rounded hover:bg-gray-100 cursor-pointer flex items-center gap-3">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt={name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="font-medium">{name}</div>
              <div className="text-sm text-gray-500">Last message...</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-4 border-b bg-white shadow-sm">
          <h2 className="font-semibold text-lg">John Doe</h2>
        </div>

        {/* Messages */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 chat-area" 
          style={{
            backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/054/750/896/large_2x/fun-multi-themed-pattern-design-free-vector.jpg")`,  
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
          {/* Incoming */}
          <div className="flex items-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="John"
              className="w-10 h-10 rounded-full object-cover mx-2"
            />
            <div className="bg-gray-200 p-3 rounded-lg max-w-md">Hey there!</div>
          </div>

          {/* Outgoing */}
          <div className="flex items-start justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-md">Hello! How are you?</div>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="John"
              className="w-10 h-10 rounded-full object-cover mx-2"
            />
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
