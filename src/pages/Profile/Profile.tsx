import React, { useState } from 'react';
import './profile.scss';
import { menu } from '../../global/globalVars';
import { Sidebar, ProfileBasicCard, Text, ProfileCard, Button, LinkedCards } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import KYCIcon from '../../assets/icons/kyc';

function Profile() {

  const buttons = <div className="buttonsContainer"><Button color="primary" variant="outlined" label="Edit Profile"/>
                    <Button color="primary" variant="text" label="Log out"/></div>
  const approvedContent = <>
                            <div className="contentGrid">
                              <div className="gridLeft">
                                <Text label="Incentivized testnet" className="profileContentTitle" variant="body2" color="primary" />
                                <Text label="number of points " variant="body2" color="textSecondary" />
                              </div>
                              <div className="gridRight">
                                <Text label="3 weeks ago" variant="body2" color="textSecondary" />
                              </div> 
                            </div>
                            <div className="contentGrid">
                              <div className="gridLeft">
                                <Text label="Bug bounty" className="profileContentTitle" variant="body2" color="primary" />
                                <Text label="number of points " variant="body2" color="textSecondary" />
                              </div>
                              <div className="gridRight">
                                <Text label="2 months ago" variant="body2" color="textSecondary" />
                              </div>
                            </div> 
                          </>
  const reviewContent = <div>
                      <Text label="No submissions yet" className="noContent" variant="body2" color="textSecondary" />
                   </div>
  const rejectedContent = <div>
                    <Text label="No submissions yet" className="noContent" variant="body2" color="textSecondary" />
                 </div>

  return (
    <>
      <Header />
      <div className="home">
        <Sidebar disablePadding={true} dense={true} items={menu} className="claim-sidebar" />
        <div className="claim-content">
          <Text label="My profile" variant="h4" color="primary" className="claim-title"/>
          
          <div className="cardContainer">
            <ProfileCard username="Test 1" email="test@test.com" wallet="0x2612b77E5ee1a5feeDdD5eC08731749bC2217F54" Icon={TaraxaIcon} buttonOptions={buttons}/>
            <ProfileBasicCard title="KYC" description="Not submitted" Icon={KYCIcon}/>
            <ProfileBasicCard title="Wallet Balance" description="TARA" value="41,234"/>
          </div>
          <div className="cardContainer">
            <LinkedCards rejectedContent={rejectedContent} approvedContent={approvedContent} reviewContent={reviewContent} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile;
