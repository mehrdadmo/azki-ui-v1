export type CertificateType = 
  | "ic-origin" 
  | "ic-destination" 
  | "coi-origin" 
  | "coi-destination";

export interface CertificateTypeOption {
  id: CertificateType;
  title: string;
  description: string;
}

export const certificateTypeOptions: CertificateTypeOption[] = [
  {
    id: "ic-origin",
    title: "Inspection Certificate at Origin",
    description: "Pre-shipment inspection certificate issued at origin",
  },
  {
    id: "ic-destination",
    title: "Inspection Certificate at Destination",
    description: "Inspection certificate issued at destination after arrival",
  },
  {
    id: "coi-origin",
    title: "Certificate of Inspection Issued at Origin",
    description: "COI for bank negotiations issued at origin",
  },
  {
    id: "coi-destination",
    title: "Certificate of Inspection Issued at Destination",
    description: "COI for bank negotiations issued at destination",
  },
];

// Base certificate data that all types share
export interface BaseCertificateData {
  referenceNo: string;
  dateOfIssue: string;
  consignee: string;
  consigneeAddress: string;
  shipper: string;
  shipperAddress: string;
  notifyParty: string;
  origin: string;
  insurance: string;
}

// IC at Destination (current template)
export interface ICDestinationData extends BaseCertificateData {
  dateOfInspection: string;
  placeOfInspection: string;
  piNoDate: string;
  ciNoDate: string;
  descriptionOfGoods: string;
  grossWeight: string;
  netWeight: string;
  vesselVoyNo: string;
  blNoDate: string;
  packing: string;
  portOfLoading: string;
  portOfDischarge: string;
  registrationNo: string;
  customsTariffNo: string;
  inspectionNote: string;
  conclusion: string;
}

// IC at Origin
export interface ICOriginData extends BaseCertificateData {
  dateAndPlaceOfInspection: string;
  piNumber: string;
  invoiceNumber: string;
  descriptionOfGoods: string;
  vesselVoyNo: string;
  shipmentNumber: string;
  blNoDate: string;
  packing: string;
  portOfReceipt: string;
  portOfDestination: string;
  customsTariffNo: string;
  regNo: string;
  inspectionNote: string;
  conclusion: string;
}

// COI at Destination
export interface COIDestinationData extends BaseCertificateData {
  dateAndPlaceOfInspection: string;
  piNo: string;
  ciNo: string;
  descriptionOfGoods: string;
  vesselVoyNo: string;
  blNoDate: string;
  packing: string;
  portOfLoading: string;
  portOfDischarge: string;
  registrationNo: string;
  customsTariffNo: string;
  inspectionNote: string;
  conclusion: string;
}

// COI at Origin
export interface COIOriginData extends BaseCertificateData {
  dateAndPlaceOfInspection: string;
  piNo: string;
  ciNo: string;
  descriptionOfGoods: string;
  vesselVoyNo: string;
  blNoDate: string;
  packing: string;
  portOfLoading: string;
  portOfDischarge: string;
  registrationNo: string;
  customsTariffNo: string;
  inspectionNote: string;
  conclusion: string;
}

export type CertificateData = 
  | { type: "ic-destination"; data: ICDestinationData }
  | { type: "ic-origin"; data: ICOriginData }
  | { type: "coi-destination"; data: COIDestinationData }
  | { type: "coi-origin"; data: COIOriginData };
