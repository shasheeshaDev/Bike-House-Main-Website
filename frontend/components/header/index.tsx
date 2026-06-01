import { fetchSanityHeader } from "@/sanity/lib/fetch";
import Navbar from "./navbar-1";

// Logo and phone are now included in the header GROQ query,
// so a separate settings fetch is no longer needed.
export default async function Header() {
  const navigation = await fetchSanityHeader();
  return <Navbar navigation={navigation} />;
}
