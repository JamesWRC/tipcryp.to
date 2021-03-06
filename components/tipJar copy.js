import React from "react";
import ReactDOM from "react-dom";
import Matter, { Body, Constraint } from "matter-js";
import { borderRadius, width } from "tailwindcss/defaultTheme";
import {isMobile, mobileModel} from 'react-device-detect';
import $ from 'jquery';

class TipJar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    componentDidMount() {
      var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Composite = Matter.Composite,
        Vector = Matter.Vector,
        Events = Matter.Events;

      var engine = Engine.create({
        // positionIterations: 20
      });
      engine.enableSleeping = true;

      var mattJSContainer = $('#matterjscontainer')
      console.log(mattJSContainer.width())
      console.log(mattJSContainer.height())
      var canvas = document.getElementById("matterjs");

      // var v = document.getElementById("abc123");
      // mattJSContainer.addClass("mx-auto")
      // mattJSContainer.addClass("h-full")
      canvas.classList.add("w-full")
      canvas.classList.add("min-w-full")
      canvas.classList.add("min-h-65")      
      canvas.classList.add("max-h-70")

      var w = mattJSContainer.width();
      var h = mattJSContainer.height();
      // h = window.innerHeight*0.65
      // h = 550
      // w= 545
      console.log("w")
      console.log(w)
      console.log(h)
      var render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          wireframes: false,
          hasBounds: true,
          showSleeping: false,
          background: "transparent",
          pixelRatio: 'auto',
          height: h,
          width: w,
        }
      });
    // render.options.height = mattJSContainer.height()
    // render.options.width = mattJSContainer.height()

  
    var rest = 0.3, 
      space = 600 / 5;
    const boundaryThickness = 8

     // Bottom boundary
     
     var bWidth = w/3;
     var bX = ((w/3)-bWidth)
     // desktops x
     
     var oX = (w/2) 
     // mobile x
     console.log('window width')
     console.log(oX)
      // if(isMobile){
      //   console.log("Is mobile")
      //   bWidth = window.innerWidth/2
      //   oX = bWidth - window.innerWidth/2
      //   // render.options.width = 1200
      //   // render.options.height = 600
      // }


        // bWidth = window.innerWidth/2

      // Desktop Left X value
      var lX = oX - bWidth*0.7
      // Mobile Left X value
      // if(isMobile){
      //   lX = oX - (bWidth/2)-20
      // }

      var rX = oX + bWidth*0.9;
      // if(isMobile){
      //   rX = (window.innerWidth/2 - bWidth/2)
      // }
      // var regBottom = Bodies.rectangle(0, 0, bWidth, boundaryThickness, { isStatic: true, 
      //   chamfer: {radius: [5, 5, 5, 5]},
      // })

     var midRing = Bodies.rectangle(oX*1.065, 545, bWidth*1.5, boundaryThickness, { isStatic: true, 
      restitution: 0,
      chamfer: {radius: [5, 5, 5, 5]},
      collisionFilter: {
        category: 'no-collide'
    },
    render: {
      fillStyle: 'grey',
      strokeStyle: 'grey',
    },
    })

    var topBottom = Bodies.rectangle(oX*1.065, bWidth*3.2, bWidth*1.32, boundaryThickness, { isStatic: true, 
      restitution: 0,
      chamfer: {radius: [5, 5, 5, 5]},
    })

    var midBottom = Bodies.rectangle(oX*1.065, bWidth*3.259, bWidth*1.32, boundaryThickness*5.5, { isStatic: true, 
      restitution: 0.1,
      chamfer: {radius: [5, 5, 5, 5]},
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
      },
    })

    var bottomBottom = Bodies.rectangle(oX*1.065, bWidth*3.3, bWidth*1.3, boundaryThickness, { isStatic: true, 
      restitution: 0.1,
      chamfer: {radius: [5, 5, 5, 5]},
    })

    


    
      
     // Right boundary
     var right = Bodies.rectangle(rX, bWidth*2.275, boundaryThickness, bWidth*2.1, { isStatic: true, 
      chamfer: {radius: [5, 5, 5, 5]},
      render: {
        fillStyle: 'black',
        strokeStyle: 'black',
      },
      angle: 3.3,
    })
    console.log("midRing")
    console.log(midRing.axes)
    // right.position.x =30
    //135 , 151 
     //Left boundary
    //  var left = Bodies.rectangle(-100, 300, boundaryThickness, 600, { isStatic: true });
     var left = Bodies.rectangle(lX, bWidth*2.275, boundaryThickness, bWidth*2.1, { isStatic: true, 
      chamfer: {radius: [5, 5, 5, 5]},
      render: {
        fillStyle: 'black',
        strokeStyle: 'black',
      },
      angle: 3,
    })
    //3

     var walls = [
      left, right, topBottom, midBottom, bottomBottom,
    ];

    // var bedrock = Bodies.rectangle(w, canvas.height*1.15, w*h, boundaryThickness, { isStatic: true, 
    //   chamfer: {radius: [5, 5, 5, 5]},
    // })

    // World.add(engine.world, [bedrock]);

    var tips = []
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    
for(var i = 0; i < 100; i++){
  const bitcoin = Bodies.circle(w, 0-h*2, 14, {
    restitution: rest,
    render: {
      sprite: {
        texture: "../images/crypto/svg/color/btc.svg",
        // texture: "../images/crypto/128/color/btc.png",

        xScale: 0.9, //0.35 per $
        yScale: 0.9
      }
    }
  }, 5);
  
  var a = getRandomInt(40)

  if(a > 35){
    a = 40
  }else{
    a = 14
  }
  const eth = Bodies.circle(w, 0-h*2, a, {
    restitution: rest,
    render: {
      sprite: {
        texture: "../images/crypto/svg/color/eth.svg",
        xScale: a > 35 ? 2.5 : 0.9,
        yScale: a > 35 ? 2.5 : 0.9
      }
    }
  });
  // if(a = 40){
  //   Matter.Body.setDensity(eth, 10)
  // }else{
  //   Matter.Body.setDensity(eth, 1)

  // }
  Matter.Sleeping.update([eth], 1)
  Matter.Sleeping.update([bitcoin], 1)
  // Matter.Sleeping.set(eth, true);
  tips.push(eth)
  tips.push(bitcoin)



  }

  World.add(engine.world, walls);
  // var comp = Composite.create();
  // var comps = Composite.add(comp, walls)
  // World.add(engine.world, comps);




      // add mouse control
      var mouse = Mouse.create(render.canvas)
      var mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
        });
        mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
        mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
         
      // mouse.pixelRatio = 1;
      // console.log(mouseConstraint);
      World.add(engine.world, mouseConstraint);
    // fit the render viewport to the scene
    // Render.lookAt(render, Composite.allBodies(engine.world));

      // onmousemove = () => {
      //   //console.log(mouse.position);
      //   // console.log(mouse.position);
      //   //      console.log(ballA.collisionFilter);

      // };
            // keep the mouse in sync with rendering
            render.mouse = mouse;
      // Engine.run(engine);
      Matter.Runner.run(engine)
      Render.run(render);
      World.add(engine.world, tips);
      Render.setPixelRatio(render, 'auto')
      // Render.lookAt(render, walls, Matter.Vector.create(500,500));
      Render.lookAt(render, walls, {
        x: 100,
        y: 400
      });



    }
  
    render() {
      
      return <div ref="TipJar"/>;
    }
  }
export default TipJar;
