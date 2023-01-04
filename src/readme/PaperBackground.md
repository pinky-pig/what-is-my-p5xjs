# 使用 P5.js 渲染纸质背景

> 在线编辑器: https://editor.p5js.org/  
> P5.js API: https://p5js.org/zh-Hans/reference/

## 1. 创建画布，设置尺寸及背景颜色

P5.js 语法结构及API可参考官网。

第一步自然是创建画布，其对原生的创建canvas方法进行了封装。

1. 原生创建canvas：

```Html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#3a5a40';
ctx.fillRect(10, 10, canvas.width, canvas.height);
```

2. P5.js 创建画布

```js
function setup() {
  createCanvas(600, 750);
}

function draw() {
  background('#3a5a40')
}
```

![20230104103300](https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230104103300.png)

## 2. 创建材质



1. 设置纸质材质

简单思路就是 设置很多线条无序填充在背景中，再将颜色设置淡一些，达到纸张纹理的效果。

思路：
`https://www.infoworld.com/article/3332676/javascript-tutorial-create-a-textured-paper-background-with-p5js.html`

不过这里我们使用的是贝塞尔曲线，更好的模拟纹理效果。

[random()](https://p5js.org/zh-Hans/reference/#/p5/random)

- 返回一个随机的浮点数。
- 可使用 0、1 或 2 个参数。
- 如果并没有定义任何参数，将返回一个介于 0 与 1（但不包括 1）的随机数。
- 如果只定义一个参数并且该参数为数字，将返回一个介于 0 与 该数字（但不包括该数字）的随机数。
- 如果值定义一个参数并且该参数为数组，将返回该数组中随机一个元素。
- 如果定义两个参数，将返回一个介于第一个参数与第二个参数（但不包括第二个参数）的随机数

[bezier](https://p5js.org/reference/#/p5/bezier)

这里是三次贝塞尔曲线，官网API[中文文档](https://p5js.org/zh-Hans/reference/#/p5/bezier)参数翻译有点问题，我这里给提了一个[issue](https://github.com/processing/p5.js-website/issues/1301)。
三次贝塞尔曲线主要就是两个锚点，两个控制点。可参考张鑫旭老师的[博客](https://www.zhangxinxu.com/wordpress/2014/06/deep-understand-svg-path-bezier-curves-command/)学习。

[push](https://p5js.org/zh-Hans/reference/#/p5/push)
[pop](https://p5js.org/zh-Hans/reference/#/p5/pop)

push() 函数将储存当时的绘画样式设置及变形，而 pop() 将恢复这些设置。注意这两个函数需要一起使用。它们让您改变样式及变形设置然后再回到您之前的设置。当使用 push() 开始一个新的状态时，它将继续建立在当时的样式和变形上。push() 和 pop() 函数可被重复嵌入以提供更复杂的控制。（请参考第二个范例）

push() 将现有的变形及样式设置资料储存上来，这包括以下的函数：fill()、stroke()、tint()、strokeWeight()、strokeCap()、strokeJoin()、imageMode()、rectMode()、ellipseMode()、colorMode()、textAlign()、textFont()、textMode()、textSize()、textLeading()。


3. 设置颜色 
`p5.colorMode(p5.HSL, 360, 100, 100, 100)`

这里颜色模式为HSL（Hue/色相，Saturation/饱和度，Lightness/亮度），参考文章： `https://juejin.cn/post/6844903845366071310`

```js
function setup() {
  var canvas = createCanvas(600, 750);
  noLoop();
  colorMode(HSL, 360, 100, 100, 100);
}

function draw() {
  background("#3a5a40");

  let padfactor = 1e3;
  let e = 3e4;
  for (; e--; ){
    x = random(width)
    y = random(height)
    push()
    strokeWeight(0.2)
    stroke(50, 50, random(55, 95), random(1, 15))
    noFill()
    bezier(
      random(-padfactor, width + padfactor),
      random(-padfactor, height + padfactor),
      random(-padfactor, width + padfactor),
      random(-padfactor, height + padfactor),
      random(-padfactor, width + padfactor),
      random(-padfactor, height + padfactor),
      random(-padfactor, width + padfactor),
      random(-padfactor, height + padfactor)
    ),
    pop();
  }
}

```

![20230104162324](https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230104162324.png)

## 简单介绍一下 seed 

seed 就是种子，P5.js 这里使用到 `randomSeed()` 和 `noiseSeed()`。

> [randomSeed](https://p5js.org/zh-Hans/reference/#/p5/randomSeed)
> 定义 random() 使用的随机种子值。默认上，random() 将在每一次改程序被执行时生成不同的结果。只需定义 seed 参数至一个常量就能确保每一次软件执行时都会返回一样的伪随机数。

其实简单来说就是 在一个种子上出来的随机树，如果种子一样，顺序一样，那么随机数出来的结果就一样。

比如，定义了一个种子为1的随机数，randomSeed(1)，那么，种子1生成的随机数可能是[1,3,5,8,9,6,7]，那么第一个random() 的结果就是1，第二个就是3......
如果，randomSeed(3)，可能生成的随机数[2,5,6,7,9,3,4]，第一个random()的结果就是2，第二个就是5......

如果重新再运行一遍randomSeed(1)，那么生成的还是跟上次一样，[1,3,5,8,9,6,7]，再random()，结果顺序还是跟上次一样。

```js
randomSeed(1)
random() // 1
random() // 3

randomSeed(1)
random() // 1
random() // 3
random() // 5
```
![20230104113926](https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230104113926.png)

## React版全部代码

![paper-bg](https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagespaper-bg.gif)

```ts
import { useEffect } from 'react'
import p5 from 'p5' 

let canvas:any = undefined
export const Draw = () => {
  function initP5Canvas() {

    const p5div = document.getElementById('p5sketch') as HTMLElement

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
        p5.colorMode(p5.HSL, 360, 100, 100, 100) // HSL 色调值的最大值 饱和度值的最大值 光度值的最大值 透明度值的最大值
      };
  
      p5.draw = () => {
        let livepal = p5.random([0, 1, 2, 3, 4, 5, 6, 7, 1])
        p5.background(palettes[livepal][4])
        
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
      
      canvas = p5
    }
  
    new p5(p5sketch, p5div);
  }

  useEffect(initP5Canvas,[])

  function random() {
    canvas.clear()
    canvas.setup()
    canvas.redraw()
  }

  return (
    <>
      <button style={{marginBottom:'10px'}} onClick={random}>Random</button>
      <div id="p5sketch" ></div>
    </>
  )
}
```
