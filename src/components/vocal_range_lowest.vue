<template>
    <div class="container" style="width: 80%; margin-left: 10%;">
        <h1></h1>
        <h3 style="font-family: 'STKaiti', serif;"> 音域 </h3>
        <h1></h1>

        <h5 id="vocal-range-title" style="font-family: 'STKaiti', sans-serif;"> 确定最低音高 </h5>

        <p style="font-family: 'Roboto', sans-serif; margin-left: 30px;">
            从 C4 开始直到 C2，将会听到每个音符的声音。单击开始之后，尝试用“啊”或“呣”一起唱，并尽可能将检测到的音符与播放的音符匹配。<br><br>
            <img src="../assets/colours.png" style="width: auto;" href="#" /> <br>
            青色指示器是正在测试的音高，紫色指示器是正在唱的音高。
        </p>

        <button style="display:none; margin-left: 30px;" id="stop"
            class="waves-effect waves-light btn-flat btn-large indigo lighten-5">结束练习</button>
        <button style="margin-left: 30px;" class="waves-effect waves-light btn-flat btn-large indigo lighten-5"
            id="practice">开始练习</button>

        <p style="margin-left: 30px;">最低音符：<span id="currentNote"></span> </p>
        <p style="margin-left: 30px; display: none;">当前分数：<span id="currentScore"></span> </p>
        <div style="margin-left: 30px;" id="main-container">
            <div id="note-container" style="position:absolute; font-family: 'STKaiti', sans-serif;"></div>
            <div id="sequencer" style="margin-left:35px;"></div>
        </div>
        <h3></h3>
        <div>
            <h6 id="pitch-result" style="font-family: 'STKaiti', sans-serif; margin-left: 30px;"> </h6> <br>
            <RouterLink to="/vocal_range/highest"><button id="next-button" style="margin-left: 30px; display: none;"
                    class="waves-effect waves-light btn-flat btn-large indigo lighten-5">下一步</button></RouterLink>

        </div>

        <h1></h1>

    </div>
</template>
<script>
import { freqToMidi } from "@tonaljs/midi";
export default {
    name: 'vocal_range_lowest',
    // import vocal_range_js from './assets/js/vocal_range.js'
    // window.onload = function () {
    mounted() {
        var melodyRnn = new music_rnn.MusicRNN(
            "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv"
        );
        let rnnLoaded = melodyRnn.initialize();
        var vizPlayer = new mm.Player();


        //globals
        let sequencerRowsHigh = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5', 'C6'];
        let sequencerRows = ['C4', 'B3', 'Bb3', 'A3', 'Ab3', 'G3', 'Gb3', 'F3', 'E3', 'Eb3', 'D3', 'Db3', 'C3', 'B2', 'Bb2', 'A2', 'Ab2', 'G2', 'Gb2', 'F2', 'E2', 'Eb2', 'D2', 'Db2', 'C2'];
        let sequencer;
        let notes = undefined;
        let current_col = 0;
        let prev;
        let score = 0;
        let current_note;
        let detected;
        let runPitch = false;
        let lowestNote = 60;
        let highestNote = 60;
        let isHigh = false;
        var title = document.getElementById('vocal-range-title').innerHTML;
        console.log(title);
        if (title.includes('highest')) {
            console.log("On highest pitch page")
            isHigh = true;
            sequencerRows = sequencerRowsHigh.reverse();
            // Remove display for next button
            var nxt = document.getElementById("next-button");
            nxt.style.display === "none"
            document.getElementById('pitch-result').innerHTML = "";
        }

        setupSequencer();
        generateNotes();

        async function generateNotes() {
            await rnnLoaded;
            var seed;
            if (isHigh) {
                seed = {
                    notes: [
                        { pitch: 60, startTime: 0.0, endTime: 2.0 },
                    ],
                    totalTime: 48.0
                };
                for (var i = 61, j = 2.0; i <= 86; i++, j += 2.0) {
                    seed.notes.push({ pitch: i, startTime: j, endTime: j + 2.0 })
                }
            } else {
                seed = {
                    notes: [
                        { pitch: 60, startTime: 0.0, endTime: 2.0 },
                    ],
                    totalTime: 48.0
                };
                for (var i = 59, j = 2.0; i >= 36; i--, j += 2.0) {
                    seed.notes.push({ pitch: i, startTime: j, endTime: j + 2.0 })
                }
            }
            notes = seed;
            setSequencerNotes();
        };

        document.getElementById("next-button").onclick = async () => {
            if (isHigh) {
                console.log("Going to results page")
                localStorage.setItem("highestNote", highestNote);
                document.getElementById("vocal-range-results").innerHTML =
                    `Your vocal range is ${Tonal.Midi.midiToNoteName(lowestNote)} - ${Tonal.Midi.midiToNoteName(highestNote)}`;
            } else {
                isHigh = true;
            }

        }

        document.getElementById("practice").onclick = async () => {
            sequencerStop();
            setSequencerNotes();
            sequencer.stepper = new Nexus.Counter(0, sequencer.columns);
            runPitch = true;
            let row;//add let
            if (isHigh) { row = sequencerRowsHigh.length - 1; }
            else { row = 0; }
            setup();
            vizPlayer = new mm.Player(false, {
                run: (note) => {
                    current_col = 0;
                    //sequencer.next();
                    detected = false;
                    console.log("setting false");
                    current_note = note;
                    if (isHigh) {
                        sequencer.matrix.set.cell(0, row, 1)
                        if (row < (sequencerRowsHigh.length - 1)) {
                            sequencer.matrix.set.cell(0, row + 1, 0)
                        }
                        row -= 1
                        console.log(row)
                    } else {
                        sequencer.matrix.set.cell(0, row, 1)
                        if (row > 0) {
                            sequencer.matrix.set.cell(0, row - 1, 0)
                        }
                        row += 1;
                    }

                },
                stop: () => {
                    sequencerStop();
                    pitchResult();
                }
            });

            vizPlayer.start(notes);
        };

        // Pitch Detection
        let audioContext;
        let mic;
        let pitch;
        let stream;

        async function setup() {
            audioContext = new AudioContext();
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            startPitch(stream, audioContext);
        }

        function startPitch(stream, audioContext) {
            pitch = ml5.pitchDetection('', audioContext, stream, modelLoaded);
        }

        function modelLoaded() {
            getPitch();
        }

        function getPitch() {
            pitch.getPitch(function (err, frequency) {
                if (frequency && current_note) {
                    midiNum = freqToMidi(frequency);
                    if (isHigh & midiNum >= highestNote) {
                        current = Tonal.Midi.midiToNoteName(midiNum)
                        highestNote = midiNum;
                        select('#currentNote').html(current);
                    }
                    if (!isHigh && midiNum <= lowestNote && midiNum >= (lowestNote - 4)) { // disregarding background noise which is usually very low pitched
                        current = Tonal.Midi.midiToNoteName(midiNum)
                        lowestNote = midiNum;
                        select('#currentNote').html(current);
                    }
                    if (prev) {
                        var row = getSequencerRow(frequency)
                        if (prev[0] == current_col) {
                            setDetected(prev[0], prev[1], false)
                        }
                        if (row > 0) {
                            setDetected(current_col, row, true);
                        }
                    }
                    prev = [current_col, getSequencerRow(frequency)]
                }
                if (runPitch) getPitch();
            })
        }

        document.getElementById("stop").onclick = async () => {
            sequencerStop();
            vizPlayer.stop();
            pitchResult();
        };

        function setDetected(col, row, on) {
            var id = (row * sequencer.columns) + 1; // + col
            var color = on ? "#7986cb" : "#eee";
            if (document.getElementById(`cell-${id}`)) {
                document.getElementById(`cell-${id}`).setAttribute('fill', color);
            }
        }

        function toggleButton(id) {
            var x = document.getElementById(id);
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }

        function getSequencerRow(freq) {
            let midiNum = freqToMidi(freq);//let            
            let current = Tonal.Midi.midiToNoteName(midiNum);//let
            // console.log(`midi ${midiNum} note ${current} row ${sequencerRows.indexOf(current)} col ${current_col}`)
            return sequencerRows.indexOf(current)
        }

        function sequencerStop() {
            current_col = 0;
            prev = null;
            runPitch = false;
            score = 0;
            toggleButton("stop")
            toggleButton("practice")
        }

        function setupSequencer() {
            let main_container = document.getElementById("note-container");
            var note;
            for (note of sequencerRows) {
                var temp = document.createElement('div');
                main_container.appendChild(temp);
                temp.className = "range-label";
                temp.innerText = note;
            }

            sequencer = new Nexus.Sequencer('#sequencer', {
                columns: 2,
                rows: sequencerRows.length,
                mode: 'toggle',
                size: [150, 425] // Each note is 20
            })
            const seqBlocks = document.getElementById("sequencer").querySelectorAll('rect');
            let num = 0;//更改的声明
            [].forEach.call(seqBlocks, function (item) {
                item.id = `cell-${num}`;
                num += 1;
            });
            console.log("done setup");
        }

        function setSequencerNotes() {
            sequencer.matrix.populate.all([0]);
            let column = 0;
            for (let note of notes.notes) {
                let midiNum = freqToMidi(note.pitch);//添加let
                let current = Tonal.Midi.midiToNoteName(midiNum);//添加let
                let row = getSequencerRow(Tone.Frequency(note.pitch, "midi").toFrequency())
                if (isHigh) {
                    sequencer.matrix.set.cell(column, sequencerRowsHigh.length - 1, 1);
                } else {
                    sequencer.matrix.set.cell(column, 0, 1);
                }
            }
        }

        function pitchResult() {
            if (isHigh) {
                let highestPitch = Tonal.Midi.midiToNoteName(highestNote)//add let
                document.getElementById('pitch-result').innerHTML =
                    `当前音域中的最高音高是 ${highestPitch}.`;
                // Store
                localStorage.setItem("highestNote", highestNote);
                var nxt = document.getElementById("next-button");
                if (nxt.style.display === "none") {
                    nxt.style.display = "block";
                }
            } else {
                let lowestPitch = Tonal.Midi.midiToNoteName(lowestNote)//add let
                document.getElementById('pitch-result').innerHTML =
                    `当前音域中的最低音高是 ${lowestPitch}.`;
                // Store
                localStorage.setItem("lowestNote", lowestNote);
                var nxt = document.getElementById("next-button");
                if (nxt.style.display === "none") {
                    nxt.style.display = "block";
                }
            }

        }
        //  }

    }
}
</script>
<style lang="css"></style>