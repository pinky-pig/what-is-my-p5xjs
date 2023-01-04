import { useEffect } from 'react'
import p5 from 'p5' 
import * as styles from "./index.css";

export const PaperTextureBackground = () => {
  function initP5Canvas() {
    var p5div = document.querySelector('#p5sketch') as HTMLElement
  
    let palettes = [
      ["#154255", "#FAEBD7", "#f3bc17", "#FAEBD7", "#dcdcdc", "#c0504f", "#68b9b0", "#FAEBD7", "#2763ab", "#FAEBD7"],
      ["#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7"],
      ["#FAEBD7", "#9dcee2", "#f29479", "#FAEBD7", "#f29479", "#FAEBD7", "#edf6f9", "#FAEBD7", "#9dcee2", "#FAEBD7"],
      ["#dfde80", "#FAEBD7", "#8c6677", "#ad7787", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#f078b3", "#ec8782", "#dfde80"],
      ["#dad7cd", "#FAEBD7", "#588157", "#3a5a40", "#a3b18a", "#FAEBD7", "#dad7cd", "#FF9D47", "#3a5a40", "#FAEBD7"],
      ["#ff9483", "#fca986", "#f8bd88", "#f0e68c", "#f4eda9", "#f8f3c6", "#ffffff", "#ffe286", "#ffd349", "#ffc40c"],
      ["#ff0a54", "#ff477e", "#ff5c8a", "#ff7096", "#f7cad0", "#ff85a1", "#ff99ac", "#fbb1bd", "#f9bec7", "#fae0e4"],
      ["#71093b", "#990b52", "#cb8b15", "#eaaa34", "#f1f4f9", "#ffffff", "#749ed2", "#467ec3", "#023578", "#022450"]
    ]
  
    var p5sketch = (p5:any) => {
  
      p5.setup = () => {
        var canvas = p5.createCanvas(600, 750);
        p5.randomSeed(p5.random(99999))
        p5.noiseSeed(p5.random(99999))
        p5.noLoop()
        p5.pixelDensity(5)
        p5.colorMode(p5.HSL, 360, 100, 100, 100)
      };
  
      p5.draw = () => {
        let livepal = p5.random([0, 1, 2, 3, 4, 5, 6, 7, 1])
        p5.background(palettes[livepal][4])
  
        if (true) {
          let padfactor = 1e3;
          let e = 3e4;
          for (; e--;) {
            p5.x = p5.random(p5.width),
            p5.y = p5.random(p5.height),
            p5.push(),
            p5.strokeWeight(.2),
            p5.stroke(50, 50, p5.random(55, 95), p5.random(1, 15)),
            p5.noFill(),
            p5.bezier(p5.random(-padfactor, p5.width + padfactor), p5.random(-padfactor, p5.height + padfactor), p5.random(-padfactor, p5.width + padfactor), p5.random(-padfactor, p5.height + padfactor), p5.random(-padfactor, p5.width + padfactor), p5.random(-padfactor, p5.height + padfactor), p5.random(-padfactor, p5.width + padfactor), p5.random(-padfactor, p5.height + padfactor)),
            p5.pop()
          }
        }
        p5.push();
      }
  
    }
  
    new p5(p5sketch, p5div);
  }

  useEffect(initP5Canvas,[])
  return (
    <div id="p5sketch" className={styles.p5sketch}></div>
  )
}
