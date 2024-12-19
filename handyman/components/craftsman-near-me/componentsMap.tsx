import {
    FindACTechnicianNearby,
    FindAssemblyServiceNearby,
    FindBuildingCleaningServiceNearby,
    FindCarpentersNearby,
    FindCarWorkshopsNearby,
    FindChimneyBuildersNearby,
    FindClimateTechniciansNearby,
    FindConcreteDrillersNearby,
    FindConstructionCompaniesNearby,
    FindConstructionPlansNearby,
    FindDemolitionAndDisposalServicesNearby,
    FindDrywallersNearby,
    FindEarthmovingCompaniesNearby,
    FindElectriciansNearby,
    FindFenceBuildersNearby,
    FindFlooringInstallersNearby,
    FindGlaziersNearby,
    FindHeatingInstallersNearby,
    FindInteriorDecoratorsNearby,
    FindInteriorDesignersNearby,
    FindKitchenFittersNearby,
    FindLandscapeBuildersNearby,
    FindMetalFabricatorsNearby,
    FindMovingCompaniesNearby,
    FindPaintersAndDecoratorsNearby,
    FindPavingBuildersNearby,
    FindPlasterersNearby,
    FindPlumbingInstallersNearby,
    FindPoolBuildersNearby,
    FindRoofersNearby,
    FindSaddlersAndUpholsterersNearby,
    FindScaffoldingBuildersNearby,
    FindStaircaseBuildersNearby,
    FindTilersNearby,
    FindTransportCompaniesNearby,
    FindWellBuildersNearby,
    FindWindowBuildersNearby,
    FindWoodPreservationServicesNearby,
  } from "@/components/craftsman-near-me";

  type ComponentType = () => JSX.Element;

  type ComponentMap = {
    [key: string]: ComponentType;
  }

export const components:ComponentMap = {
    "encontrar-albañiles-de-azulejos-cerca-de-ti": FindTilersNearby,
    "encontrar-carpinteros-cerca-de-ti": FindCarpentersNearby,
    "encontrar-constructores-de-andamios-cerca-de-ti":
      FindScaffoldingBuildersNearby,
    "encontrar-constructores-de-escaleras-cerca-de-ti":
      FindStaircaseBuildersNearby,
    "encontrar-constructores-de-paisajes-cerca-de-ti":
      FindLandscapeBuildersNearby,
    "encontrar-constructores-de-pavimento-cerca-de-ti": FindPavingBuildersNearby,
    "encontrar-constructores-de-piscinas-cerca-de-ti": FindPoolBuildersNearby,
    "encontrar-constructores-de-pozos-cerca-de-ti": FindWellBuildersNearby,
    "encontrar-constructores-de-vallas-cerca-de-ti": FindFenceBuildersNearby,
    "encontrar-constructores-de-ventanas-cerca-de-ti": FindWindowBuildersNearby,
    "encontrar-cristaleros-cerca-de-ti": FindGlaziersNearby,
    "encontrar-decoradores-de-interiores-cerca-de-ti":
      FindInteriorDecoratorsNearby,
    "encontrar-diseñadores-de-interiores-cerca-de-ti":
      FindInteriorDesignersNearby,
    "encontrar-drywallers-cerca-de-ti": FindDrywallersNearby,
    "encontrar-electricistas-cerca-de-ti": FindElectriciansNearby,
    "encontrar-empresas-de-construccion-cerca-de-ti":
      FindConstructionCompaniesNearby,
    "encontrar-empresas-de-movimiento-de-tierra-cerca-de-ti":
      FindEarthmovingCompaniesNearby,
    "encontrar-empresas-de-mudanzas-cerca-de-ti": FindMovingCompaniesNearby,
    "encontrar-empresas-de-transporte-cerca-de-ti": FindTransportCompaniesNearby,
    "encontrar-fabricantes-de-metal-cerca-de-ti": FindMetalFabricatorsNearby,
    "encontrar-instaladores-de-calefacción-cerca-de-ti":
      FindHeatingInstallersNearby,
    "encontrar-instaladores-de-fontaneria-cerca-de-ti":
      FindPlumbingInstallersNearby,
    "encontrar-instaladores-de-pisos-cerca-de-ti": FindFlooringInstallersNearby,
    "encontrar-montadores-de-cocinas-cerca-de-ti": FindKitchenFittersNearby,
    "encontrar-perforadores-de-concreto-cerca-de-ti": FindConcreteDrillersNearby,
    "encontrar-pintores-y-decoradores-cerca-de-ti":
      FindPaintersAndDecoratorsNearby,
    "encontrar-plano-de-construccion-cerca-de-ti": FindConstructionPlansNearby,
    "encontrar-reparadores-de-chimeneas-cerca-de-ti": FindChimneyBuildersNearby,
    "encontrar-servicio-de-limpieza-de-edificios-cerca-de-ti":
      FindBuildingCleaningServiceNearby,
    "encontrar-servicio-de-montaje-cerca-de-ti": FindAssemblyServiceNearby,
    "encontrar-servicios-de-demolicion-y-disposicion-cerca-de-ti":
      FindDemolitionAndDisposalServicesNearby,
    "encontrar-servicios-de-preservacion-de-madera-cerca-de-ti":
      FindWoodPreservationServicesNearby,
    "encontrar-talleres-de-reparacion-de-coches-cerca-de-ti":
      FindCarWorkshopsNearby,
    "encontrar-tapiceros-y-sastres-cerca-de-ti":
      FindSaddlersAndUpholsterersNearby,
    "encontrar-techos-cerca-de-ti": FindRoofersNearby,
    "encontrar-tecnico-de-aire-acondicionado-cerca-de-ti": FindACTechnicianNearby,
    "encontrar-tecnicos-de-climatizacion-cerca-de-ti":
      FindClimateTechniciansNearby,
    "encontrar-yeseros-cerca-de-ti": FindPlasterersNearby,
  };