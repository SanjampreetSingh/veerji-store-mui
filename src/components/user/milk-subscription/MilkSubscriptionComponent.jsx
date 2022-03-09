import UserHeroes from "./heroes/UserHeroes";

export default function MilkSubscriptionComponent(props) {
  const { user } = props;
  return (
    <>
      <UserHeroes user={user} />
    </>
  );
}
