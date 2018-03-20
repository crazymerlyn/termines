let jsnes = require('jsnes');
let Canvas = require('drawille');

let c = new Canvas(256, 240);

var nes = new jsnes.NES({
  onFrame: function(frameBuffer) {
      for (let x = 0; x < 240; ++x) {
          for (let y = 0; y < 256; ++y) {
              if (frameBuffer[x * 256 + y]) {
                  c.set(y, x);
              } else {
                  c.unset(y, x);
              }
          }
      }
      process.stdout.write(c.frame());
  },
  onAudioSample: function(left, right) {
    // ... play audio sample
  }
});


const fs = require('fs');
var romData = fs.readFileSync('contra.nes', {encoding: 'binary'});

// Load ROM data as a string or byte array
nes.loadROM(romData);

for (let i = 0; i < 1000; ++i) {
    nes.frame();
}
