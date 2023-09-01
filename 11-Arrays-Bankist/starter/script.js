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
const displayMovements = function(movements){

  containerMovements.innerHTML = '';
  // innerHTML return the entire html
  // textContent retuns only the text

  movements.forEach(function(mov, i) {
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
displayMovements(account1.movements)


// calculate and print balance values
const calcPrintBalance = function(movements){
  const balance = movements.reduce((acc, cur, i, arr) => {
    return acc + cur;
  });

  labelBalance.textContent = `${balance} EUR`;
}
calcPrintBalance(account1.movements)


// create username from owner name
const createUsernames = function(accs){

  accs.forEach((account) => {
    account.username = account.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
    // console.log(account.username);
  })
    
}
createUsernames(accounts);


// <---------------------------------------------------->
// <---------------------------------------------------->



// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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


// Maximum value of an array using reduce

// console.log(movements);

// console.log(movements.reduce((acc, cur, i, arr) => cur > acc ? cur: acc, movements[0]));

// console.log(movements.reduce((acc, cur, i, arr) => cur < acc ? cur: acc, movements[0]));



// Array coding exercise number 2

const data = [5,2,4,1,15,8,3]
