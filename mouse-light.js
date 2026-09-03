/* =========================
   Floating background ghost
   ========================= */

/*
   Creates a faint duplicate of the page background
   that slowly drifts behind the content.
*/

/* =========================
   Floating background ghosts
   ========================= */

for (let i = 1; i <= 3; i++) {
  const ghost = document.createElement("div");
  ghost.className = `background-ghost ghost-${i}`;
  document.body.prepend(ghost);
}


/* =========================
   Mouse light setup
   ========================= */

const root = document.documentElement;
const body = document.body;

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

let currentX = targetX;
let currentY = targetY;

let lastTrailX = targetX;
let lastTrailY = targetY;

let lastTrailTime = 0;


/* =========================
   Mouse movement
   ========================= */

document.addEventListener("mousemove", (event) => {

  targetX = event.clientX;
  targetY = event.clientY;

  body.classList.add("mouse-active");


  /* ---------------------------------
     Create subtle light trails
     --------------------------------- */

  const now = performance.now();

  const dx = event.clientX - lastTrailX;
  const dy = event.clientY - lastTrailY;

  const distance = Math.sqrt(dx * dx + dy * dy);


  /*
     Only create a trail if the mouse
     moved enough.

     This keeps the effect restrained.
  */

  if (distance > 18 && now - lastTrailTime > 35) {

    createTrail(
      lastTrailX,
      lastTrailY,
      event.clientX,
      event.clientY
    );

    lastTrailX = event.clientX;
    lastTrailY = event.clientY;

    lastTrailTime = now;
  }

});


document.addEventListener("mouseleave", () => {
  body.classList.remove("mouse-active");
});


/* =========================
   Smooth following light
   ========================= */

function animateLight() {

  currentX += (targetX - currentX) * 0.09;
  currentY += (targetY - currentY) * 0.09;

  root.style.setProperty(
    "--mouse-x",
    `${currentX}px`
  );

  root.style.setProperty(
    "--mouse-y",
    `${currentY}px`
  );

  requestAnimationFrame(animateLight);
}

animateLight();


/* =========================
   Create light trail
   ========================= */

function createTrail(x1, y1, x2, y2) {

  const trail = document.createElement("div");

  trail.className = "mouse-trail";


  const dx = x2 - x1;
  const dy = y2 - y1;

  const distance = Math.sqrt(
    dx * dx + dy * dy
  );

  const angle =
    Math.atan2(dy, dx) * 180 / Math.PI;


  trail.style.left = `${x1}px`;
  trail.style.top = `${y1}px`;

  /*
     Trail length changes slightly
     depending on mouse speed.
  */

  trail.style.width =
    `${Math.min(55, Math.max(25, distance))}px`;

  trail.style.transform =
    `rotate(${angle}deg)`;


  document.body.appendChild(trail);


  /* Remove after animation */

  trail.addEventListener(
    "animationend",
    () => trail.remove()
  );

}