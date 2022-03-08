import HomeHeroes from "./heroes/HomeHeroes";
import OrderOnline from "./order-online/OrderOnline";
import ResponsiveMap from "./responsiveMap/ResponsiveMap";

export default function HomeComponent(params) {
  return (
    <>
      <HomeHeroes />
      <OrderOnline />
      <ResponsiveMap />
    </>
  );
}
