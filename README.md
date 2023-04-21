# aliyun-nls-js
Aliyun NLS (Natural Language Processing) JavaScript SDK for the Browser

## Install

```bash
npm install aliyun-nls-js
```
or 

```bash
yarn add aliyun-nls-js
```

## Usage

#### 语音合成 
语音合成为您提供将输入文本合成为语音二进制数据的功能  
接口说明：https://help.aliyun.com/document_detail/84435.html?spm=a2c4g.84425.0.0.535d142aPbYXmF

```
fetchStream(text, voice = "")
```

```javascript
import { AliyunTTS } from "aliyun-nls-js"

const tts = new AliyunTTS({
  accessKeyId: <accessKeyId>,
  accessKeySecret: <accessKeySecret>,
  appKey: <appKey>,
})

const playAudio = (src) => {
  audioRef.current.src = src
  audioRef.current.play()
}

const handlePlay = async (message) => {
  const src = await tts.fetchStream("This is my text")
  // const src = await tts.fetchStream("This is my text", "kenny") # 可传入第二个参数 voice 选择人声
  playAudio(src)
}

<audio ref={audioRef}></audio>
<button onClick={playAudio}>play audio</button>
```
