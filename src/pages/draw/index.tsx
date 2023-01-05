import { useEffect } from 'react'
import p5 from 'p5'

const palettes = [
  ["#154255", "#FAEBD7", "#f3bc17", "#FAEBD7", "#dcdcdc", "#c0504f", "#68b9b0", "#FAEBD7", "#2763ab", "#FAEBD7"],
  ["#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#FAEBD7"],
  ["#FAEBD7", "#9dcee2", "#f29479", "#FAEBD7", "#f29479", "#FAEBD7", "#edf6f9", "#FAEBD7", "#9dcee2", "#FAEBD7"],
  ["#dfde80", "#FAEBD7", "#8c6677", "#ad7787", "#FAEBD7", "#FAEBD7", "#FAEBD7", "#f078b3", "#ec8782", "#dfde80"],
  ["#dad7cd", "#FAEBD7", "#588157", "#3a5a40", "#a3b18a", "#FAEBD7", "#dad7cd", "#FF9D47", "#3a5a40", "#FAEBD7"],
  ["#ff9483", "#fca986", "#f8bd88", "#f0e68c", "#f4eda9", "#f8f3c6", "#ffffff", "#ffe286", "#ffd349", "#ffc40c"],
  ["#ff0a54", "#ff477e", "#ff5c8a", "#ff7096", "#f7cad0", "#ff85a1", "#ff99ac", "#fbb1bd", "#f9bec7", "#fae0e4"],
  ["#71093b", "#990b52", "#cb8b15", "#eaaa34", "#f1f4f9", "#ffffff", "#749ed2", "#467ec3", "#023578", "#022450"]
]

let canvas: any = undefined
export const Draw = () => {
  function initP5Canvas() {

    const p5div = document.getElementById('p5sketch') as HTMLElement

    const p5sketch = (p5: any) => {

      p5.setup = () => {
        p5.createCanvas(600, 750);
        p5.randomSeed(p5.random(99999))
        p5.noiseSeed(p5.random(99999))
        p5.noLoop()
        p5.pixelDensity(5)
        p5.colorMode(p5.HSL, 360, 100, 100, 100) // HSL 色调值的最大值 饱和度值的最大值 光度值的最大值 透明度值的最大值
      };

      p5.draw = () => {
        let livepal = p5.random([0, 1, 2, 3, 4, 5, 6, 7, 1])
        p5.background(palettes[livepal][4])

        // 渲染背景材质
        drawBackgroundTexture(p5)
        // 渲染云朵
        drawCloud(p5)
        // 渲染鸟儿
        drawBird(p5)

      }

      canvas = p5
    }

    new p5(p5sketch, p5div);
  }

  useEffect(initP5Canvas, [])

  function random() {
    canvas.clear()
    canvas.setup()
    canvas.redraw()
  }

  return (
    <>
      <button style={{ marginBottom: '10px' }} onClick={random}>Random</button>
      <div id="p5sketch" ></div>
    </>
  )
}

function drawBackgroundTexture(p5: any) {
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

function drawCloud(p5: any) {
  // 云的数量
  let e = p5.random([5, 10, 15, 20]);
  for (; e--;) {

    // 绘制云朵的边框
    for (
      var ground2 = 200,
      peakheight2 = p5.random(3, 8),
      xFreqOfPeak2 = 2,
      incr2 = .1,
      bottomOfCloud = peakheight2,
      cloudstart = 0,
      cloudwidth = p5.random([25, 50, 75, 100, 150]),
      x = p5.random(-35, p5.width - 25),
      y = p5.random(-175, 200),
      b = ground2; b < ground2 + 5; b += 5
    ) {

      p5.push()
      p5.stroke("black")
      p5.push()
      p5.translate(x, y)

      for (var a = cloudstart; a < cloudwidth; a += xFreqOfPeak2) {
        let n = p5.noise(a * incr2, ground2)
        p5.fill("antiquewhite")
        p5.beginShape()
        p5.curveVertex(a, p5.map(n, 0, 1, b - peakheight2, b + peakheight2));
      }
      p5.curveVertex(cloudwidth, ground2 + bottomOfCloud)
      p5.curveVertex(cloudstart, ground2 + bottomOfCloud)
      p5.endShape(p5.CLOSE)
    }

    // 绘制云朵的竖线填充
    for (a = cloudstart; a < cloudwidth; a += xFreqOfPeak2) {
      let n = p5.noise(a * incr2, ground2)
      p5.drawingContext.setLineDash([p5.random(5), p5.random(3)])
      p5.line(a, p5.map(n, 0, 1, b - peakheight2, b + peakheight2), a, ground2 + bottomOfCloud);
    }
    p5.pop()
  }
  p5.push();

}

function drawBird(p5: any) {

  let t = p5.random([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 5, 20, 25, 2, 3])
  for (; t--;) {
    let x = p5.random(25, p5.width - 25)
    let y = p5.random(25, 300)
    let e = .002;
    let n = p5.noise(x * e, y * e)
    p5.push()
    p5.translate(x, y);
    for (var r = 1; r <= 25; r += 15) {
      p5.rotate(p5.random(-1e3, 1e3))
      renderBird();
    }
    p5.pop()
  }

  function renderBird() {
    let e = p5.random(1.5, 3)
    let t = 5;
    for (let flowerstart = 0, flowerend = e; t--;) {
      p5.strokeWeight(1)
      p5.fill(
        p5.random(1, 25),
        p5.random(99, 99),
        p5.random(87, 90), 100
      )
      p5.fill(p5.random(100, 150), p5.random(55, 55), p5.random(75, 75), 100)
      p5.noFill()
      p5.beginShape()
      p5.vertex(
        p5.random(flowerstart, flowerstart),
        p5.random(flowerstart, flowerstart)
      )
      p5.bezierVertex(
        p5.random(flowerstart, flowerend),
        p5.random(flowerstart, flowerend),
        p5.random(flowerstart, flowerend),
        p5.random(flowerstart, flowerend),
        p5.random(flowerend, flowerend),
        p5.random(flowerend, flowerend)
      )
      p5.endShape(p5.CLOSE)
    }
  }



}

