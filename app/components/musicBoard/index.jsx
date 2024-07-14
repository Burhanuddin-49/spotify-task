import {
  Avatar,
  Box,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import MusicList from "../musicList";
import Playing from "../playing";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

function MusicBoard() {
  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
        minHeight: "100vh",
        background: `linear-gradient(108.18deg, ${
          selected?.accent || "#201606"
        } 2.46%, #000000 99.84%)`,
        color: "white",
      }}
    >
      <Grid
        direction={{ xs: "column", sm: "row" }}
        container
        minHeight="100vh"
        p={4}
        spacing={2}
      >
        <Grid item xs={2} sm={2} md={2}>
          <Stack
            direction={{ xs: "row", sm: "column" }}
            height="100%"
            justifyContent="space-between"
          >
            <Box onClick={() => setSelected(null)}>
              <Image src="/logo.png" width={133} height={40} alt="" />
            </Box>
            <Avatar alt="Remy Sharp" src="/profile.jpg" />
          </Stack>
        </Grid>
        {(!selected || !isMobile) && (
          <Grid item xs={10} sm={5} md={4}>
            <MusicList
              songs={songs}
              selected={selected}
              setSelected={setSelected}
            />
          </Grid>
        )}
        {(selected || !isMobile) && (
          <Grid
            item
            xs={12}
            sm={9}
            md={6}
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
        )}
      </Grid>
    </Box>
  );
}

export default MusicBoard;
