<template>
    <div class="video-container box">
     <div v-for="(video, index) in videos" :key="index" class="challage">
      <div class="challage-left">
        <video
          ref="videoPlayer"
          controls
          width="290"
          @play="handlePlay(index)"
          @pause="handlePause(index)"
        >
          <source :src="require(`../assets/${video.filename}`)" :type="video.type">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="challage-right">
        <div class="top">
          <h2 style="font-family: 'STKaiti', serif;">{{ video.title }}</h2>
          <hr style="color: black; margin: 0.5rem 0; border: 2px solid; opacity: 0.65;" />
          <p style="font-family: 'Roboto', sans-serif; margin-bottom: 1.5rem;">{{ video.description }}</p>
        </div>
        <div class="down">
          <div class="player" @click="togglePlay(index)" style="margin-right: 20px;">
            <div class="shell">{{ video.isPlaying ? "停止播放" : "立即播放" }}</div>
          </div>
          <div class="player" @click="toggleFullscreen(index)">
            <div class="shell">全屏播放</div>
          </div>
        </div>
      </div>
     </div>
    </div>
</template>

<script>
export default {
  name: "video",
  data() {
    return {
      videos: [
        {
          title: "唱歌跑调是怎么回事",
          description: "\"音调训练基础入门\" - 在这个视频中，你将学习如何正确地训练和掌握音调。从了解音乐音阶和调式开始，通过各种练习来提高你的音调准确性和稳定性。这个视频适合初学者和有一定基础的学生，帮助你建立打好音调基础。",
          filename: "video1.mp4",
          type: "video/mp4",
          isPlaying: false
        },
        {
          title: "唱歌状态-打开内口腔",
          description: "\"发声技巧与音调控制\" - 这个视频将教授你关于发声技巧和音调控制的重要知识。你将学习如何正确运用腹式呼吸、声带松紧度和嘴唇舌位等技巧来达到所需的音调效果。这是一个针对想要提高声乐或演唱技巧的学生的实用指南。",
          filename: "video2.mp4",
          type: "video/mp4",
          isPlaying: false
        },
        {
          title: "腹式呼吸基础入门",
          description: "\"表达情感的音调技巧\" - 这个视频将教你如何运用音调来表达情感。你将学习如何在演唱中使用不同音调来传达不同的情绪和意义。通过示范和练习，你将培养出对音乐的感知能力，并学会如何用音调来体现你想要表达的情感。",
          filename: "video3.mp4",
          type: "video/mp4",
          isPlaying: false
        }
      ]
    };
  },
  methods: {
    togglePlay(index) {
      const video = this.$refs.videoPlayer[index];
      if (video.paused || video.ended) {
        video.play();
        this.videos[index].isPlaying = true;
      } else {
        video.pause();
        this.videos[index].isPlaying = false;
      }
    },
    toggleFullscreen(index) {
      const video = this.$refs.videoPlayer[index];
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    },
    handlePlay(index) {
        this.videos[index].isPlaying = true;
    },
    handlePause(index) {
        this.videos[index].isPlaying = false;
    },
  },
};
</script>
  
<style lang="css">
* {
    margin: 0px;
    padding: 0px;

}

a {
    text-decoration: none;
}

.box {
    /* height: 360px; */
    background-color: #f8f8f8;

}

.challage {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
    /* margin: 0px auto; */
    background-color: #f8f8f8;
}

.challage-left {
    width: 20%;
    margin-right: 3%;
}

.challage-right {
    width: 50%;
}

.challage>div {
    float: left;
}



/* 头像模块css */
.introduce {
    height: 80px;
}

.tou {
    float: left;
    height: 75px;
    width: 50px;
    margin: 0px 20px 0px 30px;
    padding-top: 5px;
    font-size: 10px;
    color: #666666;
}

.tou .png {
    position: relative;
    overflow: hidden;
    height: 50px;
    border-radius: 50%;
}

.tou .png img {
    height: 50px;
    width: 50px;
}

.tou span {
    display: inline-block;
    height: 25px;
    width: 50px;
    margin-top: 5px;
    text-align: center;
}


/* 按钮模块css */


.down .player {
    position: relative;
    float: left;
    height: 40px;
    width: 140px;
    /* margin: 85px 0px 0px; */
    border: none;
    border-radius: 20px;
    background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);
    /* background-color: #ff5c38; */
    cursor: pointer;
}

.down .player:hover {
    background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);
    /* background-color: #ff183e; */
}

.down .player .shell {
    position: absolute;
    z-index: 1;
    top: 8px;
    left: 37px;
}

.down .player .shell a {
    color: #ffffff;
}

.down .player .shell img {
    vertical-align: middle;
}

.down .blank {
    float: left;
    width: 1325px;
    height: 130px;
}

/* 隐藏模块 */
.tou {
    position: relative;
}

div[class^=brief] {
    position: absolute;
    z-index: 2;
    top: 80px;
    display: none;
    /* height: 250px;
            width: 490px; */
    height: 205px;
    width: 405px;
    box-shadow: 0 28px 50px rgb(25 24 40 / 35%)
}

div[class^=brief] img {
    height: 205px;
    width: 405px;
}

.tou:hover div[class^=brief] {
    display: block;
}

.brief1 {
    left: -15px;
}

.brief2 {
    left: -115px;
}

.brief3 {
    left: -175px;
}

.brief4 {
    left: -175px;
}

.brief5 {
    left: -175px;
}

.brief6 {
    left: -175px;
}

.brief7 {
    left: -265px;
}
</style>
