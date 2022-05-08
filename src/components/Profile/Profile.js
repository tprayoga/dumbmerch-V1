import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Merch from "../assets/Frame.png"

const Profile = () => {
  return (
    <Col md="6">
    <div className="text-header-product mb-4">My Profile</div>
    <Row>
      <Col md="6">
        <img
        //   src={profile?.image ? profile.image : imgBlank}
        src={Merch}
          className="img-fluid rounded"
          alt="profile"
        />
      </Col>
      <Col md="6">
        <div className="profile-header">Name</div>
        <div className="profile-content">
            {/* {state.user.name} */} Nama
            </div>

        <div className="profile-header">Email</div>
        <div className="profile-content">
            {/* {state.user.email} */} Email
            </div>

        <div className="profile-header">Phone</div>
        <div className="profile-content"> 0877565
          {/* {profile?.phone ? profile?.phone : "-"} */}
        </div>

        <div className="profile-header">Gender</div>
        <div className="profile-content"> Male
          {/* {profile?.gender ? profile?.gender : "-"} */}
        </div>

        <div className="profile-header">Address</div>
        <div className="profile-content"> lorem
          {/* {profile?.address ? profile?.address : "-"} */}
        </div>
      </Col>
    </Row>
  </Col>
  )
}

export default Profile
