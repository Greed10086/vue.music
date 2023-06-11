<template>
    <h2></h2>

    <div class="container" style="width: 70%;margin-left: 18%;">


        <h4 style="font-family: 'STKaiti', serif;">测试1 </h4>


        <!-- <div class="row">
        <div class="col s12">
            <ul class="tabs tabs-fixed-width">
                <li class="tab col s3">
                    <RouterLink to="/test_1/instruction" class="active">介绍</RouterLink>
                </li>
                <li id="test-tab" class="tab col s3 disabled">
                    <RouterLink to="/test_1/test">测试</RouterLink>
                </li>
            </ul>
        </div>
    </div> -->
        <div id="instructions" class="col s12" style="display:block;">
            <h1></h1>
            是时候进行你的第一次测试了！测试方式与你的练习课程相同。 <br>
            您将需要获得至少80%的分数，才能进入下一个模块。但是不要害怕，你可以随意尝试很多次测试。<br>
            注：每次你尝试这个测试时，你都会收到不同的音符旋律。
            <h1></h1>
            <!-- <RouterLink to="/test_1/test" id="test-button"
            class="waves-effect waves-light btn-flat btn-large indigo lighten-5 test-button">进入测试</RouterLink> -->
        </div>
    </div>
    <div id="test1" class="col s12" style="width: 70%;margin-left: 18%;">

        <h1></h1>

        <button class="waves-effect waves-light btn-flat btn-large indigo lighten-5 " id="stop"
            style="display:none">结束测试</button>
        <button class="waves-effect waves-light btn-flat btn-large indigo lighten-5 " id="practice">开始测试</button>

        <p id='status' style="display:none">加载模块...</p>

        <p style="display:none">现在分数: <span id="test1-currentNote"></span> </p>
        <p class="score" style="display: inline-block;float: right;margin-top: 8px;margin-right: 150px;">当前分数 <span
                style="font-family: 'Roboto';">: </span> <span id="test1-score">-</span> / {{ score }}</p>
        <div class="main-container" style="width: 100%;" id="main-container">
            <div class="note-container" style="margin: 0;height: 480px;" id="note-container"></div>
            <div class="sequencer" id="sequencer"></div>
        </div>


        <h1></h1>
        <RouterLink to="/" id="tabs-button-1" style="    margin-right: 10px;margin-bottom: 15px;"
            class="waves-effect waves-light btn-flat btn-large indigo lighten-5 switch-tab-btn">
            返回首页
            <i class="next-icon material-icons">navigate_next</i>
        </RouterLink>
        <!-- <RouterLink to="/"><i class="material-icons" style="vertical-align: top">keyboard_arrow_left</i>返回首页
        </RouterLink> -->
    </div>
</template>
<script>
export default {
    name: 'test_1_test',
    data() {
        return {
            score: "",
        }
    },
    mounted() {
        // import test from './assets/js/test.js'
        // import sequencer from './assets/js/sequencer.js'
        // window.onload = function () {


        // import Sequencer from './sequencer'; 
        var that = this;
        var melodyRnn = new music_rnn.MusicRNN(
            "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv"
        );
        let rnnLoaded = melodyRnn.initialize();
        var vizPlayer = new mm.Player();


        //globals
        let sequencers = new Map();
        let buttons = new Map();
        let notes = new Map();
        let current_tab;
        // let notes = undefined;
        let current_col;
        let prev;
        let score = 0;
        let current_note;
        let detected;
        let runPitch = false;

        buttons.set('test1', { "practice": "practice", "stop": "stop" })

        notes.set('test1', practice1_notes())
        let sequencer;

        async function initalizeNotes() {
            let practice4_notes = await generateNotes();
            notes.set('test4', practice4_notes);
            sequencers.set('test1', new Sequencer('note-container', 'sequencer', 'cell1', practice4_notes.notes));
        }

        initalizeNotes();

        function practice1_notes() {
            return {
                notes: [
                    { pitch: 60, startTime: 0.0, endTime: 4.0 },
                    { pitch: 62, startTime: 4.0, endTime: 8.0 },
                    { pitch: 60, startTime: 8.0, endTime: 12.0 },
                    { pitch: 62, startTime: 12.0, endTime: 16.0 },
                    { pitch: 60, startTime: 16.0, endTime: 20.0 },
                ],
                tempos: [{
                    time: 0,
                    qpm: 120
                }],
                totalTime: 20.0
            };
        }

        async function generateNotes(sequencer) {
            await rnnLoaded;
            let seed = {
                notes: [
                    { pitch: 60, startTime: 0.0, endTime: 4.0 },
                    { pitch: 62, startTime: 4.0, endTime: 8.0 },
                    { pitch: 60, startTime: 8.0, endTime: 12.0 },
                    { pitch: 62, startTime: 12.0, endTime: 16.0 },
                    { pitch: 60, startTime: 16.0, endTime: 20.0 },
                ],
                tempos: [{
                    time: 0,
                    qpm: 120
                }],
                totalTime: 20.0
            };

            var rnn_steps = 50; // (time span detection: rnn_steps-10)
            var rnn_temp = 1.0;
            var chord_prog = ['C'];
            const qns = mm.sequences.quantizeNoteSequence(seed, 1);

            var notes = await melodyRnn.continueSequence(qns, rnn_steps, rnn_temp, chord_prog);


            return notes
        };

        document.getElementById("practice").onclick = () => {
            ;
            current_tab = "test1";
            startPractice("test1")
        }

        // document.getElementById("practice-2").onclick = () => {
        //     current_tab = "test4";
        //     startPractice("test4")
        // }

        function startPractice(sequencer_id) {
            sequencer = sequencers.get(sequencer_id);
            sequencerStop();
            sequencer.resetSequencer();
            sequencer.resetCounter();
            runPitch = true;
            setup();
            vizPlayer = new mm.Player(false, {
                run: (note) => {
                    current_col += 1;
                    sequencer.next();
                    detected = false;
                    current_note = note;
                },
                stop: () => {
                    sequencerStop();
                }
            });

            vizPlayer.start(notes.get(current_tab));
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
            select('#status').html('Model Loaded');
            getPitch();
        }

        function getPitch() {
            pitch.getPitch(function (err, frequency) {
                if (frequency && current_note) {
                    let midiNum = freqToMidi(frequency);
                    let current = Tonal.Midi.midiToNoteName(midiNum)
                    $(`#${current_tab}-currentNote`).html(current);
                    if (prev) {
                        var row = sequencer.getSequencerRow(frequency)
                        if (prev[0] == current_col) {
                            sequencer.setDetected(prev[0], prev[1], false)
                        }
                        if (row > 0) {
                            sequencer.setDetected(current_col, row, true);
                            if (midiNum == current_note.pitch && !detected) {
                                detected = true;
                                score += 1;
                                select(score_label()).html(score);
                            }
                        }
                    }
                    prev = [current_col, sequencer.getSequencerRow(frequency)]
                }
                if (runPitch) getPitch();
            })
        }

        document.getElementById("stop").onclick = async () => {
            sequencerStop();
            vizPlayer.stop();
        };

        // document.getElementById("stop-2").onclick = async () => {
        //     sequencerStop();
        //     vizPlayer.stop();
        // };

        function toggleButton(id) {
            var x = document.getElementById(id);
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }

        function sequencerStop() {
            localStorage.setItem(score_label(), score);
            current_col = 0;
            prev = null;
            runPitch = false;
            score = 0;
            toggleButton(buttons.get(current_tab)["stop"]);
            toggleButton(buttons.get(current_tab)["practice"]);
        }

        function score_label() {
            return `#${current_tab}-score`
        }

        // Lesson Sections
        var el = document.querySelector('.tabs');
        var instance = M.Tabs.init(el, {});

        // document.getElementById("tabs-button").onclick = () => { 
        //     console.log("changed tab")
        //     var el = document.querySelector('.tabs');
        //     var instance = M.Tabs.init(el, {});
        //     instance.updateTabIndicator();
        // }
        class Sequencer {
            sequencerRows = ['Ab4', 'G4', 'Gb4', 'F4', 'E4', 'Eb4', 'D4', 'Db4', 'C4', 'B3', 'Bb3', 'A3', 'Ab3'];

            constructor(container_id, sequencer_id, cell_id, notes) {
                console.log(notes);
                that.score = notes.length;
                let main_container = document.getElementById(container_id)
                var note;
                for (note of this.sequencerRows) {
                    var temp = document.createElement('div');
                    // console.log(main_container.appendChild(temp));
                    main_container.appendChild(temp);
                    temp.className = "note-label";
                    temp.innerText = note;
                }

                let sequencer = new Nexus.Sequencer(sequencer_id, {
                    columns: notes.length,
                    rows: this.sequencerRows.length,
                    mode: 'toggle',
                    size: [700, 450]
                })
                const seqBlocks = document.getElementById(sequencer_id).querySelectorAll('rect');
                let num = 1;
                [].forEach.call(seqBlocks, function (item) {
                    item.id = `${cell_id}-${num}`;
                    num += 1;
                });
                this.sequencer = sequencer;
                this.notes = notes;
                this.cell_id = cell_id
                this.resetSequencer();
            };

            resetCounter() {
                this.sequencer.stepper = new Nexus.Counter(0, this.sequencer.columns);
            }

            next() {
                this.sequencer.next();
            }

            setDetected(col, row, on) {
                var id = (row * this.sequencer.columns) + col;
                var color = on ? "#7986cb" : "#eee";
                if (document.getElementById(`${this.cell_id}-${id}`)) {
                    document.getElementById(`${this.cell_id}-${id}`).setAttribute('fill', color);
                }
            }

            getSequencerRow(freq) {
                let midiNum = Tonal.Midi.freqToMidi(freq);
                let current = Tonal.Midi.midiToNoteName(midiNum);
                return this.sequencerRows.indexOf(current)
            }

            setSequencerNotes(notes) {
                this.notes = notes;
                this.resetSequencer();
            }

            resetSequencer() {
                this.sequencer.matrix.populate.all([0]);
                let column = 0;
                let midiNum, current;
                for (let note of this.notes) {
                    midiNum = Tonal.Midi.freqToMidi(note.pitch);
                    current = Tonal.Midi.midiToNoteName(midiNum)
                    let row = this.getSequencerRow(Tone.Frequency(note.pitch, "midi").toFrequency())
                    if (row >= 0) {
                        this.sequencer.matrix.set.cell(column, row, 1);
                        column += 1;
                    }
                }
            }
        }
        // }
    }
}
</script>