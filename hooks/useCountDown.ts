import { useEffect, useRef, useState } from "react";


export function useCountDown(
    idx: number,
    initialCount:number
){
    const [countDown, setCountDown] = useState(initialCount);
    const intervalReference = useRef<number>();

    useEffect(() =>{

        if(idx ==-1 ){
          return 
        }
        console.log("Tracker has been changed!");
    
        intervalReference.current = window.setInterval(() =>{
          setCountDown((count) =>{
            console.log(count);
            return count -1;
          });
        }, 1000);
    
        return cleanUp;
    
      }, [idx]);


      useEffect(() =>{
        setCountDown(initialCount);

      }, [initialCount]);

      useEffect(() =>{

        if(countDown == 0 ){
            cleanUp();
        }


      }, [countDown]);

      const cleanUp = () =>{
        console.log("CLEANUP!!")
        if(intervalReference.current){
        window.clearInterval(intervalReference.current);
        intervalReference.current = undefined;
        }
      }

      return countDown;

}