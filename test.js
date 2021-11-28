const ids = [{  id: '1', name : 'admin' }];

const permissions = [
  {  id: '1', name : 'admin', status: 'active' },
  {  id: '2', name : 'user', status: 'active' },
  {  id: '3', name : 'guest', status: 'active' },
]

function foo() {
  const permissionsIds = ids.map(id => id.id);
  const findPermissions = permissions.filter(permission => permissionsIds.includes(permission.id));
  const inactivePermissions = findPermissions.map(permission => {
    return { ...permission, status: 'inactive' }
  });

  return inactivePermissions;
}

console.log(foo());

const usersId = [{  id: '1', name : 'admin', status: 'inactive' }];

const users = [
  {  id: '1', name : 'admin', status: 'active' },
  {  id: '2', name : 'user', status: 'active' },
  {  id: '3', name : 'guest', status: 'active' },
]

console.log(users.concat(usersId));
