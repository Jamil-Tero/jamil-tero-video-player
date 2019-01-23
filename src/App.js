import React, { Component } from 'react';
import './App.css';
import JamilAppBar from './AppBar';
import VideoInput from './videoInput';
import ViewHistory from './ViewHistory'
const videoBoxStyle = {
  width: '100%',
  height: '100%'
};




class App extends Component {
  componentDidMount(){
    document.title ="Jamil Video Player"
  }
  CurrentDate() {
    var date = new Date();
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);
    if (gg < 10)
        gg = "0" + gg;
    if (mm < 10)
        mm = "0" + mm;
    var cur_day = aaaa + "-" + mm + "-" + gg;
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();
    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;
    return cur_day + " " + hours + ":" + minutes + ":" + seconds;
}
  constructor(props) {
    super(props);
    var localhistory =[];
    var localvideoUrl = ''
    try {
      if (localStorage.hasOwnProperty('localhistory'));
      {
        let locallyStored = localStorage.getItem('localhistory');
        localhistory = JSON.parse(locallyStored);
        if (localhistory !== undefined && localhistory.length > 0)
        {
            localvideoUrl = localhistory[localhistory.length-1].url;
            if (localvideoUrl.indexOf('youtube') >0){
              localvideoUrl ="https://www.youtube.com/embed/"+ this.getYouTubeVideoId(localvideoUrl);
           }
        }
      }
    }
    catch {
      console.log('Couldn\'t load history');
    }
    this.state = { videoUrl : localvideoUrl, history : localhistory};
  //   this.state = { videoUrl : 'https://www.youtube.com/embed/rL8X2mlNHPM'
  //   //  'https://video.dtube.top/ipfs/QmfA1jdjQ77Mexmh85mCGWpJVNS4nozZLvFXcgPYxYKMoo'
  //   , history : [{ "url":'https://www.youtube.com/embed/rL8X2mlNHPM', "time": this.CurrentDate()}
  //   //, { "url":'https://www.youtube.com/watch?v=cm80MKn_ZQ8', "time": this.CurrentDate()}
  // ]
  //    };
  }
  getYouTubeVideoId = (url) => {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
  }
  validateUrl = (url) =>{
    var regExp =/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    // /(youtube|youtu|vimeo|dailymotion|kickstarter)\.(com|be)\/((watch\?v=([-\w]+))|(video\/([-\w]+))|(projects\/([-\w]+)\/([-\w]+))|([-\w]+))/;
    var match = url.match(regExp);
    if (match)
      return true;
    else
      return false;
  }
  updateStoratge
   loadVideo = (newUrl, isold=false) =>{
    if (newUrl != null && newUrl != undefined && newUrl !='' && this.validateUrl(newUrl)) {
      if (!isold)
      {
        this.setState({
          history: [...this.state.history,{ "url": newUrl,"time": this.CurrentDate()}],
          },function () {
             localStorage.setItem("localhistory", JSON.stringify(this.state.history));
          }
          );
        console.log('updated 2'); 
      }
      var inputValue = newUrl;
      if (inputValue.indexOf('youtube') >0){
         this.setState({videoUrl :"https://www.youtube.com/embed/"+ this.getYouTubeVideoId(inputValue)});
      }
      else {
        this.setState({videoUrl : inputValue});
      }
    }
    else console.log('Failed');
   }
    NewVideo = (newUrl) => {
      if (!this.state.history.some(u => u.url === newUrl ))
          this.loadVideo(newUrl);
      else console.log('Old URl request');
    }

    OldVideo = (oldUrl) => {
      this.loadVideo(oldUrl,true);
    }
  render() {
    return (
      <div className="App">
        <JamilAppBar />
        <div>
          <VideoInput onVideoLoad={this.NewVideo} />
          { this.state.videoUrl != '' ?
            <div className="divBoxStyle">
              <iframe  id="videoFrame" title="JamilVideoPlayer" src={this.state.videoUrl} style={videoBoxStyle}></iframe>
            </div>
            :
            <div></div>
          }
          <ViewHistory onLoadOldVideo={this.OldVideo}  history={this.state.history}/>
        </div>
      </div>
    );
  }
}

export default App;
