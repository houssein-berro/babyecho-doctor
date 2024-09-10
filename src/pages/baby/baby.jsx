import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecordingsByBaby } from '../../redux/recordings/recordingActions';
import BabyAnalysisChart from './chart';
import './baby.css';
const BabyAnalysis = () => {
    const { babyId } = useParams(); 
    const dispatch = useDispatch();
  
    const { recordings, loading, error } = useSelector((state) => state.recordings);
  
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
      <div className="baby-analysis-container">
        {!loading && recordings.length > 0 && <BabyAnalysisChart recordings={recordings} />}
      </div>
    );
  };
  
  export default BabyAnalysis;