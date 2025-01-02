// Select elements
const items = document.querySelectorAll("[data-carousel-item]");
const indicators = document.querySelectorAll("[data-carousel-slide-to]");
let currentIndex = 0;

// Function to show the current slide
function showSlide(index) {
  items.forEach((item, i) => {
    item.classList.add("hidden");
    indicators[i].classList.remove("bg-blue-600");
  });
  items[index].classList.remove("hidden");
  indicators[index].classList.add("bg-blue-600");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  showSlide(currentIndex);
}

document
  .querySelector("[data-carousel-next]")
  .addEventListener("click", nextSlide);
document
  .querySelector("[data-carousel-prev]")
  .addEventListener("click", prevSlide);

indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    currentIndex = i;
    showSlide(i);
  });
});

showSlide(0);

document.addEventListener("DOMContentLoaded", function () {
  const revealText = document.getElementById("revealText");
  const testimonialSection = document.getElementById("testimonialSection");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealText.classList.add("slide-in");
          observer.unobserve(testimonialSection);
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(testimonialSection);
});

// Targets for the count-up animation
const targets = [
  { element: document.getElementById("researchPaper"), count: 46, suffix: "+" },
  { element: document.getElementById("patents"), count: 80, suffix: "+" },
  { element: document.getElementById("projects"), count: 10, suffix: "+" },
];

// IntersectionObserver for count-up animation
const countObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = targets.find((t) => t.element === entry.target);
        if (target) {
          animateCountUp(target, 2000); // Adjust duration as needed
          observer.unobserve(entry.target); // Stop observing after animation
        }
      }
    });
  },
  { threshold: 0.1 }
);

// Start observing each target
targets.forEach((target) => {
  countObserver.observe(target.element);
});

// Function to animate count-up effect
function animateCountUp(target, duration) {
  let currentCount = 0;
  const increment = Math.ceil(target.count / (duration / 10));

  const interval = setInterval(() => {
    currentCount += increment;
    if (currentCount >= target.count) {
      clearInterval(interval);
      currentCount = target.count;
      target.element.textContent = currentCount + target.suffix;
    } else {
      target.element.textContent = currentCount;
    }
  }, 10);
}

document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("hidden");
});
