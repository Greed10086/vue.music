<template>
    <div class="container">

        <blockquote
            style="border-left: 5px solid black; margin-top: 100px;margin-bottom: 50px;display: inline-block;width: 50%; margin-left: 150px;">
            <h2 style="font-family: 'STKaiti', serif;">
                Music.Tonality
            </h2>
            <hr style="color: black;margin: 0.8rem 0;border: 2px solid;opacity: 0.65;" />
            <p style="font-family: 'Roboto', sans-serif;">
                基于 AI 的可视化声乐训练在线教练
            </p>
            <p style="font-family: 'Roboto', sans-serif;">
                Tonal.js 提供乐理学习，p5.js 帮助提升多媒体处理能力，ml5.js 带来机器学习在网络浏览器中的新体验，通过 MusicRNN 模型生成随机的音乐进行声乐练习
            </p>
        </blockquote>
        <div style="display: inline; position: relative;">
            <router-link class="arrow" to="/lessons"
                style="display: inline-block;width: 180px;height: 90px;text-align: center;line-height: 90px;position: absolute;top: 50%;margin-left: 30px;margin-top: -75px;    font-size: 20px;color: white;text-decoration: none;">开始学习</router-link>
        </div>
        <h1></h1>
        <router-link data-title="确定音域" class="special_button" to="/vocal_range/instruction"></router-link>
        <router-link data-title="视频教学" class="special_button" to="/vedio"></router-link>
        <router-link data-title="最终测试" class="special_button" to="/test_1/test"></router-link>
    </div>
</template>
<script>
export default {
    name: 'index',
    mounted() {
        document.querySelectorAll('.special_button').forEach(aElem => {
            const docStyle = aElem.style
            const boundingClientRect = aElem.getBoundingClientRect()
            aElem.onmousemove = function (e) {
                const x = e.clientX - boundingClientRect.left
                const y = e.clientY - boundingClientRect.top

                const xc = boundingClientRect.width / 2
                const yc = boundingClientRect.height / 2

                const dx = x - xc
                const dy = y - yc

                docStyle.setProperty('--rx', `${dy / -1}deg`)
                docStyle.setProperty('--ry', `${dx / 10}deg`)

            }

            aElem.onmouseleave = function (e) {

                docStyle.setProperty('--ty', '0')
                docStyle.setProperty('--rx', '0')
                docStyle.setProperty('--ry', '0')

            }

            aElem.onmousedown = function (e) {

                docStyle.setProperty('--tz', '-25px')

            }

            document.body.onmouseup = function (e) {

                docStyle.setProperty('--tz', '-12px')

            }
        })
    }
}
</script>
<style lang="less">
.line {
    padding: 0 20px 0;
    margin: 20px 0;
    line-height: 1px;
    border-left: 200px solid #ddd;
    border-right: 200px solid #ddd;
    text-align: center;
}

.special_button {
    position: relative;
    display: inline-block;
    padding: 2em 2.5em;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    user-select: none;
    color: white;
    margin-left: 170px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        border-radius: 4px;
        transition: box-shadow .5s ease, transform .2s ease;
        will-change: transform;
        box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
        transform:
            translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(var(--tz, -12px));
    }

    &:hover::before {
        box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
    }

    &::after {
        position: relative;
        display: inline-block;
        content: attr(data-title);
        transition: transform .2s ease;
        font-weight: bold;
        letter-spacing: .01em;
        will-change: transform;
        transform:
            translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
    }
}

&.arrow {
    background: linear-gradient(45deg, #2ce2aa, #764db6);
    clip-path: polygon(0 0,
            30px 50%,
            0 100%,
            calc(100% - 30px) 100%,
            100% 50%,
            calc(100% - 30px) 0);
}

// body {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     // height: 100vh;
//     transform-style: preserve-3d;
//     transform: perspective(800px);
// }
</style>

