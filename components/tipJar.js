import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";

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
        MouseConstraint = Matter.MouseConstraint;
  
      var engine = Engine.create({
        // positionIterations: 20
      });
  
      var render = Render.create({
        element: this.refs.TipJar,
        engine: engine,
        options: {
          width: 800,
          height: 600,
          wireframes: false
        }
      });
  
    var rest = 0.9, 
      space = 600 / 5;
    const boundaryThickness = 1
    var tips = [
        // Top boundary
        // Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),

        // Bottom boundary
        Bodies.rectangle(400, 600, 800, boundaryThickness, { isStatic: true }),
        
        // Right boundary
        Bodies.rectangle(800, 300, boundaryThickness, 600, { isStatic: true }),

        //Left boundary
        Bodies.rectangle(0, 300, boundaryThickness, 600, { isStatic: true }),

        // Start tip objects 
        // Bodies.rectangle(100 + space * 1, -200, 50, 50, { restitution: rest }),
        // Bodies.rectangle(100 + space * 1, -200, 50, 50, { restitution: rest, angle: -Math.PI * 0.15 }),
        // Bodies.rectangle(100 + space * 1, -200, 50, 50, { restitution: rest, angle: -Math.PI * 0.25 }),
        
        // Bodies.rectangle(100 + space * 1, -200, 180, 20, { restitution: rest, angle: -Math.PI * 0.5 }),
        
    ];

    const bitcoin = Bodies.circle(100 + space * 2, 100, 25, {
      restitution: rest,
      render: {
        sprite: {
          texture: "https://cryptoicons.org/api/icon/btc/50",
          xScale: 1,
          yScale: 1
        }
      }
    });
    tips.push(bitcoin)
    // tips.push(bitcoin)



    
      //console.log(Box1);
  
      World.add(engine.world, tips);

      var ballA = Bodies.circle(100 + space * 1, -200, 25, { restitution: 0.5, });
      ballA.render.sprite.xScale = 0;
      ballA.render.sprite.yScale = 0;
  
      // World.add(engine.world, ballA);
      // add mouse control
      var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            // length: 0.000001,
            /* pointA=mouse.position,*/
  
            // stiffness: 0.002,
            // angularStiffness: 0.00001,
            //setAngularVelocity:0.001,
  
            // render: {
            //   visible: true,
            // //   lineWidth: 0.5,
            //   anchors: true
            // },
            // damping: 0.000000000001
          }
        });
      // mouse.pixelRatio = 1;
      // console.log(mouseConstraint);
      World.add(engine.world, mouseConstraint);
  
      onmousemove = () => {
        //console.log(mouse.position);
        // console.log(mouse.position);
        //      console.log(ballA.collisionFilter);

      };
      Engine.run(engine);
  
      Render.run(render);
    }
  
    render() {
      return <div ref="TipJar" />;
    }
  }
export default TipJar;
