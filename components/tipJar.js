import React from "react";
import ReactDOM from "react-dom";
import Matter, { Body, Constraint } from "matter-js";
import { borderRadius, width } from "tailwindcss/defaultTheme";
import { isMobile, mobileModel } from 'react-device-detect';
import $ from 'jquery';

//tip jar min width is 725px or hight is 550px

const DBEDROCK_LEVEL = "BEDROCK"

class TipJar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {

    var Engine = Matter.Engine,
      Render = Matter.Render,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Composite = Matter.Composite,
      Events = Matter.Events;
    var engine = Engine.create({
      // positionIterations: 20,
      // velocityIterations: 20,
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
    if (isMobile) {
      h /= 2
      w /= 2
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
    // Bottom boundary
    var bWidth = w / 3;

    var oX = (w / 2)

    var lX = oX - bWidth * 0.7

    var rX = oX + bWidth * 0.925;

    function desktopJar() {
      const boundaryThickness = 8




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
        label: JSON.stringify({
          name: 'topBottom',
          type: 'wall',
          fastSlow: true,
        }),
        isStatic: true,
        restitution: 0,
        chamfer: { radius: [5, 5, 5, 5] },
      });

      var midBottom = Bodies.rectangle(oX * 1.065, bWidth * 3.259, bWidth * 1.32, boundaryThickness * 5.5, {
        label: JSON.stringify({
          name: 'midBottom',
          type: 'wall',
          fastSlow: true,
        }),
        isStatic: true,
        restitution: 0.1,
        chamfer: { radius: [5, 5, 5, 5] },
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent',
        },
      });

      var bottomBottom = Bodies.rectangle(oX * 1.065, bWidth * 3.3, bWidth * 1.3, boundaryThickness, {
        label: JSON.stringify({
          name: 'bottomBottom',
          type: 'wall',
          fastSlow: false,
        }),
        isStatic: true,
        restitution: 0.1,
        chamfer: { radius: [5, 5, 5, 5] },
      });

      // Right boundary
      var right = Bodies.rectangle(rX, bWidth * 2.275, boundaryThickness, bWidth * 2.1, {
        label: JSON.stringify({
          name: 'right',
          type: 'wall',
          fastSlow: false,
        }),
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
        label: JSON.stringify({
          name: 'left',
          type: 'wall',
          fastSlow: false,
        }),
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

      var dBedrock = Bodies.rectangle(bottomBottom.position.x, bottomBottom.position.y * 4, 99999, 20, {
        label: JSON.stringify({
          name: 'dBedrock',
          type: DBEDROCK_LEVEL,
          fastSlow: false,
        }),
        isStatic: true,
        render: {
          fillStyle: 'red',
          strokeStyle: 'red',
        },
      });

      // Used in debug to see where the limit for static items will be
      var staticTop = Bodies.rectangle(bottomBottom.position.x, bWidth, 99999, 20, {
        label: JSON.stringify({
          name: 'staticTop',
          type: "wall",
          fastSlow: false,
        }),
        isStatic: true,
        collisionFilter: {
          category: 'no-collide'
        },
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent',
        },
      });

      Composite.add(engine.world, staticTop);

      Composite.add(engine.world, dBedrock);

    }

    var mCenterX = w / 2;
    var mCenterY = h / 2;


    var mCenter = Bodies.rectangle(mCenterX, mCenterY, 3, 3, {
      label: JSON.stringify({
        name: 'mCenter',
        type: "wall",
        fastSlow: false,
      }),
      isStatic: true,
      restitution: 1,
      collisionFilter: {
        category: 'no-collide'
      },
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
      },
    });

    const YOffset = isMobile ? 3 : 2
    var mBottomY = ((mCenterY * YOffset) + 100)
    if (w > h) {
      mBottomY -= 30
    } else {
      mBottomY += 30

    }
    var mBottom = Bodies.rectangle(mCenterX, mBottomY, 10000, 30, {
      label: JSON.stringify({
        name: 'mCBottom',
        type: "wall",
        fastSlow: false,
      }),
      isStatic: true,
      restitution: 1,
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
      },
    });


    var mBedrock = Bodies.rectangle(mCenterX, mBottom.position.y * 1.3, 999999, 30, {
      label: JSON.stringify({
        name: 'mBedrock',
        type: DBEDROCK_LEVEL,
        fastSlow: false,
      }),
      isStatic: true,
      restitution: rest,
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
      },
    });


    // var mBedrock = Bodies.rectangle(w, (h+30*0.45), 10000, 30, {
    //   label: JSON.stringify({
    //     name: 'mBedrock',
    //     type: DBEDROCK_LEVEL,
    //     fastSlow: false,
    //   }),
    //   isStatic: true,
    //   restitution: rest,
    //   render: {
    //     fillStyle: 'transparent',
    //     strokeStyle: 'transparent',
    //   },
    // });



    // var bedrock = Bodies.rectangle(w, canvas.height*1.15, w*h, boundaryThickness, { isStatic: true, 
    //   chamfer: {radius: [5, 5, 5, 5]},
    // })

    // World.add(engine.world, [bedrock]);

    async function displayTipCoins() {
      var tips = []
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      const maxCoins = 300;
      for (var i = 0; i < maxCoins; i++) {
        var coin;
        var spawnOffset = 0
        if (i == maxCoins / 2) {
          var randOffset = getRandomInt(w / 4)
          if (getRandomInt(2)) {
            spawnOffset -= randOffset
          } else {
            spawnOffset += randOffset
          }
        }
        // const bitcoin = Bodies.circle(w / 2 + spawnOffset, 0 - h * 2, 18, {
        //   restitution: 1,
        //   slop: 0,
        //   render: {
        //     sprite: {
        //       texture: "../images/crypto/svg/color/btc.svg",
        //       // texture: "../images/crypto/128/color/btc.png",

        //       xScale: 1.2, //0.35 per $
        //       yScale: 1.2
        //     }
        //   }
        // }, 5);
        const bitcoin = Bodies.circle(w / 2 + spawnOffset, 0 - h * 2, 18, {
          restitution: 1,
          slop: 0,
          render: {
            sprite: {
              texture: "../images/crypto/svg/color/btc.svg",
              // texture: "../images/crypto/128/color/btc.png",

              xScale: 1.1, //0.35 per $
              yScale: 1.1
            }
          }
        }, 5);

        var a = getRandomInt(40)

        if (a > 35) {
          a = 40
        } else {
          a = 18
        }
        const eth = Bodies.circle(w / 2 + spawnOffset, 0 - h * 2, a, {
          restitution: 1,
          slop: 0,
          render: {
            sprite: {
              texture: "../images/crypto/svg/color/eth.svg",
              xScale: a > 35 ? 2.5 : 1.2,
              yScale: a > 35 ? 2.5 : 1.2
            }
          }
        });

        if (getRandomInt(2) == 1) {
          coin = eth
        } else {
          coin = bitcoin
        }

        // Extends the top 10% of coins so they have time to rest
        var coinLabel = {
          name: 'xCoin',
          type: 'coin',
          fastSlow: true,
        }
        if (i >= maxCoins * 0.9) {
          // coin.restitution = 0.03
          coinLabel.fastSlow = false
        }

        if (isMobile) {
          coin.restitution = 0.5
        }

        coin.label = JSON.stringify(coinLabel)

        // if(a = 40){
        //   Matter.Body.setDensity(coin, 1)
        // }else{
        //   Matter.Body.setDensity(coin, 0.05)
        // }
        // Matter.Sleeping.update([eth], 5)
        // Matter.Sleeping.update([bitcoin], 5)
        // Matter.Sleeping.set(eth, true);
        // tips.push(eth)
        await new Promise(r => setTimeout(r, getRandomInt(100)));

        Composite.add(engine.world, coin);
        // tips.push(bitcoin)

        // Body.set(eth, {})
      }

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

    Matter.Runner.run(engine);
    Render.run(render);
    Render.setPixelRatio(render, 'auto');
    // Render.lookAt(render, walls, Matter.Vector.create(500,500));

    // Window event on rotate device. Only for mobile
    window.addEventListener("orientationchange", function () {

      location.reload();

    }, false);

    window.addEventListener('resize', () => {
      if (!isMobile) {
        Render.lookAt(render, walls, {
          x: 100,
          y: 400
        }, true);

        Render.setPixelRatio(render, 'auto')

      } else {

        // if (window.innerHeight < 500 || window.innerWidth < 725) {
        //   console.log('switch to mobile / compressed view')
        //   Render.lookAt(render, mCenter, {
        //     x: 100,
        //     y: 400
        //   }, true);

        // }
        // console.log('changes')



        if (w > h) {
          Render.lookAt(render, mCenter, {
            x: 400,
            y: 200
          }, true);
        } else {
          Render.lookAt(render, mCenter, {
            x: 100,
            y: 400
          }, true);
        }

      }



      // Render.lookAt(render, walls, {
      //   x: 0,
      //   y: 400
      // });
    });

    // Will remove all bodies that are way off the screen.
    async function removeBodiesOffScreen() {
      const allObjects = Composite.allBodies(engine.world)
      for (var bodyIndex in allObjects) {
        const body = allObjects[bodyIndex]
        // Body.setStatic(body, true);
        // console.log(allObjects[bodyIndex].position.x)
        if (body.position.x >= w * 5 || body.position.y >= h * 5) {
          Matter.World.remove(engine.world, body)

        }
      }
    }

    // 
    async function cleanUp() {
      const cleanUpTimes = 5;
      const cleanUpDelay = 5000 // 5 Seconds
      for (var i = 0; i < cleanUpTimes; i++) {
        await new Promise(r => setTimeout(r, cleanUpDelay));

        removeBodiesOffScreen()

      }
    }


    Matter.Events.on(engine, 'collisionStart', async ({ pairs }) => {

      pairs.forEach(async ({ bodyA, bodyB }) => {
        var coinALabel = JSON.parse(bodyA.label);
        var coinBLabel = JSON.parse(bodyB.label);

        if (!isMobile && (coinBLabel.type == DBEDROCK_LEVEL || bodyA.position.x >= w * 3 || bodyA.position.h >= w * 5)) {
          console.log('DELETED')
          console.log(bodyA.id)
          Matter.World.remove(engine.world, bodyA)

        }

        if (!isMobile && (coinALabel.type == DBEDROCK_LEVEL || bodyB.position.x >= w * 3 || bodyB.position.h >= w * 5)) {
          console.log('DELETED')
          console.log(bodyB.id)
          Matter.World.remove(engine.world, bodyB)

        }

        if (coinALabel.type === 'coin') {
          if (coinALabel.fastSlow || isMobile) {
            await new Promise(r => setTimeout(r, 7500));
          } else {
            await new Promise(r => setTimeout(r, 30000));
            console.log('BIG SLEEP')
          }
          if ((bodyA.position.x >= lX * 0.8 && bodyA.position.x <= rX * 1.1 &&
            (bodyA.position.y >= bWidth * 1)) || isMobile) {
            Body.setStatic(bodyA, true);

            // Matter.Sleeping.set(bodyA, true)
            // Matter.Composite.move(bodyA, [], tempBody)
            // Body.setStatic(bodyA, false);

          }

        }

        if (coinBLabel.type === 'coin') {
          if (coinBLabel.fastSlow || isMobile) {
            await new Promise(r => setTimeout(r, 7500));
          } else {
            await new Promise(r => setTimeout(r, 30000));
            console.log('BIG SLEEP 1')
          }
          if ((bodyB.position.x >= lX * 0.9 && bodyB.position.x <= rX * 1.1 &&
            (bodyB.position.y >= bWidth * 1)) || isMobile) {
            Body.setStatic(bodyB, true);

          }
        }

      });
    });

    //    Matter.Events.on(engine, 'collisionEnd', async ({ pairs }) => {
    //     await pairs.forEach(async ({ bodyA, bodyB }) => {
    //       // await new Promise(r => setTimeout(r, 5000));

    //       // if(bodyA.label === 'Circle Body' && bodyA.isStatic === false){
    //       //   Body.setStatic(bodyA, true);
    //       // }

    //       // if(bodyB.label === 'Circle Body' && bodyB.isStatic === false){
    //       //   Body.setStatic(bodyB, true);
    //       // }


    //       // if(bodyB.label === 'Circle Body'){
    //       //   Body.setStatic(bodyB, true);
    //       // }
    //       // Body.setStatic(bodyA, true);
    //       // Body.setStatic(bodyB, true);

    //       // if (bodyA !== ball) Matter.World.remove(world, bodyA);
    //       // if (bodyB !== ball) Matter.World.remove(world, bodyB);
    //    });
    //  });

    //  Matter.Events.on(engine, 'collisionStart', function(event) {
    //   const mouseX = mouse.position.x
    //   const mouseY = mouse.position.y
    //   const allObjects = Composite.allBodies(engine.world)

    //   const focusedCoins = Matter.Query.point(allObjects, {x: mouseX, y:mouseY});
    //   for (var coinIndex in focusedCoins) {
    //     const coin = focusedCoins[coinIndex]
    //     console.log(coin.label)
    //   }
    //   // do something with the pairs that have started collision
    // });

    //   Events.on(mouseConstraint, 'mousedown', function(event) {
    //     const mouseX = mouse.position.x
    //     const mouseY = mouse.position.y
    //     const allObjects = Composite.allBodies(engine.world)

    //     const focusedCoins = Matter.Query.point(allObjects, {x: mouseX, y:mouseY});
    //     for (var coinIndex in focusedCoins) {
    //       const coin = focusedCoins[coinIndex]
    //       console.log(coin.label)
    //     }
    // });
    if (isMobile || (window.innerHeight < 500 || window.innerWidth < 725)) {
      Composite.add(engine.world, mCenter);
      Composite.add(engine.world, mBottom);
      Composite.add(engine.world, mBedrock);
    } else {
      desktopJar()
      // Composite.add(engine.world, walls);
    }


    if (isMobile || (window.innerHeight < 500 || window.innerWidth < 725)) {

      if (w > h) {
        Render.lookAt(render, mCenter, {
          x: 400,
          y: 200
        }, true);
      } else {
        Render.lookAt(render, mCenter, {
          x: 100,
          y: 400
        }, true);
      }

    } else {
      // Render.lookAt(render, walls);
      Render.lookAt(render, walls, {
        x: 100,
        y: 400
      }, true);
    }

    await displayTipCoins()
    cleanUp()


  }



  render() {

    return <div ref="TipJar" />;

  }
}
export default TipJar;
