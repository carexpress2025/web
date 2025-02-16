'use client';

import { ICarInterface } from '@/domains/entities';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Badge,
  CarIcon,
  Clock,
  Gauge,
  Settings,
  Share2,
  Tag,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/core/libs/utils';
import { useTranslation } from 'react-i18next';
import { CarDetailsModal } from './CarDetailsModal';
import Image from 'next/image';

export default function CarCard({ car }: { car: ICarInterface }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { t } = useTranslation();

  const carLink = car?.link ? car.link : '';

  const formattedPrice = car.price
    ? `${car.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'EUR',
      })}`
    : '';

  const formattedDate = car.updatedAt
    ? new Date(car.updatedAt).toLocaleDateString('pt-BR')
    : '';

  return (
    <Card
      className="group transform overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={car.images[0] || '/placeholder-car.png'}
          alt={car.name || 'Carro'}
          className={cn(
            'object-cover transition-transform duration-700 ease-in-out',
            isHovered && 'scale-110',
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="animate-fade-in-up absolute left-3 top-3 flex gap-2">
          <span className="text-lg text-white transition-colors hover:text-white/90">
            {car.year}
          </span>
          {car.roadWorthy && (
            <Badge className="bg-blue-500/90 text-white transition-colors hover:bg-blue-500/80">
              {car.roadWorthy}
            </Badge>
          )}
        </div>
        <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 transition-colors hover:bg-white"
            onClick={() => (window.location.href = carLink)}
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 transition-colors hover:bg-white"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Star
              className={`h-4 w-4 ${isFavorited ? 'text-yellow-500' : 'text-gray-600'}`}
            />
          </Button>
        </div>
      </div>
      <CardContent className="p-5">
        <div className="mb-4">
          <h3 className="group-hover:text-primary line-clamp-2 text-lg font-bold transition-colors">
            {car.name}
          </h3>
          <p className="text-primary mt-2 text-2xl font-bold">
            {formattedPrice}
          </p>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="group/item flex items-center gap-2">
            <div className="group-hover/item:bg-primary/10 group-hover/item:text-primary rounded-lg bg-gray-100 p-1.5 transition-colors">
              <Gauge className="h-4 w-4" />
            </div>
            <span className="group-hover/item:text-primary truncate transition-colors">
              {car.mileage} km
            </span>
          </div>
          <div className="group/item flex items-center gap-2">
            <div className="group-hover/item:bg-primary/10 group-hover/item:text-primary rounded-lg bg-gray-100 p-1.5 transition-colors">
              <Settings className="h-4 w-4" />
            </div>
            <span className="group-hover/item:text-primary truncate transition-colors">
              {car.engine}
            </span>
          </div>
          <div className="group/item flex items-center gap-2">
            <div className="group-hover/item:bg-primary/10 group-hover/item:text-primary rounded-lg bg-gray-100 p-1.5 transition-colors">
              <CarIcon className="h-4 w-4" />
            </div>
            <span className="group-hover/item:text-primary truncate transition-colors">
              {car.engine}
            </span>
          </div>
          <div className="group/item flex items-center gap-2">
            <div className="group-hover/item:bg-primary/10 group-hover/item:text-primary rounded-lg bg-gray-100 p-1.5 transition-colors">
              <Tag className="h-4 w-4" />
            </div>
            <span className="group-hover/item:text-primary truncate transition-colors">
              {car.plate?.split(' - ')[0]}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            className="bg-primary/90 hover:bg-primary flex items-center gap-2 rounded-xl text-white transition-all duration-300 hover:gap-3"
          >
            {t('carCard.button.details')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      {isModalOpen && (
        <CarDetailsModal
          car={car}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Card>
  );
}
