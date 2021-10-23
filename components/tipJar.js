import React from "react";
import ReactDOM from "react-dom";
import Matter, { Body, Constraint } from "matter-js";
import { borderRadius, width } from "tailwindcss/defaultTheme";
import { isMobile, mobileModel } from 'react-device-detect';
import $ from 'jquery';

//tip jar min width is 725px or hight is 550px


class TipJar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Composite = Matter.Composite;
    var engine = Engine.create({
      // positionIterations: 20
    });
    engine.enableSleeping = true;

    var mattJSContainer = $('#matterjscontainer')
    console.log(mattJSContainer.width())
    console.log(mattJSContainer.height())
    var canvas = document.getElementById("matterjs");

    canvas.classList.add("w-full")
    canvas.classList.add("min-w-full")
    canvas.classList.add("min-h-65")
    canvas.classList.add("max-h-70")
    
    // var w = mattJSContainer.width();
    // var h = mattJSContainer.height();
    var w = mattJSContainer.width();
    var h = mattJSContainer.height();
    if(isMobile){
      h/=2
      w/=2
    }
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
    var rest = 0.3;
    // Array of walls for the tipjar - currently used for desktop  
    var walls = [];
    function desktopJar(){
    const boundaryThickness = 8

    // Bottom boundary
    var bWidth = w / 3;

    var oX = (w / 2)

    var lX = oX - bWidth * 0.7

    var rX = oX + bWidth * 0.925;


    // Mid ring, decided not to add however leaving it here for future use.
    
    // var midRing = Bodies.rectangle(oX * 1.065, 545, bWidth * 1.5, boundaryThickness, {
    //   isStatic: true,
    //   restitution: 0,
    //   chamfer: { radius: [5, 5, 5, 5] },
    //   collisionFilter: {
    //     category: 'no-collide'
    //   },
    //   render: {
    //     fillStyle: 'grey',
    //     strokeStyle: 'grey',
    //   },
    // })


    
    // Base of Jar
    var topBottom = Bodies.rectangle(oX * 1.065, bWidth * 3.2, bWidth * 1.32, boundaryThickness, {
      isStatic: true,
      restitution: 0,
      chamfer: { radius: [5, 5, 5, 5] },
    });

    var midBottom = Bodies.rectangle(oX * 1.065, bWidth * 3.259, bWidth * 1.32, boundaryThickness * 5.5, {
      isStatic: true,
      restitution: 0.1,
      chamfer: { radius: [5, 5, 5, 5] },
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
      },
    });

    var bottomBottom = Bodies.rectangle(oX * 1.065, bWidth * 3.3, bWidth * 1.3, boundaryThickness, {
      isStatic: true,
      restitution: 0.1,
      chamfer: { radius: [5, 5, 5, 5] },
    });

    // Right boundary
    var right = Bodies.rectangle(rX, bWidth * 2.275, boundaryThickness, bWidth * 2.1, {
      isStatic: true,
      chamfer: { radius: [5, 5, 5, 5] },
      render: {
        fillStyle: 'black',
        strokeStyle: 'black',
      },
      angle: 3.31,
    });

    // left boundary
    var left = Bodies.rectangle(lX, bWidth * 2.275, boundaryThickness, bWidth * 2.1, {
      isStatic: true,
      chamfer: { radius: [5, 5, 5, 5] },
      render: {
        fillStyle: 'black',
        strokeStyle: 'black',
      },
      angle: 3,
    });

    walls = [
      left, right, topBottom, midBottom, bottomBottom,
    ];


    Composite.add(engine.world, walls);
  }

    var mCenterX = w/2;
    var mCenterY = h/2;


    var mCenter = Bodies.rectangle(mCenterX, mCenterY , 3, 3, {
      isStatic: true,
      restitution: 0,
      collisionFilter: {
        category: 'no-collide'
      },
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
      },
    });


    var mBedrock = Bodies.rectangle(w, h, 10000, 1, {
      isStatic: true,
      restitution: rest,
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
      },
    });

    if(isMobile || (window.innerHeight < 500 && window.innerWidth < 725)){
      Composite.add(engine.world, mCenter);
      Composite.add(engine.world, mBedrock);
    }else{
      desktopJar()
      displayTipCoins()
      // Composite.add(engine.world, walls);
    }

    // var bedrock = Bodies.rectangle(w, canvas.height*1.15, w*h, boundaryThickness, { isStatic: true, 
    //   chamfer: {radius: [5, 5, 5, 5]},
    // })

    // World.add(engine.world, [bedrock]);

    function displayTipCoins(){
    var tips = []
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    for (var i = 0; i < 100; i++) {
      const bitcoin = Bodies.circle(w, 0 - h * 2, 14, {
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

      if (a > 35) {
        a = 40
      } else {
        a = 14
      }
      const eth = Bodies.circle(w, 0 - h * 2, a, {
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
      //   Matter.Body.setDensity(eth, 0.5)

      // }
      // Matter.Sleeping.update([eth], 5)
      // Matter.Sleeping.update([bitcoin], 5)
      // Matter.Sleeping.set(eth, true);
      tips.push(eth)
      tips.push(bitcoin)

      Body.set(eth, {})
    }
    Composite.add(engine.world, tips);

    }

    // var comp = Composite.create();
    // var comps = Composite.add(comp, walls)
    // World.add(engine.world, comps);




    // add mouse control
    var mouse = Mouse.create(render.canvas)
    var mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    // mouse.pixelRatio = 1;
    // console.log(mouseConstraint);
    Composite.add(engine.world, mouseConstraint);
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
    Render.setPixelRatio(render, 'auto')
    // Render.lookAt(render, walls, Matter.Vector.create(500,500));
    if(isMobile){
      // Render.lookAt(render, mCenter);
  }else{
    // Render.lookAt(render, walls);
    Render.lookAt(render, walls, {
      x: 100,
      y: 400
    },true);
  }
    // Window event on rotate device. Only for mobile
    window.addEventListener("orientationchange", function () {
      var canvas = document.getElementById("matterjs");
      var mattJSContainer = $('#matterjscontainer')
      alert(mattJSContainer.innerWidth())
      alert(window.innerWidth)
      // canvas.width = window. 
      render.canvas = canvas;
      // render.options.height = window.innerWidth 
      // render.options.width = window.innerHeight
      // Matter.Runner.run(engine)
      // Render.run(render);
      Render.setPixelRatio(render, 'auto')
      render.mouse = mouse;

    }, false);

    window.addEventListener('resize', () => {
      Render.lookAt(render, walls, {
        x: 100,
        y: 400
      }, true);
      
      Render.setPixelRatio(render, 'auto')
      var deep = false;
        // if (isMobile) {
      //   return null
      // }
      // var canvas = document.getElementById("matterjs");
      // var mattJSContainer = $('#matterjscontainer')
      // render.canvas = canvas;
      // render.options.height = mattJSContainer.height()
      // render.options.width = mattJSContainer.width()
      // // render.bounds.max.x = mattJSContainer.width()
      // // render.bounds.max.y = mattJSContainer.height()
      // Render.lookAt(render, walls, {
      //   x: 10,
      //   y: 400
      // });
      // render.mouse = mouse;

      // mouse.pixelRatio = 1;
      // console.log(mouseConstraint);
      // var a = document.getElementById("matterjscontainer")


      // render.options.width = a.width;
      // render.options.height = a.height;
      // render.canvas.width = w;
      // render.canvas.height = h;
      if(window.innerHeight < 500 || window.innerWidth < 725){
        console.log('switch to mobile / compressed view')
      }
      console.log('changes')
      // Render.lookAt(render, walls, {
      //   x: 0,
      //   y: 400
      // });
        });

  }

  render() {

    return <div ref="TipJar" />;
  }
}
export default TipJar;
