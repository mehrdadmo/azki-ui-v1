import { CertificateType } from "@/types/certificate";

interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "textarea";
}

interface TemplateConfig {
  title: string;
  fields: FieldConfig[];
  inspectionNote: string;
  conclusion: string;
  remarks: string;
  footerNote: string;
  formCode: string;
}

export const templateConfigs: Record<CertificateType, TemplateConfig> = {
  "ic-destination": {
    title: "INSPECTION CERTIFICATE",
    fields: [
      { key: "referenceNo", label: "REFERENCE NO." },
      { key: "dateOfIssue", label: "DATE OF ISSUE" },
      { key: "dateOfInspection", label: "DATE OF INSPECTION" },
      { key: "placeOfInspection", label: "PLACE OF INSPECTION" },
      { key: "notifyParty", label: "NOTIFY PARTY" },
      { key: "consignee", label: "CONSIGNEE" },
      { key: "consigneeAddress", label: "CONSIGNEE ADDRESS" },
      { key: "shipper", label: "SHIPPER / CONSIGNOR" },
      { key: "shipperAddress", label: "SHIPPER ADDRESS", type: "textarea" },
      { key: "piNoDate", label: "P/I NO.DATE" },
      { key: "ciNoDate", label: "C/I NO.DATE" },
      { key: "descriptionOfGoods", label: "DESCRIPTION OF GOODS AS PER P/L" },
      { key: "grossWeight", label: "G.W (GROSS WEIGHT)" },
      { key: "netWeight", label: "NET.W (NET WEIGHT)" },
      { key: "vesselVoyNo", label: "NAME OF VESSEL / VOY NO" },
      { key: "blNoDate", label: "B/L NO. & DATE" },
      { key: "packing", label: "PACKING" },
      { key: "origin", label: "ORIGIN" },
      { key: "portOfLoading", label: "PORT OF LOADING" },
      { key: "portOfDischarge", label: "PORT OF DISCHARGE" },
      { key: "registrationNo", label: "REGISTRATION NO" },
      { key: "customsTariffNo", label: "IRANIAN CUSTOMS TARIFF NO" },
      { key: "insurance", label: "INSURANCE" },
    ],
    inspectionNote:
      "GOODS WERE INSPECTED ON VISUAL BASIS, ALL TECHNICAL SPECIFICATIONS VERIFIED BASED ON MANUFACTURER TEST CERTIFICATES. QUANTITY VERIFIED BASED ON DOCUMENTS PRESENTED TO US BY SUPPLIER AND THE B/L.",
    conclusion:
      "THE ORIGINAL INSPECTION CERTIFICATE ISSUED BY ASCO INTERNATIONAL OR ITS AUTHORIZED AGENTS ON ASCO LETTERHEAD CERTIFYING THAT THE QUALITY, QUANTITY AND PACKING OF GOODS DISCHARGED AT THE DESTINATION ARE STRICTLY COMPLYING WITH SPECIFICATIONS OF THE GOODS INDICATED IN THE RELATIVE PROFORMA INVOICE, THE TERMS OF THE L/C AND ANY AMENDMENTS MADE THERETO PRESENTED TO ASCO INTERNATIONAL BY THE BUYER.",
    remarks:
      "REMARKS: THIS CERTIFICATE IS ISSUED PURSUANT TO AN INSPECTION CARRIED OUT ACCORDING TO ASCO STANDARD INSPECTIONS MANUAL WITH DUE CARE AND TO THE BEST OF OUR KNOWLEDGE AND EFFORT. THIS CERTIFICATE IS GOVERNED BY THE GENERAL TERMS AND CONDITIONS APPEARING ON THE REVERSE. MANUFACTURER'S MILL TEST CERTIFICATES + PICTURES OF THE COMMODITY AVAILABLE AT THIS OFFICE UPON REQUEST.",
    footerNote:
      "THE ABOVE REFLECTS OUR INSPECTION FINDINGS AT TIME AND PLACE OF INSPECTION AT DESTINATION. THE ISSUANCE OF THIS INSPECTION CERTIFICATE DOES NOT RELIEVE THE PARTIES FROM THEIR CONTRACTUAL OBLIGATIONS. QUALITY PARAMETERS CERTIFIED IN ACCORDANCE TO SUPPLIER DECLARATIONS THAT BEAR THE SOLE RESPONSIBILITY FOR ANY QUALITY DISCREPANCIES. THIS IS NOT A VOC CERTIFICATE.",
    formCode: "",
  },
  "ic-origin": {
    title: "INSPECTION CERTIFICATE",
    fields: [
      { key: "referenceNo", label: "REF" },
      { key: "dateOfIssue", label: "DATE OF ISSUE" },
      { key: "dateAndPlaceOfInspection", label: "DATE & PLACE OF INSPECTION" },
      { key: "shipper", label: "SHIPPER/SELLER" },
      { key: "shipperAddress", label: "SHIPPER ADDRESS", type: "textarea" },
      { key: "consignee", label: "CONSIGNEE" },
      { key: "consigneeAddress", label: "CONSIGNEE ADDRESS" },
      { key: "notifyParty", label: "NOTIFY PARTY" },
      { key: "piNumber", label: "P/I NUMBER" },
      { key: "invoiceNumber", label: "INVOICE NUMBER" },
      { key: "descriptionOfGoods", label: "DESCRIPTION OF GOODS AS PER B/L" },
      { key: "vesselVoyNo", label: "NAME OF VESSEL/VOY NO" },
      { key: "shipmentNumber", label: "SHIPMENT NUMBER" },
      { key: "blNoDate", label: "B/L NO. & DATE" },
      { key: "packing", label: "PACKING" },
      { key: "origin", label: "ORIGIN" },
      { key: "portOfReceipt", label: "PORT OF RECEIPT" },
      { key: "portOfDestination", label: "PORT OF DESTINATION" },
      { key: "customsTariffNo", label: "IRANIAN CUSTOMS TARIFF NO" },
      { key: "regNo", label: "REG NO" },
      { key: "insurance", label: "INSURANCE" },
    ],
    inspectionNote:
      "GOODS WERE INSPECTED ON VISUAL BASIS, ALL TECHNICAL SPECIFICATIONS VERIFIED BASED ON MANUFACTURER TEST CERTIFICATES. QUANTITY VERIFIED BASED ON VISUAL INSPECTION, DOCUMENTS PRESENTED TO US BY SUPPLIER AND THE B/L.",
    conclusion:
      'THE ORIGINAL INSPECTION CERTIFICATE ISSUED NOT PRIOR TO B/L DATE BY ASCO INTERNATIONAL OR ITS AUTHORIZED AGENTS ON ASCO LETTERHEAD CERTIFYING THAT: "THE QUALITY, QUANTITY AND PACKING OF GOODS LOADED/DELIVERED ARE STRICTLY COMPLYING WITH SPECIFICATIONS OF THE GOODS INDICATED IN THE RELATIVE PROFORMA INVOICE, THE TERMS OF THE L/C AND ANY AMENDMENTS MADE THERETO AS PRESENTED TO ASCO INTERNATIONAL BY THE BUYER" SUCH INSPECTION CERTIFICATE MUST BE CERTIFIED BY THE CHAMBER OF COMMERCE.',
    remarks:
      "REMARKS: THIS CERTIFICATE IS ISSUED PURSUANT TO AN INSPECTION CARRIED OUT ACCORDING TO ASCO STANDARD INSPECTIONS MANUAL WITH DUE CARE AND TO THE BEST OF OUR KNOWLEDGE AND EFFORT. THIS CERTIFICATE IS GOVERNED BY THE GENERAL TERMS AND CONDITIONS APPEARING ON THE REVERSE. MANUFACTURER'S MILL TEST CERTIFICATES + PICTURES OF THE COMMODITY AVAILABLE AT THIS OFFICE UPON REQUEST.",
    footerNote:
      "THE ABOVE REFLECTS OUR PRE-SHIPMENT INSPECTION FINDINGS AT TIME AND PLACE OF INSPECTION ONLY. THE ISSUANCE OF THIS INSPECTION CERTIFICATE DOES NOT RELIEVE THE PARTIES FROM THEIR CONTRACTUAL OBLIGATIONS. QUALITY PARAMETERS CERTIFIED IN ACCORDANCE TO SUPPLIER DECLARATIONS THAT BEAR THE SOLE RESPONSIBILITY FOR ANY QUALITY DISCREPANCIES. THIS IS NOT A VOC CERTIFICATE.",
    formCode: "FR-CO-202/00",
  },
  "coi-destination": {
    title: "CERTIFICATE OF INSPECTION",
    fields: [
      { key: "referenceNo", label: "REFERENCE NO." },
      { key: "dateOfIssue", label: "DATE OF ISSUE" },
      { key: "dateAndPlaceOfInspection", label: "DATE AND PLACE OF INSPECTION" },
      { key: "notifyParty", label: "NOTIFY PARTY" },
      { key: "consignee", label: "CONSIGNEE" },
      { key: "consigneeAddress", label: "CONSIGNEE ADDRESS" },
      { key: "shipper", label: "SHIPPER" },
      { key: "shipperAddress", label: "SHIPPER ADDRESS", type: "textarea" },
      { key: "piNo", label: "PI NO." },
      { key: "ciNo", label: "CI NO." },
      { key: "descriptionOfGoods", label: "DESCRIPTION OF GOODS AS PER B/L" },
      { key: "vesselVoyNo", label: "NAME OF VESSEL VOY NO" },
      { key: "blNoDate", label: "BL NO. & DATE" },
      { key: "packing", label: "PACKING" },
      { key: "origin", label: "ORIGIN" },
      { key: "portOfLoading", label: "PORT OF LOADING" },
      { key: "portOfDischarge", label: "PORT OF DISCHARGE" },
      { key: "registrationNo", label: "REGISTRATION NO" },
      { key: "customsTariffNo", label: "IRANIAN CUSTOMS TARIFF NO" },
      { key: "insurance", label: "INSURANCE" },
    ],
    inspectionNote:
      "THIS CERTIFICATE IS NOT ISSUED FOR THE PURPOSE OF IRAN NATIONAL STANDARD ORGANIZATION VERIFICATION OF CONFORMITY PURPOSE AND IS LIMITED FOR BANK NEGOTIATIONS FOR SUBJECTED GOODS TO MANDATORY STANDARD REGULATIONS. GOODS WERE INSPECTED ON VISUAL BASIS, ALL TECHNICAL SPECIFICATIONS VERIFIED BASED ON MANUFACTURER TEST CERTIFICATES. QUANTITY VERIFIED BASED ON DOCUMENTS PRESENTED TO US BY SUPPLIER AND THE B/L.",
    conclusion:
      "THE ORIGINAL INSPECTION CERTIFICATE ISSUED BY ASCO INTERNATIONAL LETTERHEAD CERTIFYING THAT THE GOODS INSPECTED ARE IN CONFORMITY WITH THE QUALITY, AND QUANTITY AND PACKING OF THE GOODS DISCHARGED AT THE DESTINATION AND ARE STRICTLY COMPLYING WITH SPECIFICATIONS OF THE GOODS INDICATED IN THE RELATIVE PROFORMA INVOICE (P/I) AND TERMS OF THE LETTER OF CREDIT AND ALL SUBSEQUENT AMENDMENTS AS PRESENTED TO US BY THE BUYER. SUCH INSPECTION CERTIFICATE SHALL VERIFY THAT THE GOODS ARE IN CONFORMITY WITH INSO ACCEPTABLE STANDARD(S)/NORMATIVE DOCUMENT(S) AS MENTIONED IN P/I.",
    remarks:
      "Remarks and disclaimer: this certificate is issued pursuant to an inspection carried out according to ASCO standard inspections manual with due care and to the best of our knowledge and effort. this certificate is governed by the general terms and conditions appearing on the reverse. Manufacturer's mill test certificates + pictures of the commodity available at this office upon request.",
    footerNote:
      "The above reflects our inspection findings at time and place of inspection at destination only. The issuance of this Inspection Certificate does not relieve the parties from their contractual obligations. Quality parameters certified in accordance to supplier declarations that bear the sole responsibility for any quality discrepancies. This is not a VOC certificate; this certificate is not issued for the purpose of Iran national standard organization verification of conformity purpose and is limited for bank negotiations for subjected goods to mandatory standard regulations.",
    formCode: "FR-CO-229/00",
  },
  "coi-origin": {
    title: "CERTIFICATE OF INSPECTION",
    fields: [
      { key: "referenceNo", label: "REFERENCE NO." },
      { key: "dateOfIssue", label: "DATE OF ISSUE" },
      { key: "dateAndPlaceOfInspection", label: "DATE AND PLACE OF INSPECTION" },
      { key: "notifyParty", label: "NOTIFY PARTY" },
      { key: "consignee", label: "CONSIGNEE" },
      { key: "consigneeAddress", label: "CONSIGNEE ADDRESS" },
      { key: "shipper", label: "SHIPPER" },
      { key: "shipperAddress", label: "SHIPPER ADDRESS", type: "textarea" },
      { key: "piNo", label: "PI NO." },
      { key: "ciNo", label: "CI NO." },
      { key: "descriptionOfGoods", label: "DESCRIPTION OF GOODS AS PER B/L" },
      { key: "vesselVoyNo", label: "NAME OF VESSEL VOY NO" },
      { key: "blNoDate", label: "BL NO. & DATE" },
      { key: "packing", label: "PACKING" },
      { key: "origin", label: "ORIGIN" },
      { key: "portOfLoading", label: "PORT OF LOADING" },
      { key: "portOfDischarge", label: "PORT OF DISCHARGE" },
      { key: "registrationNo", label: "REGISTRATION NO" },
      { key: "customsTariffNo", label: "IRANIAN CUSTOMS TARIFF NO" },
      { key: "insurance", label: "INSURANCE" },
    ],
    inspectionNote:
      "THIS CERTIFICATE IS NOT ISSUED FOR THE PURPOSE OF IRAN NATIONAL STANDARD ORGANIZATION VERIFICATION OF CONFORMITY PURPOSE AND IS LIMITED FOR BANK NEGOTIATIONS FOR SUBJECTED GOODS TO MANDATORY STANDARD REGULATIONS. GOODS WERE INSPECTED ON VISUAL BASIS, ALL TECHNICAL SPECIFICATIONS VERIFIED BASED ON MANUFACTURER TEST CERTIFICATES. QUANTITY VERIFIED BASED ON DOCUMENTS PRESENTED TO US BY SUPPLIER AND THE B/L.",
    conclusion:
      'THE ORIGINAL INSPECTION CERTIFICATE ISSUED NOT PRIOR TO B/L DATE BY ASCO INTERNATIONAL ITS AUTHORIZED AGENTS ON ASCO LETTERHEAD CERTIFYING THAT: "THE GOODS SHIPPED/INSPECTED ARE IN CONFORMITY WITH THE QUALITY, AND QUANTITY AND PACKING OF THE GOODS LOADED/DELIVERED AND ARE STRICTLY COMPLYING WITH SPECIFICATIONS OF THE GOODS INDICATED IN THE RELATIVE PROFORMA INVOICE AND THE TERMS OF THE L/C AND ALL SUBSEQUENT AMENDMENTS AS PRESENTED TO US BY THE BUYER" SUCH INSPECTION CERTIFICATE SHALL VERIFY THAT THE GOODS ARE IN CONFORMITY WITH INSO ACCEPTABLE STANDARD(S)/NORMATIVE DOCUMENT(S) AS MENTIONED IN P/I AND SHOULD BE ATTESTED BY THE LOCAL CHAMBER OF COMMERCE, WHERE IT HAS BEEN ISSUED.',
    remarks:
      "Remarks and disclaimer: this certificate is issued pursuant to an inspection carried out according to ASCO standard inspections manual with due care and to the best of our knowledge and effort. this certificate is governed by the general terms and conditions appearing on the reverse. Manufacturer's mill test certificates + pictures of the commodity available at this office upon request.",
    footerNote:
      "The above reflects our Pre-shipment inspection findings at time and place of inspection only. The issuance of this Inspection Certificate does not relieve the parties from their contractual obligations. Quality parameters certified in accordance to supplier declarations that bear the sole responsibility for any quality discrepancies. This is not a VOC certificate; this certificate is not issued for the purpose of Iran national standard organization verification of conformity purpose and is limited for bank negotiations for subjected goods to mandatory standard regulations.",
    formCode: "FR-CO-230/00",
  },
};

// Mock data generators for each certificate type
export const generateMockData = (type: CertificateType): Record<string, string> => {
  const baseData = {
    referenceNo: "GC25-1012-B",
    dateOfIssue: "03.09.2025",
    notifyParty: "SAME AS CONSIGNEE",
    consignee: "AABSAL P.L.C.",
    consigneeAddress: "3, DANESHGAH ELM VA SANAT AVE TEHRAN-I.R. IRAN",
    shipper: "SICAR SRL",
    shipperAddress: "VIA ALCIDE DE GASPERI, 7\n42016 GUASTALLA(RE) ITALY",
    origin: "ITALY",
    insurance: "MIHAN INSURANCE CO. UNDER POLICY NO. 03/1300/130/130/24",
  };

  switch (type) {
    case "ic-destination":
      return {
        ...baseData,
        dateOfInspection: "03.09.2025",
        placeOfInspection: "TEHRAN SHAHRIYAR, IRAN",
        piNoDate: "7, DD: 23.04.2024",
        ciNoDate: "66, DD: 02.07.2025",
        descriptionOfGoods: 'MAIN WIRING HARNESS "NUOVA"',
        grossWeight: "817 KGS",
        netWeight: "747 KGS",
        vesselVoyNo: "BY TRUCK",
        blNoDate: "ITIRR2507002475, DD: 25.07.2025",
        packing: "2 PALLETS",
        portOfLoading: "ITALY",
        portOfDischarge: "TEHRAN SHAHRIYAR, IRAN",
        registrationNo: "37956838",
        customsTariffNo: "85444210",
        inspectionNote: templateConfigs["ic-destination"].inspectionNote,
        conclusion: templateConfigs["ic-destination"].conclusion,
      };

    case "ic-origin":
      return {
        ...baseData,
        dateAndPlaceOfInspection: "03.09.2025, GUASTALLA, ITALY",
        piNumber: "7, DD: 23.04.2024",
        invoiceNumber: "66, DD: 02.07.2025",
        descriptionOfGoods: 'MAIN WIRING HARNESS "NUOVA"',
        vesselVoyNo: "BY TRUCK",
        shipmentNumber: "SHP-2025-1012",
        blNoDate: "ITIRR2507002475, DD: 25.07.2025",
        packing: "2 PALLETS",
        portOfReceipt: "GUASTALLA, ITALY",
        portOfDestination: "TEHRAN SHAHRIYAR, IRAN",
        customsTariffNo: "85444210",
        regNo: "37956838",
        inspectionNote: templateConfigs["ic-origin"].inspectionNote,
        conclusion: templateConfigs["ic-origin"].conclusion,
      };

    case "coi-destination":
    case "coi-origin":
      return {
        ...baseData,
        dateAndPlaceOfInspection: type === "coi-origin" 
          ? "03.09.2025, GUASTALLA, ITALY" 
          : "03.09.2025, TEHRAN SHAHRIYAR, IRAN",
        piNo: "7, DD: 23.04.2024",
        ciNo: "66, DD: 02.07.2025",
        descriptionOfGoods: 'MAIN WIRING HARNESS "NUOVA"',
        vesselVoyNo: "BY TRUCK",
        blNoDate: "ITIRR2507002475, DD: 25.07.2025",
        packing: "2 PALLETS",
        portOfLoading: "ITALY",
        portOfDischarge: "TEHRAN SHAHRIYAR, IRAN",
        registrationNo: "37956838",
        customsTariffNo: "85444210",
        inspectionNote: templateConfigs[type].inspectionNote,
        conclusion: templateConfigs[type].conclusion,
      };

    default:
      return baseData;
  }
};
