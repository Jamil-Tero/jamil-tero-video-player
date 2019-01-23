import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ViewHistoryItem from './viewHistoryItem';
import './App.css';

const styles = theme => ({
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    float: 'none'
  }
});
//Description: Build history items.
function generate(element,arr) {
  return arr.map((value,index) =>
    React.cloneElement(element, {
      key: index, text : value.url
      , time : value.time
    })
  );
}

class ViewHistory extends React.Component {
  state = {
    dense: false
  };
  //Description: Used to pass video url to parent component.
  onLoadOldVideo = (itemurl) => {
    this.props.onLoadOldVideo(itemurl);
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    const { dense } = this.state;
    return (
      <div className="root">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              History
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate(
                 <ViewHistoryItem  onLoadOldVideo={this.onLoadOldVideo}></ViewHistoryItem>,this.props.history
                )}
              </List>
            </div>
          </Grid>
      </div>
    );
  }
}

ViewHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewHistory);
