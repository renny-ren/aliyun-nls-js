# aliyun-nls-js
Aliyun NLS (Natural Language Processing) JavaScript SDK for the Browser

## Usage

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
  playAudio(src)
}

<audio ref={audioRef}></audio>
<button onClick={playAudio}>play audio</button>
```
