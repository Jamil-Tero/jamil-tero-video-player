import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Add } from '@material-ui/icons';
import  validateUrl  from './Common';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: '85vw',
    margin: 'auto',
    marginBottom: 25,
    top: 15,
    right: 0,
    bottom: 10,
    left: 0
  },
});

class VideoInput extends React.Component {
  state = {
    videoUrl: '',
    setUrl: false,
  };

  

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  //Description: Validat input value as url and pass it to parent on success.
  handleClickLoadVideo = () => {
    this.setState(state => ({ setUrl: !state.setUrl }));
    if (validateUrl(this.state.videoUrl))
      this.props.onVideoLoad(this.state.videoUrl);
    else
    {
      //TO DO: Change border color with invalid URL message
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          id="outlined-adornment-videoUrl"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.setUrl ? 'text' : 'video Url'}
          label="video Url"
          value={this.state.videoUrl}
          onChange={this.handleChange('videoUrl')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle videoUrl visibility"
                  onClick={this.handleClickLoadVideo}
                >
                <Add></Add>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}

VideoInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoInput);
