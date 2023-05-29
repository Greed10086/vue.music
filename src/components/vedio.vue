<template>
    <div class="box">
        <div class="challage">
            <div class="challage-left">
                <img src="../assets/test1.png" alt="">
            </div>
            <div class="challage-right">
                <div class="top">
                    <h2 style="font-family: 'STKaiti', serif;">
                        Music.Tonality
                    </h2>
                    <hr style="color: black;margin: 0.8rem 0;border: 2px solid;opacity: 0.65;" />
                    <p style="font-family: 'Roboto', sans-serif;margin-bottom: 3rem;">
                        基于 AI
                        的可视化声乐训练在线教练
                    </p>
                </div>
                <div class="down">
                    <div class="player">
                        <div class="shell">
                            <a href="#" target="_blank">
                                立即播放
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="challage">
            <div class="challage-left">
                <img src="../assets/test1.png" alt="">
            </div>
            <div class="challage-right">
                <div class="top">
                    <h2 style="font-family: 'STKaiti', serif;">
                        Music.Tonality
                    </h2>
                    <hr style="color: black;margin: 0.8rem 0;border: 2px solid;opacity: 0.65;" />
                    <p style="font-family: 'Roboto', sans-serif;margin-bottom: 3rem;">
                        基于 AI
                        的可视化声乐训练在线教练
                    </p>
                </div>
                <div class="down">
                    <div class="player">
                        <div class="shell">
                            <a href="#" target="_blank">
                                立即播放
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="challage">
            <div class="challage-left">
                <img src="../assets/test1.png" alt="">
            </div>
            <div class="challage-right">
                <div class="top">
                    <h2 style="font-family: 'STKaiti', serif;">
                        Music.Tonality
                    </h2>
                    <hr style="color: black;margin: 0.8rem 0;border: 2px solid;opacity: 0.65;" />
                    <p style="font-family: 'Roboto', sans-serif;margin-bottom: 3rem;">
                        基于 AI
                        的可视化声乐训练在线教练
                    </p>
                </div>
                <div class="down">
                    <div class="player">
                        <div class="shell">
                            <a href="#" target="_blank">
                                立即播放
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="challage">
            <div class="challage-left">
                <img src="../assets/test1.png" alt="">
            </div>
            <div class="challage-right">
                <div class="top">
                    <h2 style="font-family: 'STKaiti', serif;">
                        Music.Tonality
                    </h2>
                    <hr style="color: black;margin: 0.8rem 0;border: 2px solid;opacity: 0.65;" />
                    <p style="font-family: 'Roboto', sans-serif;margin-bottom: 3rem;">
                        基于 AI
                        的可视化声乐训练在线教练
                    </p>
                </div>
                <div class="down">
                    <div class="player">
                        <div class="shell">
                            <a href="#" target="_blank">
                                立即播放
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="challage">
            <div class="challage-left">
                <img src="../assets/test1.png" alt="">
            </div>
            <div class="challage-right">
                <div class="top">
                    <h2 style="font-family: 'STKaiti', serif;">
                        Music.Tonality
                    </h2>
                    <hr style="color: black;margin: 0.8rem 0;border: 2px solid;opacity: 0.65;" />
                    <p style="font-family: 'Roboto', sans-serif;margin-bottom: 3rem;">
                        基于 AI
                        的可视化声乐训练在线教练
                    </p>
                </div>
                <div class="down">
                    <div class="player">
                        <div class="shell">
                            <a href="#" target="_blank">
                                立即播放
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "vedio"
}
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
