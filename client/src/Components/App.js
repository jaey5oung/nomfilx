import React, { Component } from "react";
import Router from "Components/Router";
import GlobalStyles from "Components/GlobalStyles";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import {
//   faArrowLeft,
//   faArrowRight,
//   faHome,
//   faCalendar,
//   faPoll,
//   faHeart,
//   faDotCircle,
//   faStar as fasFaStar,
//   faSearch,
//   faChevronRight,
//   faChevronLeft,
//   faLink,
//   faPlay,
// } from "@fortawesome/free-solid-svg-icons";
// import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";

// library.add(
//   fab,
//   faArrowLeft,
//   faArrowRight,
//   faHome,
//   faCalendar,
//   faPoll,
//   faHeart,
//   faDotCircle,
//   fasFaStar,
//   farFaStar,
//   faSearch,
//   faChevronRight,
//   faChevronLeft,
//   faLink,
//   faPlay
// );

class App extends Component {
  render() {
    return (
      <>
        {" "}
        <Router /> <GlobalStyles />
      </>
    );
  }
}

export default App;
