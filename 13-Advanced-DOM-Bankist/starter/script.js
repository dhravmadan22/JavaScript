'use strict';

///////////////////////////////////////
// Modal window
const btnSrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn, i) => {
  btn.addEventListener('click', openModal);
  // console.log(i);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnSrollTo.addEventListener('click', function (e) {
  // Old School Way
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Modern Scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////////////////////
//////////////////////Page Navigation///////////////////////////
///////////////////////////////////////////////////////////////

// document.querySelectorAll('.nav__link').forEach(function (el, i, arr) {
//   // console.log(el, i, arr);

//   el.addEventListener('click', function (e) {
//     // console.log('link');
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// }); // this can be inefficient as we are attaching an event handler to each link.

// EVENT DELEGATION using event bubbling

// 1. Add event listener to a common parent element
// 2. Determine element from which the event was originated

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // guard clause
  if (!clicked) return;

  // Active Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // console.log(tabsContent);
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  //Activate Content Area
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e, opacity) {
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

//passing an argument into handler
// nav.addEventListener('mouseover', handleHover.bind({ opacity: 0.5 }));
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//STICKY NAVIGATION

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// INTERSECTION OBSERVER API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // means connsider the total viewport
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // same as entry = entries[0];
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// <------------------------------------------------------------->
// <------------------------------------------------------------->

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections); // returns a NodeList

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons); // returns an HTML collection. It is a live collection and if the DOM changes then this also changes live. If an element is deleted it will be reflected in the live collection

// // NodeList is not live, if we delete a section from the code it will not update the variable

// console.log(document.getElementsByClassName('btn')); // returns an html collection

// // <------------------------------------------------------------->
// // <------------------------------------------------------------->

// // creating and inserting elements
// // .insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for imporved functionality and analytics';
// message.innerHTML =
//   'We use cookies for imporved functionality and analytics. <button class = "btn btn--close-cookie">Got it </button>';

// // header.prepend(message); // adds as the frist child of header
// header.append(message);

// // // alive element is only added to the DOM once, therefore in the above 2 lines prepend first adds message as the first child of header and append then moves that to the last child. Thus a single copy is created

// // header.append(message.cloneNode(true)); // this allows us to clone the DOM element. Now we can add both as the one we append is a copy/clone of the message element

// // header.before(message); // this adds the element as a seperate div before the header element

// // Delete Elements

// document.querySelector('.btn--close-cookie');
// addEventListener('click', function () {
//   message.remove(); //the modern way
//   // message.parentElement.removeChild(message); // this is an older method which was use before remove() was introduced. What we do here is DOM traversing
// });

// // <------------------------------------------------------------->
// // <------------------------------------------------------------->

// // Styles, attributes and classes

// // Styles
// message.style.backgroundColor = '#37383d'; // this sets the value in inline style
// message.style.width = '120%';

// console.log(message.style.color); // this does not work as it is not an inline style
// console.log(message.style.backgroundColor); // this works as it is an inline style

// console.log(getComputedStyle(message).color); // this can be used to get all styles on a particular element. Thus we can use this
// message.style.height =
//   parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // 10 means decimal base

// // Css custom properties or kind css variables

// document.documentElement.style.setProperty('--color-primary', 'orangered'); // we need to use setProperty for css custom properties

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful Minimalist Logo';

// // Non standard property - thus doesn't work
// console.log(logo.designer);

// console.log(logo.getAttribute('designer')); // this works for reading non standard
// console.log(logo.setAttribute('company', 'Bankist')); //set certain attributes

// //Read special data attributes -> stored in dataset object
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j', 'a');
// logo.classList.remove('c');
// logo.classList.contains('c');
// logo.classList.toggle('c');

// logo.className = 'jonas'; //overwrites all other classes

//  rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// In an event handler the this keyword will point to the element on which the event handler is attached
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);

//   // e.stopPropagation(); // we can stop the default event propogation, NOT A GOOD IDEA!!
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   }
//   // true // this will catch capturing events and not bubbling events
// );

// here above if we click the .nav__link all the three '.nav__link' '.nav__links' and '.nav' elements change their color. This is due to event propogation and bubbling.

// the e.target element is always the same. The event that all handlers receive is the exact same event

// the e.currentTarget is the elements through which the handler is passing or to the element which the handler is attached to. This is the same object to which the this keyword points to

// Output in ONENOTE as well

// EVENT DELEGATION
//  Added to the application. Basically means that add an event listener to the common parent of all the elements you want to add an event listener to.
// Also important at the time when we want to add event listners on elements that are going to be created dynamically

// DOM Traversing

// const h1 = document.querySelector('h1');

// // going downwards: child
// console.log(h1.querySelectorAll('.highlight')); // this can go down as deep
// console.log(h1.childNodes); // gives child nodes of the current element
// console.log(h1.children); // only works for immediate child -> html collection
// console.log((h1.firstElementChild.style.color = 'white'));
// console.log((h1.lastElementChild.style.color = 'orangered'));

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // closest parent which matches the query
// h1.closest('h1').style.background = 'var(--gradient-primary)'; // closest parent which matches the query

// // Going Sideways: siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
