import React from 'react';

const FullScreenPrompt = ({ requestFullScreen }) => {
  return (
    <div className="fullscreen-prompt">
      <p>Please enable full screen to take the quiz.</p>
      <button onClick={requestFullScreen}>Enable Full Screen</button>
    </div>
  );
};

export default FullScreenPrompt;
