import { useParams } from "react-router";
import Menu from "../menu/Menu";

export default function MyComment() {
  const params = useParams() as { intraId: string };

  return <div>
	  <Menu intraId={params.intraId}/>{params.intraId}</div>;
}
