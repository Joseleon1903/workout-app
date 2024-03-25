import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from './navigation'
import useCachedResources from './hooks/useCachedResources';

export default function App() {

  const isLoaded = useCachedResources();

  console.log('isLoaded '+isLoaded);

  if(isLoaded){

    return (
      <>
        <Navigation />
        <StatusBar style="auto" />
      </>
    );

  }else{
    return null;
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
