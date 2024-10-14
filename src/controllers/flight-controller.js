const {FlightService} = require('../services/index.js');
const {successCodes} = require('../utils/error-codes.js')
const flightService = new FlightService();

const createFlight = async(req,res) => {
    try {
        const flightRequestData = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime:req.body.departureTime,
            price:req.body.price
        }
        const flight = await flightService.createFlight(flightRequestData);
        return res.status(successCodes.CREATED).json({
            data: flight,
            success:true,
            message:"Successfully created a flight",
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to create flight",
            err:error
        })
    }
}

const getAllFlights = async(req,res) => {
    try {
        const flights = await flightService.getAllFlights(req.query);
        return res.status(successCodes.OK).json({
            data:flights,
            success:true,
            message:"All flights fetched successfully",
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to fetch all the flights",
            err:error
        })
    }
}

const get = async(req,res) => {
    try {
        const flight = await flightService.getFlight(req.params.id);
        return res.status(successCodes.OK).json({
            data:flight,
            success:true,
            message:"Flight fetched successfully",
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to fetch the flight",
            err:error
        })
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    get
}