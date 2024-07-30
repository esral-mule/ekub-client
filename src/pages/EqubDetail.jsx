import { useParams } from "react-router";
import DemoPage from "../components/equb/page";
import { NavLink } from "react-router-dom";

export default function EqubDetail() {
  let { id } = useParams();
  return (
    <div>
      <NavLink
        to={`/roundes/${id}`}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Roundes
      </NavLink>
      <DemoPage id={id} />
    </div>
  );
}
