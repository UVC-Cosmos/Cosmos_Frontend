import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityComponent: React.FC = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: '/build/Build.loader.js',
    dataUrl: '/build/Build.data.br',
    frameworkUrl: '/build/Build.framework.js.br',
    codeUrl: '/build/Build.wasm.br'
  });

  return <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%' }} />;
};

export default UnityComponent;
