'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const btnSrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnSrollTo.addEventListener('click', function (e) {
  // Old School Way
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

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
