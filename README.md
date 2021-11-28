# Smart Home Simulator

A Smart home simulator using microservice architecture, implemented with TypeScript and the NestJS framework.

## Structure

The application is made out of 6 microservices:

- Gateway - acts as an interface for the client in interacting with the system
- Lightswitch - represents lightswitch smart devices
- Water Heater - represents water heater smart device(s)
- Air-Conditioner - represents air conditioner smart device(s)
- Fetcher - responsible for fetching weather data from OpenWeaterApi every hour (also fetches every minute for testing purposes) and sending the data to the Publisher microservice.
- Publisher - responsible for firing events across the system. Currently there is only one event in the system (hourly \ manually signaling devices according to weather data)

## Design and Implementation Concerns

**Very Important** - the structure of the `docker-compose.yml` file in the root directory and the structure of all `Dockerfile` in **all** microservices is far from ideal, it's only written the way that it is to get around avoiding having to wrap the `common` folder as a seperate JS library. - `docker-compose.yml` defines an outer context for each microservice, so it can copy over the common folder into each container - The _common_ folder is only there for convenience purposes - in a real world scenario all the entities within it would be a separate library that is imported in every module.

- While smart device microservices are clients of the gateway microservice, in a real world scenario this would probably not be the case. It's present in the repo only for testing purposes and for the purpose of this assignment.
- There is support in NestJS for a proper microservice that handles events in a much better way (NATS) but due to time and complexity constraints I decided to go with a simpler microservice whose role is to fire up events across the system (Publisher).
- For realistic emulation I've limited the temperature range of the ac unit to [16, 30]

## How to Run

1. Clone the repository locally
2. Run `docker-compose up` from the root directory and wait until all the containers are running.
3. Import the Postman Collection and Environment found under `/postman`.
4. Issue any request that shows in the collection, you can:
   - Sanity check microservices
   - Get current state of smart device microservices
   - Manually send signals to smart device microservices
   - Manually ask the Fetcher microservice to fetch weather data.
     - This endpoint can be used to test the whole flow of fetching weather data, raising the device signal event and handling the event in every smart device microservice.
