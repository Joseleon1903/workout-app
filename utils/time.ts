/**
 * second to minutes
 * 
 */
export function secToMin(sec:number) : string {
    return (sec/60).toFixed(1);
}

/**
 * format second
 * 
 */
export function formatSec(sec:number){

    const _minutes = sec /60;
    const _seconds = sec %60;

    if(_seconds == 0){
        return `${_minutes} min`;
    }

    return `${_minutes.toFixed(0)} min and ${_seconds.toFixed(0)} sec`;
} 
