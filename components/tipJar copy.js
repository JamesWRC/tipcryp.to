import React from "react";
import ReactDOM from "react-dom";
import Matter, { Body, Constraint } from "matter-js";
import { borderRadius, width } from "tailwindcss/defaultTheme";
import {isMobile, mobileModel} from 'react-device-detect';

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
  
      var canvas = document.getElementById("matterjs");
      var v = document.getElementById("abc123");
      canvas.classList.add("mx-auto")
      canvas.classList.add("w-full")
      canvas.classList.add("min-w-full")
      canvas.classList.add("h-full")
      canvas.classList.add("min-h-full")

      var w = canvas.width;
      var h = canvas.height;
      h = window.innerHeight/2
      // h = 550
      // w= 545
      console.log("w")
      console.log(w)
      console.log(h)
      var render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          wireframes: true,
          hasBounds: true,
          background:"transparent",
          pixelRatio: 'auto',
          height: h,
          width: w*3,
        }
      });

  
    var rest = 0.3, 
      space = 600 / 5;
    const boundaryThickness = 7.5

     // Bottom boundary
     var bWidth = 260;
     var bX = ((w/3)-bWidth)
     // desktops x
     var oX = (w/2) + bWidth

     // mobile x
     console.log('window width')
     console.log(window.innerWidth)
      if(isMobile){
        console.log("Is mobile")
        bWidth = window.innerWidth/2
        oX = bWidth - window.innerWidth/2
        // render.options.width = 1200
        // render.options.height = 600
      }


        // bWidth = window.innerWidth/2

      // Desktop Left X value
      var lX = (w/2) + (bWidth/2)-20
      // Mobile Left X value
      if(isMobile){
        lX = oX - (bWidth/2)-20
      }

      var rX = (w) + (bWidth);
      if(isMobile){
        rX = (window.innerWidth/2 - bWidth/2)
      }
      // var regBottom = Bodies.rectangle(0, 0, bWidth, boundaryThickness, { isStatic: true, 
      //   chamfer: {radius: [5, 5, 5, 5]},
      // })

     var midRing = Bodies.rectangle(oX, 550, bWidth, boundaryThickness, { isStatic: true, 
      chamfer: {radius: [5, 5, 5, 5]},
      collisionFilter: {
        category: 'no-collide'
    },
    })

    var topBottom = Bodies.rectangle(oX, 650, bWidth-25, boundaryThickness, { isStatic: true, 
      chamfer: {radius: [5, 5, 5, 5]},
    })

    var midBottom = Bodies.rectangle(oX, 660, bWidth-10, boundaryThickness*5, { isStatic: true, 
      chamfer: {radius: [5, 5, 5, 5]},
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
      },
    })

    var bottomBottom = Bodies.rectangle(oX, 675, bWidth-30, boundaryThickness, { isStatic: true, 
      chamfer: {radius: [5, 5, 5, 5]},
    })

    


    
      
     // Right boundary
     var right = Bodies.rectangle(rX, 430, boundaryThickness, 500, { isStatic: true, 
      chamfer: {radius: [5, 5, 5, 5]},
      angle: 3.3,
    })
    // right.position.x =30
    //135 , 151 
     //Left boundary
    //  var left = Bodies.rectangle(-100, 300, boundaryThickness, 600, { isStatic: true });
     var left = Bodies.rectangle(lX, 430, boundaryThickness, 500, { isStatic: true, 
      chamfer: {radius: [5, 5, 5, 5]},
      angle: 3,
    })
    //3

     var walls = [
      topBottom, midBottom, bottomBottom, midRing, right, left,
    ];


    var tips = []
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    
for(var i = 0; i < 10; i++){
  const bitcoin = Bodies.circle(getRandomInt(600), getRandomInt(600), 14, {
    restitution: rest,
    render: {
      sprite: {
        texture: "../images/crypto/svg/color/btc.svg",
        // texture: "../images/crypto/128/color/btc.png",

        xScale: 0.9,
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
  const eth = Bodies.circle(getRandomInt(600), getRandomInt(600), a, {
    restitution: rest,
    render: {
      sprite: {
        texture: "../images/crypto/svg/color/eth.svg",
        xScale: a > 35 ? 2.5 : 0.9,
        yScale: a > 35 ? 2.5 : 0.9
      }
    }
  });
  tips.push(eth)
  tips.push(bitcoin)
  Events.on(engine, 'beforeUpdate', function(event) {
    // Body.scale(bitcoin, 1.01,1.01);
  })

  }

  // Composite.add(engine.world, walls)

  World.add(engine.world, walls);




      // add mouse control
      var mouse = Mouse.create(render.canvas)
      var mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
        });

      // mouse.pixelRatio = 1;
      // console.log(mouseConstraint);
      World.add(engine.world, mouseConstraint);
    // fit the render viewport to the scene
    // Render.lookAt(render, Composite.allBodies(engine.world));

      onmousemove = () => {
        //console.log(mouse.position);
        // console.log(mouse.position);
        //      console.log(ballA.collisionFilter);

      };
      
      // Engine.run(engine);
      Matter.Runner.run(engine)
      Render.run(render);
      World.add(engine.world, tips);
      Render.setPixelRatio(render, 'auto')
      Render.lookAt(render, Composite.allBodies(engine.world), Matter.Vector.create(0,500));
      // Render.lookAt(render, Composite.allBodies(engine.world), {
      //   x: 100,
      //   y: 10000
      // });
      // keep the mouse in sync with rendering
      render.mouse = mouse;
      window.addEventListener('load', function () {
  
      
    

      var pa = document.getElementById("matterjscontainer")

      // document.getElementById("matterjs").style.maxHeight = pa.style.maxHeight;
      // document.getElementById("matterjs").style.width = 300;

      // document.getElementById("matterjs").style.height = pa.style.height
      // document.getElementById("matterjs").style.width = pa.style.height
      document.getElementById("matterjs").style.maxWidth = pa.style.maxWidth
      document.getElementById("matterjs").style.maxHeight = pa.style.maxHeight;
      console.log('aaaa')
      console.log(pa.style.width)
      console.log(pa.style.maxWidth)
      console.log('aaaa')
      // Render.lookAt(render, {
      //   min: { x: 0, y: 0 },
      //   max: { x: 800, y: 600 }
      // });
      // Render.lookAt(render, Composite.allBodies(engine.world), Matter.Vector.create(0,100));


    })
    window.addEventListener('resize', () => { 
      var a = document.getElementById("matterjscontainer")

      // render.bounds.max.x = a.style.maxWidth;
      // render.bounds.max.y = a.style.maxHeight;
      // render.options.width = a.width;
      // render.options.height = a.height;
      // render.canvas.width = w;
      // render.canvas.height = h;
      // Render.lookAt(render, {
      //   min: { x: 0, y: 0 },
      //   max: { x: 800, y: 600 }
      // });
    });

    }
  
    render() {
      
      return <div ref="TipJar"/>;
    }
  }
export default TipJar;
