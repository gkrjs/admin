// import React from "react";
// import { WindMillLoading } from "react-loadingg";
// const PageLoading = () => (
//   <WindMillLoading speed={100} color="blue" style={{}} size="100px" />
// );
// export default PageLoading;
import React from "react";
import { BoxLoading } from "react-loadingg";
const Container = () => (
  <BoxLoading
    speed={0.7}
    color="#d500f9"
    style={{ margin: "auto", position: "absolute", inset: "0px" }}
    size="30px"
  />
);
export default Container;
