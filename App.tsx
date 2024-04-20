import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from 'react-native';
import Navigation from './navigation'
import useCachedResources from './hooks/useCachedResources';

export default function App() {

  const isLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  console.log('isLoaded '+isLoaded);
  console.log('theme: '+colorScheme);


  if(isLoaded){

    return (
      <>
        <Navigation colorScheme={colorScheme} />
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
