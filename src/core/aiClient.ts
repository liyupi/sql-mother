import { AIConfig, AIMessage, AIResponse, AIProvider } from "./ai.d";

const loadOpenAI = async () => {
  const module = await import("openai");
  return module.default;
};

const loadAnthropic = async () => {
  const module = await import("@anthropic-ai/sdk");
  return module.default;
};

const loadGoogleGenerativeAI = async () => {
  const module = await import("@google/generative-ai");
  return module.GoogleGenerativeAI;
};

export class AIClient {
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
  }

  async chat(
    messages: AIMessage[],
    onStream?: (chunk: string) => void
  ): Promise<AIResponse> {
    try {
      switch (this.config.provider) {
        case AIProvider.OPENAI:
          return await this.chatWithOpenAI(messages, onStream);
        case AIProvider.ANTHROPIC:
          return await this.chatWithAnthropic(messages, onStream);
        case AIProvider.GEMINI:
          return await this.chatWithGemini(messages, onStream);
        default:
          return {
            success: false,
            content: "",
            error: "Unknown AI provider",
          };
      }
    } catch (error: any) {
      console.error("AI request failed:", error);
      return {
        success: false,
        content: "",
        error: error?.message || "AI service call failed",
      };
    }
  }

  private async chatWithOpenAI(
    messages: AIMessage[],
    onStream?: (chunk: string) => void
  ): Promise<AIResponse> {
    const OpenAI = await loadOpenAI();
    const client = new OpenAI({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseURL,
      dangerouslyAllowBrowser: true,
    });

    if (onStream) {
      const stream = await client.chat.completions.create({
        model: this.config.model,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
      });

      let fullContent = "";
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullContent += content;
          onStream(content);
        }
      }

      return {
        success: true,
        content: fullContent,
      };
    }

    const response = await client.chat.completions.create({
      model: this.config.model,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    return {
      success: true,
      content: response.choices[0]?.message?.content || "",
    };
  }

  private async chatWithAnthropic(
    messages: AIMessage[],
    onStream?: (chunk: string) => void
  ): Promise<AIResponse> {
    const Anthropic = await loadAnthropic();
    const client = new Anthropic({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseURL,
      dangerouslyAllowBrowser: true,
    });

    const systemMessage = messages.find((msg) => msg.role === "system");
    const userMessages = messages.filter((msg) => msg.role !== "system");

    if (onStream) {
      const stream = await client.messages.create({
        model: this.config.model,
        max_tokens: 4096,
        system: systemMessage?.content,
        messages: userMessages.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        stream: true,
      });

      let fullContent = "";
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          const content = event.delta.text;
          fullContent += content;
          onStream(content);
        }
      }

      return {
        success: true,
        content: fullContent,
      };
    }

    const response = await client.messages.create({
      model: this.config.model,
      max_tokens: 4096,
      system: systemMessage?.content,
      messages: userMessages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    });

    const content =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    return {
      success: true,
      content,
    };
  }

  private async chatWithGemini(
    messages: AIMessage[],
    onStream?: (chunk: string) => void
  ): Promise<AIResponse> {
    const GoogleGenerativeAI = await loadGoogleGenerativeAI();
    const genAI = new GoogleGenerativeAI(this.config.apiKey);
    const model = genAI.getGenerativeModel({ model: this.config.model });

    const systemMessage = messages.find((msg) => msg.role === "system");
    const chatMessages = messages.filter((msg) => msg.role !== "system");
    const lastMessage = chatMessages[chatMessages.length - 1];

    if (!lastMessage) {
      return {
        success: false,
        content: "",
        error: "Please enter a message first",
      };
    }

    const history = chatMessages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history,
      systemInstruction: systemMessage?.content,
    });

    if (onStream) {
      const result = await chat.sendMessageStream(lastMessage.content);
      let fullContent = "";
      for await (const chunk of result.stream) {
        const content = chunk.text();
        if (content) {
          fullContent += content;
          onStream(content);
        }
      }
      return {
        success: true,
        content: fullContent,
      };
    }

    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    return {
      success: true,
      content: response.text(),
    };
  }

  async getModels(): Promise<string[]> {
    try {
      switch (this.config.provider) {
        case AIProvider.OPENAI: {
          const OpenAI = await loadOpenAI();
          const client = new OpenAI({
            apiKey: this.config.apiKey,
            baseURL: this.config.baseURL,
            dangerouslyAllowBrowser: true,
          });
          const response = await client.models.list();
          return response.data.map((model) => model.id);
        }
        default:
          return [];
      }
    } catch (error) {
      console.error("Failed to fetch model list:", error);
      return [];
    }
  }

  async testConnection(): Promise<AIResponse> {
    return await this.chat([
      {
        role: "user",
        content: 'Hello, please reply "connection ok"',
      },
    ]);
  }
}

export function createAIClient(config: AIConfig): AIClient {
  return new AIClient(config);
}
