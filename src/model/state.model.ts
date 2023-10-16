export class StateModel{
    constructor(
        public lat:number = 0,
        public lon:number = 0,
        public errorMessage: string = "",
        public temperatureC: number = 0,
        public temperatureF: number = 0,
        public city: string = "",
        public country: string = "",
        public humidity: number = 0,
        public description: string ="",
        public icon: "CLEAR_DAY",
        public sunrise: number = 0,
        public sunset: number = 0,
        public errorMsg: string = "",
        public main:any,
        ){}
      }

// export let StateModel = {
//     lat: undefined,
//     lon: undefined,
//     errorMessage: undefined,
//     temperatureC: undefined,
//     temperatureF: undefined,
//     city: undefined,
//     country: undefined,
//     humidity: undefined,
//     description: undefined,
//     icon: "CLEAR_DAY",
//     sunrise: undefined,
//     sunset: undefined,
//     errorMsg: undefined,
//     main:undefined,
//   }
