export function checkServer(cpu,ram,disk){
    let checkCPU =  cpu.usage < 80 ? true : false;
    let checkRAM =  ram.usedPercent < 80 ? true : false;
    let checkDisk =  disk.usedPercent < 80 ? true : false;
    return checkCPU && checkRAM && checkDisk;
}