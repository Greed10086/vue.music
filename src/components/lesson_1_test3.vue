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

    <div id="test5" style="    width: 1063.44px; margin-left: 273.45px;" class="col s12">
        <h1>第三节—C、D、E调进阶</h1>
        <hr />
        <p style="font-family: 'STKaiti', sans-serif;">
            这是另一个练习关于序列的前三个音符-C、D和E。 <br>
            它更加复杂,通过它试试你是否已经掌握了C、D、E调。
        </p>
        <button class="waves-effect waves-light btn-flat btn-large indigo lighten-5 " id="stop-3"
            style="display:none">结束练习</button>
        <button class="waves-effect waves-light btn-flat btn-large indigo lighten-5 " id="practice-3">开始练习</button>

        <p class="score" style="display: inline-block;float: right;margin-top: 8px;margin-right: 150px;">当前分数 <span
                style="font-family: 'Roboto';">: </span> <span id="test5-score">-</span> / 9
        </p>
        <div class="main-container" style="margin: 0;height: 480px;" id="main-container-3">
            <div class="note-container" id="note-container-3"></div>
            <div class="sequencer" id="sequencer-3"></div>
        </div>
        <RouterLink to="/lessons" id="tabs-button-1" style="    margin-right: 10px;margin-bottom: 15px;"
            class="waves-effect waves-light btn-flat btn-large indigo lighten-5 switch-tab-btn">
            返回选择界面
            <i class="next-icon material-icons">navigate_next</i>
        </RouterLink>
    </div>
</template>
<script>
export default {
    name: 'lesson_1_test3',
    mounted() {

        const toggleSidebarBtn = document.getElementById('toggle-sidebar');
        const sidebar = document.getElementById('sidebar');

        toggleSidebarBtn.addEventListener('click', () => {
            toggleSidebarBtn.classList.toggle('is-active');
            sidebar.classList.toggle('show');
        });

        class Sequencer {
            sequencerRows = ['High','Ab4', 'G4', 'Gb4', 'F4', 'E4', 'Eb4', 'D4', 'Db4', 'C4', 'B3', 'Bb3', 'A3', 'Ab3','Low'];

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
                    size: [700, 520]
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
                if(typeof freq === 'string'){
                    return this.sequencerRows.indexOf(freq);
                }
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

        let mediaRecorder;
      let audioChunks = [];
      let audioContext;
      let analyser;
      let bufferLength;
      let dataArray;
      let updateTimeout;
      
// 保存当前音频元素的引用
let currentAudioElement = null;

      // 添加缺失的变量
      let pitchSum = 0;
      let pitchCount = 0;

      // 在全局定义 sampleRate 和 fftSize
      let sampleRate;
      let fftSize;
       
      buttons.set('test5', { "practice": "practice-3", "stop": "stop-3" })

        let sequencer;

        async function initializeNotes() {
            await rnnLoaded;

            notes.set('test5', practice3_notes());
            sequencers.set('test5', new Sequencer('note-container-3', 'sequencer-3', 'cell3', practice3_notes().notes));
        }

        initializeNotes();

        function practice3_notes() {
            return {
                notes: [
                    { pitch: 60, startTime: 0.0, endTime: 3.0 },
                    { pitch: 62, startTime: 3.0, endTime: 6.0 },
                    { pitch: 64, startTime: 6.0, endTime: 9.0 },
                    { pitch: 62, startTime: 9.0, endTime: 12.0 },
                    { pitch: 60, startTime: 12.0, endTime: 15.0 },
                    { pitch: 62, startTime: 15.0, endTime: 18.0 },
                    { pitch: 64, startTime: 18.0, endTime: 21.0 },
                    { pitch: 62, startTime: 21.0, endTime: 24.0 },
                    { pitch: 60, startTime: 24.0, endTime: 27.0 },
                ],
                tempos: [{
                    time: 0,
                    qpm: 120
                }],
                totalTime: 27.0
            };
        }

        document.getElementById("practice-3").onclick = () => {
            current_tab = "test5";
            startPractice("test5")
        }

        function startPractice(sequencer_id) {
            sequencer = sequencers.get(sequencer_id);
            sequencerStop();
            sequencer.resetSequencer();
            sequencer.resetCounter();
            runPitch = true;
            startRecording();
            vizPlayer = new mm.Player(false, {
                run: (note) => {
                    current_col += 1;
                    sequencer.next();
                    detected = false;
                    current_note = note;
                },
                stop: () => {
                    sequencerStop();
                    stopRecording();
                }
            });

            vizPlayer.start(notes.get(current_tab));
        };


        document.getElementById("stop-3").onclick = async () => {
            sequencerStop();
            vizPlayer.stop();
            stopRecording();
        };

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

        function startRecording() {
        audioChunks = [];
        pitchSum = 0;
        pitchCount = 0;

        // 在 startRecording 函数内部添加以下代码
        updateTimeout = setInterval(analyzePitch, 1); 

        function analyzePitch() {
          // 在 analyzePitch 函数内部添加检查是否有有效 dataArray
          if (!dataArray) {
            console.error('No dataArray available');
            return;
          }

          analyser.getByteFrequencyData(dataArray);

          const pitch = getPitch(dataArray);
          pitchSum += pitch;
          pitchCount++;

          // 在这里添加一个条件，以确保每100ms计算一次平均音调
          if (pitchCount === 100) {
            const averagePitch = pitchSum / pitchCount;

               // 检查是否有错误，并且获取到了频率信息
    if ( current_note) { 
      // 将频率转换为 MIDI 数字
      let midiNum = averagePitch.toFixed(2);
      // 将 MIDI 数字转换为音符名
      let current = mapToPitchRange(averagePitch.toFixed(2));
       console.log(current)
      // 如果前一个音符存在
      if (prev) {
        // 获取当前频率所在的行
        var row = sequencer.getSequencerRow(current);

        // 如果前一个频率对应的列和当前列相同
        if (prev[0] == current_col) {
          // 取消前一个频率的检测状态
          sequencer.setDetected(prev[0], prev[1], false);
        }

        // 如果当前频率在有效的行上
        if (row > 0) {
          // 设置当前频率的检测状态为 true
          sequencer.setDetected(current_col, row, true);

          // 如果 MIDI 数字与当前音符的 MIDI 数字相等，并且之前未检测到
          if (current == mapToPitchRange2(current_note.pitch) && !detected) {
            // 标记为已检测到
            detected = true;

            // 增加得分
            score += 1;
            // 更新得分显示
            $(score_label()).html(score);
          }
        }
      }

      // 更新前一个频率的信息
      prev = [current_col, sequencer.getSequencerRow(current)];
    }

    // 如果标志 runPitch 为真，递归调用 getPitch 函数
    // if (runPitch) getPitch();

            pitchSum = 0;
            pitchCount = 0;
          }
        }

        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();

            analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048; // 设置 FFT 大小
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength); // 设置 dataArray

            // 保存 sampleRate 和 fftSize
            sampleRate = audioContext.sampleRate;
            fftSize = analyser.fftSize;

            const microphone = audioContext.createMediaStreamSource(stream);

            microphone.connect(analyser);
            analyser.connect(audioContext.destination);

            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                audioChunks.push(event.data);
              }
            };

            mediaRecorder.onstop = () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
              const audioUrl = URL.createObjectURL(audioBlob);

              const audioElement = new Audio(audioUrl);
              audioElement.controls = true;
              
              // 获取元素的引用
const practiceButton = document.getElementById('practice-3');
const scoreElement = document.getElementById('test5-score');


    // 移除当前音频元素（如果存在）
    if (currentAudioElement) {
        currentAudioElement.parentNode.removeChild(currentAudioElement);
    }

      // 为新音频元素分配唯一的 ID
      const newAudioId = 'unique_audio_id_' + Date.now();
      audioElement.id = newAudioId;

       // 设置样式
       //audioElement.style.marginTop = '25px';
       audioElement.style.marginLeft = '120px';
       audioElement.style.verticalAlign = 'bottom';
    // 插入到指定位置
    practiceButton.insertAdjacentElement('afterend', audioElement);

    // 更新当前音频元素的引用
    currentAudioElement = audioElement;
              analyser.disconnect();

              analyzePitch();
            };

            mediaRecorder.start();
          })
          .catch((error) => {
            console.error('Error accessing microphone:', error);
          });
      }

      function stopRecording() {
        mediaRecorder.stop();
        if(updateTimeout) clearInterval(updateTimeout);
      }

      function getPitch(dataArray) {
        const validValues = getValidValues(dataArray);

        // 计算有效数字的平均值
        const sum = validValues.reduce((acc, val) => acc + val, 0);
        const average = sum / validValues.length;

        // 确保 average 不为 NaN 或 Infinity，并且分母不为零
        if (!isNaN(average) && isFinite(average) && validValues.length !== 0) {
          const frequency = average * audioContext.sampleRate / analyser.fftSize;
          return frequency;
        } else {
          console.error('Invalid average:', average);
          return 0; // 默认返回0
        }
      }

      function getValidValues(dataArray) {
        const validValues = [];

        // 遍历 dataArray 获取有效数字
        for (let i = 0; i < dataArray.length; i++) {
          const val = dataArray[i];
          if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
            validValues.push(val);
          } else {
            console.error('Invalid value at index', i, ':', val);
          }
        }

        return validValues;
      }

      function mapToPitchRange(pitch) {
     // 定义音调范围
     const pitchRange = ['Ab4', 'G4', 'Gb4', 'F4', 'E4', 'Eb4', 'D4', 'Db4', 'C4', 'B3', 'Bb3', 'A3', 'Ab3'];

    // 获取 pitch 的 MIDI 值
  const pitchMidi = Tone.Frequency(pitch).toMidi();

  // 阈值范围
  const threshold = 1;
  if(pitchMidi < Tone.Frequency(pitchRange[pitchRange.length - 1]).toMidi()){
        return 'Low'
      }
   if(pitchMidi > Tone.Frequency(pitchRange[0]).toMidi()){
        return 'High'
      }

  // 根据 pitchRange 映射到指定范围的音符
  for (let i = 0; i < pitchRange.length; i++) {
    const rangeMidi = Tone.Frequency(pitchRange[i]).toMidi();
    if (pitchMidi - rangeMidi < threshold&&pitchMidi - rangeMidi>=0) {
        return pitchRange[i];
    }    
  }

}
function mapToPitchRange2(pitch) {
     // 定义音调范围
     const pitchRange = ['Ab4', 'G4', 'Gb4', 'F4', 'E4', 'Eb4', 'D4', 'Db4', 'C4', 'B3', 'Bb3', 'A3', 'Ab3'];

     // 获取 pitch 的 MIDI 值
  const pitchMidi = pitch;
  const threshold = 1;
  if(pitchMidi < Tone.Frequency(pitchRange[pitchRange.length - 1]).toMidi()){
        return 'Low'
      }
   if(pitchMidi > Tone.Frequency(pitchRange[0]).toMidi()){
        return 'High'
      }

  // 根据 pitchRange 映射到指定范围的音符
  for (let i = 0; i < pitchRange.length; i++) {
    const rangeMidi = Tone.Frequency(pitchRange[i]).toMidi();
    if (pitchMidi - rangeMidi < threshold&&pitchMidi - rangeMidi>=0) {
        return pitchRange[i];
    }    
  }
  }  
    }
}
</script>
<style lang="css"></style>