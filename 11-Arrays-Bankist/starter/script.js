'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};



const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// displlay all account movements
const displayMovements = function(movements, sort = false){

  containerMovements.innerHTML = '';
  // innerHTML return the entire html
  // textContent retuns only the text
  const movs = sort ? movements.slice().sort((a,b) => a-b): movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'; 
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
  `;

  containerMovements.insertAdjacentHTML('afterbegin',html);
  });
  
}
// displayMovements(account1.movements)


// calculate and print balance values
const calcPrintBalance = function(account){
  account.balance = account.movements.reduce((acc, cur, i, arr) => {
    return acc + cur;
  });
  labelBalance.textContent = `${account.balance} EUR`;
}
// calcPrintBalance(account1.movements)


const calcdisplaySummary= function(account){

  const incomes = account.movements.filter((mov, i, arr) => mov > 0 ).reduce((acc, cur, i, arr) => acc+cur, 0);
  labelSumIn.textContent = `${incomes}€`
  
  const  deficit= account.movements.filter((mov, i, arr) => mov < 0 ).reduce((acc, cur, i, arr) => acc+cur,0);
  labelSumOut.textContent = `${Math.abs(deficit)}€`

  const interest = account.movements.filter((mov, i, arr) => mov > 0).map((mov,i,arr) => mov*account.interestRate/100).filter((int, i, arr) => int > 1 ).reduce((acc, cur, i, arr) => acc+cur,0)
  labelSumInterest.textContent = `${interest}€`

}
// calcdisplaySummary(account1.movements)


// create username from owner name
const createUsernames = function(accs){

  accs.forEach((account) => {
    account.username = account.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
    // console.log(account.username);
  })
    
}
createUsernames(accounts);


const updateUI = function(account){
  displayMovements(account.movements);
  calcPrintBalance(account);
  calcdisplaySummary(account);
}


let currentAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  // console.log(inputLoginUsername.value);
  
  currentAccount = accounts.find((account ,i, arr) => account.username === inputLoginUsername.value );

  console.log(currentAccount);
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //display UI and message
    containerApp.style.opacity = "100";
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}!`;
    updateUI(currentAccount);

  }
  

})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const receiverAcc = accounts.find((account, i, arr) => {
    return account.username === inputTransferTo.value
  });
  const amount = Number(inputTransferAmount.value);
  console.log(amount);
  console.log(receiverAcc);

  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if( receiverAcc && amount > 0 && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username){
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(amount*-1);
    updateUI(currentAccount);
  } else {
    console.log('invalid Operation');
    
  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});


btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)){
    console.log(currentAccount);

    const index = accounts.findIndex((acc, i, arr) => acc.username === currentAccount.username)
    console.log(index);
    
    accounts.splice(index,1)
    console.log(accounts);
    containerApp.style.opacity = 0;
    
  }else{
    console.log('Invalid Operation');
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
  inputCloseUsername.blur();

  
})
let sort = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, sort = !sort);
})

// <---------------------------------------------------->
// <---------------------------------------------------->



// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// <---------------------------------------------------->
// <---------------------------------------------------->

// Adult dog or not exercise
// const julia = [3,5,2,12,7];
// const kate =  [4,1,15,8,3];


// const checkDogs = function(arr1, arr2){
//     const arr1Corrected = arr1.slice(1,-2);
//     const mergedArray = arr1Corrected.concat(arr2);
//     const mergedArray1 = [...arr1Corrected, ...arr2];
//     // console.log(arr1);
//     // console.log(arr1Corrected);
//     // console.log(mergedArray);
//     // console.log(mergedArray1);

//     mergedArray.forEach(function(dogAge, i){
//         const resultString = `Dog ${i+1} is ${dogAge >= 3? 'an adult':'still a puppy.'} ${dogAge >= 3 ? `and is ${dogAge} years old`: ''}`;
//         console.log(resultString);
//       })
// }

// checkDogs(julia, kate);

// <---------------------------------------------------->
// <---------------------------------------------------->

// MAP method

// const euroToUsd = 1.1;
// const movementsUsd = movements.map(function(mov){
//     return mov*euroToUsd;
// })

// const movementsUsd = movements.map((mov) => {
//   return mov*euroToUsd;
// })

// implicit return
// const movementsUsd = movements.map(mov => mov*euroToUsd);

// All three methods above work. The last statement is an implicit return

// console.log(movements);
// console.log(movementsUsd);


// const movementsDescriptions  = movements.map((mov, i, arr) => `Movement ${i+1}: You ${ mov > 0 ?'deposited': 'withdrew' } ${Math.abs(mov)}`);

// console.log(movementsDescriptions);

// <---------------------------------------------------->
// <---------------------------------------------------->


//Filter method

// const deposits = movements.filter((mov) => mov > 0)
// console.log(deposits);
// const withdrawals = movements.filter((mov) => mov < 0)
// console.log(withdrawals);


// <---------------------------------------------------->
// <---------------------------------------------------->

// Reduce Method

// reduce(callbackFunction, initital value of acc)
// callbackFunction(acc,current,i,arr) -> acc is like a snowball,
// whichever value is returned is stored in acc


// const balance = movements.reduce((acc,cur, i, arr ) => {
//   console.log(`Iteration ${i}: ${acc}`);
  
//   return acc+cur;
// }, 0)

// console.log(balance);

// <---------------------------------------------------->
// <---------------------------------------------------->

// Maximum value of an array using reduce

// console.log(movements);

// console.log(movements.reduce((acc, cur, i, arr) => cur > acc ? cur: acc, movements[0]));

// console.log(movements.reduce((acc, cur, i, arr) => cur < acc ? cur: acc, movements[0]));



// Array coding exercise number 2 and 3

// const data = [5,2,4,1,15,8,3];
// const data1 = [16,6,10,5,6,1,4];


// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   return average;
// };

// const calcAverageHumanAgeArrow = (ages) => {
//   const average = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4)).filter(age => age >= 18).reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   return average;
// };

// const avg1 = calcAverageHumanAge(data)
// const avg2 = calcAverageHumanAgeArrow(data1)

// console.log(avg1, avg2);

// <---------------------------------------------------->
// <---------------------------------------------------->

// find method

// const account = accounts.find(account => account.owner === 'Jessica Davis')
// console.log(account || 'not defined');

// <---------------------------------------------------->
// <---------------------------------------------------->

// Some: takes a callback return a true value if any of the elements in the array match the condition else it reuturns false

// <---------------------------------------------------->
// <---------------------------------------------------->

// Every: takes a callback, returns a true value if all of the elements in the array match the condition else it reuturns false

// <---------------------------------------------------->
// <---------------------------------------------------->

// flat - the flat method migh take one argument. If there is a nested array we can use flat method to combine all array elements into one elemenet. We can pass a parameter for the depth of the flattening

// const array = [[1,2,3], [4,5,6], [[7,8], 9]];
// console.log(array.flat());
// console.log(array.flat(2));

// flat and map are used a lot of times for in a single chain thus the flat map is introduced


// <---------------------------------------------------->
// <---------------------------------------------------->

//flatmap - combines a flat and a map method in a single method
//  This can go only a single level deep. If we want to go multiple levels deep we must use flat and map methods seperately

// <---------------------------------------------------->
// <---------------------------------------------------->

// Sorting arrays


// const owners =  ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());

// important point to note

// console.log(movements);
// console.log(movements.sort());
//Important point to note above is that the even the numbers array is sorted alphabetically(ASCII or unicode). Thus we don't get the results we want

// [200, 450, -400, 3000, -650, -130, 70, 1300] -> movements
// [-130, -400, -650, 1300, 200, 3000, 450, 70] -> movements.sort)()


// comparator

// return < 0, A , B (keep order)
// return > 0, B, A (change order)
// movements.sort((a, b) =>{
//     if(a > b){
//       return 1;
//     }else{
//       return -1;
//     }
// })

// movements.sort((a,b) => (a-b))
// console.log(movements);


// <---------------------------------------------------->
// <---------------------------------------------------->

// programmatically filling and creating arrays


//FILL
// can be used on empty as well as non emmpty arrays

// const x =  new Array(7); //creates a new array of 7 empty elements
// console.log(x);
// // x.fill(1);

// x.fill(1, 3, 5); // this means fill index 3 to 4 with the number 1 
// console.log(x);


// <---------------------------------------------------->
// <---------------------------------------------------->

// Array.from

// const y = Array.from({length: 7}, () => 1);
// console.log(y);

// const z = Array.from({length:7}, (_, i) => i+1);
// console.log(z);



labelBalance.addEventListener('click', function(){
  const movementUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€','')))

  console.log(movementUI);

  const movementUI2 = [...document.querySelectorAll('.movements__value')]
  console.log(movementUI2);
})



///////////////////////////////////////
// Array Methods Practice

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// Prefixed ++ oeprator
// let a = 10;
// console.log(++a);
// console.log(a);

// 3.

const { deposits:sumDeposits, withdrawals:sumWithdrawal  } = accounts.flatMap( acc => acc.movements ).reduce((sums, curr, i , arr) => {
  
  //Option 1
  // if( curr < 0 ){
  //   sums.withdrawals += curr;
  // }
  // if( curr > 0 ){
  //   sums.deposits += curr;
  // }

  // Option 1 alternative
  // if( curr < 0 ){
  //     sums['withdrawals'] += curr;
  //   }
  //   if( curr > 0 ){
  //     sums['deposits'] += curr;
  //   }


  // Option 2
  // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);

  // Option 3
  sums[curr > 0 ? 'deposits' : 'withdrawals']+=curr;
  return sums;
}, {deposits:0, withdrawals:0});
console.log(sumDeposits, sumWithdrawal);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');

  return capitzalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  } `
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4.
// "Matilda and Alice and Bob's dogs eat too much!"
//  "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
*/