export default {
  auth: {
    isLoading: false,
    isAuth: false,
    currentUser: {}
  },
  signup: {
    isCreating: false,
    error: {}
  },
  calendar: {
    months: null,
    days: null,
    month: null,
    today: null
  },
  bills: {
    bills: [],
    isFetching: false
  }
};
