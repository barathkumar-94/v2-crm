const ROLE_ID = 'ROLE_ID';

export const getUserRoleFromSession = () => {
  let roleId = window.sessionStorage.getItem(ROLE_ID);
  return roleId ?? null;
};

export const setUserRoleInSession = (roleId: string) => {
  window.sessionStorage.setItem(ROLE_ID, roleId);
};
