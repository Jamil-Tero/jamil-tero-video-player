import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import VideoCamIcon from '@material-ui/icons/Videocam';
import './App.css';
import { Tooltip } from "@material-ui/core";

class ViewHistoryItem extends React.Component {
    state = {
        videoUrl: '',
      };
    constructor(props) {
        super(props);
        this.text = this.props.text;
        this.date =    this.props.time;
        
    }
    //Description: Used to pass video url to parent component.
    handleClickOldVideo = () => {
        this.props.onLoadOldVideo(this.text);
      };
    
    render() {
        return (<Tooltip  title="Click to view"><ListItem text={this.text} date={this.date} onClick={this.handleClickOldVideo}  >
            <ListItemAvatar>
              <Avatar>
                <VideoCamIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
             
              text={this.text} date={this.date}
              primary={this.text}
              secondary={this.date}
              className="urltext"
            />
            {/* TO DO: add delete from history */}
            {/* <ListItemSecondaryAction>
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction> */}
          </ListItem>
          </Tooltip>
        )
    }
}

export default (ViewHistoryItem);