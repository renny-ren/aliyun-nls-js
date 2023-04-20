import axios from "axios";
import CryptoJS from "crypto-js";

class AliyunTTS {
  constructor({ accessKeyId, accessKeySecret, appKey }) {
    this.accessKeyId = accessKeyId;
    this.accessKeySecret = accessKeySecret;
    this.appKey = appKey;
  }

  async fetchToken() {
    const parameters = {
      AccessKeyId: this.accessKeyId,
      Action: "CreateToken",
      Format: "JSON",
      RegionId: "cn-shanghai",
      SignatureMethod: "HMAC-SHA1",
      SignatureNonce: URL.createObjectURL(new Blob([])).slice(-36),
      SignatureVersion: "1.0",
      Timestamp: encodeURIComponent(new Date().toISOString()),
      Version: "2019-02-28",
    };
    const requestString = Object.keys(parameters)
      .sort()
      .map((key) => `${key}=${parameters[key]}`)
      .join("&");
    const signatureString = "GET&%2F&" + encodeURIComponent(requestString);
    const signature = CryptoJS.HmacSHA1(
      signatureString,
      this.accessKeySecret + "&"
    );
    const signatureBase64 = CryptoJS.enc.Base64.stringify(signature);

    const res = await axios.get(
      `https://nls-meta.cn-shanghai.aliyuncs.com/?Signature=${encodeURIComponent(
        signatureBase64
      )}&${requestString}`,
      {
        transformRequest: [
          (data, headers) => {
            delete headers["X-CSRF-Token"];
            return data;
          },
        ],
      }
    );
    return res.data.Token.Id;
  }

  async fetchStream(text, voice = "") {
    const token = await this.fetchToken();
    return `https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts?appkey=${
      this.appKey
    }&token=${token}&text=${encodeURIComponent(
      text
    )}&format=wav&volume=100&voice=${voice}`;
  }
}

export { AliyunTTS };
