import { Text, Tooltip } from "@taraxa_project/taraxa-ui";

import InfoIcon from '../../assets/icons/info';

import './title.scss';

interface TitleProps {
  title: string;
  subtitle?: string;
  tooltip?: string;
}

const Title = ({ title, subtitle, tooltip }: TitleProps) => {
  return (
    <div className="page-title">
      <div className="page-title-container">
        <Text label={title} variant="h1" color="primary" className="page-title-main" />
        {tooltip && <Tooltip className="page-title-tooltip" title="Test" Icon={InfoIcon} />}
      </div>
      {subtitle && <Text label={subtitle} variant="body2" color="textSecondary" className="page-title-subtitle" />}
    </div>
  );
}

export default Title;