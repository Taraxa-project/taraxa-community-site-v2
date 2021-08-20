import { NavLink as Link } from "react-router-dom";
import './navlink.scss';

interface NavLinkProps {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  to: string;
  subItem?: boolean;
}

const NavLink = ({Icon, label, to, subItem}: NavLinkProps) => {
  return (
    <div className="navlink">
      {Icon && <Icon/>}
      <Link className="link" exact to={to}>{label}</Link>
    </div>
  )
}

export default NavLink