function ChatbotPlaceholder() {
  return (
    <section className="chatbot-placeholder">
      <h2>Team advisor</h2>
      <p>
        Coming soon: describe the kind of team you want and get AI-powered
        suggestions here.
      </p>
      <div className="chatbot-placeholder__input-mock">
        <input type="text" placeholder="e.g. a balanced fire and water team..." disabled />
        <button disabled>Ask</button>
      </div>
    </section>
  );
}

export default ChatbotPlaceholder;
