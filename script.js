const transitions = document.querySelectorAll(".car-transition");
const cars = document.querySelectorAll(".car-image-container");

let activeTransition = null;

let lastScrollY = window.scrollY;

const transitionObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    const scrollingDown = window.scrollY > lastScrollY;
    lastScrollY = window.scrollY;

    const catchphrase = entry.target.querySelector(".catchphrase");
    const sound = entry.target.querySelector(".rev-sound");

    if (entry.isIntersecting) {

      activeTransition = entry.target;

      document.body.style.backgroundColor = "#05070d";

      catchphrase.classList.add("catchphrase-visible");

      if (scrollingDown && sound && sound.paused) {

        setTimeout(() => {

          if (entry.target === activeTransition) {
            sound.currentTime = 0;
            sound.play();
          }

        }, 500);

      }

    } else {

      document.body.style.backgroundColor = "#0b0f1a";

      catchphrase.classList.remove("catchphrase-visible");

    }

  });

}, { threshold: 0.7 });

transitions.forEach(section => {
  transitionObserver.observe(section);
});


const carObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("car-visible");
    } else {
      entry.target.classList.remove("car-visible");
    }

  });

}, { threshold: 0.6 });

cars.forEach(car => {
  carObserver.observe(car);
});

function runCarSequence(transitionId) {

  const transition = document.getElementById(transitionId);
  if (!transition) return;

  const sound = transition.querySelector(".rev-sound");

  setTimeout(() => {
    transition.scrollIntoView({ behavior: "smooth" });
  }, 150);


  const nextCard = transition.nextElementSibling?.nextElementSibling;

  if (sound && nextCard) {
    const earlyScrollTime = 600; 
    sound.onplay = () => {
      setTimeout(() => {
        nextCard.scrollIntoView({ behavior: "smooth" });
      }, sound.duration * 1000 - earlyScrollTime);
    };
  }
}


const nextButtons = document.querySelectorAll(".next-car");

nextButtons.forEach(button => {

  button.addEventListener("click", () => {
    runCarSequence(button.dataset.target);
  });

});



const slits = document.querySelectorAll(".slit");

slits.forEach(slit => {

  slit.addEventListener("click", () => {
    runCarSequence(slit.dataset.target);
  });

});

window.addEventListener("load", () => {

  const title = document.querySelector(".intro-title");
  const hero = document.getElementById("hero");

  const introPlayed = sessionStorage.getItem("introPlayed");

  if (!introPlayed) {

    const text = title.textContent;
    title.textContent = "";

    [...text].forEach((letter, index) => {

      const span = document.createElement("span");

      span.textContent = letter === " " ? "\u00A0" : letter;

      title.appendChild(span);

      setTimeout(() => {
        span.classList.add("visible");
      }, index * 80);

    });

    setTimeout(() => {

      hero.scrollIntoView({
        behavior: "smooth"
      });

    }, text.length * 80 + 2000);

    sessionStorage.setItem("introPlayed", "true");

  }

});









