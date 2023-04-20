import axios from "axios";

class AliyunTTS {
  constructor({ accessKeyId, accessKeySecret }) {
    this.accessKeyId = accessKeyId;
    this.accessKeySecret = accessKeySecret;
    this.token = null;
  }

  async fetchToken() {
    if (this.token) {
      return this.token;
    }

    // ... implement your logic to fetch token here
    const response = await axios.get(
      `https://nls-meta.cn-shanghai.aliyuncs.com/?Signature=${signature}`
    );

    // ... set the token property
    this.token = response.data.token;

    return this.token;
  }

  async fetchTtsStream(text) {
    // ... implement your logic to fetch tts stream here
    const token = await this.fetchToken();
    const src = `https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts?appkey=${this.accessKeyId}&token=${token}&text=${text}`;

    return src;
  }
}

export { AliyunTTS };
