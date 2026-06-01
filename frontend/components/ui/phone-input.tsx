"use client";

import * as React from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  phoneLength?: { min: number; max: number };
}

// Phone number length validation rules by country (excluding dial code)
export const phoneValidationRules: Record<string, { min: number; max: number }> = {
  // North America
  US: { min: 10, max: 10 },
  CA: { min: 10, max: 10 },
  MX: { min: 10, max: 10 },

  // Caribbean & Central America
  BS: { min: 7, max: 7 },    // Bahamas
  BB: { min: 7, max: 7 },    // Barbados
  BZ: { min: 7, max: 7 },    // Belize
  CR: { min: 8, max: 8 },    // Costa Rica
  CU: { min: 8, max: 8 },    // Cuba
  DM: { min: 7, max: 7 },    // Dominica
  DO: { min: 10, max: 10 },  // Dominican Republic
  SV: { min: 8, max: 8 },    // El Salvador
  GD: { min: 7, max: 7 },    // Grenada
  GT: { min: 8, max: 8 },    // Guatemala
  HT: { min: 8, max: 8 },    // Haiti
  HN: { min: 8, max: 8 },    // Honduras
  JM: { min: 7, max: 7 },    // Jamaica
  NI: { min: 8, max: 8 },    // Nicaragua
  PA: { min: 8, max: 8 },    // Panama
  TT: { min: 7, max: 7 },    // Trinidad and Tobago

  // South America
  AR: { min: 10, max: 10 },  // Argentina
  BO: { min: 8, max: 8 },    // Bolivia
  BR: { min: 10, max: 11 },  // Brazil
  CL: { min: 9, max: 9 },    // Chile
  CO: { min: 10, max: 10 },  // Colombia
  EC: { min: 9, max: 9 },    // Ecuador
  GY: { min: 7, max: 7 },    // Guyana
  PY: { min: 9, max: 9 },    // Paraguay
  PE: { min: 9, max: 9 },    // Peru
  SR: { min: 7, max: 7 },    // Suriname
  UY: { min: 8, max: 9 },    // Uruguay
  VE: { min: 10, max: 10 },  // Venezuela

  // Western Europe
  GB: { min: 10, max: 11 },  // United Kingdom
  IE: { min: 9, max: 10 },   // Ireland
  FR: { min: 9, max: 10 },   // France
  DE: { min: 10, max: 11 },  // Germany
  AT: { min: 10, max: 13 },  // Austria
  CH: { min: 9, max: 10 },   // Switzerland
  BE: { min: 8, max: 9 },    // Belgium
  NL: { min: 9, max: 10 },   // Netherlands
  LU: { min: 8, max: 9 },    // Luxembourg
  MC: { min: 8, max: 9 },    // Monaco
  LI: { min: 7, max: 9 },    // Liechtenstein

  // Southern Europe
  ES: { min: 9, max: 9 },    // Spain
  PT: { min: 9, max: 9 },    // Portugal
  IT: { min: 9, max: 11 },   // Italy
  MT: { min: 8, max: 8 },    // Malta
  AD: { min: 6, max: 9 },    // Andorra
  SM: { min: 6, max: 10 },   // San Marino
  VA: { min: 6, max: 10 },   // Vatican City
  GR: { min: 10, max: 10 },  // Greece
  CY: { min: 8, max: 8 },    // Cyprus

  // Northern Europe
  SE: { min: 7, max: 13 },   // Sweden
  NO: { min: 8, max: 8 },    // Norway
  DK: { min: 8, max: 8 },    // Denmark
  FI: { min: 9, max: 11 },   // Finland
  IS: { min: 7, max: 7 },    // Iceland

  // Central Europe
  PL: { min: 9, max: 9 },    // Poland
  CZ: { min: 9, max: 9 },    // Czech Republic
  SK: { min: 9, max: 9 },    // Slovakia
  HU: { min: 9, max: 9 },    // Hungary
  SI: { min: 8, max: 8 },    // Slovenia
  HR: { min: 8, max: 9 },    // Croatia
  BA: { min: 8, max: 9 },    // Bosnia and Herzegovina
  RS: { min: 8, max: 9 },    // Serbia
  ME: { min: 8, max: 8 },    // Montenegro
  MK: { min: 8, max: 8 },    // North Macedonia
  AL: { min: 9, max: 9 },    // Albania

  // Eastern Europe
  RU: { min: 10, max: 10 },  // Russia
  UA: { min: 9, max: 10 },   // Ukraine
  BY: { min: 9, max: 9 },    // Belarus
  MD: { min: 8, max: 8 },    // Moldova
  RO: { min: 9, max: 10 },   // Romania
  BG: { min: 9, max: 9 },    // Bulgaria

  // Baltic States
  EE: { min: 7, max: 8 },    // Estonia
  LV: { min: 8, max: 8 },    // Latvia
  LT: { min: 8, max: 8 },    // Lithuania

  // Caucasus
  GE: { min: 9, max: 9 },    // Georgia
  AM: { min: 8, max: 8 },    // Armenia
  AZ: { min: 9, max: 9 },    // Azerbaijan

  // Middle East
  TR: { min: 10, max: 10 },  // Turkey
  IL: { min: 9, max: 10 },   // Israel
  PS: { min: 9, max: 9 },    // Palestine
  JO: { min: 9, max: 9 },    // Jordan
  LB: { min: 7, max: 8 },    // Lebanon
  SY: { min: 9, max: 9 },    // Syria
  IQ: { min: 10, max: 10 },  // Iraq
  IR: { min: 10, max: 10 },  // Iran
  SA: { min: 9, max: 9 },    // Saudi Arabia
  AE: { min: 9, max: 9 },    // United Arab Emirates
  KW: { min: 8, max: 8 },    // Kuwait
  QA: { min: 8, max: 8 },    // Qatar
  BH: { min: 8, max: 8 },    // Bahrain
  OM: { min: 8, max: 8 },    // Oman
  YE: { min: 9, max: 9 },    // Yemen

  // Central Asia
  KZ: { min: 10, max: 10 },  // Kazakhstan
  UZ: { min: 9, max: 9 },    // Uzbekistan
  TM: { min: 8, max: 8 },    // Turkmenistan
  TJ: { min: 9, max: 9 },    // Tajikistan
  KG: { min: 9, max: 9 },    // Kyrgyzstan
  AF: { min: 9, max: 9 },    // Afghanistan

  // South Asia
  IN: { min: 10, max: 10 },  // India
  PK: { min: 10, max: 10 },  // Pakistan
  BD: { min: 10, max: 10 },  // Bangladesh
  LK: { min: 9, max: 10 },   // Sri Lanka
  NP: { min: 10, max: 10 },  // Nepal
  BT: { min: 8, max: 8 },    // Bhutan
  MV: { min: 7, max: 7 },    // Maldives

  // East Asia
  CN: { min: 11, max: 11 },  // China
  JP: { min: 10, max: 11 },  // Japan
  KR: { min: 9, max: 11 },   // South Korea
  KP: { min: 9, max: 10 },   // North Korea
  TW: { min: 9, max: 10 },   // Taiwan
  HK: { min: 8, max: 8 },    // Hong Kong
  MO: { min: 8, max: 8 },    // Macau
  MN: { min: 8, max: 8 },    // Mongolia

  // Southeast Asia
  SG: { min: 8, max: 8 },    // Singapore
  MY: { min: 9, max: 10 },   // Malaysia
  TH: { min: 9, max: 9 },    // Thailand
  VN: { min: 9, max: 10 },   // Vietnam
  ID: { min: 10, max: 12 },  // Indonesia
  PH: { min: 10, max: 10 },  // Philippines
  MM: { min: 8, max: 10 },   // Myanmar
  KH: { min: 8, max: 9 },    // Cambodia
  LA: { min: 8, max: 10 },   // Laos
  BN: { min: 7, max: 7 },    // Brunei

  // Oceania
  AU: { min: 9, max: 10 },   // Australia
  NZ: { min: 8, max: 10 },   // New Zealand
  FJ: { min: 7, max: 7 },    // Fiji
  PG: { min: 8, max: 8 },    // Papua New Guinea
  VU: { min: 7, max: 7 },    // Vanuatu
  PW: { min: 7, max: 7 },    // Palau
  KI: { min: 5, max: 8 },    // Kiribati

  // North Africa
  EG: { min: 10, max: 10 },  // Egypt
  LY: { min: 9, max: 10 },   // Libya
  TN: { min: 8, max: 8 },    // Tunisia
  DZ: { min: 9, max: 9 },    // Algeria
  MA: { min: 9, max: 9 },    // Morocco
  SD: { min: 9, max: 9 },    // Sudan
  SS: { min: 9, max: 9 },    // South Sudan

  // West Africa
  NG: { min: 10, max: 10 },  // Nigeria
  GH: { min: 9, max: 10 },   // Ghana
  SN: { min: 9, max: 9 },    // Senegal
  CI: { min: 10, max: 10 },  // Ivory Coast
  ML: { min: 8, max: 8 },    // Mali
  BF: { min: 8, max: 8 },    // Burkina Faso
  NE: { min: 8, max: 8 },    // Niger
  GN: { min: 9, max: 9 },    // Guinea
  SL: { min: 8, max: 8 },    // Sierra Leone
  LR: { min: 7, max: 8 },    // Liberia
  TG: { min: 8, max: 8 },    // Togo
  BJ: { min: 8, max: 8 },    // Benin
  MR: { min: 8, max: 8 },    // Mauritania
  GM: { min: 7, max: 7 },    // Gambia
  GW: { min: 7, max: 9 },    // Guinea-Bissau
  CV: { min: 7, max: 7 },    // Cape Verde

  // Central Africa
  CM: { min: 9, max: 9 },    // Cameroon
  CF: { min: 8, max: 8 },    // Central African Republic
  TD: { min: 8, max: 8 },    // Chad
  CG: { min: 9, max: 9 },    // Congo
  CD: { min: 9, max: 9 },    // DR Congo
  GA: { min: 7, max: 8 },    // Gabon
  GQ: { min: 9, max: 9 },    // Equatorial Guinea

  // East Africa
  KE: { min: 9, max: 10 },   // Kenya
  TZ: { min: 9, max: 9 },    // Tanzania
  UG: { min: 9, max: 9 },    // Uganda
  RW: { min: 9, max: 9 },    // Rwanda
  BI: { min: 8, max: 8 },    // Burundi
  ET: { min: 9, max: 9 },    // Ethiopia
  ER: { min: 7, max: 7 },    // Eritrea
  DJ: { min: 8, max: 8 },    // Djibouti
  SO: { min: 7, max: 9 },    // Somalia
  KM: { min: 7, max: 7 },    // Comoros
  SC: { min: 7, max: 7 },    // Seychelles
  MU: { min: 8, max: 8 },    // Mauritius
  MG: { min: 9, max: 10 },   // Madagascar

  // Southern Africa
  ZA: { min: 9, max: 9 },    // South Africa
  NA: { min: 9, max: 10 },   // Namibia
  BW: { min: 8, max: 8 },    // Botswana
  ZW: { min: 9, max: 9 },    // Zimbabwe
  ZM: { min: 9, max: 9 },    // Zambia
  MW: { min: 9, max: 9 },    // Malawi
  MZ: { min: 9, max: 9 },    // Mozambique
  AO: { min: 9, max: 9 },    // Angola
  LS: { min: 8, max: 8 },    // Lesotho
};

// Comprehensive list of countries with dial codes and flags
export const countries: Country[] = [
  { name: "Afghanistan", code: "AF", dialCode: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "AL", dialCode: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", dialCode: "+213", flag: "🇩🇿" },
  { name: "Andorra", code: "AD", dialCode: "+376", flag: "🇦🇩" },
  { name: "Angola", code: "AO", dialCode: "+244", flag: "🇦🇴" },
  { name: "Argentina", code: "AR", dialCode: "+54", flag: "🇦🇷" },
  { name: "Armenia", code: "AM", dialCode: "+374", flag: "🇦🇲" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Austria", code: "AT", dialCode: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "AZ", dialCode: "+994", flag: "🇦🇿" },
  { name: "Bahamas", code: "BS", dialCode: "+1-242", flag: "🇧🇸" },
  { name: "Bahrain", code: "BH", dialCode: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", flag: "🇧🇩" },
  { name: "Barbados", code: "BB", dialCode: "+1-246", flag: "🇧🇧" },
  { name: "Belarus", code: "BY", dialCode: "+375", flag: "🇧🇾" },
  { name: "Belgium", code: "BE", dialCode: "+32", flag: "🇧🇪" },
  { name: "Belize", code: "BZ", dialCode: "+501", flag: "🇧🇿" },
  { name: "Benin", code: "BJ", dialCode: "+229", flag: "🇧🇯" },
  { name: "Bhutan", code: "BT", dialCode: "+975", flag: "🇧🇹" },
  { name: "Bolivia", code: "BO", dialCode: "+591", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "BA", dialCode: "+387", flag: "🇧🇦" },
  { name: "Botswana", code: "BW", dialCode: "+267", flag: "🇧🇼" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Brunei", code: "BN", dialCode: "+673", flag: "🇧🇳" },
  { name: "Bulgaria", code: "BG", dialCode: "+359", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "BF", dialCode: "+226", flag: "🇧🇫" },
  { name: "Burundi", code: "BI", dialCode: "+257", flag: "🇧🇮" },
  { name: "Cambodia", code: "KH", dialCode: "+855", flag: "🇰🇭" },
  { name: "Cameroon", code: "CM", dialCode: "+237", flag: "🇨🇲" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Cape Verde", code: "CV", dialCode: "+238", flag: "🇨🇻" },
  { name: "Central African Republic", code: "CF", dialCode: "+236", flag: "🇨🇫" },
  { name: "Chad", code: "TD", dialCode: "+235", flag: "🇹🇩" },
  { name: "Chile", code: "CL", dialCode: "+56", flag: "🇨🇱" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", dialCode: "+57", flag: "🇨🇴" },
  { name: "Comoros", code: "KM", dialCode: "+269", flag: "🇰🇲" },
  { name: "Congo", code: "CG", dialCode: "+242", flag: "🇨🇬" },
  { name: "Costa Rica", code: "CR", dialCode: "+506", flag: "🇨🇷" },
  { name: "Croatia", code: "HR", dialCode: "+385", flag: "🇭🇷" },
  { name: "Cuba", code: "CU", dialCode: "+53", flag: "🇨🇺" },
  { name: "Cyprus", code: "CY", dialCode: "+357", flag: "🇨🇾" },
  { name: "Czech Republic", code: "CZ", dialCode: "+420", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰" },
  { name: "Djibouti", code: "DJ", dialCode: "+253", flag: "🇩🇯" },
  { name: "Dominica", code: "DM", dialCode: "+1-767", flag: "🇩🇲" },
  { name: "Dominican Republic", code: "DO", dialCode: "+1-809", flag: "🇩🇴" },
  { name: "Ecuador", code: "EC", dialCode: "+593", flag: "🇪🇨" },
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬" },
  { name: "El Salvador", code: "SV", dialCode: "+503", flag: "🇸🇻" },
  { name: "Equatorial Guinea", code: "GQ", dialCode: "+240", flag: "🇬🇶" },
  { name: "Eritrea", code: "ER", dialCode: "+291", flag: "🇪🇷" },
  { name: "Estonia", code: "EE", dialCode: "+372", flag: "🇪🇪" },
  { name: "Ethiopia", code: "ET", dialCode: "+251", flag: "🇪🇹" },
  { name: "Fiji", code: "FJ", dialCode: "+679", flag: "🇫🇯" },
  { name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Gabon", code: "GA", dialCode: "+241", flag: "🇬🇦" },
  { name: "Gambia", code: "GM", dialCode: "+220", flag: "🇬🇲" },
  { name: "Georgia", code: "GE", dialCode: "+995", flag: "🇬🇪" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "Ghana", code: "GH", dialCode: "+233", flag: "🇬🇭" },
  { name: "Greece", code: "GR", dialCode: "+30", flag: "🇬🇷" },
  { name: "Grenada", code: "GD", dialCode: "+1-473", flag: "🇬🇩" },
  { name: "Guatemala", code: "GT", dialCode: "+502", flag: "🇬🇹" },
  { name: "Guinea", code: "GN", dialCode: "+224", flag: "🇬🇳" },
  { name: "Guinea-Bissau", code: "GW", dialCode: "+245", flag: "🇬🇼" },
  { name: "Guyana", code: "GY", dialCode: "+592", flag: "🇬🇾" },
  { name: "Haiti", code: "HT", dialCode: "+509", flag: "🇭🇹" },
  { name: "Honduras", code: "HN", dialCode: "+504", flag: "🇭🇳" },
  { name: "Hong Kong", code: "HK", dialCode: "+852", flag: "🇭🇰" },
  { name: "Hungary", code: "HU", dialCode: "+36", flag: "🇭🇺" },
  { name: "Iceland", code: "IS", dialCode: "+354", flag: "🇮🇸" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Iran", code: "IR", dialCode: "+98", flag: "🇮🇷" },
  { name: "Iraq", code: "IQ", dialCode: "+964", flag: "🇮🇶" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "IL", dialCode: "+972", flag: "🇮🇱" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Jamaica", code: "JM", dialCode: "+1-876", flag: "🇯🇲" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "Jordan", code: "JO", dialCode: "+962", flag: "🇯🇴" },
  { name: "Kazakhstan", code: "KZ", dialCode: "+7", flag: "🇰🇿" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪" },
  { name: "Kiribati", code: "KI", dialCode: "+686", flag: "🇰🇮" },
  { name: "Kuwait", code: "KW", dialCode: "+965", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "KG", dialCode: "+996", flag: "🇰🇬" },
  { name: "Laos", code: "LA", dialCode: "+856", flag: "🇱🇦" },
  { name: "Latvia", code: "LV", dialCode: "+371", flag: "🇱🇻" },
  { name: "Lebanon", code: "LB", dialCode: "+961", flag: "🇱🇧" },
  { name: "Lesotho", code: "LS", dialCode: "+266", flag: "🇱🇸" },
  { name: "Liberia", code: "LR", dialCode: "+231", flag: "🇱🇷" },
  { name: "Libya", code: "LY", dialCode: "+218", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "LI", dialCode: "+423", flag: "🇱🇮" },
  { name: "Lithuania", code: "LT", dialCode: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", code: "LU", dialCode: "+352", flag: "🇱🇺" },
  { name: "Macau", code: "MO", dialCode: "+853", flag: "🇲🇴" },
  { name: "Madagascar", code: "MG", dialCode: "+261", flag: "🇲🇬" },
  { name: "Malawi", code: "MW", dialCode: "+265", flag: "🇲🇼" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Maldives", code: "MV", dialCode: "+960", flag: "🇲🇻" },
  { name: "Mali", code: "ML", dialCode: "+223", flag: "🇲🇱" },
  { name: "Malta", code: "MT", dialCode: "+356", flag: "🇲🇹" },
  { name: "Mauritania", code: "MR", dialCode: "+222", flag: "🇲🇷" },
  { name: "Mauritius", code: "MU", dialCode: "+230", flag: "🇲🇺" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
  { name: "Moldova", code: "MD", dialCode: "+373", flag: "🇲🇩" },
  { name: "Monaco", code: "MC", dialCode: "+377", flag: "🇲🇨" },
  { name: "Mongolia", code: "MN", dialCode: "+976", flag: "🇲🇳" },
  { name: "Montenegro", code: "ME", dialCode: "+382", flag: "🇲🇪" },
  { name: "Morocco", code: "MA", dialCode: "+212", flag: "🇲🇦" },
  { name: "Mozambique", code: "MZ", dialCode: "+258", flag: "🇲🇿" },
  { name: "Myanmar", code: "MM", dialCode: "+95", flag: "🇲🇲" },
  { name: "Namibia", code: "NA", dialCode: "+264", flag: "🇳🇦" },
  { name: "Nepal", code: "NP", dialCode: "+977", flag: "🇳🇵" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
  { name: "Nicaragua", code: "NI", dialCode: "+505", flag: "🇳🇮" },
  { name: "Niger", code: "NE", dialCode: "+227", flag: "🇳🇪" },
  { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { name: "North Korea", code: "KP", dialCode: "+850", flag: "🇰🇵" },
  { name: "North Macedonia", code: "MK", dialCode: "+389", flag: "🇲🇰" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Oman", code: "OM", dialCode: "+968", flag: "🇴🇲" },
  { name: "Pakistan", code: "PK", dialCode: "+92", flag: "🇵🇰" },
  { name: "Palau", code: "PW", dialCode: "+680", flag: "🇵🇼" },
  { name: "Palestine", code: "PS", dialCode: "+970", flag: "🇵🇸" },
  { name: "Panama", code: "PA", dialCode: "+507", flag: "🇵🇦" },
  { name: "Papua New Guinea", code: "PG", dialCode: "+675", flag: "🇵🇬" },
  { name: "Paraguay", code: "PY", dialCode: "+595", flag: "🇵🇾" },
  { name: "Peru", code: "PE", dialCode: "+51", flag: "🇵🇪" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Poland", code: "PL", dialCode: "+48", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦" },
  { name: "Romania", code: "RO", dialCode: "+40", flag: "🇷🇴" },
  { name: "Russia", code: "RU", dialCode: "+7", flag: "🇷🇺" },
  { name: "Rwanda", code: "RW", dialCode: "+250", flag: "🇷🇼" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Senegal", code: "SN", dialCode: "+221", flag: "🇸🇳" },
  { name: "Serbia", code: "RS", dialCode: "+381", flag: "🇷🇸" },
  { name: "Seychelles", code: "SC", dialCode: "+248", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "SL", dialCode: "+232", flag: "🇸🇱" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Slovakia", code: "SK", dialCode: "+421", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", dialCode: "+386", flag: "🇸🇮" },
  { name: "Somalia", code: "SO", dialCode: "+252", flag: "🇸🇴" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "South Sudan", code: "SS", dialCode: "+211", flag: "🇸🇸" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "LK", dialCode: "+94", flag: "🇱🇰" },
  { name: "Sudan", code: "SD", dialCode: "+249", flag: "🇸🇩" },
  { name: "Suriname", code: "SR", dialCode: "+597", flag: "🇸🇷" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Syria", code: "SY", dialCode: "+963", flag: "🇸🇾" },
  { name: "Taiwan", code: "TW", dialCode: "+886", flag: "🇹🇼" },
  { name: "Tajikistan", code: "TJ", dialCode: "+992", flag: "🇹🇯" },
  { name: "Tanzania", code: "TZ", dialCode: "+255", flag: "🇹🇿" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Togo", code: "TG", dialCode: "+228", flag: "🇹🇬" },
  { name: "Trinidad and Tobago", code: "TT", dialCode: "+1-868", flag: "🇹🇹" },
  { name: "Tunisia", code: "TN", dialCode: "+216", flag: "🇹🇳" },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "TM", dialCode: "+993", flag: "🇹🇲" },
  { name: "Uganda", code: "UG", dialCode: "+256", flag: "🇺🇬" },
  { name: "Ukraine", code: "UA", dialCode: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "Uruguay", code: "UY", dialCode: "+598", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "UZ", dialCode: "+998", flag: "🇺🇿" },
  { name: "Vanuatu", code: "VU", dialCode: "+678", flag: "🇻🇺" },
  { name: "Vatican City", code: "VA", dialCode: "+379", flag: "🇻🇦" },
  { name: "Venezuela", code: "VE", dialCode: "+58", flag: "🇻🇪" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳" },
  { name: "Yemen", code: "YE", dialCode: "+967", flag: "🇾🇪" },
  { name: "Zambia", code: "ZM", dialCode: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", dialCode: "+263", flag: "🇿🇼" },
];

// Default country (can be changed based on user's locale)
const DEFAULT_COUNTRY = countries.find((c) => c.code === "US") || countries[0];

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string, countryCode: string, fullValue: string) => void;
  defaultCountry?: string;
  allowedCountries?: string[];
  onValidationChange?: (isValid: boolean, error?: string) => void;
  variant?: "light" | "dark";
}

export function PhoneInput({
  id,
  name,
  value = "",
  onChange,
  placeholder = "Phone number",
  required = false,
  disabled = false,
  className,
  defaultCountry = "US",
  allowedCountries,
  onValidationChange,
  variant = "light",
  ...props
}: PhoneInputProps) {
  const isDark = variant === "dark";

  // Shared container — unified border treatment
  const containerCls = isDark
    ? "flex w-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.08)] focus-within:border-eh-gold transition-[border-color] duration-200"
    : "flex w-full border border-transparent bg-eh-cream focus-within:border-eh-gold focus-within:bg-white transition-[border-color,background] duration-200";

  const triggerCls = isDark
    ? "flex items-center gap-1.5 px-3 py-3 font-dmSans text-[14px] font-light text-white border-r border-[rgba(255,255,255,0.10)] outline-none shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
    : "flex items-center gap-1.5 px-3 py-[14px] font-dmSans text-[14px] font-light text-eh-charcoal border-r border-black/10 outline-none shrink-0 disabled:cursor-not-allowed disabled:opacity-50";

  const inputCls = isDark
    ? "flex-1 bg-transparent font-dmSans text-[14px] font-light text-white placeholder:text-white/40 px-3 py-3 outline-none border-none focus:outline-none min-w-0"
    : "flex-1 bg-transparent font-dmSans text-[14px] font-light text-eh-charcoal placeholder:text-eh-charcoal/40 px-3 py-[14px] outline-none border-none focus:outline-none min-w-0";
  const [open, setOpen] = React.useState(false);

  // Filter countries based on allowedCountries prop
  const filteredCountries = React.useMemo(() => {
    if (!allowedCountries || allowedCountries.length === 0) {
      return countries;
    }
    return countries.filter((c) => allowedCountries.includes(c.code));
  }, [allowedCountries]);

  // Get default country from filtered list
  const getDefaultCountry = React.useCallback(() => {
    if (allowedCountries && allowedCountries.length > 0) {
      // If defaultCountry is in allowed list, use it; otherwise use first allowed country
      const defaultInAllowed = filteredCountries.find((c) => c.code === defaultCountry);
      return defaultInAllowed || filteredCountries[0] || DEFAULT_COUNTRY;
    }
    return countries.find((c) => c.code === defaultCountry) || DEFAULT_COUNTRY;
  }, [defaultCountry, allowedCountries, filteredCountries]);

  const [selectedCountry, setSelectedCountry] = React.useState<Country>(getDefaultCountry);
  const [phoneNumber, setPhoneNumber] = React.useState(() => {
    // Extract phone number from value if it starts with a dial code
    if (value && value.startsWith("+")) {
      // Find the dial code and extract the phone number
      const parts = value.split(" ");
      if (parts.length > 1) {
        return parts.slice(1).join(" ");
      }
    }
    return value;
  });
  const [validationError, setValidationError] = React.useState<string | undefined>();

  // Validate phone number based on country
  const validatePhoneNumber = React.useCallback((phone: string, countryCode: string): { isValid: boolean; error?: string } => {
    if (!phone || phone.trim() === "") {
      return { isValid: true }; // Empty is valid (required check is separate)
    }

    // Remove all non-digit characters for length check
    const digitsOnly = phone.replace(/\D/g, "");
    const rules = phoneValidationRules[countryCode];

    if (rules) {
      if (digitsOnly.length < rules.min) {
        return { isValid: false, error: `Phone number must be at least ${rules.min} digits` };
      }
      if (digitsOnly.length > rules.max) {
        return { isValid: false, error: `Phone number must be at most ${rules.max} digits` };
      }
    }

    return { isValid: true };
  }, []);

  // Update validation when phone number or country changes
  React.useEffect(() => {
    const { isValid, error } = validatePhoneNumber(phoneNumber, selectedCountry.code);
    setValidationError(error);
    onValidationChange?.(isValid, error);
  }, [phoneNumber, selectedCountry.code, validatePhoneNumber, onValidationChange]);

  // Update phone number when value prop changes
  React.useEffect(() => {
    if (value) {
      // Check if value starts with a dial code (like "+1 555-123")
      if (value.startsWith("+")) {
        // Extract just the phone number portion (after the dial code)
        const parts = value.split(" ");
        if (parts.length > 1) {
          setPhoneNumber(parts.slice(1).join(" "));
        } else {
          // Value is just a dial code, no phone number
          setPhoneNumber("");
        }
      } else {
        // Value doesn't start with +, treat as phone number only
        setPhoneNumber(value);
      }
    } else {
      setPhoneNumber("");
    }
  }, [value]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setOpen(false);
    // Notify parent of the change
    if (onChange) {
      const fullValue = `${country.dialCode} ${phoneNumber}`;
      onChange(phoneNumber, country.dialCode, fullValue.trim());
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Only allow numbers, spaces, and dashes
    const sanitized = newValue.replace(/[^\d\s\-()]/g, "");
    setPhoneNumber(sanitized);

    if (onChange) {
      const fullValue = `${selectedCountry.dialCode} ${sanitized}`;
      onChange(sanitized, selectedCountry.dialCode, fullValue.trim());
    }
  };

  return (
    <div className={cn("flex flex-col w-full gap-1", className)}>
      <div className={containerCls}>
        {/* Country selector */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={triggerCls}
            >
              <span className="text-base leading-none">{selectedCountry.flag}</span>
              <span>{selectedCountry.dialCode}</span>
              <ChevronDown className={cn(
                "h-3.5 w-3.5 shrink-0 opacity-50 transition-transform duration-200",
                open && "rotate-180"
              )} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search country..." className="h-9" />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-[200px]">
                    {filteredCountries.map((country) => (
                      <CommandItem
                        key={country.code}
                        value={`${country.name} ${country.dialCode}`}
                        onSelect={() => handleCountrySelect(country)}
                        className="cursor-pointer"
                      >
                        <span className="text-lg mr-2">{country.flag}</span>
                        <span className="flex-1">{country.name}</span>
                        <span className="text-muted-foreground text-sm">{country.dialCode}</span>
                        <CheckIcon className={cn(
                          "ml-2 h-4 w-4",
                          selectedCountry.code === country.code ? "opacity-100" : "opacity-0"
                        )} />
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Phone number input — no border/bg, inherits from container */}
        <input
          type="tel"
          id={id}
          name={name}
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputCls}
          aria-invalid={!!validationError}
        />
      </div>
      {validationError && (
        <p className="font-dmSans text-[12px] text-red-500 mt-1">{validationError}</p>
      )}
    </div>
  );
}

export { PhoneInput as default };
