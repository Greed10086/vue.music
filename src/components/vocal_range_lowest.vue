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
                    `你的音域是 ${Tonal.Midi.midiToNoteName(lowestNote)} - ${Tonal.Midi.midiToNoteName(highestNote)}`;
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
            startRecording();
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
                    stopRecording();
                    pitchResult();
                }
            });

            vizPlayer.start(notes);
        };

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
       if (isHigh & midiNum >= highestNote) {
                        highestNote = midiNum;
                        $('#currentNote').html(current);
                    }
        if (!isHigh && midiNum <= lowestNote && midiNum >= (lowestNote - 4)) { // disregarding background noise which is usually very low pitched
                        lowestNote = midiNum;
                        $('#currentNote').html(current);
                    }
      // 如果前一个音符存在
      if (prev) {
        // 获取当前频率所在的行
        var row = getSequencerRow(current);

        // 如果前一个频率对应的列和当前列相同
        if (prev[0] == current_col) {
          // 取消前一个频率的检测状态
          setDetected(prev[0], prev[1], false);
        }

        // 如果当前频率在有效的行上
        if (row > 0) {
          // 设置当前频率的检测状态为 true
          setDetected(current_col, row, true);
          }
        }
      // 更新前一个频率的信息
      prev = [current_col, getSequencerRow(current)];
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
const practiceButton = document.getElementById('practice');
const scoreElement = document.getElementById('currentScore');


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
     const pitchRange = ['C4', 'B3', 'Bb3', 'A3', 'Ab3', 'G3', 'Gb3', 'F3', 'E3', 'Eb3', 'D3', 'Db3', 'C3', 'B2', 'Bb2', 'A2', 'Ab2', 'G2', 'Gb2', 'F2', 'E2', 'Eb2', 'D2', 'Db2', 'C2'];

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
     const pitchRange = ['C4', 'B3', 'Bb3', 'A3', 'Ab3', 'G3', 'Gb3', 'F3', 'E3', 'Eb3', 'D3', 'Db3', 'C3', 'B2', 'Bb2', 'A2', 'Ab2', 'G2', 'Gb2', 'F2', 'E2', 'Eb2', 'D2', 'Db2', 'C2'];

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

        document.getElementById("stop").onclick = async () => {
            sequencerStop();
            vizPlayer.stop();
            stopRecording();
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
                if(typeof freq === 'string'){
                    return sequencerRows.indexOf(freq);
                }
                let midiNum = Tonal.Midi.freqToMidi(freq);
                let current = Tonal.Midi.midiToNoteName(midiNum);
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
                    // nxt.style.display = "block";
                }
            }

        }
        //  }
    }
}
</script>
<style lang="css"></style>