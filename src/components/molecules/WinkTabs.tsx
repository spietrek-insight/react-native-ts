import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const primaryColor = '#1DB3B3'

type TabPanelProps = {
  title: string
  children: React.ReactNode
}

type TabsProps = {
  children: React.ReactElement[]
}

export const WinkTabPanel = ({ children }: TabPanelProps) => {
  return <View>{children}</View>
}

export const WinkTabs = ({ children }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const indicatorPosition = useSharedValue(0)
  const TAB_WIDTH = 120

  const handlePress = (index: number) => {
    setActiveIndex(index)
    indicatorPosition.value = withTiming(index * TAB_WIDTH, { duration: 250 }) // Animate to new position
  }

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {children.map((child, index) => (
          <TouchableOpacity
            testID="TabButton"
            key={index}
            style={styles.tab}
            onPress={() => handlePress(index)}
            activeOpacity={0.7}
          >
            <Text
              style={
                activeIndex === index ? styles.activeTabText : styles.tabText
              }
            >
              {child.props.title}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[styles.activeIndicator, animatedIndicatorStyle]}
        />
      </View>
      <View style={styles.tabContent}>
        {children[activeIndex].props.children}
      </View>
    </View>
  )

  // return (
  //   <View style={styles.container} id="Tabs" testID="Tabs">
  //     <View style={styles.tabs}>
  //       {children.map((child, index) => (
  //         <TouchableOpacity
  //           key={index}
  //           style={[styles.tab, { width: `${tabWidth}%` }]}
  //           onPress={() => handleTabPress(index)}
  //         >
  //           <Text style={styles.tabTitle}>{child.props.title}</Text>
  //         </TouchableOpacity>
  //       ))}
  //       <Animated.View style={[styles.tabIndicator, tabIndicatorStyle]} />
  //     </View>
  //     <View style={styles.tabContent}>
  //       {children[activeTab].props.children}
  //     </View>
  //   </View>
  // )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  tab: {
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  tabText: {
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    fontSize: 15,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: primaryColor,
    textAlign: 'center',
    fontSize: 15,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: 120,
    backgroundColor: primaryColor,
  },
  tabContent: {
    flex: 1,
    width: '100%',
  },
})
