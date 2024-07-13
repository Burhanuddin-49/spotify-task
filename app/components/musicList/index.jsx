"use client";

import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ForYou from "./ForYou";
import TopTracks from "./TopTracks";
import { styled } from "@mui/system";

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  color: "white",
  opacity: 0.6,
  fontWeight: 700,
  fontSize: "larger",
  textTransform: "initial",
  "&.Mui-selected": {
    color: "white",
    opacity: 1,
    fontWeight: 700,
  },
}));

export default function MusicList({ songs, selected, setSelected }) {
  const [value, setValue] = useState("one");
  const components = {
    one: <ForYou songs={songs} selected={selected} setSelected={setSelected} />,
    two: (
      <TopTracks songs={songs} selected={selected} setSelected={setSelected} />
    ),
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        sx={{ mb: "1rem" }}
      >
        <StyledTab value="one" label="For You" />
        <StyledTab value="two" label="Top Tracks" />
      </StyledTabs>
      {components[value]}
    </Box>
  );
}
