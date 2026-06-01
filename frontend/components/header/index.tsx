import {
  fetchSanityBanner,
  fetchSanitySettings,
  fetchSanityHeader,
} from "@/sanity/lib/fetch";
import Navbar1 from "./navbar-1";

export default async function Header() {
  const banner = await fetchSanityBanner();
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityHeader();

  return (
    <>
      <Navbar1 settings={settings} navigation={navigation} />
    </>
  );
}
