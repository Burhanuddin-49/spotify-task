"use client";

import React, { useState, useMemo } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./forYou.css";

function ForYou({ songs, selected, setSelected }) {
  const [searchText, setSearchText] = useState("");
  const { data, isError, isLoading } = songs;
  const topTrack = useMemo(() => {
    return data?.data?.filter((song) => song.top_track === true);
  }, [data]);
  const filteredSongs = useMemo(() => {
    if (!topTrack) return [];

    return topTrack?.filter(
      (song) =>
        song.name.toLowerCase().includes(searchText?.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchText?.toLowerCase())
    );
  }, [topTrack, searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCardClick = (song) => {
    setSelected(song);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading songs...</p>
      ) : isError ? (
        <p>Error fetching songs</p>
      ) : (
        <>
          <Box p={1}>
            <TextField
              label="Search Songs, Artist"
              fullWidth
              value={searchText}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchChange}>
                      <SearchIcon sx={{ color: "white", opacity: "60%" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
                  borderRadius: "8px",
                  background: "#FFFFFF14",
                },
                "& .MuiInputLabel-root": { color: "white", opacity: "60%" },
              }}
            />
          </Box>
          <Box
            className="fade-in"
            sx={{
              overflowY: "auto",
              height: "76vh",
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              scrollbarWidth: "none" /* Firefox */,
              "-ms-overflow-style": "none" /* IE and Edge */,
            }}
          >
            {filteredSongs?.map((song) => (
              <Card
                key={song.id}
                variant="outlined"
                onClick={() => handleCardClick(song)}
                sx={{
                  border: "none",
                  borderRadius: "1rem",
                  backgroundColor:
                    selected?.id === song.id ? "#FFFFFF14" : "transparent",
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#FFFFFF14",
                  },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={`https://cms.samespace.com/assets/${song.cover}`}
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box ml={2}>
                    <Typography
                      fontSize="18px"
                      fontWeight={400}
                      variant="h6"
                      component="div"
                    >
                      {song.name}
                    </Typography>
                    <Typography
                      fontSize="14px"
                      fontWeight={400}
                      sx={{ opacity: "60%" }}
                    >
                      {song.artist}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </div>
  );
}

export default ForYou;
