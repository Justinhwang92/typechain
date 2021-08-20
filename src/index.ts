interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: "Justin",
  age: 29,
  gender: "male",
};

const sayHi = (person: Human): string => {
  return `hello ${person.name}, you are ${person.age}, you are ${person.gender}`;
};

console.log(sayHi(person));

export {};
