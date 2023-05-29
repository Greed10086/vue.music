<template>
    <div class="container" style="width: 90%">
        <h1></h1>
        <h3 style="font-family: 'STKaiti', serif;"> 音域 </h3>
        <h1></h1>

        <h5 id="vocal-range-title" style="font-family: 'STKaiti', sans-serif; margin-bottom: 20px;"> 音域测试结果<span
                style="font-family: 'Roboto';">: </span> <span id="vocal-range-results"> </span> </h5>

        <p id="vocal-range-exp" style="font-family: 'STKaiti', sans-serif; margin-left: 30px; font-size:18px;"> </p>

        <RouterLink to="/lessons"><button id="to-lessons" style="margin-left: 30px; margin-top: 30px;"
                class="waves-effect waves-light btn-flat btn-large indigo lighten-5">开始学习</button> </RouterLink>
    </div>
</template>
<script>
export default {
    name: 'vocal_range_results',
    mounted() {
        // import results from './assets/js/results.js'
        //Showing results from the vocal range test
        var lowestNote = localStorage.getItem('lowestNote');
        var highestNote = localStorage.getItem('highestNote');
        document.getElementById('vocal-range-results').innerHTML =
            `${Tonal.Midi.midiToNoteName(lowestNote)} - ${Tonal.Midi.midiToNoteName(highestNote)}`;


        var avgs = { "Bass": (50, 55), "Tenor": (56, 63), "Alto": (64, 68), "Soprano": (69, 75) }
        var type = voiceType(lowestNote, highestNote);
        var range = highestNote - lowestNote;
        var octaves = Math.round(range / 12);
        document.getElementById('vocal-range-exp').innerHTML =
            `音域跨越 ${range} 个音高，涵盖了大约 ${octaves} 个八度！ <br>
        尽管你的音域可能不完全适合一种声部，但这个音域最接近分类为 <span style="font-weight:800;">${type}</span> 声部。
        <br><br>
        这个音域并不是永久的，当你做更多的练习时，音域可以扩大。然而，我们的课程将考虑你的声部，并且只要求你在初级和中级课程的此范围内练习。`;

        function voiceType(lowest, highest) {
            var my_avg = (lowest + highest) / 2
            if (my_avg <= avgs["Bass"][1]) {
                return "低音（Bass）";
            } else if (avgs["Tenor"][0] <= my_avg && my_avg <= avgs["Tenor"][1]) {
                return "男高音（Tenor）";
            } else if (avgs["Alto"][0] <= my_avg && my_avg <= avgs["Alto"][1]) {
                return "中音（Alto）";
            } else {
                return "女高音（Soprano）";
            }
        }
    }
}
</script>
<style lang="css"></style>