
// --- Gemini API Call Function ---
export const callGeminiApi = async (prompt) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      return candidate.content.parts[0].text;
    } else {
      throw new Error("No valid response text received from API.");
    }
  } catch (error) {
    console.error("Gemini API call error:", error);
    return `Error: Could not get a response from AI. ${error.message}`;
  }
};
