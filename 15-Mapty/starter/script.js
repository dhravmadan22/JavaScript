'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat,lng]
    this.distance = distance; // in km
    this.duration = duration; // in mins
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycle1 = new Cycling([39, -12], 27, 95, 523);

// console.log(run1);
// console.log(cycle1);

// Application Architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }
  _loadMap(position) {
    //   console.log(position.coords);
    const { longitude, latitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    //leaflet for generating a map
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 13);
    console.log(this.#map);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // L.marker(coords)
    //   .addTo(map)
    //   .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    //   .openPopup();

    this.#map.on('click', this._showForm.bind(this));
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositives = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();

    // Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value; // converting to number
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // if it is running then create running object

    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositives(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // if it is cycling then create a cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositives(distance, duration)
      )
        return alert('Inputs have to be positive numbers');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object in workout array
    this.#workouts.push(workout);
    console.log(workout);

    // Render workout on app as marker
    this.renderWorkoutMarker(workout);

    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
        '';

    // Render workout on the list

    // console.log(this.#mapEvent);

    // console.log(lat, lng);
  }
  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.distance}`)
      .openPopup();
  }
}

const app = new App();
