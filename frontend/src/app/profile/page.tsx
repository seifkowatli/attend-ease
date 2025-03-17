import { fetchCurrentUser } from "../lib/session";
import { ProfileCard } from "./ProfileCard";

export default async function Profile() {
  const user = await fetchCurrentUser();
  return (
    <div>
      <ProfileCard user={user}/>
    </div>
  );
}
