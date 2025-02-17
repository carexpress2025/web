/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICarFiltersInterface } from '@/data/interfaces/ICarFiltersInterface';

interface Filter {
  key: string;
  value: boolean | undefined;
}

interface Query {
  safety?: Record<any, any>;
  interior?: Record<any, any>;
  electronics?: Record<any, any>;
  [key: string]: any;
}

export function makeCarQuery(filters: ICarFiltersInterface) {
  const query: Query = {};

  const {
    name,
    phone,
    brand,
    vehicleType,
    bodyType,
    fuelType,
    transmissionType,
    minYear,
    maxYear,
    minPrice,
    maxPrice,
    minMileage,
    maxMileage,
    color,
    painting,
    minEngineDisplacement,
    maxEngineDisplacement,
    minCo2Emissions,
    maxCo2Emissions,
    minPowerkw,
    maxPowerkw,
    minPowerhv,
    maxPowerhv,
    minTorque,
    maxTorque,
    numberOfPeople,
    numberOfDoors,
    minTowingWeight,
    maxTowingWeight,
    minTotalWeight,
    maxTotalWeight,
    minAcceleration,
    maxAcceleration,
    antiLockBrakingSystem,
    hillStartAssist,
    parkingAssistance,
    fogLights,
    airbags,
    collisionWarning,
    theftAlarm,
    xenonHeadlights,
    adaptiveHeadlights,
    electronicStabilityControl,
    emergencyBrakeAssist,
    isofixReady,
    corneringLights,
    blindSpotAssist,
    engineImmobilizer,
    ledHeadlights,
    tractionControlSystem,
    seatHeaters,
    rearViewCamera,
    fuelBatteryOperatedAuxiliaryHeater,
    parkingSensors,
    tirePressureMonitoringSystem,
    internalSocket,
    startStopSystem,
    skiHatch,
    powerWindows,
    electricMirrors,
    electricallyAdjustableSeats,
    electricallyOperatedTailgate,
    luggageCompartmentSafetyNet,
    sportSeats,
    cruiseControl,
    onBoardComputer,
    keyless,
    airConditionedSeating,
    airConditioning,
    retractableRearSeats,
    laneDepartureWarning,
    roofOpeningMechanism,
    centralLocking,
    motorHeater,
    heatedSteeringWheel,
    heatedWindscreen,
    leatherInterior,
    satelliteNavigator,
    speedLimitSensor,
    powerSteering,
    usb,
    smartphoneIntegration,
    audioSystem,
    audioConnection,
    bluetooth,
    headUpDisplay,
    mobilePhoneEquipment,
    alloyWheels,
    sunroof,
    multifunctionSteeringWheel,
    rainSensor,
    trunkTemperatureControl,
    turbo,
    sportsSuspension,
    towBar,
    batteryPreHeating,
    chassisKit,
    serviceBook,
    plugInChargingSocketForHybridCar,
    airSuspension,
    handicapEquipment,
    twoSetsOfTires,
    roofHatch,
  } = filters;

  if (name && name.length > 0) {
    query.name = { in: name };
  }

  if (phone && phone.length > 0) {
    query.phone = { in: phone };
  }

  if (brand && brand.length > 0) {
    query.brand = { in: brand };
  }

  if (vehicleType && vehicleType.length > 0) {
    query.vehicleType = { in: vehicleType };
  }

  if (bodyType && bodyType.length > 0) {
    query.bodyType = { in: bodyType };
  }

  if (fuelType && fuelType.length > 0) {
    query.fuelType = { in: fuelType };
  }

  if (transmissionType !== undefined) {
    query.transmissionType = transmissionType;
  }

  if (minYear && !isNaN(minYear)) {
    query.year = { gte: Number(minYear) };
  }
  if (maxYear && !isNaN(maxYear)) {
    query.year = { lte: Number(maxYear) };
  }

  if (minPrice && !isNaN(minPrice)) {
    query.price = { gte: minPrice };
  }
  if (maxPrice && !isNaN(maxPrice)) {
    query.price = { lte: maxPrice };
  }

  if (minMileage && !isNaN(minMileage)) {
    query.mileage = { gte: minMileage };
  }
  if (maxMileage && !isNaN(maxMileage)) {
    query.mileage = { lte: maxMileage };
  }

  if (minAcceleration && !isNaN(minAcceleration)) {
    query.acceleration = { gte: minAcceleration };
  }
  if (maxAcceleration && !isNaN(maxAcceleration)) {
    query.acceleration = { lte: maxAcceleration };
  }

  if (color && color.length > 0) {
    query.color = { in: color };
  }

  if (painting && painting.length > 0) {
    query.painting = { in: painting };
  }

  if (minEngineDisplacement && !isNaN(minEngineDisplacement)) {
    query.engineDisplacement = { gte: minEngineDisplacement };
  }
  if (maxEngineDisplacement && !isNaN(maxEngineDisplacement)) {
    query.engineDisplacement = { lte: maxEngineDisplacement };
  }

  if (minCo2Emissions && !isNaN(minCo2Emissions)) {
    query.co2Emissions = { gte: minCo2Emissions };
  }
  if (maxCo2Emissions && !isNaN(maxCo2Emissions)) {
    query.co2Emissions = { lte: maxCo2Emissions };
  }

  if (minPowerkw && !isNaN(minPowerkw)) {
    query.power = { kw: { gte: minPowerkw } };
  }
  if (maxPowerkw && !isNaN(maxPowerkw)) {
    query.power = { kw: { lte: maxPowerkw } };
  }

  if (minPowerhv && !isNaN(minPowerhv)) {
    query.power = { hv: { gte: minPowerhv } };
  }
  if (maxPowerhv && !isNaN(maxPowerhv)) {
    query.power = { hv: { lte: maxPowerhv } };
  }

  if (minTorque && !isNaN(minTorque)) {
    query.torque = { gte: minTorque };
  }
  if (maxTorque && !isNaN(maxTorque)) {
    query.torque = { lte: maxTorque };
  }

  if (numberOfPeople !== undefined && !isNaN(numberOfPeople)) {
    query.numberOfPeople = numberOfPeople;
  }

  if (numberOfDoors !== undefined && !isNaN(numberOfDoors)) {
    query.numberOfDoors = numberOfDoors;
  }

  if (minTowingWeight && !isNaN(minTowingWeight)) {
    query.towingWeight = { gte: minTowingWeight };
  }
  if (maxTowingWeight && !isNaN(maxTowingWeight)) {
    query.towingWeight = { lte: maxTowingWeight };
  }

  if (minTotalWeight && !isNaN(minTotalWeight)) {
    query.totalWeight = { gte: minTotalWeight };
  }
  if (maxTotalWeight && !isNaN(maxTotalWeight)) {
    query.totalWeight = { lte: maxTotalWeight };
  }

  const safetyFilters: Filter[] = [
    {
      key: 'safety.antiLockBrakingSystem',
      value: antiLockBrakingSystem,
    },
    { key: 'safety.hillStartAssist', value: hillStartAssist },
    { key: 'safety.parkingAssistance', value: parkingAssistance },
    { key: 'safety.fogLights', value: fogLights },
    { key: 'safety.airbags', value: airbags },
    { key: 'safety.collisionWarning', value: collisionWarning },
    { key: 'safety.theftAlarm', value: theftAlarm },
    { key: 'safety.xenonHeadlights', value: xenonHeadlights },
    { key: 'safety.adaptiveHeadlights', value: adaptiveHeadlights },
    {
      key: 'safety.electronicStabilityControl',
      value: electronicStabilityControl,
    },
    {
      key: 'safety.emergencyBrakeAssist',
      value: emergencyBrakeAssist,
    },
    { key: 'safety.isofixReady', value: isofixReady },
    { key: 'safety.corneringLights', value: corneringLights },
    { key: 'safety.blindSpotAssist', value: blindSpotAssist },
    { key: 'safety.engineImmobilizer', value: engineImmobilizer },
    { key: 'safety.ledHeadlights', value: ledHeadlights },
    {
      key: 'safety.tractionControlSystem',
      value: tractionControlSystem,
    },
  ];

  const interiorFilters: Filter[] = [
    { key: 'interior.seatHeaters', value: seatHeaters },
    { key: 'interior.rearViewCamera', value: rearViewCamera },
    {
      key: 'interior.fuelBatteryOperatedAuxiliaryHeater',
      value: fuelBatteryOperatedAuxiliaryHeater,
    },
    { key: 'interior.parkingSensors', value: parkingSensors },
    {
      key: 'interior.tirePressureMonitoringSystem',
      value: tirePressureMonitoringSystem,
    },
    { key: 'interior.internalSocket', value: internalSocket },
    { key: 'interior.startStopSystem', value: startStopSystem },
    { key: 'interior.skiHatch', value: skiHatch },
    { key: 'interior.powerWindows', value: powerWindows },
    { key: 'interior.electricMirrors', value: electricMirrors },
    {
      key: 'interior.electricallyAdjustableSeats',
      value: electricallyAdjustableSeats,
    },
    {
      key: 'interior.electricallyOperatedTailgate',
      value: electricallyOperatedTailgate,
    },
    {
      key: 'interior.luggageCompartmentSafetyNet',
      value: luggageCompartmentSafetyNet,
    },
    { key: 'interior.sportSeats', value: sportSeats },
    { key: 'interior.cruiseControl', value: cruiseControl },
    { key: 'interior.onBoardComputer', value: onBoardComputer },
    { key: 'interior.keyless', value: keyless },
    {
      key: 'interior.airConditionedSeating',
      value: airConditionedSeating,
    },
    { key: 'interior.airConditioning', value: airConditioning },
    {
      key: 'interior.retractableRearSeats',
      value: retractableRearSeats,
    },
    {
      key: 'interior.laneDepartureWarning',
      value: laneDepartureWarning,
    },
    {
      key: 'interior.roofOpeningMechanism',
      value: roofOpeningMechanism,
    },
    { key: 'interior.centralLocking', value: centralLocking },
    { key: 'interior.motorHeater', value: motorHeater },
    {
      key: 'interior.heatedSteeringWheel',
      value: heatedSteeringWheel,
    },
    { key: 'interior.heatedWindscreen', value: heatedWindscreen },
    { key: 'interior.leatherInterior', value: leatherInterior },
    { key: 'interior.satelliteNavigator', value: satelliteNavigator },
    { key: 'interior.speedLimitSensor', value: speedLimitSensor },
    { key: 'interior.powerSteering', value: powerSteering },
    { key: 'interior.usb', value: usb },
    {
      key: 'interior.smartphoneIntegration',
      value: smartphoneIntegration,
    },
  ];

  const electronicsFilters: Filter[] = [
    { key: 'electronics.audioSystem', value: audioSystem },
    { key: 'electronics.audioConnection', value: audioConnection },
    { key: 'electronics.bluetooth', value: bluetooth },
    { key: 'electronics.headUpDisplay', value: headUpDisplay },
    {
      key: 'electronics.mobilePhoneEquipment',
      value: mobilePhoneEquipment,
    },
    { key: 'electronics.alloyWheels', value: alloyWheels },
    { key: 'electronics.sunroof', value: sunroof },
    {
      key: 'electronics.multifunctionSteeringWheel',
      value: multifunctionSteeringWheel,
    },
    { key: 'electronics.rainSensor', value: rainSensor },
    {
      key: 'electronics.trunkTemperatureControl',
      value: trunkTemperatureControl,
    },
    { key: 'electronics.turbo', value: turbo },
    { key: 'electronics.sportsSuspension', value: sportsSuspension },
    { key: 'electronics.towBar', value: towBar },
    {
      key: 'electronics.batteryPreHeating',
      value: batteryPreHeating,
    },
    { key: 'electronics.chassisKit', value: chassisKit },
    { key: 'electronics.serviceBook', value: serviceBook },
    {
      key: 'electronics.plugInChargingSocketForHybridCar',
      value: plugInChargingSocketForHybridCar,
    },
    { key: 'electronics.airSuspension', value: airSuspension },
    {
      key: 'electronics.handicapEquipment',
      value: handicapEquipment,
    },
    { key: 'electronics.twoSetsOfTires', value: twoSetsOfTires },
    { key: 'electronics.roofHatch', value: roofHatch },
  ];

  const safetyQuery = safetyFilters
    .filter((filter) => filter.value !== undefined)
    .map((filter) => ({ [filter.key]: filter.value }));

  const interiorQuery = interiorFilters
    .filter((filter) => filter.value !== undefined)
    .map((filter) => ({ [filter.key]: filter.value }));

  const electronicsQuery = electronicsFilters
    .filter((filter) => filter.value !== undefined)
    .map((filter) => ({ [filter.key]: filter.value }));

  if (safetyQuery.length > 0) {
    query.safety = { ...query.safety, ...safetyQuery };
  }

  if (interiorQuery.length > 0) {
    query.interior = { ...query.interior, ...interiorQuery };
  }

  if (electronicsQuery.length > 0) {
    query.electronics = { ...query.electronics, ...electronicsQuery };
  }

  return query;
}
