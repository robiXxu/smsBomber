import Permissions from 'react-native-permissions';
import { each, omit } from 'lodash';

const checkPermissionsAndRequest = permissions => {
  if (!permissions.length) return;
  const proms = [];
  const permissionsToOmit = [];

  Permissions.checkMultiple(permissions).then(checkResponse => {
    each(checkResponse, (response, permission) => {
      if (response !== 'authorized') {
        proms.push(Permissions.check(permission));
      } else {
        permissionsToOmit.push(permissionsToOmit);
      }
    });

    if (proms.length) {
      checkPermissionsAndRequest(omit(permissions, permissionsToOmit));
    }
  });
};

export default checkPermissionsAndRequest;
