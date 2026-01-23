// import React, { createContext, useState, useContext } from 'react';

// const VideoContext = createContext();

// export const VideoProvider = ({ children }) => {
//   const [loading, setLoading] = useState(false);

//   const showLoader = () => setLoading(true);
//   const hideLoader = () => setLoading(false);

//   return (
//     <VideoContext.Provider value={{ loading, showLoader, hideLoader }}>
//       {children}
//     </VideoContext.Provider>
//   );
// };

// export const useVideo = () => useContext(VideoContext);


import React, { createContext, useState, useContext } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        setCurrentVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};