// handlling all the v1 apis here
const CityController = require('../../controllers/city-controller');
const FlightController = require('../../controllers/flight-controller');
const AirportController = require('../../controllers/airport-controller');

const {FlightMiddleWare} = require('../../middlewares/index')

const express = require('express');

const router = express.Router();

router.post('/city',CityController.createCity)
router.delete('/city/:id',CityController.deleteCity);
router.get('/city/:id',CityController.getCity);
router.patch('/city/:id',CityController.updateCity);
router.get('/city',CityController.getAllCities);

router.post('/flights', FlightMiddleWare.validateCreateFlight , FlightController.createFlight);
router.get('/flights',FlightController.getAllFlights);
router.get('/flight/:id',FlightController.getFlight);
router.patch('/flights/:id',FlightController.updateFlight);

router.post('/airports',AirportController.create);

module.exports = router;