const items = [
  {
    id: 1,
    name: "Ford",
    model: "Focus",
    year: 2023
  },
  {
    id: 2,
    name: "BMW",
    model: "3 Series",
    year: 2021
  },
  {
    id: 3,
    name: "Volvo",
    model: "XC90",
    year: 2022
  },
  {
    id: 4,
    name: "Volkswagen",
    model: "Golf",
    year: 2020
  },
  {
    id: 5,
    name: "Toyota",
    model: "Camry",
    year: 2021
  },
];

const getAll = () => {
  return items;
}
const getItem = (id) => {
  return items.find((item) => item.id === id);
};
export { getAll, getItem };