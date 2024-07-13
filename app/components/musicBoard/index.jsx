import { Avatar, Box, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import MusicList from "../musicList";
import Playing from "../playing";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

function MusicBoard() {
  const [selected, setSelected] = useState(null);
  const fetchSongs = async () => {
    const response = await fetch("https://cms.samespace.com/items/songs");
    return response.json();
  };

  const songs = useQuery({
    queryKey: ["songs"],
    queryFn: fetchSongs,
  });
  return (
    <Box
      sx={{
        Height: "100vh",
        background: `linear-gradient(108.18deg, ${
          selected?.accent || "#201606"
        } 2.46%, #000000 99.84%)`,
        color: "white",
      }}
    >
      <Grid container minHeight="100vh" p={4} spacing={2}>
        <Grid item xs={2}>
          <Stack height="100%" justifyContent="space-between">
            <Image
              src="/logo.png"
              // Optimize the image for web before using it
              width={133}
              height={40}
              alt=""
              // Consider using objectFit: "cover" if the image is large enough
              // objectFit="contain"  // Uncomment if you prefer contain
              // objectFit="cover"
            />
            <Avatar alt="Remy Sharp" src="/profile.jpg" />
          </Stack>
        </Grid>
        <Grid item xs={10} sm={4}>
          <MusicList
            songs={songs}
            selected={selected}
            setSelected={setSelected}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Playing
            songs={songs}
            selected={selected}
            setSelected={setSelected}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MusicBoard;
