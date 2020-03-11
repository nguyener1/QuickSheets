class SignTool {
  constructor() {
    this.initVars()
    this.initEvents()
  }

  initVars() {
    this.canvas = $('#canvas')[0]
    this.ctx = this.canvas.getContext("2d")
    this.isMouseClicked = false
    this.isMouseInCanvas = false
    this.prevX = 0
    this.currX = 0
    this.prevY = 0
    this.currY = 0
    
  }

  initEvents() {
    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e), false)
    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e), false)
    this.canvas.addEventListener("mouseup", () => this.onMouseUp(), false)
    this.canvas.addEventListener("mouseout", () => this.onMouseOut(), false)
    this.canvas.addEventListener("mouseenter", (e) => this.onMouseEnter(e))
    this.canvas.addEventListener("touchstart", (e) => this.onTouchStart(e), false)
    this.canvas.addEventListener("touchend", () => this.onTouchEnd(), false)
    this.canvas.addEventListener("touchmove", (e) => this.onTouchMove(e), false)
    document.body.addEventListener("touchstart", (e) => this.stopScrolling(e), { passive: false })
    document.body.addEventListener("touchend", (e) => this.stopScrolling(e), { passive: false })
    document.body.addEventListener("touchmove", (e) => this.stopScrolling(e), { passive: false })
  }
//Signature by Mouse
  onMouseDown(e) {
    this.isMouseClicked = true
    this.updateCurrentPosition(e)
  }

  onMouseUp() {
    this.isMouseClicked = false
  }

  onMouseEnter(e) {
    this.isMouseInCanvas = true
    this.updateCurrentPosition(e)
  }

  onMouseOut() {
    this.isMouseInCanvas = false
    this.isMouseClicked = false
  }

  onMouseMove(e) {
    if (this.isMouseClicked && this.isMouseInCanvas) {
        this.updateCurrentPosition(e)
      this.draw()
    }
  }

  updateCurrentPosition(e) {
      this.prevX = this.currX
      this.prevY = this.currY
      this.currX = e.clientX - this.canvas.getBoundingClientRect().left
      this.currY = e.clientY - this.canvas.getBoundingClientRect().top
  }
    
    onTouchStart(e){
        var touch = e.touches[0]
        this.isMouseInCanvas = true
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        })
        this.canvas.dispatchEvent(mouseEvent)
    }
    
    onTouchEnd(){
        this.isMouseInCanvas = false
        this.onMouseUp()
    }

    onTouchMove(e){
        var touch = e.touches[0]
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        })
        this.canvas.dispatchEvent(mouseEvent)
    }

//    updateCurrentTouchPos(e) {
//        this.prevX = this.currX
//        this.prevY = this.currY
//        this.currX = e.touches[0].clientX - this.canvas.getBoundingClientRect().left
//        this.currY = e.touches[0].clientY - this.canvas.getBoundingClientRect().top
//    }
    
    //prevent scrolling
    stopScrolling(e){
        if (e.target == this.canvas){
            e.preventDefault()
        }
    }
    
  draw() {
    this.ctx.beginPath()
    this.ctx.moveTo(this.prevX, this.prevY)
    this.ctx.lineTo(this.currX, this.currY)
    this.ctx.strokeStyle = "black"
    this.ctx.lineWidth = 2
    this.ctx.stroke()
    this.ctx.closePath()
  }
    

}

//Signature by Touch
 


var canvas = new SignTool()
