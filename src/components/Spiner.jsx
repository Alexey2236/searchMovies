import { RotatingLines } from "react-loader-spinner";
function Spiner() {
  return (
    <div className="container-spiner">
      <RotatingLines
        strokeColor="#009688"
        strokeWidth="5"
        animationDuration="0.75"
        width="250"
        visible={true}
      />
    </div>
  );
}

export { Spiner };
