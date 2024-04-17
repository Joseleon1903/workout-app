
export type Difficulty = "Easy" | "Normal"| "Hard"
export type SequenceType = "Exercise" | "Stretch"| "Break"

export default interface Workout{
    slug : string,
    name: string,
    duration: number,
    difficulty : Difficulty,
    sequence : Array<SequenceItem>
}

export interface SequenceItem{
   slug: string,
   name: string,
   type: SequenceType,
   duration: number,
   reps?: number
}