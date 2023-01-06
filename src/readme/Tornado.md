# 新建龙卷风

## 新建圆弧

```js
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#74d5f17f");

  noFill();
  stroke("white")
  arc(
    200, // 圆心的x坐标
    400, // 圆心的y坐标
    200, // 圆的width宽
    100, // 圆的height高
    0,   // 圆弧开始的角度
    PI , // 圆弧结束的角度
    OPEN // 圆弧的模式，敞开、圆心连线封闭、圆弧连线封闭 mode: OPEN、CHORD、PIE  -- default: OPEN
  ) 
  // 旋转的圆弧
  // arc( 200, 400, 200, 100, frameCount / 5 + 0, frameCount / 5 + PI * 1.5 , PIE ) 
}
```
## 设置从上到下所有圆弧

```js
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#74d5f17f");
  push()
  fill(255, random(40, 70))
  stroke("white")
  translate(width/2,0)
  for (var i = 0; i < height; i += 10) {
    // 设置线条粗细
    strokeWeight(3)
    // 设置填充色白色，透明度40
    fill(255, 40)
    // x、y、w、h、start、stop
    arc(0, i - 100, 200, 100, i, i + PI * 1.5)
  }
  pop()
}
```

## 修改圆弧，从顶到底半径越来越小

```js
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#74d5f17f");
  push()
  fill(255, random(40, 70))
  stroke("white")
  translate(width/2,0)
  // 从上往下依次绘制，越来越小
  for (var i = 0; i < height; i += 10) {
    // 设置线条粗细
    strokeWeight(3)
    // 设置填充色
    fill(255, 40)
    // 因为要从上往下，半径越来越小。这里用高度减去i，因为i是递增的，所以差值越来越小没问题。
    // 这里宽高都是800，宽度占满整个画布不好看，除以9
    let nn = (height - i) / 9
    // 这里使用nn设置椭圆的width和height。因为要扁的椭圆，所以乘以width的系数比height的大一些
    // x、y、w、h、start、stop
    arc(0, i - 100, nn * 8, nn * 3, i, i + PI * 1.5)
  }
  pop()
}
```

## 设置椭圆的半径有少量随机变化

```js
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#74d5f17f");
  push()
  fill(255, random(40, 70))
  stroke("white")
  translate(width/2,0)
  // 从上往下依次绘制
  for (var i = 0; i < height; i += 10) {
    // 设置线条粗细
    strokeWeight(3)
    // 设置填充色
    fill(255, 40)
    noStroke()
    // 因为要从上往下，半径越来越小。这里用高度减去i，因为i是递增的，所以差值越来越小没问题。
    // 这里宽高都是800，宽度占满整个画布不好看，除以9
    let nn = (height - i) / 9 + noise(i / 10, frameCount / 100) * 20
    // 这里使用nn设置椭圆的width和height。因为要扁的椭圆，所以乘以width的系数比height的大一些
    // x、y、w、h、start、stop
    arc(0, i - 100, nn * 8, nn * 3, i, i + PI * 1.5)
  }
  pop()
}
```

## 设置椭圆也是旋转的，模拟风的旋转

```js
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#74d5f17f");
  push()
  fill(255, random(40, 70))
  stroke("white")
  translate(width/2,0)
  // 从上往下依次绘制
  for (var i = 0; i < height; i += 10) {
    // 设置线条粗细
    strokeWeight(3)
    // 设置填充色
    fill(255, 40)
    noStroke()
    // 因为要从上往下，半径越来越小。这里用高度减去i，因为i是递增的，所以差值越来越小没问题。
    // 这里宽高都是800，宽度占满整个画布不好看，除以9
    let nn = (height - i) / 9 + noise(i / 10, frameCount / 100) * 20
    // 设置每个椭圆的旋转角，用来模拟风的旋转
    // 这里使用sin模拟一下，因为设置的椭圆弧不是完整的圆才能模拟风的旋转，如果单使用`i + frameCount / 5`，效果没那么好
    // 就尝试了noise random sin cos 等函数，最后感觉sin效果好一点
    let stAng = sin(i + frameCount / 5) 
    // 这里使用nn设置椭圆的width和height。因为要扁的椭圆，所以乘以width的系数比height的大一些
    // x、y、w、h、start、stop
    arc(0, i - 100, nn * 8, nn * 3, stAng, stAng + PI * 1.5)
  }
  pop()
  
}
```

## 设置一下椭圆的stroke 更真实的模拟风向上旋转刮

```js
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#74d5f17f");
  push()
  fill(255, random(40, 70))
  stroke("white")
  translate(width/2,0)
  // 从上往下依次绘制
  for (var i = 0; i < height; i += 10) {
    // 设置线条粗细
    strokeWeight(3)
    // 设置填充色
    fill(255, 40)
    noStroke()
    // 设置一个随机数，椭圆有没有stroke，模拟风从下往上刮
    if (random() < 0.1) {
      stroke(255)
    } else {
      noStroke()
    }
    // 因为要从上往下，半径越来越小。这里用高度减去i，因为i是递增的，所以差值越来越小没问题。
    // 这里宽高都是800，宽度占满整个画布不好看，除以9
    let nn = (height - i) / 9 + noise(i / 10, frameCount / 100) * 20
    // 设置每个椭圆的旋转角，用来模拟风的旋转
    let stAng = sin(i + frameCount / 5) 
    // 这里使用nn设置椭圆的width和height。因为要扁的椭圆，所以乘以width的系数比height的大一些
    // x、y、w、h、start、stop
    arc(0, i - 100, nn * 8, nn * 3, stAng, stAng + PI * 1.5)
  }
  pop()
}
```

## 设置画布材质

```js

function setup() {
  createCanvas(800, 800);
  // 1. 重新定义一个 renderer 缓冲
  overAllTexture = createGraphics(width, height)
  // 2. loadPixels() 和 updatePixels() 连用，就像 push() 和 pop()
  // 将显示的像素添加到这个缓冲中 ，方便用于下面image()使用 
  overAllTexture.loadPixels()
  // 3. 这里针对其宽高的每个像素点，都进行 noise 随机填充颜色，达到噪声虚化效果
  for (var i = 0; i < width + 50; i++) {
    for (var o = 0; o < height + 50; o++) {
      overAllTexture.set(i, o, color(100, noise(i / 3, o / 3, i * o / 50) * random([0, 40, 80])))
    }
  }
  // 4. 更新像素集合 
  overAllTexture.updatePixels()
}

function draw() {
  background("#74d5f17f")
  push()
  noStroke()
  fill(255, random(40, 70))
  stroke("white")
  translate(width/2,0)
  // 从上往下依次绘制
  for (var i = 0; i < height; i += 10) {
    // 设置线条粗细
    strokeWeight(3)
    // 设置填充色
    fill(255, 40)
    noStroke()
    // 设置一个随机数，椭圆有没有stroke，模拟风从下往上刮
    if (random() < 0.1) {
      stroke(255)
    } else {
      noStroke()
    }
    // 因为要从上往下，半径越来越小。这里用高度减去i，因为i是递增的，所以差值越来越小没问题。
    // 这里宽高都是800，宽度占满整个画布不好看，除以9
    let nn = (height - i) / 9 + noise(i / 10, frameCount / 100) * 20
    // 设置每个椭圆的旋转角，用来模拟风的旋转
    let stAng = sin(i + frameCount / 5) 
    // 这里使用nn设置椭圆的width和height。因为要扁的椭圆，所以乘以width的系数比height的大一些
    // x、y、w、h、start、stop
    arc(0, i - 100, nn * 8, nn * 3, stAng, stAng + PI * 1.5)
  }
  pop()
  // 5. 渲染到画布  
  push()
    blendMode(MULTIPLY)
    image(overAllTexture, 0, 0)
  pop()
}
```
