import React, { useState, useRef, useEffect } from 'react';
import './profile.scss';
import { menu } from '../../global/globalVars';
import { Sidebar, ProfileBasicCard, Text, ProfileCard, Button, LinkedCards } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import KYCIcon from '../../assets/icons/kyc';
import { useMediaQuery } from 'react-responsive';
import {store, useGlobalState} from 'state-pool';


const Profile = () => {

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");
  
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                updateSidebarOpened(false);
            }
        }
  
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

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
      <div className={isMobile ? "mobile-profile" : "profile"}>
        <div ref={wrapperRef}><Sidebar disablePadding={true} dense={true} items={menu} className="profile-sidebar" open={sidebarOpened} onClose={updateSidebarOpened} /></div>
        <div className="profile-content">
          <Text label="My profile" variant="h4" color="primary" className="profile-title"/>
          
          <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
            <ProfileCard username="Test 1" email="test@test.com" wallet="0x2612b77E5ee1a5feeDdD5eC08731749bC2217F54" Icon={TaraxaIcon} buttonOptions={buttons}/>
            <ProfileBasicCard title="KYC" description="Not submitted" Icon={KYCIcon}/>
            <ProfileBasicCard title="Wallet Balance" description="TARA" value="41,234"/>
          </div>
          <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
            <LinkedCards rejectedContent={rejectedContent} approvedContent={approvedContent} reviewContent={reviewContent} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile;
