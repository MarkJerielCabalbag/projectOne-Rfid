import {
  faCreditCard,
  faCreditCardAlt,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEnvelope,
  faHome,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="bg-primary text-white">
      <div className="container container-sm container-md container-lg p-5 h-100">
        <div className="d-sm-flex flex-sm-column d-md-flex flex-md-row align-items-md-center gap-4 border-bottom border-light pb-4">
          <img
            src="../src/assets/logo.png"
            className="img-fluid"
            alt=""
            style={{
              filter: "drop-shadow(3px 5px 10px yellow)",
              height: "100px",
              width: "100px",
            }}
          />
          <div>
            <h1 className="h5">Ilocos Sur Polytechnic State College</h1>
            <p>Radio Frequency Identification</p>
          </div>
        </div>
        <div className="container container-sm container-md container-lg">
          <div className="row row-12 row-cols-md-12 gap-3 mt-5 mb-5">
            <div className="col-12 col-sm-12 col-md-6">
              <h4>About</h4>
              <p
                className="text-justify fw-light"
                style={{ textAlign: "justify" }}
              >
                Crafted with passion and innovation, our <b>RFID solution</b> is
                the brainchild of the brilliant minds in BSIT 3A. Designed with
                <b>precision</b> and <b>dedication</b>, this system embodies the
                <b>creativity</b> and <b>expertise</b> of our student community.
                <b className="fst-italic">
                  With a focus on enhancing classroom security and
                  accessibility, every aspect of our solution reflects the
                  commitment and ingenuity of our team
                </b>
                .
              </p>
            </div>

            <div className="col">
              <h4>Developers</h4>
              <div className="d-flex flex-column">
                <div className="text-white link-underline link-underline-opacity-0">
                  {<FontAwesomeIcon icon={faUser} />} Mark Jeriel Cabalbag
                </div>
                <div className="text-white link-underline link-underline-opacity-0">
                  {<FontAwesomeIcon icon={faUser} />} Dran Leynard Gamoso
                </div>
                <div className="text-white link-underline link-underline-opacity-0">
                  {<FontAwesomeIcon icon={faUser} />} Jared Ellaisos
                </div>
                <div className="text-white link-underline link-underline-opacity-0">
                  {<FontAwesomeIcon icon={faUser} />} Ruvic Bacton
                </div>
                <div className="text-white link-underline link-underline-opacity-0">
                  {<FontAwesomeIcon icon={faUser} />} Shanne Cabotaje
                </div>
                <div className="text-white link-underline link-underline-opacity-0">
                  {<FontAwesomeIcon icon={faUser} />} Cyrell Corrales
                </div>
              </div>
            </div>

            <div className="col">
              <h4>Tabs</h4>
              <div className="d-flex flex-column">
                <Link
                  to="/dashboard/home"
                  className="text-white link-underline link-underline-opacity-0"
                >
                  {<FontAwesomeIcon icon={faHome} />} Home
                </Link>
                <Link
                  to="/dashboard/registered-card"
                  className="text-white link-underline link-underline-opacity-0"
                >
                  {<FontAwesomeIcon icon={faCreditCardAlt} />} Registered Card
                </Link>
              </div>
            </div>

            <div className="col">
              <h4>Contact</h4>
              <div className="d-flex flex-column">
                <div className="text-white link-underline link-underline-opacity-0">
                  {<FontAwesomeIcon icon={faPhone} />} 09393939
                </div>
                <div className="text-white link-underline link-underline-opacity-0">
                  {<FontAwesomeIcon icon={faEnvelope} />} ispsc@gmail.com
                </div>
              </div>
            </div>
          </div>
          <div className="border-top border-light text-center">
            <p className="fw-lighter mt-4">&copy;markjerielgcabalbag2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
