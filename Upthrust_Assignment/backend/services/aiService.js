async function generateAIResponse(prompt) {
  // Simple mock for now
  return `AI says: ${prompt.slice(0, 40)}`;
}

module.exports = { generateAIResponse };