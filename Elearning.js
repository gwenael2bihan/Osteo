import React, {useState, useEffect} from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));


const videos = [
    {
        title: "Donald Trump",
        artist: "Mac Miller",
        url: "https://www.youtube.com/watch?v=74TFS8r_SMI"
    },
    {
        title: "Around the world",
        artist: "Daft Punk",
        url: "https://www.youtube.com/watch?v=dwDns8x3Jb4"
    }

]
const Elearning = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [videoFilePath, setVideoFilePath] = useState(null);


    const handleVideoUpload = (event) => {
        // console.log(event.target.id);
        if (event.target.id)
            setVideoFilePath(videos[event.target.id].url);
    };

    useEffect(() => {
        setVideoFilePath(videos[0].url);
    }, []);

    return (
        <div>
            <ReactPlayer url={videoFilePath} width="100%" height="100%" controls={true} />

            {videos.map((video, i) =>
                <Card className={classes.root} key={i} id={i}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                {video.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {video.artist}
                            </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                            <IconButton aria-label="previous">
                                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                            </IconButton>
                            <IconButton aria-label="play/pause" onClick={handleVideoUpload} id={i} name={video.url}>
                                <PlayArrowIcon className={classes.playIcon} id={i} name={video.url}/>

                            </IconButton>
                            <IconButton aria-label="next">
                                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                            </IconButton>
                        </div>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image="/static/images/cards/live-from-space.jpg"
                        title="Live from space album cover"
                    />
                </Card>
            )}
        </div>
    )
}

export default Elearning
