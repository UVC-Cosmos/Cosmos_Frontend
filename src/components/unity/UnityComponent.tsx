import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityComponent: React.FC = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: '/build/Build.loader.js',
    dataUrl: '/build/Build.data',
    frameworkUrl: '/build/Build.framework.js',
    codeUrl: '/build/Build.wasm'
  });

  return <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%' }} />;
};

export default UnityComponent;
