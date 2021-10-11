import { Text, Tooltip } from "@taraxa_project/taraxa-ui";

import InfoIcon from '../../assets/icons/info';

import './title.scss';

interface TitleProps {
  title: string;
  subtitle?: string;
  tooltip?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size?: 'default' | 'medium';
}

const Title = ({ title, subtitle, tooltip, Icon, size }: TitleProps) => {
  return (
    <div className="page-title">
      <div className="page-title-container">
        {Icon && <div className="page-title-icon"><Icon /></div>}
        <Text label={title} variant="h1" color="primary" className={size === 'medium' ? 'page-medium-title-main' : 'page-title-main' } />
        {tooltip && <Tooltip className="page-title-tooltip" title="Test" Icon={InfoIcon} />}
      </div>
      {subtitle && <Text label={subtitle} variant="body2" color="textSecondary" className="page-title-subtitle" />}
    </div>
  );
}

export default Title;