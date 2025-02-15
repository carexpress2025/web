'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import type { ICarInterface } from '@/interfaces';
import {
  AlertCircle,
  Calendar,
  CarIcon,
  DoorOpen,
  FileText,
  Fuel,
  Gauge,
  ListChecks,
  MapPin,
  MessageCircle,
  Palette,
  Settings,
  Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CarDetailsModalProps {
  car: ICarInterface;
  isOpen: boolean;
  onClose: () => void;
}

export const CarDetailsModal: FC<CarDetailsModalProps> = ({
  car,
  isOpen,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  const goToNextImage = () => {
    if (currentImageIndex < car.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(car.images.length - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            ({car.brand}) / {car.name}
          </DialogTitle>
        </DialogHeader>

        {car.images && car.images.length > 0 && (
          <div className="mb-4 flex items-center justify-center">
            <button
              onClick={goToPreviousImage}
              className="absolute left-0 z-10 rounded-full bg-gray-800 bg-opacity-50 px-4 py-2 text-white"
            >
              &lt;
            </button>
            <img
              src={car.images[currentImageIndex]}
              alt={`Image of ${car.name}`}
              width={400}
              height={300}
              className="rounded-lg"
              style={{ objectFit: 'cover' }}
            />
            <button
              onClick={goToNextImage}
              className="absolute right-0 z-10 rounded-full bg-gray-800 bg-opacity-50 px-4 py-2 text-white"
            >
              &gt;
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-primary mb-4 pl-1 text-3xl font-bold">
              € {car.price}
            </h3>
            <div className="space-y-2">
              {car.year && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{car.year}</span>
                </div>
              )}
              {car.mileage && car.mileage > 0 && (
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  <span>{car.mileage}</span>
                </div>
              )}
              {car.plate && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{car.plate}</span>
                </div>
              )}
              {car.phone && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>{car.phone}</span>
                </div>
              )}
              {car.color && (
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  <span>
                    {t('carModal.color')}: {car.color}
                  </span>
                </div>
              )}
              {car.roadWorthy && (
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>
                    {t('carModal.condition')}: {car.roadWorthy}
                  </span>
                </div>
              )}
              {car.fuelType && (
                <div className="flex items-center gap-2">
                  <Fuel className="h-5 w-5" />
                  <span>
                    {t('carModal.fuelType')}: {car.fuelType}
                  </span>
                </div>
              )}
              {car.specifications.numberOfDoors &&
                car.specifications.numberOfDoors > 0 && (
                  <div className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5" />
                    <span>
                      {t('carModal.numberOfDoors')}:{' '}
                      {car.specifications.numberOfDoors}
                    </span>
                  </div>
                )}
              {car.specifications.power && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>
                    {t('carModal.power')}: {car.specifications.power.kw} Kw{' '}
                    {car.specifications.power.hv} Hv
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <div>
              <h4 className="mb-2 mt-12 font-semibold">
                {t('carModal.technical')}
              </h4>
            </div>
            <div className="space-y-2">
              {car.engine && (
                <div className="flex items-center gap-2">
                  <CarIcon className="h-5 w-5" />
                  <span>
                    {t('carModal.engine')}: {car.engine}
                  </span>
                </div>
              )}
              {car.specifications.gearbox && (
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <span>
                    {t('carModal.gearbox')}: {car.specifications.gearbox}
                  </span>
                </div>
              )}
              {car.transmissionType && (
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <span>
                    {t('carModal.transmission')}: {car.transmissionType}
                  </span>
                </div>
              )}
              {car.specifications.acceleration &&
                car.specifications.acceleration > 0 && (
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5" />
                    <span>
                      {t('carModal.acceleration')}:{' '}
                      {car.specifications.acceleration}
                    </span>
                  </div>
                )}
              {car.bodyType && (
                <div className="flex items-center gap-2">
                  <DoorOpen className="h-5 w-5" />
                  <span>
                    {t('carModal.body')}: {car.bodyType}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {car.interior && Object.values(car.interior).some(Boolean) && (
          <div className="mt-6">
            <h4 className="mb-2 font-semibold">
              {t('carModal.interiorSection')}
            </h4>
            {car.interior.seatHeaters && (
              <p>{t('carModal.interior.seatHeaters')}</p>
            )}
            {car.interior.rearViewCamera && (
              <p>{t('carModal.interior.rearViewCamera')}</p>
            )}
            {car.interior.fuelBatteryOperatedAuxiliaryHeater && (
              <p>{t('carModal.interior.fuelBatteryOperatedAuxiliaryHeater')}</p>
            )}
            {car.interior.parkingSensors && (
              <p>{t('carModal.interior.parkingSensors')}</p>
            )}
            {car.interior.tirePressureMonitoringSystem && (
              <p>{t('carModal.interior.tirePressureMonitoringSystem')}</p>
            )}
            {car.interior.internalSocket && (
              <p>{t('carModal.interior.internalSocket')}</p>
            )}
            {car.interior.startStopSystem && (
              <p>{t('carModal.interior.startStopSystem')}</p>
            )}
            {car.interior.skiHatch && <p>{t('carModal.interior.skiHatch')}</p>}
            {car.interior.powerWindows && (
              <p>{t('carModal.interior.powerWindows')}</p>
            )}
            {car.interior.electricMirrors && (
              <p>{t('carModal.interior.electricMirrors')}</p>
            )}
            {car.interior.electricallyAdjustableSeats && (
              <p>{t('carModal.interior.electricallyAdjustableSeats')}</p>
            )}
            {car.interior.electricallyOperatedTailgate && (
              <p>{t('carModal.interior.electricallyOperatedTailgate')}</p>
            )}
            {car.interior.luggageCompartmentSafetyNet && (
              <p>{t('carModal.interior.luggageCompartmentSafetyNet')}</p>
            )}
            {car.interior.sportSeats && (
              <p>{t('carModal.interior.sportSeats')}</p>
            )}
            {car.interior.cruiseControl && (
              <p>{t('carModal.interior.cruiseControl')}</p>
            )}
            {car.interior.onBoardComputer && (
              <p>{t('carModal.interior.onBoardComputer')}</p>
            )}
            {car.interior.keyless && <p>{t('carModal.interior.keyless')}</p>}
            {car.interior.airConditionedSeating && (
              <p>{t('carModal.interior.airConditionedSeating')}</p>
            )}
            {car.interior.airConditioning && (
              <p>{t('carModal.interior.airConditioning')}</p>
            )}
            {car.interior.retractableRearSeats && (
              <p>{t('carModal.interior.retractableRearSeats')}</p>
            )}
            {car.interior.laneDepartureWarning && (
              <p>{t('carModal.interior.laneDepartureWarning')}</p>
            )}
            {car.interior.roofOpeningMechanism && (
              <p>{t('carModal.interior.roofOpeningMechanism')}</p>
            )}
            {car.interior.centralLocking && (
              <p>{t('carModal.interior.centralLocking')}</p>
            )}
            {car.interior.motorHeater && (
              <p>{t('carModal.interior.motorHeater')}</p>
            )}
            {car.interior.heatedSteeringWheel && (
              <p>{t('carModal.interior.heatedSteeringWheel')}</p>
            )}
            {car.interior.heatedWindscreen && (
              <p>{t('carModal.interior.heatedWindscreen')}</p>
            )}
            {car.interior.leatherInterior && (
              <p>{t('carModal.interior.leatherInterior')}</p>
            )}
            {car.interior.satelliteNavigator && (
              <p>{t('carModal.interior.satelliteNavigator')}</p>
            )}
            {car.interior.speedLimitSensor && (
              <p>{t('carModal.interior.speedLimitSensor')}</p>
            )}
            {car.interior.powerSteering && (
              <p>{t('carModal.interior.powerSteering')}</p>
            )}
          </div>
        )}

        {car.safety && Object.values(car.safety).some(Boolean) && (
          <div className="mt-6">
            <h4 className="mb-2 font-semibold">{t('carModal.satety')}</h4>
            {car.safety.antiLockBrakingSystem && (
              <p>{t('carModal.safety.antiLockBrakingSystem')}</p>
            )}
            {car.safety.hillStartAssist && (
              <p>{t('carModal.safety.hillStartAssist')}</p>
            )}
            {car.safety.parkingAssistance && (
              <p>{t('carModal.safety.parkingAssistance')}</p>
            )}
            {car.safety.fogLights && <p>{t('carModal.safety.fogLights')}</p>}
            {car.safety.airbags && <p>{t('carModal.safety.airbags')}</p>}
            {car.safety.collisionWarning && (
              <p>{t('carModal.safety.collisionWarning')}</p>
            )}
            {car.safety.theftAlarm && <p>{t('carModal.safety.theftAlarm')}</p>}
            {car.safety.xenonHeadlights && (
              <p>{t('carModal.safety.xenonHeadlights')}</p>
            )}
            {car.safety.adaptiveHeadlights && (
              <p>{t('carModal.safety.adaptiveHeadlights')}</p>
            )}
            {car.safety.electronicStabilityControl && (
              <p>{t('carModal.safety.electronicStabilityControl')}</p>
            )}
            {car.safety.emergencyBrakeAssist && (
              <p>{t('carModal.safety.emergencyBrakeAssist')}</p>
            )}
            {car.safety.isofixReady && (
              <p>{t('carModal.safety.isofixReady')}</p>
            )}
            {car.safety.corneringLights && (
              <p>{t('carModal.safety.corneringLights')}</p>
            )}
            {car.safety.blindSpotAssist && (
              <p>{t('carModal.safety.blindSpotAssist')}</p>
            )}
            {car.safety.engineImmobilizer && (
              <p>{t('carModal.safety.engineImmobilizer')}</p>
            )}
            {car.safety.ledHeadlights && (
              <p>{t('carModal.safety.ledHeadlights')}</p>
            )}
            {car.safety.tractionControlSystem && (
              <p>{t('carModal.safety.tractionControlSystem')}</p>
            )}
          </div>
        )}

        {car.electronics && Object.values(car.electronics).some(Boolean) && (
          <div className="mt-6">
            <h4 className="mb-2 font-semibold">{t('carModal.electronics')}</h4>
            {car.electronics.usb && <p>{t('carModal.electronic.usb')}</p>}
            {car.electronics.smartphoneIntegration && (
              <p>{t('carModal.electronic.smartphoneIntegration')}</p>
            )}
            {car.electronics.audioSystem && (
              <p>{t('carModal.electronic.audioSystem')}</p>
            )}
            {car.electronics.audioConnection && (
              <p>{t('carModal.electronic.audioConnection')}</p>
            )}
            {car.electronics.bluetooth && (
              <p>{t('carModal.electronic.bluetooth')}</p>
            )}
            {car.electronics.headUpDisplay && (
              <p>{t('carModal.electronic.headUpDisplay')}</p>
            )}
            {car.electronics.mobilePhoneEquipment && (
              <p>{t('carModal.electronic.mobilePhoneEquipment')}</p>
            )}
            {car.electronics.alloyWheels && (
              <p>{t('carModal.electronic.alloyWheels')}</p>
            )}
            {car.electronics.sunroof && (
              <p>{t('carModal.electronic.sunroof')}</p>
            )}
            {car.electronics.multifunctionSteeringWheel && (
              <p>{t('carModal.electronic.multifunctionSteeringWheel')}</p>
            )}
            {car.electronics.rainSensor && (
              <p>{t('carModal.electronic.rainSensor')}</p>
            )}
            {car.electronics.trunkTemperatureControl && (
              <p>{t('carModal.electronic.trunkTemperatureControl')}</p>
            )}
            {car.electronics.turbo && <p>{t('carModal.electronic.turbo')}</p>}
            {car.electronics.sportsSuspension && (
              <p>{t('carModal.electronic.sportsSuspension')}</p>
            )}
            {car.electronics.towBar && <p>{t('carModal.electronic.towBar')}</p>}
            {car.electronics.batteryPreHeating && (
              <p>{t('carModal.electronic.batteryPreHeating')}</p>
            )}
            {car.electronics.chassisKit && (
              <p>{t('carModal.electronic.chassisKit')}</p>
            )}
            {car.electronics.serviceBook && (
              <p>{t('carModal.electronic.serviceBook')}</p>
            )}
            {car.electronics.plugInChargingSocketForHybridCar && (
              <p>{t('carModal.electronic.plugInChargingSocketForHybridCar')}</p>
            )}
            {car.electronics.airSuspension && (
              <p>{t('carModal.electronic.airSuspension')}</p>
            )}
            {car.electronics.handicapEquipment && (
              <p>{t('carModal.electronic.handicapEquipment')}</p>
            )}
            {car.electronics.twoSetsOfTires && (
              <p>{t('carModal.electronic.twoSetsOfTires')}</p>
            )}
            {car.electronics.roofHatch && (
              <p>{t('carModal.electronic.roofHatch')}</p>
            )}
          </div>
        )}

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{t('carModal.seller')}</h4>
              <p>{car.seller}</p>
            </div>

            <div className="flex space-x-4">
              {' '}
              <Button
                onClick={() => {
                  if (car.phone) {
                    window.location.href = `/send-message/${car.phone.replace(
                      '+',
                      '',
                    )}`;
                  }
                }}
                className="w-auto"
              >
                {t('carModal.send')}
              </Button>
              <Button onClick={onClose} className="w-auto">
                {t('carModal.close')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
