import { Footer as TFooter } from "@taraxa_project/taraxa-ui";
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import SendIcon from "../../assets/icons/send";
import TwitterIcon from "../../assets/icons/twitter";
import DiscordIcon from "../../assets/icons/discord";

const Footer = () => {
  return (
    <TFooter title="TARAXA" Icon={TaraxaIcon} description="Taraxa is a public ledger platform purpose-built for audit logging of informal transactions."
        links={[
          { label: 'Privacy Policy'},
          { label: 'Terms of Use'}
        ]}
        items={[
        { label: 'Send', Icon: <a href="https://twitter.com/taraxa_project" target="_blank" rel="noreferrer"><SendIcon/></a> },        
        { label: 'Twitter',  Icon: <a href="https://t.me/taraxa_project" target="_blank" rel="noreferrer"><TwitterIcon/></a> },
        { label: 'Discord',  Icon: <a href="https://discord.com/invite/WaXnwUb" target="_blank" rel="noreferrer"><DiscordIcon/></a> }
        ]}/>
  )
}

export default Footer;