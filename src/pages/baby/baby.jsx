import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRecordingsByBaby } from "../../redux/recordings/recordingActions";
import BabyAnalysisChart from "./chart";
import Sidebar from "../../components/sidebar";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./baby.css";

const BabyAnalysis = () => {
  const { babyId } = useParams();
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { recordings, loading, error } = useSelector(
    (state) => state.recordings
  );
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    dispatch(fetchRecordingsByBaby(babyId));
  }, [babyId, dispatch]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!recordings || recordings.length === 0) {
    return <div className="no-recordings">No recordings found.</div>;
  }

  return (
    <div>
      <Sidebar open={drawerOpen} onClose={toggleDrawer} />
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        className="menu-button"
      >
        <MenuIcon />
      </IconButton>
      <div className="baby-analysis-container">
        {!loading && recordings.length > 0 && (
          <BabyAnalysisChart recordings={recordings} />
        )}
      </div>
    </div>
  );
};

export default BabyAnalysis;
