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
  ui: {
    modalOpen: false
  },
  calendar: {
    months: null,
    days: null,
    month: null,
    today: null
  },
  bills: {
    bills: [],
    isCreating: false,
    isFetching: false
  }
};
