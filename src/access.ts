export default (initialState: API.UserInfo) => {
  // Here, define the permissions in the project according to the initialization data and manage them uniformly
  // Reference Documentation https://umijs.org/docs/max/access
  const canSeeAdmin = !!(
    initialState && initialState.name !== 'dontHaveAccess'
  );
  return {
    canSeeAdmin,
  };
};
