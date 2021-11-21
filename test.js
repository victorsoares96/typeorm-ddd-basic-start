const ids = ['1', '2', '3'];

const permissions = [
  {  id: '1', name : 'admin' },
  {  id: '2', name : 'user' },
]

function foo() {
  const findPermissions = ids.map(id => permissions.find(permission => permission.id === id));
  if (findPermissions.some(el => !el)) return undefined;
  return findPermissions;
}

console.log(foo());
