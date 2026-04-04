document.getElementById('project-details-btn').addEventListener('click', function() {
    document.querySelector('.about').scrollIntoView({behavior : 'smooth'});
});

const observers = document.querySelectorAll(".hidden");

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove("hidden");
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, options);

observers.forEach((el) => observer.observe(el));


const observersCounter = document.querySelectorAll(".counter");
const speed = 500;

const startCounting = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");

            const updateCounter = () => {
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target;
                }  
            };

            updateCounter();
            observer.unobserve(counter);
        }
    });
};

const counterObserver = new IntersectionObserver(startCounting,{
    threshold: 0.5
});

observersCounter.forEach(counter => {
    counterObserver.observe(counter);
});