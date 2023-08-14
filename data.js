const items = [
  {
    id: 1,
    name: "Car 1",
    make: "Ford",
    model: "Focus",
    year: 2023
  },
  {
    id: 2,
    name: "Car 2",
    make: "BMW",
    model: "3 Series",
    year: 2021
  },
  {
    id: 3,
    name: "Car 3",
    make: "Volvo",
    model: "XC90",
    year: 2022
  },
  {
    id: 4,
    name: "Car 4",
    make: "Volkswagen",
    model: "Golf",
    year: 2020
  },
  {
    id: 5,
    name: "Car 5",
    make: "Toyota",
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