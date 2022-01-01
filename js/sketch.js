let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

const mycanvaselement = document.getElementsByClassName("contact");
let engine = Engine.create();
let render = Render.create({
  element: mycanvaselement,
  engine: engine,
  options: {
    width: 800,
    height: 900,
    wireframes: false,
    showAngleIndicator: false,
  },
});
function setup() {
  let boxA = Bodies.rectangle(200, 100, 80, 80);
  console.log(boxA);
  // let boxB = Bodies.rectangle(200, 100, 80, 80);
  // let boxC = Bodies.rectangle(200, 100, 80, 80);

  let ground = Bodies.rectangle(200, 480, 810, 60, { isStatic: true });

  Composite.add(engine.world, [boxA]);

  Runner.run(engine);
  Render.run(render);
}
