export const FACTORY_DEPARTMENTS = [
  { name: "Sales & Marketing", value: 1 },
  { name: "Design & Evaluation", value: 2 },
  { name: "Production", value: 3 },
  { name: "Packaging & Shipping", value: 4 },
];

export const SALARY_TYPES = [
  { name: "Type 1 - By hourly wage", value: 1 },
  { name: "Type 2 - Fixed each month", value: 2 },
  { name: "Type 3 - Full pay", value: 3 },
];

export const currFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
