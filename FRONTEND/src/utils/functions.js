const token = localStorage.getItem("token");

const isLoggedIn = () => {
  if(token ==! undefined || token ==! null || token) {
    return true;
  } else {
    return false
  }
}

export default isLoggedIn;