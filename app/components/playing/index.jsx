import React, { useRef, useEffect, useState } from "react";
import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  ArrowBack,
  FastForward,
  FastRewind,
  MoreHoriz,
} from "@mui/icons-material";
import "./playing.css";

function Playing({ songs, selected, setSelected }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef.current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100; // Set initial volume based on state
  }, [volume]);

  useEffect(() => {
    setIsPlaying(false);
  }, [selected]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeekChange = (event, newValue) => {
    const audio = audioRef.current;
    const duration = audio.duration;
    audio.currentTime = (newValue / 100) * duration;
    setProgress(newValue);
  };

  if (!selected) {
    return <Typography>Select to play</Typography>;
  }

  const handlePreviousClick = () => {
    const newIndex = selected.id - 1;
    if (newIndex >= 0) {
      setSelected(songs?.data?.data[newIndex]);
    }
  };

  const handleNextClick = () => {
    const newIndex = selected.id + 1;
    if (newIndex < songs?.data?.data.length) {
      setSelected(songs?.data?.data[newIndex]);
    }
  };

  return (
    <Stack spacing={2} alignItems="center" className="fade-in">
      <Box width="100%">
        <IconButton
          sx={{
            backgroundColor: "#FFFFFF1A",
            borderRadius: "50%",
            mb: "1rem",
            ml: "-8px",
          }}
          onClick={() => setSelected(null)}
        >
          <ArrowBack sx={{ color: "white" }} />
        </IconButton>
        <Typography textAlign="start" variant="h5" fontWeight={700} mb={1}>
          {selected.name}
        </Typography>
        <Typography
          textAlign="start"
          variant="subtitle1"
          sx={{
            color: "white",
            opacity: 0.6,
          }}
        >
          {selected.artist}
        </Typography>
      </Box>
      <Image
        src={`https://cms.samespace.com/assets/${selected.cover}`}
        alt={selected.name}
        width={480}
        height={400}
        className="cover-image"
      />
      <audio ref={audioRef} src={selected.url} />
      <Slider
        value={progress}
        onChange={handleSeekChange}
        aria-labelledby="progress-slider"
        sx={{ color: "white", width: { xs: 300, sm: 480 } }}
      />
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton sx={{ backgroundColor: "#FFFFFF1A", borderRadius: "50%" }}>
          <MoreHoriz sx={{ color: "white" }} />
        </IconButton>
        <Stack direction="row">
          <IconButton onClick={handlePreviousClick}>
            <FastRewind sx={{ color: "white", opacity: 0.6 }} />
          </IconButton>
          <IconButton
            onClick={handlePlayPause}
            sx={{ backgroundColor: "#FFFFFF1A", borderRadius: "50%" }}
          >
            {isPlaying ? (
              <PauseIcon sx={{ color: "white" }} />
            ) : (
              <PlayArrowIcon sx={{ color: "white" }} />
            )}
          </IconButton>
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton onClick={handleNextClick}>
              <FastForward sx={{ color: "white", opacity: 0.6 }} />
            </IconButton>
          </Box>
        </Stack>
        <IconButton
          onClick={() => setVolume(volume === 0 ? 100 : 0)}
          sx={{ backgroundColor: "#FFFFFF1A", borderRadius: "50%" }}
        >
          {volume === 0 ? (
            <VolumeOffIcon sx={{ color: "white" }} />
          ) : (
            <VolumeUpIcon sx={{ color: "white" }} />
          )}
        </IconButton>
      </Box>
    </Stack>
  );
}

export default Playing;
