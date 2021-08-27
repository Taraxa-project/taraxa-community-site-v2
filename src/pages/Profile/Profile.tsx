import React, { useState } from 'react';
import './profile.scss';
import { menu } from '../../global/globalVars';
import { Sidebar, BaseCard, Text, DataCard, InputField, Chip, ProfileCard, Button } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Profile() {

  const buttons = <div className="buttonsContainer"><Button color="primary" variant="outlined" label="Edit Profile"/>
                    <Button color="primary" variant="text" label="Log out"/></div>

  return (
    <>
      <Header />
      <div className="home">
        <Sidebar disablePadding={true} dense={true} items={menu} className="claim-sidebar" />
        <div className="claim-content">
          <Text label="My profile" variant="h4" color="primary" className="claim-title"/>
          
          <div className="cardContainer">
            <ProfileCard username="Test 1" email="test@test.com" wallet="0x2612b77E5ee1a5feeDdD5eC08731749bC2217F54" Icon={TaraxaIcon} buttonOptions={buttons}/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile;
