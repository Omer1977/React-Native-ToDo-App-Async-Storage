import {useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import {setItem} from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('Home');
    setItem('onboarded', '1');
  };

  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        pages={[
          {
            backgroundColor: '#CEEDC7',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assets/animations/Animation - 1728944776520.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Boost Your Productivity',
            subtitle: 'Join our Udemig courses to enhance your skills!',
          },
          {
            backgroundColor: '#FFF6BD',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assets/animations/Animation - 1728944716744.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Work Without Interruptions',
            subtitle:
              'Complete your tasks smoothly with our productivity tips.',
          },
          {
            backgroundColor: '#FFD4B2',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assets/animations/Animation - 1728944556503.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Reach Higher Goals',
            subtitle:
              'Utilize our platform to achieve your professional aspirations.',
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    //borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: '#A67B5B',
  },
});
