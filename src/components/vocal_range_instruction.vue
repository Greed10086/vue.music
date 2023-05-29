<template>
    <div class="container" style="width: 80%">
        <h1></h1>
        <h3 style="font-family: 'STKaiti', serif;">音域简介</h3>

        <h5 style="font-family: 'STKaiti', sans-serif;">何为音域</h5>

        <p style="font-family: 'Roboto', sans-serif; margin-left: 30px;">
            广义地讲,“音域”是特定声音可以产生的从最低音到最高音的跨度。
            在唱歌的背景下,歌手将音域描述为一个人可以唱歌的所有“音乐上有用的”音高。
        </p>

        <p class="card-panel grey lighten-4" style="font-family: 'Roboto', sans-serif; margin-left: 30px;">
            <!-- <i style="vertical-align: bottom;" class="material-icons">star</i> -->
            注意：当我们将音高写为 A2 时,这是科学音高记号(Scientific pitch notation,SPN)！使用音名(A至G)加上一个数字(表明所属八度)来标记音高。在这个系统中,中央 C 记做 C4,钢琴最左边的 A
            记做 A0。因此钢琴的前 12 个音符是第一个八度音阶,表示为 C1、D1、E1...
        </p>
        <h5 style="font-family: 'STKaiti', sans-serif;"> 音域有哪些类型？ </h5>

        <p style="font-family: 'Roboto', sans-serif; margin-left: 30px;">
            尽管每个人的音域都特定于他们的声音,但大多数音域都分为四种基本声音类型：
        <ul style="font-family: 'Roboto', sans-serif; margin-left: 60px; line-height:28px">
            <li>低音(Bass):最低的男声,E2 到 E4。 </li>
            <li>男高音(Tenor)：男声最高,B2 到 A4,可能更高。</li>
            <li>中音(Alto)：最低的女声,F3 到 E5。</li>
            <li>女高音(Soprano)：最高的女声,能够唱 C4 到 C6,甚至更高。</li>
        </ul>
        <p style="font-family: 'Roboto', sans-serif; margin-left: 30px;"> 在钢琴上可视化如下： </p>

        <img src="../assets/range.png" class="center" alt="Vocal range visualized on a piano" width="700"
            style="margin-left: 30px; display: block; margin-left: auto; margin-right: auto;">
        </p>

        <h5 style="font-family: 'STKaiti', sans-serif;"> 我的音域是多少？ </h5>

        <p style="font-family: 'Roboto', sans-serif; margin-left: 30px;">
            本教程帮你了解发声的弱点在哪里,并且通过高级课程,你将能够扩展你的音域范围。
            <br><br>
            通过一个快速练习来测量你的音域。请确保您有音频输入源并且浏览器有权访问麦克风。
            <br><br>
            <RouterLink to="/vocal_range/lowest" id="tabs-button-1" style="    margin-right: 10px;margin-bottom: 15px;"
                class="waves-effect waves-light btn-flat btn-large indigo lighten-5 switch-tab-btn">
                确定音域
                <i class="next-icon material-icons">navigate_next</i>
            </RouterLink>
        </p>
    </div>

    <h1></h1>
</template>
<script>
export default {
    name: 'vocal_range_instruction'
}
</script>
<style lang="css"></style>