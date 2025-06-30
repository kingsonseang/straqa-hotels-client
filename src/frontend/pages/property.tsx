import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  Bath,
  Bed,
  Car,
  ChevronLeft,
  ChevronRight,
  Eye,
  Shield,
  Tv,
  Wifi,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Property as IProperty } from "@/validators/property";
import { PropertyCard } from "../components/features/property-card";

export default function Property({ properties }: { properties: IProperty[] }) {
  const { id } = useParams();

  const property = properties.find((property) => property.id === id);

  console.log(properties, property);

  const relatedProperties = properties.filter((p) => p.id !== property?.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedImageIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const selectImage = (index: number) => {
    setSelectedImageIndex(index);
    scrollTo(index);
  };

  const handlePrevImage = () => {
    const newIndex =
      selectedImageIndex === 0
        ? (property?.images?.length || 0) - 1
        : selectedImageIndex - 1;
    selectImage(newIndex);
  };

  const handleNextImage = () => {
    const newIndex =
      selectedImageIndex === (property?.images?.length || 0) - 1
        ? 0
        : selectedImageIndex + 1;
    selectImage(newIndex);
  };

  const _getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes("wifi") || lowerFeature.includes("internet"))
      return <Wifi size={16} />;
    if (lowerFeature.includes("tv") || lowerFeature.includes("netflix"))
      return <Tv size={16} />;
    if (lowerFeature.includes("security")) return <Shield size={16} />;
    if (lowerFeature.includes("power") || lowerFeature.includes("generator"))
      return <Zap size={16} />;
    if (lowerFeature.includes("parking") || lowerFeature.includes("car"))
      return <Car size={16} />;
    return <Eye size={16} />;
  };

  // Show only first 6 thumbnails
  const visibleThumbnails = (property?.images || []).slice(0, 6);
  const remainingCount = (property?.images?.length || 0) - 6;

  if (!property) {
    return "Property not found";
  }

  return (
    <div className="container mx-auto space-y-10 px-4">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="text-[var(--domain-color-vibrant)]" />{" "}
          <span>Back</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Property Info */}
          <div className="space-y-6">
            {/* Title and Price - Same line with flex wrap */}
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {property.name}
                </h1>
                <div className="text-xl font-bold text-gray-900">
                  ₦{property.pricePerNight.toLocaleString()}
                  <span className="text-sm text-gray-500 font-normal">
                    /Night
                  </span>
                </div>
              </div>
              {/* <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={16} className="mr-2" />
                <span>{property.}</span>
              </div> */}
            </div>

            {/* Property Stats */}
            <div className="flex items-center space-x-6 py-4 border-y border-gray-200">
              {property.type === "apartment" && property.bedrooms && (
                <div className="flex items-center space-x-2">
                  <Bed size={18} className="text-gray-600" />
                  <span className="text-gray-900 font-medium">
                    {property.bedrooms} Bedrooms
                  </span>
                </div>
              )}
              {/* {property.type === "apartment" && property. && (
                <div className="flex items-center space-x-2">
                  <Bath size={18} className="text-gray-600" />
                  <span className="text-gray-900 font-medium">{property.bathrooms} Bathrooms</span>
                </div>
              )} */}
              {property.type === "apartment" && property.bathrooms && (
                <div className="flex items-center space-x-2">
                  <Bath size={18} className="text-gray-600" />
                  <span className="text-gray-900 font-medium">
                    {property.bathrooms} Bathrooms
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Property Features */}
            {/* {property.features && property.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="text-blue-600">
                        {getFeatureIcon(feature)}
                      </div>
                      <span className="text-gray-900 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Property Rules */}
            {/* {property.rules && property.rules.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Rules</h2>
                <div className="space-y-2">
                  {property.rules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-blue-600 font-semibold mt-1">{index + 1}.</span>
                      <span className="text-gray-600">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>

          {/* Right Column - Main Image */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              {property?.images?.[selectedImageIndex] && (
                <Image
                  src={property?.images?.[selectedImageIndex]}
                  alt={``}
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                />
              )}
              {/* Image Navigation Arrows */}
              {(property?.images?.length ?? 0) > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Image Carousel - Only 6 thumbnails */}
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-2">
                  {visibleThumbnails.map((image, index) => (
                    <button
                      key={`images-${index + 1}`}
                      type="button"
                      className="flex-none w-20 h-20 relative cursor-pointer"
                      onClick={() => selectImage(index)}
                    >
                      <Image
                        src={image}
                        alt={``}
                        width={400}
                        height={400}
                        className={`w-full h-full object-cover rounded-lg transition-all ${
                          index === selectedImageIndex
                            ? "ring-2 ring-blue-600 opacity-100"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      />
                      {/* Show count overlay on last thumbnail if there are more images */}
                      {index === 5 && remainingCount > 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                          <span className="text-white text-xs font-semibold">
                            +{remainingCount}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProperties.slice(0, 2).map((relatedProperty) => (
                <PropertyCard
                  to={`/p/${relatedProperty.id}`}
                  key={relatedProperty.id}
                  property={relatedProperty}
                  maxImages={3}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
