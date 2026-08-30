/**
 * Seed data for P09 Vehicle Service Due Predictor
 * Based on P09_vehicle_service_public.json with realistic Bangladeshi data
 * 
 * Requirements:
 * - At least 25 unique owners
 * - At least 40 vehicles
 * - Each vehicle has 3-5 service items
 * - Mix of fixed_date, period_months, and distance_km rules
 * - 2-4 odometer readings per vehicle
 * - 2-4 service history records per vehicle
 */

import type { Owner, Vehicle, CaseData } from "./types";

export const SEED_OWNERS: Owner[] = [
  { id: "O01", name: "Salma Ahmed", phone: "01481704039" },
  { id: "O02", name: "Lubna Begum", phone: "01632456307" },
  { id: "O03", name: "Habib Ali", phone: "01458378733" },
  { id: "O04", name: "Karim Khan", phone: "01374998700" },
  { id: "O05", name: "Jahid Ahmed", phone: "01902287168" },
  { id: "O06", name: "Rina Chowdhury", phone: "01601354553" },
  { id: "O07", name: "Munni Khan", phone: "01588343873" },
  { id: "O08", name: "Shirin Akter", phone: "01753328067" },
  { id: "O09", name: "Tanvir Chowdhury", phone: "01906649881" },
  { id: "O10", name: "Karim Rahman", phone: "01634133481" },
  { id: "O11", name: "Nasir Islam", phone: "01487272367" },
  { id: "O12", name: "Kamal Hossain", phone: "01618257749" },
  { id: "O13", name: "Jahid Khan", phone: "01810173486" },
  { id: "O14", name: "Rina Ali", phone: "01824649037" },
  { id: "O15", name: "Mahbub Begum", phone: "01962501357" },
  { id: "O16", name: "Asif Khan", phone: "01402580079" },
  { id: "O17", name: "Rubel Rahman", phone: "01695710675" },
  { id: "O18", name: "Rahim Hossain", phone: "01770107643" },
  { id: "O19", name: "Mahbub Uddin", phone: "01466238017" },
  { id: "O20", name: "Shirin Sultana", phone: "01688157502" },
  { id: "O21", name: "Rafiq Hassan", phone: "01532189654" },
  { id: "O22", name: "Nasrin Rahman", phone: "01544914344" },
  { id: "O23", name: "Farhana Akter", phone: "01841374443" },
  { id: "O24", name: "Jahangir Khan", phone: "01667063226" },
  { id: "O25", name: "Kamal Ali", phone: "01317789422" },
  { id: "O26", name: "Nadia Ali", phone: "01415051253" },
  { id: "O27", name: "Tanvir Ahmed", phone: "01732816970" },
];

export const SEED_VEHICLES: Vehicle[] = [
  {
    id: "V01",
    owner_id: "O01",
    model: "Toyota Axio",
    plate: "Dhaka Metro Cha 76-9961",
    odometer_readings: [
      { date: "2026-05-10", km: 93612 },
      { date: "2026-07-06", km: 97774 },
      { date: "2026-08-02", km: 99716 },
      { date: "2026-08-30", km: 101743 },
    ],
    service_items: [
      {
        name: "Fitness certificate",
        rule: "fixed_date",
        due_date: "2027-01-31",
        cost_bdt: "2500.00",
      },
      {
        name: "Battery warranty",
        rule: "fixed_date",
        due_date: "2026-08-25",
        cost_bdt: "9000.00",
      },
      {
        name: "AC service",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "4500.00",
      },
      {
        name: "Air filter",
        rule: "period_months",
        every_months: 6,
        cost_bdt: "1200.00",
      },
      {
        name: "Tyres",
        rule: "distance_km",
        every_km: 40000,
        cost_bdt: "32000.00",
      },
    ],
    service_history: [
      { item: "Tyres", date: "2026-03-15", km: 62853, cost_bdt: "32000.00" },
      { item: "Air filter", date: "2026-04-12", km: null, cost_bdt: "1200.00" },
      { item: "AC service", date: "2026-07-04", km: null, cost_bdt: "4500.00" },
    ],
  },
  {
    id: "V02",
    owner_id: "O02",
    model: "Mitsubishi Pajero",
    plate: "Dhaka Metro Ga 13-4185",
    odometer_readings: [
      { date: "2026-06-14", km: 45771 },
      { date: "2026-07-14", km: 47062 },
      { date: "2026-08-30", km: 49157 },
    ],
    service_items: [
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2026-07-21",
        cost_bdt: "6500.00",
      },
      {
        name: "Insurance",
        rule: "fixed_date",
        due_date: "2027-02-23",
        cost_bdt: "12000.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Timing belt",
        rule: "distance_km",
        every_km: 80000,
        cost_bdt: "15000.00",
      },
    ],
    service_history: [
      { item: "Engine oil", date: "2025-12-30", km: null, cost_bdt: "3500.00" },
      { item: "Timing belt", date: "2026-04-30", km: 0, cost_bdt: "15000.00" },
    ],
  },
  {
    id: "V03",
    owner_id: "O03",
    model: "Toyota Premio",
    plate: "Dhaka Metro Ga 83-2723",
    odometer_readings: [
      { date: "2026-05-06", km: 106436 },
      { date: "2026-06-26", km: 110176 },
      { date: "2026-07-18", km: 111833 },
      { date: "2026-08-30", km: 115030 },
    ],
    service_items: [
      {
        name: "Insurance",
        rule: "fixed_date",
        due_date: "2026-09-08",
        cost_bdt: "12000.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Air filter",
        rule: "period_months",
        every_months: 6,
        cost_bdt: "1200.00",
      },
      {
        name: "Spark plugs",
        rule: "distance_km",
        every_km: 20000,
        cost_bdt: "2400.00",
      },
    ],
    service_history: [
      { item: "Engine oil", date: "2025-11-16", km: null, cost_bdt: "3500.00" },
      { item: "Air filter", date: "2026-03-01", km: null, cost_bdt: "1200.00" },
      { item: "Spark plugs", date: "2026-05-25", km: 95717, cost_bdt: "2400.00" },
    ],
  },
  {
    id: "V04",
    owner_id: "O04",
    model: "Toyota Hiace",
    plate: "Dhaka Metro Cha 62-3764",
    odometer_readings: [
      { date: "2026-06-05", km: 72611 },
      { date: "2026-07-25", km: 73906 },
      { date: "2026-08-30", km: 74813 },
    ],
    service_items: [
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2026-10-13",
        cost_bdt: "6500.00",
      },
      {
        name: "Fitness certificate",
        rule: "fixed_date",
        due_date: "2026-12-24",
        cost_bdt: "2500.00",
      },
      {
        name: "Air filter",
        rule: "period_months",
        every_months: 6,
        cost_bdt: "1200.00",
      },
      {
        name: "Coolant",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "1800.00",
      },
      {
        name: "Spark plugs",
        rule: "distance_km",
        every_km: 20000,
        cost_bdt: "2400.00",
      },
    ],
    service_history: [
      { item: "Air filter", date: "2025-07-29", km: null, cost_bdt: "1200.00" },
      { item: "Coolant", date: "2025-11-14", km: null, cost_bdt: "1800.00" },
      { item: "Spark plugs", date: "2026-03-11", km: 55404, cost_bdt: "2400.00" },
    ],
  },
  {
    id: "V05",
    owner_id: "O05",
    model: "Toyota Noah",
    plate: "Dhaka Metro Cha 75-6734",
    odometer_readings: [
      { date: "2026-05-29", km: 132057 },
      { date: "2026-06-29", km: 134467 },
      { date: "2026-07-20", km: 136099 },
      { date: "2026-08-30", km: 139257 },
    ],
    service_items: [
      {
        name: "Fitness certificate",
        rule: "fixed_date",
        due_date: "2026-09-01",
        cost_bdt: "2500.00",
      },
      {
        name: "Battery warranty",
        rule: "fixed_date",
        due_date: "2026-12-05",
        cost_bdt: "9000.00",
      },
      {
        name: "AC service",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "4500.00",
      },
      {
        name: "Spark plugs",
        rule: "distance_km",
        every_km: 20000,
        cost_bdt: "2400.00",
      },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-03-12", km: 119474, cost_bdt: "2400.00" },
      { item: "AC service", date: "2026-07-24", km: null, cost_bdt: "4500.00" },
    ],
  },
  {
    id: "V06",
    owner_id: "O06",
    model: "Nissan X-Trail",
    plate: "Dhaka Metro Ga 26-6348",
    odometer_readings: [
      { date: "2026-05-03", km: 56854 },
      { date: "2026-06-08", km: 58203 },
      { date: "2026-07-17", km: 59660 },
      { date: "2026-08-30", km: 61280 },
    ],
    service_items: [
      {
        name: "Insurance",
        rule: "fixed_date",
        due_date: "2027-01-05",
        cost_bdt: "12000.00",
      },
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2026-11-07",
        cost_bdt: "6500.00",
      },
      {
        name: "Coolant",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "1800.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Timing belt",
        rule: "distance_km",
        every_km: 80000,
        cost_bdt: "15000.00",
      },
    ],
    service_history: [
      { item: "Coolant", date: "2025-11-18", km: null, cost_bdt: "1800.00" },
      { item: "Engine oil", date: "2025-11-18", km: null, cost_bdt: "3500.00" },
      { item: "Timing belt", date: "2026-06-12", km: 0, cost_bdt: "15000.00" },
    ],
  },
  {
    id: "V07",
    owner_id: "O07",
    model: "Nissan X-Trail",
    plate: "Dhaka Metro Ga 87-1873",
    odometer_readings: [
      { date: "2026-05-17", km: 142552 },
      { date: "2026-06-28", km: 143858 },
      { date: "2026-08-01", km: 144974 },
      { date: "2026-08-30", km: 145868 },
    ],
    service_items: [
      {
        name: "Insurance",
        rule: "fixed_date",
        due_date: "2026-08-11",
        cost_bdt: "12000.00",
      },
      {
        name: "AC service",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "4500.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Timing belt",
        rule: "distance_km",
        every_km: 80000,
        cost_bdt: "15000.00",
      },
    ],
    service_history: [
      { item: "AC service", date: "2025-11-04", km: null, cost_bdt: "4500.00" },
      { item: "Timing belt", date: "2026-03-04", km: 65423, cost_bdt: "15000.00" },
      { item: "Engine oil", date: "2026-03-13", km: null, cost_bdt: "3500.00" },
    ],
  },
  {
    id: "V08",
    owner_id: "O08",
    model: "Toyota Axio",
    plate: "Dhaka Metro Ba 80-7180",
    odometer_readings: [
      { date: "2026-05-20", km: 92957 },
      { date: "2026-07-15", km: 95338 },
      { date: "2026-08-30", km: 97239 },
    ],
    service_items: [
      {
        name: "Insurance",
        rule: "fixed_date",
        due_date: "2026-09-26",
        cost_bdt: "12000.00",
      },
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2027-02-23",
        cost_bdt: "6500.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Brake pads",
        rule: "distance_km",
        every_km: 10000,
        cost_bdt: "6000.00",
      },
    ],
    service_history: [
      { item: "Engine oil", date: "2026-02-07", km: null, cost_bdt: "3500.00" },
      { item: "Brake pads", date: "2026-07-16", km: 88224, cost_bdt: "6000.00" },
    ],
  },
  {
    id: "V09",
    owner_id: "O09",
    model: "Toyota Hiace",
    plate: "Dhaka Metro Kha 24-3068",
    odometer_readings: [
      { date: "2026-06-10", km: 64651 },
      { date: "2026-07-28", km: 67794 },
      { date: "2026-08-30", km: 69944 },
    ],
    service_items: [
      {
        name: "Fitness certificate",
        rule: "fixed_date",
        due_date: "2026-12-11",
        cost_bdt: "2500.00",
      },
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2027-02-07",
        cost_bdt: "6500.00",
      },
      {
        name: "Coolant",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "1800.00",
      },
      {
        name: "Spark plugs",
        rule: "distance_km",
        every_km: 20000,
        cost_bdt: "2400.00",
      },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-04-11", km: 50382, cost_bdt: "2400.00" },
      { item: "Coolant", date: "2026-05-28", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V10",
    owner_id: "O10",
    model: "Toyota Allion",
    plate: "Dhaka Metro Cha 46-8210",
    odometer_readings: [
      { date: "2026-08-04", km: 132978 },
      { date: "2026-08-30", km: 133821 },
    ],
    service_items: [
      {
        name: "Fitness certificate",
        rule: "fixed_date",
        due_date: "2026-11-02",
        cost_bdt: "2500.00",
      },
      {
        name: "Battery warranty",
        rule: "fixed_date",
        due_date: "2027-01-02",
        cost_bdt: "9000.00",
      },
      {
        name: "AC service",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "4500.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Spark plugs",
        rule: "distance_km",
        every_km: 20000,
        cost_bdt: "2400.00",
      },
    ],
    service_history: [
      { item: "AC service", date: "2026-02-04", km: null, cost_bdt: "4500.00" },
      { item: "Spark plugs", date: "2026-04-21", km: 113504, cost_bdt: "2400.00" },
      { item: "Engine oil", date: "2026-08-02", km: null, cost_bdt: "3500.00" },
    ],
  },
  // Continue with more vehicles... (V11-V42 to reach 42 vehicles total)
  {
    id: "V11",
    owner_id: "O11",
    model: "Toyota Noah",
    plate: "Dhaka Metro Ba 81-2173",
    odometer_readings: [
      { date: "2026-08-02", km: 109979 },
      { date: "2026-08-30", km: 112144 },
    ],
    service_items: [
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2026-12-31",
        cost_bdt: "6500.00",
      },
      {
        name: "Coolant",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "1800.00",
      },
      {
        name: "Spark plugs",
        rule: "distance_km",
        every_km: 20000,
        cost_bdt: "2400.00",
      },
    ],
    service_history: [
      { item: "Coolant", date: "2025-12-23", km: null, cost_bdt: "1800.00" },
      { item: "Spark plugs", date: "2026-02-26", km: 92773, cost_bdt: "2400.00" },
    ],
  },
  {
    id: "V12",
    owner_id: "O12",
    model: "Suzuki Alto",
    plate: "Dhaka Metro Ba 30-8426",
    odometer_readings: [
      { date: "2026-07-30", km: 89427 },
      { date: "2026-08-30", km: 90772 },
    ],
    service_items: [
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2026-08-14",
        cost_bdt: "6500.00",
      },
      {
        name: "AC service",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "4500.00",
      },
      {
        name: "Tyres",
        rule: "distance_km",
        every_km: 40000,
        cost_bdt: "32000.00",
      },
    ],
    service_history: [
      { item: "Tyres", date: "2026-07-03", km: 51518, cost_bdt: "32000.00" },
      { item: "AC service", date: "2026-08-03", km: null, cost_bdt: "4500.00" },
    ],
  },
  {
    id: "V13",
    owner_id: "O13",
    model: "Honda Vezel",
    plate: "Dhaka Metro Kha 86-9083",
    odometer_readings: [
      { date: "2026-05-06", km: 76971 },
      { date: "2026-06-19", km: 78672 },
      { date: "2026-07-27", km: 80191 },
      { date: "2026-08-30", km: 81512 },
    ],
    service_items: [
      {
        name: "Battery warranty",
        rule: "fixed_date",
        due_date: "2026-10-27",
        cost_bdt: "9000.00",
      },
      {
        name: "Coolant",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "1800.00",
      },
      {
        name: "Timing belt",
        rule: "distance_km",
        every_km: 80000,
        cost_bdt: "15000.00",
      },
    ],
    service_history: [
      { item: "Timing belt", date: "2026-07-09", km: 2212, cost_bdt: "15000.00" },
      { item: "Coolant", date: "2026-07-10", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V14",
    owner_id: "O14",
    model: "Toyota Premio",
    plate: "Dhaka Metro Ba 72-2359",
    odometer_readings: [
      { date: "2026-07-03", km: 151783 },
      { date: "2026-08-02", km: 153200 },
      { date: "2026-08-30", km: 154507 },
    ],
    service_items: [
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2026-09-22",
        cost_bdt: "6500.00",
      },
      {
        name: "Insurance",
        rule: "fixed_date",
        due_date: "2027-01-27",
        cost_bdt: "12000.00",
      },
      {
        name: "Air filter",
        rule: "period_months",
        every_months: 6,
        cost_bdt: "1200.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Brake pads",
        rule: "distance_km",
        every_km: 10000,
        cost_bdt: "6000.00",
      },
    ],
    service_history: [
      { item: "Air filter", date: "2025-11-10", km: null, cost_bdt: "1200.00" },
      { item: "Engine oil", date: "2025-12-24", km: null, cost_bdt: "3500.00" },
      { item: "Brake pads", date: "2026-02-13", km: 144100, cost_bdt: "6000.00" },
    ],
  },
  {
    id: "V15",
    owner_id: "O15",
    model: "Toyota Hiace",
    plate: "Dhaka Metro Ga 59-3749",
    odometer_readings: [
      { date: "2026-05-20", km: 89435 },
      { date: "2026-07-11", km: 93523 },
      { date: "2026-08-30", km: 97463 },
    ],
    service_items: [
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2027-02-01",
        cost_bdt: "6500.00",
      },
      {
        name: "Battery warranty",
        rule: "fixed_date",
        due_date: "2026-07-30",
        cost_bdt: "9000.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Tyres",
        rule: "distance_km",
        every_km: 40000,
        cost_bdt: "32000.00",
      },
    ],
    service_history: [
      { item: "Engine oil", date: "2026-02-08", km: null, cost_bdt: "3500.00" },
      { item: "Tyres", date: "2026-04-09", km: 57066, cost_bdt: "32000.00" },
    ],
  },
  {
    id: "V16",
    owner_id: "O16",
    model: "Honda Grace",
    plate: "Dhaka Metro Ga 44-5672",
    odometer_readings: [
      { date: "2026-06-12", km: 68432 },
      { date: "2026-07-20", km: 70513 },
      { date: "2026-08-30", km: 72805 },
    ],
    service_items: [
      {
        name: "Insurance",
        rule: "fixed_date",
        due_date: "2026-11-15",
        cost_bdt: "12000.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Brake pads",
        rule: "distance_km",
        every_km: 10000,
        cost_bdt: "6000.00",
      },
      {
        name: "Air filter",
        rule: "period_months",
        every_months: 6,
        cost_bdt: "1200.00",
      },
    ],
    service_history: [
      { item: "Brake pads", date: "2026-05-01", km: 63012, cost_bdt: "6000.00" },
      { item: "Engine oil", date: "2026-06-15", km: null, cost_bdt: "3500.00" },
      { item: "Air filter", date: "2026-07-01", km: null, cost_bdt: "1200.00" },
    ],
  },
  {
    id: "V17",
    owner_id: "O17",
    model: "Toyota Fielder",
    plate: "Dhaka Metro Kha 91-3214",
    odometer_readings: [
      { date: "2026-07-15", km: 125678 },
      { date: "2026-08-30", km: 128950 },
    ],
    service_items: [
      {
        name: "Fitness certificate",
        rule: "fixed_date",
        due_date: "2026-10-05",
        cost_bdt: "2500.00",
      },
      {
        name: "AC service",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "4500.00",
      },
      {
        name: "Spark plugs",
        rule: "distance_km",
        every_km: 20000,
        cost_bdt: "2400.00",
      },
      {
        name: "Coolant",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "1800.00",
      },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-04-10", km: 108950, cost_bdt: "2400.00" },
      { item: "AC service", date: "2026-05-20", km: null, cost_bdt: "4500.00" },
      { item: "Coolant", date: "2026-06-15", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V18",
    owner_id: "O18",
    model: "Honda Fit",
    plate: "Dhaka Metro Ba 55-7821",
    odometer_readings: [
      { date: "2026-06-01", km: 82340 },
      { date: "2026-07-05", km: 84127 },
      { date: "2026-08-15", km: 86402 },
      { date: "2026-08-30", km: 87234 },
    ],
    service_items: [
      {
        name: "Tax token",
        rule: "fixed_date",
        due_date: "2026-09-10",
        cost_bdt: "6500.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Tyres",
        rule: "distance_km",
        every_km: 40000,
        cost_bdt: "32000.00",
      },
    ],
    service_history: [
      { item: "Tyres", date: "2026-03-05", km: 47234, cost_bdt: "32000.00" },
      { item: "Engine oil", date: "2026-07-20", km: null, cost_bdt: "3500.00" },
    ],
  },
  {
    id: "V19",
    owner_id: "O19",
    model: "Nissan Note",
    plate: "Dhaka Metro Cha 33-4592",
    odometer_readings: [
      { date: "2026-05-25", km: 95421 },
      { date: "2026-07-10", km: 98205 },
      { date: "2026-08-30", km: 100931 },
    ],
    service_items: [
      {
        name: "Insurance",
        rule: "fixed_date",
        due_date: "2026-12-20",
        cost_bdt: "12000.00",
      },
      {
        name: "Battery warranty",
        rule: "fixed_date",
        due_date: "2026-09-05",
        cost_bdt: "9000.00",
      },
      {
        name: "Air filter",
        rule: "period_months",
        every_months: 6,
        cost_bdt: "1200.00",
      },
      {
        name: "Brake pads",
        rule: "distance_km",
        every_km: 10000,
        cost_bdt: "6000.00",
      },
    ],
    service_history: [
      { item: "Air filter", date: "2026-04-15", km: null, cost_bdt: "1200.00" },
      { item: "Brake pads", date: "2026-06-20", km: 91028, cost_bdt: "6000.00" },
    ],
  },
  {
    id: "V20",
    owner_id: "O20",
    model: "Suzuki Swift",
    plate: "Dhaka Metro Ga 77-8934",
    odometer_readings: [
      { date: "2026-07-01", km: 54231 },
      { date: "2026-08-10", km: 56420 },
      { date: "2026-08-30", km: 57512 },
    ],
    service_items: [
      {
        name: "Fitness certificate",
        rule: "fixed_date",
        due_date: "2027-03-15",
        cost_bdt: "2500.00",
      },
      {
        name: "Engine oil",
        rule: "period_months",
        every_months: 3,
        cost_bdt: "3500.00",
      },
      {
        name: "Coolant",
        rule: "period_months",
        every_months: 12,
        cost_bdt: "1800.00",
      },
      {
        name: "Spark plugs",
        rule: "distance_km",
        every_km: 20000,
        cost_bdt: "2400.00",
      },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-02-10", km: 37512, cost_bdt: "2400.00" },
      { item: "Engine oil", date: "2026-06-05", km: null, cost_bdt: "3500.00" },
      { item: "Coolant", date: "2026-07-15", km: null, cost_bdt: "1800.00" },
    ],
  },
  // Adding 20 more vehicles to reach 40+ total
  {
    id: "V21",
    owner_id: "O21",
    model: "Toyota Vitz",
    plate: "Dhaka Metro Kha 12-3456",
    odometer_readings: [
      { date: "2026-06-20", km: 78432 },
      { date: "2026-07-25", km: 80210 },
      { date: "2026-08-30", km: 82134 },
    ],
    service_items: [
      { name: "Tax token", rule: "fixed_date", due_date: "2026-08-20", cost_bdt: "6500.00" },
      { name: "AC service", rule: "period_months", every_months: 12, cost_bdt: "4500.00" },
      { name: "Timing belt", rule: "distance_km", every_km: 80000, cost_bdt: "15000.00" },
    ],
    service_history: [
      { item: "Timing belt", date: "2026-04-15", km: 2134, cost_bdt: "15000.00" },
      { item: "AC service", date: "2026-07-01", km: null, cost_bdt: "4500.00" },
    ],
  },
  {
    id: "V22",
    owner_id: "O22",
    model: "Honda City",
    plate: "Dhaka Metro Ba 99-1122",
    odometer_readings: [
      { date: "2026-07-10", km: 142350 },
      { date: "2026-08-30", km: 145892 },
    ],
    service_items: [
      { name: "Insurance", rule: "fixed_date", due_date: "2026-10-30", cost_bdt: "12000.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Brake pads", rule: "distance_km", every_km: 10000, cost_bdt: "6000.00" },
      { name: "Air filter", rule: "period_months", every_months: 6, cost_bdt: "1200.00" },
    ],
    service_history: [
      { item: "Engine oil", date: "2026-05-20", km: null, cost_bdt: "3500.00" },
      { item: "Brake pads", date: "2026-07-15", km: 135892, cost_bdt: "6000.00" },
      { item: "Air filter", date: "2026-08-01", km: null, cost_bdt: "1200.00" },
    ],
  },
  {
    id: "V23",
    owner_id: "O23",
    model: "Mitsubishi Lancer",
    plate: "Dhaka Metro Cha 66-7788",
    odometer_readings: [
      { date: "2026-05-15", km: 112450 },
      { date: "2026-06-30", km: 115632 },
      { date: "2026-08-05", km: 118211 },
      { date: "2026-08-30", km: 119805 },
    ],
    service_items: [
      { name: "Fitness certificate", rule: "fixed_date", due_date: "2026-11-25", cost_bdt: "2500.00" },
      { name: "Coolant", rule: "period_months", every_months: 12, cost_bdt: "1800.00" },
      { name: "Spark plugs", rule: "distance_km", every_km: 20000, cost_bdt: "2400.00" },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-03-10", km: 99805, cost_bdt: "2400.00" },
      { item: "Coolant", date: "2026-04-20", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V24",
    owner_id: "O24",
    model: "Toyota Corolla",
    plate: "Dhaka Metro Ga 22-5544",
    odometer_readings: [
      { date: "2026-06-05", km: 88756 },
      { date: "2026-07-18", km: 91234 },
      { date: "2026-08-30", km: 93890 },
    ],
    service_items: [
      { name: "Tax token", rule: "fixed_date", due_date: "2027-01-10", cost_bdt: "6500.00" },
      { name: "Battery warranty", rule: "fixed_date", due_date: "2026-09-15", cost_bdt: "9000.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Tyres", rule: "distance_km", every_km: 40000, cost_bdt: "32000.00" },
    ],
    service_history: [
      { item: "Tyres", date: "2026-02-20", km: 53890, cost_bdt: "32000.00" },
      { item: "Engine oil", date: "2026-07-05", km: null, cost_bdt: "3500.00" },
    ],
  },
  {
    id: "V25",
    owner_id: "O25",
    model: "Nissan Sylphy",
    plate: "Dhaka Metro Kha 44-9876",
    odometer_readings: [
      { date: "2026-07-05", km: 156234 },
      { date: "2026-08-30", km: 159812 },
    ],
    service_items: [
      { name: "Insurance", rule: "fixed_date", due_date: "2026-12-05", cost_bdt: "12000.00" },
      { name: "Air filter", rule: "period_months", every_months: 6, cost_bdt: "1200.00" },
      { name: "AC service", rule: "period_months", every_months: 12, cost_bdt: "4500.00" },
      { name: "Brake pads", rule: "distance_km", every_km: 10000, cost_bdt: "6000.00" },
    ],
    service_history: [
      { item: "Air filter", date: "2026-02-15", km: null, cost_bdt: "1200.00" },
      { item: "Brake pads", date: "2026-05-20", km: 149812, cost_bdt: "6000.00" },
      { item: "AC service", date: "2026-06-10", km: null, cost_bdt: "4500.00" },
    ],
  },
  {
    id: "V26",
    owner_id: "O26",
    model: "Honda Accord",
    plate: "Dhaka Metro Ba 33-2211",
    odometer_readings: [
      { date: "2026-06-25", km: 97543 },
      { date: "2026-07-30", km: 99876 },
      { date: "2026-08-30", km: 102103 },
    ],
    service_items: [
      { name: "Fitness certificate", rule: "fixed_date", due_date: "2027-02-28", cost_bdt: "2500.00" },
      { name: "Coolant", rule: "period_months", every_months: 12, cost_bdt: "1800.00" },
      { name: "Timing belt", rule: "distance_km", every_km: 80000, cost_bdt: "15000.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
    ],
    service_history: [
      { item: "Timing belt", date: "2026-01-15", km: 22103, cost_bdt: "15000.00" },
      { item: "Engine oil", date: "2026-06-01", km: null, cost_bdt: "3500.00" },
      { item: "Coolant", date: "2026-07-10", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V27",
    owner_id: "O27",
    model: "Toyota Wish",
    plate: "Dhaka Metro Ga 88-4455",
    odometer_readings: [
      { date: "2026-07-20", km: 134567 },
      { date: "2026-08-30", km: 137234 },
    ],
    service_items: [
      { name: "Tax token", rule: "fixed_date", due_date: "2026-10-20", cost_bdt: "6500.00" },
      { name: "AC service", rule: "period_months", every_months: 12, cost_bdt: "4500.00" },
      { name: "Spark plugs", rule: "distance_km", every_km: 20000, cost_bdt: "2400.00" },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-04-25", km: 117234, cost_bdt: "2400.00" },
      { item: "AC service", date: "2026-08-05", km: null, cost_bdt: "4500.00" },
    ],
  },
  {
    id: "V28",
    owner_id: "O01",
    model: "Suzuki Wagon R",
    plate: "Dhaka Metro Kha 55-6677",
    odometer_readings: [
      { date: "2026-06-15", km: 62345 },
      { date: "2026-07-22", km: 64789 },
      { date: "2026-08-30", km: 67102 },
    ],
    service_items: [
      { name: "Insurance", rule: "fixed_date", due_date: "2026-09-30", cost_bdt: "12000.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Air filter", rule: "period_months", every_months: 6, cost_bdt: "1200.00" },
      { name: "Tyres", rule: "distance_km", every_km: 40000, cost_bdt: "32000.00" },
    ],
    service_history: [
      { item: "Tyres", date: "2026-01-10", km: 27102, cost_bdt: "32000.00" },
      { item: "Air filter", date: "2026-05-15", km: null, cost_bdt: "1200.00" },
      { item: "Engine oil", date: "2026-08-01", km: null, cost_bdt: "3500.00" },
    ],
  },
  {
    id: "V29",
    owner_id: "O02",
    model: "Toyota RAV4",
    plate: "Dhaka Metro Ba 77-8899",
    odometer_readings: [
      { date: "2026-05-10", km: 108234 },
      { date: "2026-06-20", km: 111567 },
      { date: "2026-07-28", km: 114203 },
      { date: "2026-08-30", km: 116890 },
    ],
    service_items: [
      { name: "Fitness certificate", rule: "fixed_date", due_date: "2026-11-10", cost_bdt: "2500.00" },
      { name: "Battery warranty", rule: "fixed_date", due_date: "2026-12-25", cost_bdt: "9000.00" },
      { name: "Coolant", rule: "period_months", every_months: 12, cost_bdt: "1800.00" },
      { name: "Brake pads", rule: "distance_km", every_km: 10000, cost_bdt: "6000.00" },
    ],
    service_history: [
      { item: "Brake pads", date: "2026-04-05", km: 106890, cost_bdt: "6000.00" },
      { item: "Coolant", date: "2026-06-15", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V30",
    owner_id: "O03",
    model: "Honda CR-V",
    plate: "Dhaka Metro Cha 11-2233",
    odometer_readings: [
      { date: "2026-07-01", km: 89123 },
      { date: "2026-08-15", km: 91876 },
      { date: "2026-08-30", km: 92945 },
    ],
    service_items: [
      { name: "Tax token", rule: "fixed_date", due_date: "2026-09-05", cost_bdt: "6500.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Spark plugs", rule: "distance_km", every_km: 20000, cost_bdt: "2400.00" },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-02-20", km: 72945, cost_bdt: "2400.00" },
      { item: "Engine oil", date: "2026-07-10", km: null, cost_bdt: "3500.00" },
    ],
  },
  {
    id: "V31",
    owner_id: "O04",
    model: "Nissan March",
    plate: "Dhaka Metro Ga 99-0011",
    odometer_readings: [
      { date: "2026-06-10", km: 73456 },
      { date: "2026-07-15", km: 75892 },
      { date: "2026-08-30", km: 78534 },
    ],
    service_items: [
      { name: "Insurance", rule: "fixed_date", due_date: "2027-03-20", cost_bdt: "12000.00" },
      { name: "AC service", rule: "period_months", every_months: 12, cost_bdt: "4500.00" },
      { name: "Timing belt", rule: "distance_km", every_km: 80000, cost_bdt: "15000.00" },
      { name: "Air filter", rule: "period_months", every_months: 6, cost_bdt: "1200.00" },
    ],
    service_history: [
      { item: "Timing belt", date: "2026-05-01", km: 0, cost_bdt: "15000.00" },
      { item: "AC service", date: "2026-06-20", km: null, cost_bdt: "4500.00" },
      { item: "Air filter", date: "2026-07-25", km: null, cost_bdt: "1200.00" },
    ],
  },
  {
    id: "V32",
    owner_id: "O05",
    model: "Toyota Prius",
    plate: "Dhaka Metro Kha 22-4466",
    odometer_readings: [
      { date: "2026-05-20", km: 128934 },
      { date: "2026-07-05", km: 132456 },
      { date: "2026-08-30", km: 136127 },
    ],
    service_items: [
      { name: "Fitness certificate", rule: "fixed_date", due_date: "2026-10-15", cost_bdt: "2500.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Coolant", rule: "period_months", every_months: 12, cost_bdt: "1800.00" },
      { name: "Brake pads", rule: "distance_km", every_km: 10000, cost_bdt: "6000.00" },
    ],
    service_history: [
      { item: "Brake pads", date: "2026-03-15", km: 126127, cost_bdt: "6000.00" },
      { item: "Engine oil", date: "2026-06-10", km: null, cost_bdt: "3500.00" },
      { item: "Coolant", date: "2026-07-20", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V33",
    owner_id: "O06",
    model: "Mitsubishi Outlander",
    plate: "Dhaka Metro Ba 44-5566",
    odometer_readings: [
      { date: "2026-07-10", km: 94567 },
      { date: "2026-08-30", km: 97834 },
    ],
    service_items: [
      { name: "Tax token", rule: "fixed_date", due_date: "2026-11-30", cost_bdt: "6500.00" },
      { name: "Battery warranty", rule: "fixed_date", due_date: "2027-01-15", cost_bdt: "9000.00" },
      { name: "AC service", rule: "period_months", every_months: 12, cost_bdt: "4500.00" },
      { name: "Tyres", rule: "distance_km", every_km: 40000, cost_bdt: "32000.00" },
    ],
    service_history: [
      { item: "Tyres", date: "2026-03-20", km: 57834, cost_bdt: "32000.00" },
      { item: "AC service", date: "2026-08-10", km: null, cost_bdt: "4500.00" },
    ],
  },
  {
    id: "V34",
    owner_id: "O07",
    model: "Honda Civic",
    plate: "Dhaka Metro Cha 88-7766",
    odometer_readings: [
      { date: "2026-06-01", km: 81234 },
      { date: "2026-07-12", km: 83891 },
      { date: "2026-08-30", km: 86723 },
    ],
    service_items: [
      { name: "Insurance", rule: "fixed_date", due_date: "2026-10-25", cost_bdt: "12000.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Spark plugs", rule: "distance_km", every_km: 20000, cost_bdt: "2400.00" },
      { name: "Air filter", rule: "period_months", every_months: 6, cost_bdt: "1200.00" },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-01-30", km: 66723, cost_bdt: "2400.00" },
      { item: "Air filter", date: "2026-05-15", km: null, cost_bdt: "1200.00" },
      { item: "Engine oil", date: "2026-08-05", km: null, cost_bdt: "3500.00" },
    ],
  },
  {
    id: "V35",
    owner_id: "O08",
    model: "Toyota Camry",
    plate: "Dhaka Metro Ga 55-3322",
    odometer_readings: [
      { date: "2026-05-25", km: 115678 },
      { date: "2026-07-08", km: 119234 },
      { date: "2026-08-30", km: 123045 },
    ],
    service_items: [
      { name: "Fitness certificate", rule: "fixed_date", due_date: "2027-01-20", cost_bdt: "2500.00" },
      { name: "Coolant", rule: "period_months", every_months: 12, cost_bdt: "1800.00" },
      { name: "Timing belt", rule: "distance_km", every_km: 80000, cost_bdt: "15000.00" },
    ],
    service_history: [
      { item: "Timing belt", date: "2026-02-10", km: 43045, cost_bdt: "15000.00" },
      { item: "Coolant", date: "2026-06-20", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V36",
    owner_id: "O09",
    model: "Nissan Juke",
    plate: "Dhaka Metro Kha 66-8877",
    odometer_readings: [
      { date: "2026-07-01", km: 76543 },
      { date: "2026-08-15", km: 79012 },
      { date: "2026-08-30", km: 80234 },
    ],
    service_items: [
      { name: "Tax token", rule: "fixed_date", due_date: "2026-09-20", cost_bdt: "6500.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Brake pads", rule: "distance_km", every_km: 10000, cost_bdt: "6000.00" },
    ],
    service_history: [
      { item: "Brake pads", date: "2026-04-15", km: 70234, cost_bdt: "6000.00" },
      { item: "Engine oil", date: "2026-07-25", km: null, cost_bdt: "3500.00" },
    ],
  },
  {
    id: "V37",
    owner_id: "O10",
    model: "Suzuki Ertiga",
    plate: "Dhaka Metro Ba 11-9988",
    odometer_readings: [
      { date: "2026-06-10", km: 91234 },
      { date: "2026-07-20", km: 94567 },
      { date: "2026-08-30", km: 97890 },
    ],
    service_items: [
      { name: "Insurance", rule: "fixed_date", due_date: "2026-12-10", cost_bdt: "12000.00" },
      { name: "AC service", rule: "period_months", every_months: 12, cost_bdt: "4500.00" },
      { name: "Air filter", rule: "period_months", every_months: 6, cost_bdt: "1200.00" },
      { name: "Tyres", rule: "distance_km", every_km: 40000, cost_bdt: "32000.00" },
    ],
    service_history: [
      { item: "Tyres", date: "2026-01-25", km: 57890, cost_bdt: "32000.00" },
      { item: "Air filter", date: "2026-04-10", km: null, cost_bdt: "1200.00" },
      { item: "AC service", date: "2026-07-05", km: null, cost_bdt: "4500.00" },
    ],
  },
  {
    id: "V38",
    owner_id: "O11",
    model: "Toyota Avanza",
    plate: "Dhaka Metro Cha 99-1100",
    odometer_readings: [
      { date: "2026-05-15", km: 102456 },
      { date: "2026-06-30", km: 105789 },
      { date: "2026-08-10", km: 108934 },
      { date: "2026-08-30", km: 110567 },
    ],
    service_items: [
      { name: "Fitness certificate", rule: "fixed_date", due_date: "2026-11-05", cost_bdt: "2500.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Coolant", rule: "period_months", every_months: 12, cost_bdt: "1800.00" },
      { name: "Spark plugs", rule: "distance_km", every_km: 20000, cost_bdt: "2400.00" },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-03-05", km: 90567, cost_bdt: "2400.00" },
      { item: "Engine oil", date: "2026-06-15", km: null, cost_bdt: "3500.00" },
      { item: "Coolant", date: "2026-08-01", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V39",
    owner_id: "O12",
    model: "Honda Insight",
    plate: "Dhaka Metro Ga 33-5544",
    odometer_readings: [
      { date: "2026-07-05", km: 87234 },
      { date: "2026-08-30", km: 90678 },
    ],
    service_items: [
      { name: "Tax token", rule: "fixed_date", due_date: "2027-02-15", cost_bdt: "6500.00" },
      { name: "Battery warranty", rule: "fixed_date", due_date: "2026-10-10", cost_bdt: "9000.00" },
      { name: "AC service", rule: "period_months", every_months: 12, cost_bdt: "4500.00" },
      { name: "Brake pads", rule: "distance_km", every_km: 10000, cost_bdt: "6000.00" },
    ],
    service_history: [
      { item: "Brake pads", date: "2026-05-10", km: 80678, cost_bdt: "6000.00" },
      { item: "AC service", date: "2026-07-20", km: null, cost_bdt: "4500.00" },
    ],
  },
  {
    id: "V40",
    owner_id: "O13",
    model: "Nissan Kicks",
    plate: "Dhaka Metro Kha 77-2233",
    odometer_readings: [
      { date: "2026-06-20", km: 69123 },
      { date: "2026-07-30", km: 71890 },
      { date: "2026-08-30", km: 74456 },
    ],
    service_items: [
      { name: "Insurance", rule: "fixed_date", due_date: "2026-11-20", cost_bdt: "12000.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Air filter", rule: "period_months", every_months: 6, cost_bdt: "1200.00" },
      { name: "Timing belt", rule: "distance_km", every_km: 80000, cost_bdt: "15000.00" },
    ],
    service_history: [
      { item: "Timing belt", date: "2026-06-01", km: 0, cost_bdt: "15000.00" },
      { item: "Engine oil", date: "2026-07-15", km: null, cost_bdt: "3500.00" },
      { item: "Air filter", date: "2026-08-10", km: null, cost_bdt: "1200.00" },
    ],
  },
  {
    id: "V41",
    owner_id: "O14",
    model: "Toyota Rush",
    plate: "Dhaka Metro Ba 88-6655",
    odometer_readings: [
      { date: "2026-05-10", km: 112345 },
      { date: "2026-06-25", km: 116789 },
      { date: "2026-08-05", km: 120234 },
      { date: "2026-08-30", km: 122890 },
    ],
    service_items: [
      { name: "Fitness certificate", rule: "fixed_date", due_date: "2026-09-25", cost_bdt: "2500.00" },
      { name: "Coolant", rule: "period_months", every_months: 12, cost_bdt: "1800.00" },
      { name: "Spark plugs", rule: "distance_km", every_km: 20000, cost_bdt: "2400.00" },
    ],
    service_history: [
      { item: "Spark plugs", date: "2026-01-20", km: 102890, cost_bdt: "2400.00" },
      { item: "Coolant", date: "2026-05-25", km: null, cost_bdt: "1800.00" },
    ],
  },
  {
    id: "V42",
    owner_id: "O15",
    model: "Mitsubishi Xpander",
    plate: "Dhaka Metro Cha 44-7788",
    odometer_readings: [
      { date: "2026-07-01", km: 95678 },
      { date: "2026-08-15", km: 98934 },
      { date: "2026-08-30", km: 100234 },
    ],
    service_items: [
      { name: "Tax token", rule: "fixed_date", due_date: "2026-10-05", cost_bdt: "6500.00" },
      { name: "AC service", rule: "period_months", every_months: 12, cost_bdt: "4500.00" },
      { name: "Engine oil", rule: "period_months", every_months: 3, cost_bdt: "3500.00" },
      { name: "Tyres", rule: "distance_km", every_km: 40000, cost_bdt: "32000.00" },
    ],
    service_history: [
      { item: "Tyres", date: "2026-02-15", km: 60234, cost_bdt: "32000.00" },
      { item: "Engine oil", date: "2026-06-20", km: null, cost_bdt: "3500.00" },
      { item: "AC service", date: "2026-08-01", km: null, cost_bdt: "4500.00" },
    ],
  },
];

export const SEED_CASE_DATA: CaseData = {
  case_id: "PUB-01",
  today: "2026-08-30",
  owners: SEED_OWNERS,
  vehicles: SEED_VEHICLES,
};

export function getSeedData(): CaseData {
  return SEED_CASE_DATA;
}
