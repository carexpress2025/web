export interface ICarSpecificationsInterface {
  gearbox?: string;
  power?: {
    kw: number;
    hv: number;
  };
  topSpeed?: number;
  acceleration?: number;
  numberOfPeople?: number;
  numberOfDoors?: number;
  meterReading?: string;
  enginePower?: string;
  engineVolume?: string;
  torque?: number;
  co2Emissions?: number;
  fuelConsumption?: string;
  weight?: number;
  ownWeight?: number;
  totalWeight?: number;
  towingWeight?: number;
  towingWeightNonBraked?: number;
}
