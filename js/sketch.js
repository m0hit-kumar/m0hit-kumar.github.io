window.addEventListener("load", function () {
  //Fetch our canvas
  var canvas = document.getElementById("world");

  //Setup Matter JS
  var engine = Matter.Engine.create();
  var world = engine.world;
  var render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: 500,
      height: 500,
      background: "transparent",
      wireframes: false,
      showAngleIndicator: false,
    },
  });

  //Add a ball
  // var ball = Matter.Bodies.circle(250, 250, 50, {
  //   density: 0.04,
  //   friction: 0.01,
  //   frictionAir: 0.00001,
  //   restitution: 0.8,
  //   render: {
  //     fillStyle: "#F35e66",
  //     strokeStyle: "black",
  //     lineWidth: 1,
  //   },
  // });
  //   x, y ,  width ,  height

  let boxA = Matter.Bodies.rectangle(200, 100, 80, 80);
  // let boxB = Matter.Bodies.rectangle(200, 100, 80, 80);
  // let boxC = Matter.Bodies.rectangle(200, 100, 80, 80);

  var floor = Matter.Bodies.rectangle(250, 520, 500, 80, {
    isStatic: true,
    render: {
      visible: true,
    },
  });
  Matter.World.add(world, [floor, boxA]);

  //Make interactive
  var mouseConstraint = Matter.MouseConstraint.create(engine, {
    //Create Constraint
    element: canvas,
    constraint: {
      render: {
        visible: false,
      },
      stiffness: 0.8,
    },
  });
  Matter.World.add(world, mouseConstraint);

  //Start the engine
  Matter.Engine.run(engine);
  Matter.Render.run(render);
});
