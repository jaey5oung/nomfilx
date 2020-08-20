import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import { Avatar, Typography, Button } from "@material-ui/core";
import Portlet from "../../MyMovie/Sections/Portlet";
import PortletContent from "../../MyMovie/Sections/PortletContent";
import Dropzone from "react-dropzone";

// Component styles
import styles from "./styles";

class AccountProfile extends Component {
  render() {
    const { ap, classes, className, file, onUpload } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{ap && ap.name}</Typography>
              <Typography className={classes.emailText} variant="body1">
                {ap && ap.email}
              </Typography>
            </div>
          </div>
        </PortletContent>
      </Portlet>
    );
  }
}

export default withStyles(styles)(AccountProfile);
