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
export default results