<template>
    <button class="menu-toggle" id="toggle-sidebar"></button>
    <div id="sidebar">
        <br />
        <hr />
        <a class="aa" href="/#/lesson_1/test1">
            <h6>第一节—音域自测</h6>
        </a>
        <hr />
        <a class="aa" href="/#/lesson_1/test2">
            <h6>第二节—C、D、E调</h6>
        </a>
        <hr />
        <a class="aa" href="/#/lesson_1/test3">
            <h6>第三节—C、D、E调进阶</h6>
        </a>
    </div>

    <div id="test4" style="    width: 1063.44px;margin-left: 273.45px;" class="col s12">
        <h1>第二节—C、D、E调</h1>
        <hr />
        <p style="font-family: 'STKaiti', sans-serif;">
            这一节也是C、D、E调,如果上一节测试成绩不理想或存在问题可观看教学视频后再进行这一节。 <br>
            请随意通过再次单击“开始”来多次尝试此序列。在进入下一个练习之前，试着要达到一个完美的分数！
        </p>
        <button class="waves-effect waves-light btn-flat btn-large indigo lighten-5 " id="stop-2"
            style="display:none">结束练习</button>
        <button class="waves-effect waves-light btn-flat btn-large indigo lighten-5 " id="practice-2">开始练习</button>

        <p class="score" style="display: inline-block;float: right;margin-top: 8px;margin-right: 150px;">当前分数 <span
                style="font-family: 'Roboto';">: </span> <span id="test4-score">-</span> / 6
        </p>
        <div class="main-container" style="margin: 0;height: 480px;" id="main-container-2">
            <div class="note-container" id="note-container-2"></div>
            <div class="sequencer" id="sequencer-2"></div>
        </div>
        <RouterLink to="/lesson_1/test3" id="tabs-button-4" style="    margin-right: 10px;margin-bottom: 15px;"
            class="waves-effect waves-light btn-flat btn-large indigo lighten-5 switch-tab-btn">
            下一节
            <i class="next-icon material-icons">navigate_next</i>
        </RouterLink>
    </div>
</template>
<script>
export default {
    name: 'lesson_1_test2',
    mounted() {

        const toggleSidebarBtn = document.getElementById('toggle-sidebar');
        const sidebar = document.getElementById('sidebar');

        toggleSidebarBtn.addEventListener('click', () => {
            toggleSidebarBtn.classList.toggle('is-active');
            sidebar.classList.toggle('show');
        });

        // import sequencer from './assets/js/sequencer.js'
        // import script from './assets/js/script.js'
        // window.onload = function () {
        class Sequencer {
            sequencerRows = ['Ab4', 'G4', 'Gb4', 'F4', 'E4', 'Eb4', 'D4', 'Db4', 'C4', 'B3', 'Bb3', 'A3', 'Ab3'];

            constructor(container_id, sequencer_id, cell_id, notes) {
                console.log(notes);
                let main_container = document.getElementById(container_id)
                var note;
                for (note of this.sequencerRows) {
                    var temp = document.createElement('div');
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

        // buttons.set('test1', { "practice": "practice", "stop": "stop" })
        buttons.set('test4', { "practice": "practice-2", "stop": "stop-2" })
        //  buttons.set('test5', { "practice": "practice-3", "stop": "stop-3" })

        let sequencer;

        async function initalizeNotes() {
            await rnnLoaded;

            //  notes.set('test1', practice1_notes())
            notes.set('test4', practice2_notes())
            // notes.set('test5', practice3_notes());
            //  sequencers.set('test1', new Sequencer('note-container', 'sequencer', 'cell1', practice1_notes().notes));
            sequencers.set('test4', new Sequencer('note-container-2', 'sequencer-2', 'cell2', practice2_notes().notes));
            //sequencers.set('test5', new Sequencer('note-container-3', 'sequencer-3', 'cell3', practice3_notes().notes));
        }

        initalizeNotes();

        // function practice1_notes() {
        //     return {
        //         notes: [
        //             { pitch: 60, startTime: 0.0, endTime: 2.0 },
        //             { pitch: 62, startTime: 2.0, endTime: 4.0 },
        //             { pitch: 64, startTime: 4.0, endTime: 6.0 },
        //             { pitch: 62, startTime: 6.0, endTime: 8.0 },
        //             { pitch: 60, startTime: 8.0, endTime: 10.0 },
        //             { pitch: 62, startTime: 10.0, endTime: 12.0 },
        //             { pitch: 64, startTime: 12.0, endTime: 14.0 },
        //         ],
        //         tempos: [{
        //             time: 0,
        //             qpm: 120
        //         }],
        //         totalTime: 14.0
        //     };
        // }


        function practice2_notes() {
            return {
                notes: [
                    { pitch: 60, startTime: 0.0, endTime: 3.0 },
                    { pitch: 62, startTime: 3.0, endTime: 6.0 },
                    { pitch: 64, startTime: 6.0, endTime: 9.0 },
                    { pitch: 60, startTime: 9.0, endTime: 12.0 },
                    { pitch: 62, startTime: 12.0, endTime: 15.0 },
                    { pitch: 64, startTime: 15.0, endTime: 18.0 },
                ],
                tempos: [{
                    time: 0,
                    qpm: 120
                }],
                totalTime: 18.0
            };
        }

        // function practice3_notes() {
        //     return {
        //         notes: [
        //             { pitch: 60, startTime: 0.0, endTime: 3.0 },
        //             { pitch: 62, startTime: 3.0, endTime: 6.0 },
        //             { pitch: 64, startTime: 6.0, endTime: 9.0 },
        //             { pitch: 62, startTime: 9.0, endTime: 12.0 },
        //             { pitch: 60, startTime: 12.0, endTime: 15.0 },
        //             { pitch: 62, startTime: 15.0, endTime: 18.0 },
        //             { pitch: 64, startTime: 18.0, endTime: 21.0 },
        //             { pitch: 62, startTime: 21.0, endTime: 24.0 },
        //             { pitch: 60, startTime: 24.0, endTime: 27.0 },
        //         ],
        //         tempos: [{
        //             time: 0,
        //             qpm: 120
        //         }],
        //         totalTime: 27.0
        //     };
        // }

        async function generateNotes(sequencer) {
            await rnnLoaded;
            let seed = {
                notes: [
                    { pitch: 60, startTime: 0.0, endTime: 4.0 },
                    { pitch: 62, startTime: 4.0, endTime: 8.0 },
                    { pitch: 64, startTime: 8.0, endTime: 12.0 },
                    { pitch: 62, startTime: 12.0, endTime: 16.0 },
                    { pitch: 60, startTime: 16.0, endTime: 20.0 },
                    { pitch: 62, startTime: 4.0, endTime: 8.0 },
                    { pitch: 64, startTime: 8.0, endTime: 12.0 },
                    { pitch: 62, startTime: 12.0, endTime: 16.0 },
                    { pitch: 60, startTime: 16.0, endTime: 20.0 },
                ],
                tempos: [{
                    time: 0,
                    qpm: 120
                }],
                totalTime: 3.0
            };

            var rnn_steps = 124; // (time span detection: rnn_steps-10)
            var rnn_temp = 0;
            var chord_prog = ['C'];
            const qns = mm.sequences.quantizeNoteSequence(seed, 1);

            var notes = await melodyRnn.continueSequence(qns, rnn_steps, rnn_temp, chord_prog);
            return notes
        };

        // document.getElementById("practice").onclick = () => {
        //     ;
        //     current_tab = "test1";
        //     startPractice("test1")
        // }

        document.getElementById("practice-2").onclick = () => {
            current_tab = "test4";
            startPractice("test4")
        }

        // document.getElementById("practice-3").onclick = () => {
        //     current_tab = "test5";
        //     startPractice("test5")
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
            getPitch();
        }

        function getPitch() {
            pitch.getPitch(function (err, frequency) {
                if (frequency && current_note) {
                    let midiNum = Tonal.Midi.freqToMidi(frequency);
                    let current = Tonal.Midi.midiToNoteName(midiNum)
                    if (prev) {
                        var row = sequencer.getSequencerRow(frequency)
                        if (prev[0] == current_col) {
                            sequencer.setDetected(prev[0], prev[1], false)
                        }
                        if (row > 0) {
                            sequencer.setDetected(current_col, row, true);

                            if (Math.round(midiNum) == current_note.pitch && !detected) {
                                detected = true;
                                score += 1;
                                $(score_label()).html(score);
                            }
                        }
                    }
                    prev = [current_col, sequencer.getSequencerRow(frequency)]
                }
                if (runPitch) getPitch();
            })
        }

        // document.getElementById("stop").onclick = async () => {
        //     sequencerStop();
        //     vizPlayer.stop();
        // };

        document.getElementById("stop-2").onclick = async () => {
            sequencerStop();
            vizPlayer.stop();
        };

        // document.getElementById("stop-3").onclick = async () => {
        //     sequencerStop();
        //     vizPlayer.stop();
        // };

        function toggleButton(id) {
            var x = document.getElementById(id);
            if (x.style.display === "none") {
                x.style.display = "inline-block";
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
        // var el = document.querySelector('.tabs');
        // var instance = M.Tabs.init(el, {});

        // document.getElementById("tabs-button-1").onclick = () => {
        //     document.getElementById('tab2').classList.remove("disabled")
        //     var el = document.querySelector('.tabs');
        //     var instance = M.Tabs.init(el, {});
        //     instance.select('tab2');
        //     instance.updateTabIndicator();
        // }
        // document.getElementById("tabs-button-2").onclick = () => {
        //     document.getElementById('tab3').classList.remove("disabled")
        //     var el = document.querySelector('.tabs');
        //     var instance = M.Tabs.init(el, {});
        //     instance.select('tab3');
        //     instance.updateTabIndicator();
        // }
        // document.getElementById("tabs-button-3").onclick = () => {
        //     document.getElementById('tab4').classList.remove("disabled")
        //     var el = document.querySelector('.tabs');
        //     var instance = M.Tabs.init(el, {});
        //     instance.select('tab4');
        //     instance.updateTabIndicator();
        //}
        // document.getElementById("tabs-button-4").onclick = () => {
        //     document.getElementById('tab5').classList.remove("disabled")
        //     var el = document.querySelector('.tabs');
        //     var instance = M.Tabs.init(el, {});
        //     instance.select('tab5');
        //     instance.updateTabIndicator();
        // }
        // }
    }
}
</script>
<style lang="css"></style>