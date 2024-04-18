import React,{forwardRef} from "react";

const UI = forwardRef((props , ref)=>{

    const resetCamera = () => {
        if (ref.current && !ref.current.lock()) {
            ref.current.getObject().position.copy(props.initialPos); 
            ref.current.getObject().lookAt(props.modelPos);
        }
      };
      
       return <div  className='reset' >
                <div onClick={resetCamera}>Reset</div>
                <input type="range" style={{accentColor : 'blueviolet'}} min={0} max={20} value={props.speed} step={0.1} onChange={(e)=>props.setSpeed(e.target.value)} />
                <div style={{fontSize : '15px'}}>{props.speed}</div>
       </div>
});

export default UI;