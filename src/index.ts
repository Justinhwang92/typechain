const sayHi = (name: string, age: number, gender?): string => {
  return `hello ${name}, you are ${age}, you are ${gender}`;
};

console.log(sayHi("Justin", 29, "male"));

export {};
