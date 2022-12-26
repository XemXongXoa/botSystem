import sys from 'systeminformation';
import osu from 'node-os-utils'
import os from 'os';
export async function ram() {
    let free = os.freemem();
    let total = os.totalmem();
    let used = total - free;
    let usedPercent = used / total * 100;
    return {
        used: used,
        total: total,
        free: free,
        usedPercent: usedPercent
    }
}
export async function cpu() {
    let usage =  osu.cpu.usage();
    let temp =  sys.cpu()
    return Promise.all([usage, temp]).then(results => {
        return {
            core: results[1].physicalCores,
            thread: results[1].performanceCores,
            usage: results[0]
        }
    })
    
}
export async function disk() {
    return sys.fsSize().then(data => {
        let used = data.reduce((acc, cur) => acc + cur.used, 0);
        let total = data.reduce((acc, cur) => acc + cur.size, 0);
        let usedPercent = (used / total) * 100;
        return {
            used: used,
            total: total,
            usedPercent: usedPercent
        }
    })
}
