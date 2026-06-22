/**
 * Core server-side services (AI clients, clerk client wrappers, etc.)
 */
export const geminiService = {
  /**
   * Stub for generating content from Gemini Model
   * @param {string} prompt 
   * @returns {Promise<string>}
   */
  async generateText(prompt) {
    return `Gemini response stub for: ${prompt}`;
  }
};

export const clerkAuthService = {
  /**
   * Stub for verifying user session
   * @param {string} token 
   * @returns {Promise<object>}
   */
  async verifySessionToken(token) {
    return { userId: 'clerk_user_stub', active: true };
  }
};
