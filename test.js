var filter = {
  address: 'fgdfgdf',
  // age: 28
  // name: 'Mark'
};
var users = [{
    name: 'John',
    email: 'johnson@mail.com',
    age: 25,
    address: 'USA'
  },
  {
    name: 'Tom',
    email: 'tom@mail.com',
    age: 35,
    address: 'England'
  },
  {
    name: 'Mark',
    email: 'mark@mail.com',
    age: 28,
    address: 'England'
  },
  {
    name: 'Foo',
    email: 'foo@mail.com',
    age: 28,
    address: 'England'
  }
];


users= users.filter(function(item) {
  /*Object.keys(filter).forEach(key => {
    console.log(key)
    if (item[key] === undefined || !item[key].includes(filter[key]))
      return false;
  })*/
  for (var key in filter) {
    console.log(key);
    if (item[key] === undefined || !item[key].includes(filter[key]))
      return false;
  }
  return true;
});

console.log(users);
