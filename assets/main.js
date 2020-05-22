let text = document.getElementById("title");
const btn = document.getElementById("button2");
const hero = document.getElementById("hero");
const footer = document.getElementById("text");
const audio = document.getElementById("audio");
const mute = document.getElementById("mute");
const start = document.getElementById("start");
const animation = document.querySelector('.animation-wrapper')


const quest = {
    text: "0%"
}

let checker = false;
let checkers = 0;

mute.onclick = () => {
    checkers++
    if (checker % 2 == 0) {
        mute.className = "fas fa-volume-mute";
    }
    audio.pause()
    mute.style.display = "none";
};

btn.addEventListener('click', function () {
    mute.style.display = "block";
    audio.play();
    audio.volume = 0.10;
    btn.style.display = "none";
    anime({
        targets: '#title',
        opacity: 0,
        scale: 0.2,
        duration: 4000
    });
    hero.style.display = "block"
    anime({
        targets: '#hero',
        opacity: 1,
        scale: 4.5,
        duration: 5000,
    })
    anime({
        targets: '.sphere-animation',
        opacity: 1,
        duration: 5000
    })
    setTimeout(() => {
        anime({
            targets: '#text',
            opacity: {
                value: 1,
                duration: 1000,
                easing: 'easeInOutQuad',
            },
        })
    }, 5500);
    setTimeout(() => {
        anime({
            targets: '#text2',
            opacity: {
                value: 1,
                duration: 1000,
                easing: 'easeInOutQuad',
            },
        })
        checker = true
    }, 9000);
})
let clicked = false
hero.addEventListener("click", function () {
    if (clicked != true && checker == true) {
        clicked = true
        if (checker == true) {
            hero.src = "popa2.png"
            anime({
                targets: '#hero',
                scale: 4.5,
                duration: 0
            })
            anime({
                targets: quest,
                text: "OHH",
                round: 1,
                easing: 'linear',
                update: function () {
                    footer.innerHTML = quest.text;
                }
            })
            anime({
                targets: '#hero',
                translateX: -300,
                duration: 1000
            })
            function random() {
                anime({
                    targets: '#hero',
                    duration: 3000,
                    translateX: [-300, 300],
                    direction: 'alternate',
                    easing: 'linear',
                    loop: true,
                })
            }
            setTimeout(() => {
                random()
            }, 1000);

        }
    }
})
window.onload = () => {
    anime({
        targets: quest,
        text: "100%",
        round: 1,
        easing: 'linear',
        duration: 1500,
        update: function () {
            start.innerHTML = quest.text;
        }
    })
    setTimeout(() => {
        anime({
            targets: "#start",
            opacity: 0,
            duration: 1000,
            easing: 'linear',
        })
    }, 3200);
    setTimeout(() => {
        anime({
            targets: "#start",
            opacity: 1,
            duration: 2000,
            easing: 'linear',
        })
        start.innerHTML = "Здравствуйте, уважаемый Преподаватель"
    }, 4600);
    setTimeout(() => {
        anime({
            targets: "#start",
            opacity: 0,
            duration: 1000,
            easing: 'linear',
        })
    }, 6600);
    setTimeout(() => {
        btn.style.display = "block"
        start.innerHTML = "У меня есть предложение для Вас."
        anime({
            targets: "#start",
            opacity: 1,
            duration: 1000,
            easing: 'linear',
        })
    }, 8000);
    setTimeout(() => {
        anime({
            targets: "#button2",
            opacity: 1,
            duration: 3000,
            easing: 'linear',
        })
    }, 10000);
}
window.human = false;

var canvasEl = document.querySelector('.fireworks');
var ctx = canvasEl.getContext('2d');
var numberOfParticules = 30;
var pointerX = 0;
var pointerY = 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

function setCanvasSize() {
    canvasEl.width = window.innerWidth * 2;
    canvasEl.height = window.innerHeight * 2;
    canvasEl.style.width = window.innerWidth + 'px';
    canvasEl.style.height = window.innerHeight + 'px';
    canvasEl.getContext('2d').scale(2, 2);
}

function updateCoords(e) {
    pointerX = e.clientX || e.touches[0].clientX;
    pointerY = e.clientY || e.touches[0].clientY;
}

function setParticuleDirection(p) {
    var angle = anime.random(0, 360) * Math.PI / 180;
    var value = anime.random(50, 180);
    var radius = [-1, 1][anime.random(0, 1)] * value;
    return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle)
    }
}

function createParticule(x, y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(16, 32);
    p.endPos = setParticuleDirection(p);
    p.draw = function () {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = p.color;
        ctx.fill();
    }
    return p;
}

function createCircle(x, y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = '#FFF';
    p.radius = 0.1;
    p.alpha = .5;
    p.lineWidth = 6;
    p.draw = function () {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.lineWidth = p.lineWidth;
        ctx.strokeStyle = p.color;
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    return p;
}

function renderParticule(anim) {
    for (var i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw();
    }
}

function animateParticules(x, y) {
    var circle = createCircle(x, y);
    var particules = [];
    for (var i = 0; i < numberOfParticules; i++) {
        particules.push(createParticule(x, y));
    }
    anime.timeline().add({
        targets: particules,
        x: function (p) { return p.endPos.x; },
        y: function (p) { return p.endPos.y; },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule
    })
        .add({
            targets: circle,
            radius: anime.random(80, 160),
            lineWidth: 0,
            alpha: {
                value: 0,
                easing: 'linear',
                duration: anime.random(600, 800),
            },
            duration: anime.random(1200, 1800),
            easing: 'easeOutExpo',
            update: renderParticule,
            offset: 0
        });
}

var render = anime({
    duration: Infinity,
    update: function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }
});

document.addEventListener(tap, function (e) {
    window.human = true;
    render.play();
    updateCoords(e);
    animateParticules(pointerX, pointerY);
}, false);

var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;

function autoClick() {
    if (window.human) return;
    animateParticules(
        anime.random(0, window.innerWidth),
        anime.random(0, window.innerHeight)
    );
    anime({ duration: 2000 }).finished.then(autoClick);
}
autoClick()
setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);
