import {exec} from 'child_process';
function cmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err||stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}
process.on('message', (msg) => {
    cmd(msg).then(process.send).catch(process.send);
})
