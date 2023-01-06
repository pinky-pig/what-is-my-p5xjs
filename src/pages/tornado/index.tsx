import { useEffect } from 'react'
import p5 from 'p5'

export const Tornado = () => {
  function initP5Canvas() {

    const p5div = document.getElementById('p5sketch')
    let overAllTexture
    const p5sketch = (p5) => {

      p5.setup = () => {

        p5.createCanvas(800, 800);
        // 1. 重新定义一个 renderer 缓冲
        overAllTexture = p5.createGraphics(p5.width, p5.height)
        // 2. loadPixels() 和 updatePixels() 连用，就像 push() 和 pop()
        // 将显示的像素添加到这个缓冲中 ，方便用于下面image()使用 
        overAllTexture.loadPixels()
        // 3. 这里针对其宽高的每个像素点，都进行 noise 随机填充颜色，达到噪声虚化效果
        for (var i = 0; i < p5.width + 50; i++) {
          for (var o = 0; o < p5.height + 50; o++) {
            overAllTexture.set(i, o, p5.color(100, p5.noise(i / 3, o / 3, i * o / 50) * p5.random([0, 40, 80])))
          }
        }
        // 4. 更新像素集合 
        overAllTexture.updatePixels()
      };

      p5.draw = () => {
        p5.background("#74d5f17f")

        p5.push()
        p5.noStroke()
        p5.fill(255, p5.random(40, 70))
        p5.stroke("white")
        p5.translate(p5.width/2,0)
        // 从上往下依次绘制
        for (var i = 0; i < p5.height; i += 10) {
          // 设置线条粗细
          p5.strokeWeight(3)
          // 设置填充色
          p5.fill(255, 40)
          p5.noStroke()
          // 设置一个随机数，椭圆有没有stroke，模拟风从下往上刮
          if (p5.random() < 0.1) {
            p5.stroke(255)
          } else {
            p5.noStroke()
          }
          // 因为要从上往下，半径越来越小。这里用高度减去i，因为i是递增的，所以差值越来越小没问题。
          // 这里宽高都是800，宽度占满整个画布不好看，除以9
          let nn = (p5.height - i) / 9 + p5.noise(i / 10, p5.frameCount / 100) * 20
          // 设置每个椭圆的旋转角，用来模拟风的旋转
          let stAng = p5.sin(i + p5.frameCount / 5) 
          // 这里使用nn设置椭圆的width和height。因为要扁的椭圆，所以乘以width的系数比height的大一些
          // x、y、w、h、start、stop
          p5.arc(0, i - 100, nn * 8, nn * 3, stAng, stAng + p5.PI * 1.5)
        }
        p5.pop()
        

        // 5. 渲染到画布  
        p5.push()
        p5.blendMode(p5.MULTIPLY)
        p5.image(overAllTexture, 0, 0)
        p5.pop()
      }
    }

    new p5(p5sketch, p5div);
  }

  useEffect(initP5Canvas, [])


  return (
    <>
      <h2 style={{ marginBottom: '10px'}}>2023/01/06 - Tornado</h2>
      <div id="p5sketch" ></div>
    </>
  )
}
