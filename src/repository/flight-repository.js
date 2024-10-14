const { Op, where } = require("sequelize");
const { Flight } = require("../models/index");

class FlightRepository {

    #createFilter(data){
        let filter = {}

        if(data.arrivalAirportId){
          filter.arrivalAirportId = data.arrivalAirportId
        }

        if(data.departureAirportId) {
          filter.departureAirportId = data.departureAirportId
        }

        let priceFilter = [];
        if(data.minPrice) {
          priceFilter.push({price:{[Op.gte]: data.minPrice}})
        }

        if(data.maxPrice){
          priceFilter.push({price:{[Op.lte]:data.maxPrice}})
        }

        Object.assign(filter,{[Op.and]: priceFilter})
        return filter;
    }

  async createFlight(data) {
    try {
      const flight = await Flight.create(data);

      return flight;
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        original: error.original,
      });
    }
  }

  async getFlight(flightId){
    try {
        const flight = await Flight.findByPk(flightId);
        return flight
    } catch (error) {
        console.error("Error detais: ", {
            message:error.message,
            stack:error.stack,
            original:error.original
        })
    }
  }

  async getAllFlights(filter){
    try {
        const filterObject = this.#createFilter(filter)
        const flights = await Flight.findAll({
          where:filterObject
        });
        return flights;
    } catch (error) {
        console.error("Error details", {
            message:error.message,
            stack:error.stack,
            original:error.original
        })
    }
  }


  async updateFlight(flightId,data){
    console.log("Flight update data" , data);
    try {
      await Flight.update(data, {
        where:{
          id:flightId
        }
      }) 
      return true;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      throw {error}
    }
  }
}

module.exports = FlightRepository;
