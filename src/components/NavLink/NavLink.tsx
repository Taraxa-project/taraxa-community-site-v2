import { NavLink as Link, NavLinkProps as LinkProps } from "react-router-dom";
import './navlink.scss';

interface NavLinkProps extends LinkProps {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  subItem?: boolean;
}

const NavLink = ({ Icon, label, ...props }: NavLinkProps) => {
  return (
    <div className="navlink">
      {Icon && <Icon />}
      <Link className="link" exact {...props}>{label}</Link>
    </div>
  )
}

export default NavLink