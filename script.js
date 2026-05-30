const pages = [
  {
    title: "Page 1",
    text: `Happy 2 Months 💛

This month had Minecraft in it...
but the best part wasn't the game.

It was YOU.


And this Month was also Special because...
15th January, You know Why 😉.`,
    image: ""
  },
  {
    title: "Page 2",
    text: `We built things.
We explored.
We laughed.
We Watched the sunset together.

And Somehow...
it felt like home.

We Built a Garden of Flowers in Front of our cozy little house.
But even with all these flowers, The only flower i look at is you...`,
    image: ""
  },
  {
    title: "Page 3",
    text: `If I could save one thing forever...

It wouldn't be a world file.
It would be this month with you.

HeHe and yeahhh I'll explain How you can export world into your files...
And We can add it to a drive so it'll be preserved.`,
    image: ""
  },
  {
    title: "Page 4",
    text: `Even if we were just two players...

You made every moment feel important.
Nothing felt boring when i was with You

(also yes you're my favorite player 😭)

Ohh and Yeahhh you'll forever be my One and Only Baby :) 
you remember that right 😾 `,
    image: ""
  },
  {
    title: "Page 5",
    text: `Happy 2 months 💛

Thank you for being here.

And Now You're stuck.
Cuz i'm the kind of person that never leaves someone.
Annnnnnnddddd...

Never...
Forget...
You're...
Onlyyyyyyyy...


Mineee... <3

— Viraj`,
    image: ""
  }
];

let currentPage = 0;
let typingTimer = null;

const cover = document.getElementById("cover");
const ui = document.getElementById("ui");

const openBtn = document.getElementById("openBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const doneBtn = document.getElementById("doneBtn");

const pageTitle = document.getElementById("pageTitle");
const pageText = document.getElementById("pageText");
const pageNum = document.getElementById("pageNum");
const pageTotal = document.getElementById("pageTotal");

const pageImage = document.getElementById("pageImage");
const pageContent = document.getElementById("pageContent");

const flipSound = document.getElementById("flipSound");

const typeSound = document.getElementById("typeSound");


const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
let musicOn = false;


pageTotal.textContent = pages.length;

function playFlip(){
  if(!flipSound) return;
  flipSound.currentTime = 0;
  flipSound.play().catch(()=>{});
}

function animateFlip(){
  pageContent.classList.remove("flip");
  void pageContent.offsetWidth;
  pageContent.classList.add("flip");
}

function clearTyping(){
  if(typingTimer) clearInterval(typingTimer);
  typingTimer = null;
}

function typeText(fullText){
  clearTyping();
  pageText.textContent = "";
  let i = 0;

  typingTimer = setInterval(() => {
    pageText.textContent += fullText[i] || "";
i++;

// play sound every 2-3 characters
if(i % 3 === 0){
  playTypeSound();
}


    if (i >= fullText.length) clearTyping();
  }, 18);
}

function playTypeSound(){
  if(!typeSound) return;

  // tiny random pitch feel (fake but cute)
  typeSound.currentTime = 0;
  typeSound.volume = 0.25;

  typeSound.play().catch(()=>{});
}


function renderPage(){
  const p = pages[currentPage];

  pageTitle.textContent = p.title;
  pageNum.textContent = currentPage + 1;

  prevBtn.disabled = currentPage === 0;

  nextBtn.textContent = (currentPage === pages.length - 1) ? "Done ▶" : "Next ▶";

  if (p.image && p.image.trim() !== "") {
    pageImage.src = p.image;
    pageImage.style.display = "block";
    pageImage.alt = "Anniversary image";
  } else {
    pageImage.removeAttribute("src");
    pageImage.style.display = "none";
  }

  typeText(p.text);
}

function goToPage(idx){
  if(idx < 0 || idx >= pages.length) return;
  currentPage = idx;
  playFlip();
  animateFlip();
  renderPage();
}

openBtn.addEventListener("click", () => {
  cover.classList.add("open");
  ui.classList.add("show");
  playFlip();
  renderPage();
  bgm.volume = 0.25;
bgm.play().catch(()=>{});
musicOn = true;
musicBtn.textContent = "⏸ Pause Music";

});

prevBtn.addEventListener("click", () => goToPage(currentPage - 1));

nextBtn.addEventListener("click", () => {
  if(currentPage === pages.length - 1){
    playFlip();
    ui.classList.remove("show");
    cover.classList.remove("open");
    return;
  }
  goToPage(currentPage + 1);
});

doneBtn.addEventListener("click", () => {
  playFlip();
  ui.classList.remove("show");
  cover.classList.remove("open");
});

/* Hearts */
function fillCornerHearts(selector){
  const box = document.querySelector(selector);
  if(!box) return;

  const count = 3;
  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "mc-heart64";

    h.style.left = `${6 + i * 45}px`;
    h.style.top = `${10 + i * 16}px`;
    h.style.transform = `scale(${1 - i*0.08})`;

    box.appendChild(h);
  }
}

fillCornerHearts(".topLeft");
fillCornerHearts(".topRight");

/* Sparkles - glowy + softer */
const canvas = document.getElementById("sparkles");
const ctx = canvas.getContext("2d");

let W = window.innerWidth;
let H = window.innerHeight;

canvas.width = W;
canvas.height = H;

const sparkles = [];
const sparkleCount = 70;

function resize(){
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}
window.addEventListener("resize", resize);

function rand(min, max){
  return Math.random() * (max - min) + min;
}

function makeSparkle(){
  return {
    x: rand(0, W),
    y: rand(0, H),
    r: rand(1.1, 2.6),
    a: rand(0.25, 0.85),

    dx: rand(-0.18, 0.18),
    dy: rand(-0.5, -0.15),

    life: rand(90, 220),
    glow: rand(10, 20),

    // ✅ twinkle values
    tw: rand(0, Math.PI * 2),     // phase
    tws: rand(0.015, 0.045)       // speed
  };
}

for(let i=0;i<sparkleCount;i++){
  sparkles.push(makeSparkle());
}

function draw(){
  ctx.clearRect(0,0,W,H);

  for(let sp of sparkles){
    sp.x += sp.dx;
    sp.y += sp.dy;
    sp.life--;

    // ✅ twinkle (smooth pulse)
sp.tw += sp.tws;
const twinkle = 0.55 + Math.sin(sp.tw) * 0.45; // 0.1 -> 1 range vibe
const alphaNow = sp.a * twinkle;
const glowNow = sp.glow * (0.7 + twinkle * 0.6);


    if(sp.y < -30 || sp.life < 0){
      sp.x = rand(0, W);
      sp.y = H + rand(0, 100);
      sp.life = rand(90, 220);
    }

    if(sp.x < -40) sp.x = W + 40;
    if(sp.x > W + 40) sp.x = -40;

    // natural glow using radial gradient (NO ring)
const g = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, glowNow);
g.addColorStop(0, `rgba(255,255,255,${alphaNow})`);
g.addColorStop(1, `rgba(255,255,255,0)`);

ctx.globalAlpha = 1;
ctx.fillStyle = g;
ctx.beginPath();
ctx.arc(sp.x, sp.y, sp.glow, 0, Math.PI * 2);
ctx.fill();

    // bright core
ctx.globalAlpha = alphaNow;
    ctx.beginPath();
ctx.arc(sp.x, sp.y, glowNow, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
draw();

renderPage();

musicBtn.addEventListener("click", () => {
  if(!bgm) return;

  if(!musicOn){
    bgm.volume = 1;
    bgm.play().then(() => {
      musicOn = true;
      musicBtn.textContent = "⏸ Pause Music";
    }).catch(() => {
      // if mobile blocks it, user just click again
    });
  } else {
    bgm.pause();
    musicOn = false;
    musicBtn.textContent = "♫ Play Music";
  }
});

