export interface ChatMessage {
  role: "user" | "model";
  parts: { text?: string; inlineData?: { mimeType: string; data: string } }[];
}

export class GeminiTutor {
  private history: ChatMessage[] = [];

  async sendMessage(
    text: string,
    fileData?: { mimeType: string; data: string }
  ): Promise<string> {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          history: this.history,
          fileData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API Error:", data);
        return data?.error || "Xin lỗi, server gặp lỗi. Hãy thử lại sau.";
      }

      // Server trả về history mới để giữ ngữ cảnh
      if (Array.isArray(data.history)) {
        this.history = data.history;
      }

      return data.text || "Xin lỗi, tôi không thể xử lý yêu cầu này.";
    } catch (error: any) {
      console.error("Fetch Error:", error);
      return "Xin lỗi, tôi gặp sự cố kết nối. Hãy thử lại sau ít giây.";
    }
  }

  async resetChat(): Promise<string> {
    this.history = [];
    return this.sendMessage("Xin chào! Hãy hiển thị Menu luyện tập.");
  }

  getHistory() {
    return this.history;
  }
}

export const geminiTutor = new GeminiTutor();
