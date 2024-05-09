import { useState } from "react";
import { Row, Col, Card, Switch } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";

import BgProfile from "../../assets/sign-in/bg-profile.jpg";
import profilavatar from "../../assets/sign-in/face-1.jpg";
import convesionImg from "../../assets/sign-in/face-3.jpg";
import convesionImg2 from "../../assets/sign-in/face-4.jpg";
import convesionImg3 from "../../assets/sign-in/face-5.jpeg";
import convesionImg4 from "../../assets/sign-in/face-6.jpeg";
import convesionImg5 from "../../assets/sign-in/face-2.jpg";
import project1 from "../../assets/sign-in/home-decor-1.jpeg";
import project2 from "../../assets/sign-in/home-decor-2.jpeg";
import project3 from "../../assets/sign-in/home-decor-3.jpeg";

function SettingsPage() {
  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  return (
    <>
      <Row justify="center" style={{ minHeight: "calc(80vh - 134px)" }}>
        <Col xs={24} sm={24} md={12}>
          <Card bordered={true} style={{ padding: "50px" }}>
            <h2 style={{ textAlign: "center", fontSize: "36px" }}>Settings</h2>
            <ul className="list settings-list" style={{ listStyle: "none", paddingInlineStart: "0" }}>
              <li>
                <h2 className="list-header text-sm text-muted" style={{ textAlign: "center" }}>ACCOUNT</h2>
              </li>
              <li style={{ fontSize: "30px" }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <span>Receive Email on Key Updates of Portfolio</span>
                  </Col>
                  <Col>
                    <Switch defaultChecked />
                  </Col>
                </Row>
              </li>
              <li style={{ fontSize: "30px" }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <span>Receive Email on Daily Updates of Portfolio</span>
                  </Col>
                  <Col>
                    <Switch />
                  </Col>
                </Row>
              </li>
              <li style={{ fontSize: "30px" }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <span>Receive Email on Daily Headlines Summary</span>
                  </Col>
                  <Col>
                    <Switch defaultChecked />
                  </Col>
                </Row>
              </li>
              <li>
                <h2></h2>
                <h2 className="list-header text-sm text-muted m-0" style={{ textAlign: "center" }}>APPLICATION</h2>
              </li>
              <li style={{ fontSize: "30px" }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <span>Receive Email on Application Updates</span>
                  </Col>
                  <Col>
                    <Switch defaultChecked />
                  </Col>
                </Row>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SettingsPage;
