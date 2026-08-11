import { getPublications } from "@/lib/publications";
import PanelDashboard from "@/components/panel/PanelDashboard";

export default async function PanelPage() {
  const publications = await getPublications();
  return <PanelDashboard initialPublications={publications} />;
}