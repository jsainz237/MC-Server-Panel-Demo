import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataViewer } from './components/DataViewer/index';
import { setViewMode } from './store/viewMode/actions';
import { RootState } from './store/rootReducer';
import './App.scss';

function App() {
  const viewMode = useSelector((state: RootState) => state.view.mode);
  const dispatch = useDispatch();

  return (
    <div>
      <header className="app-header">
        <h1>Server Panel</h1>
        <div className="toggle-container">
          <div onClick={() => dispatch(setViewMode("ALL"))} className={`data-toggle-button ${viewMode === "ALL" ? 'active' : null}`}>
                <span className='toggle-icon'><i className="fas fa-globe-europe"></i></span>View All
          </div>
          <div onClick={() => dispatch(setViewMode("SINGLE"))} className={`data-toggle-button ${viewMode === "SINGLE" ? 'active' : null}`}>
              <span className='toggle-icon'><i className="fas fa-sticky-note"></i></span>Node Details
          </div>
        </div>
      </header>
      <DataViewer />
    </div>
  );
}

export default App;
