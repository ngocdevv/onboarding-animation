import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardCarousel } from '../components/card-carousel';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.35;
const CARD_HEIGHT = CARD_WIDTH * 1.3;

export const OnboardingScreen = () => {
    const { bottom, top } = useSafeAreaInsets();

    const text1 = "See what your"
    const text2 = "friends"
    const text3 = "want"

    const coordinates1 = [
        [
            {
                x: -80,
                y: 40
            },
            {
                x: -60,
                y: 200
            },
            {
                x: 100,
                y: 220
            },
        ],
        [
            {
                x: -120,
                y: -40
            },
            {
                x: 140,
                y: 140
            },
            {
                x: 170,
                y: 170
            },
            {
                x: 190,
                y: 190
            }
        ],
        [
            {
                x: 120,
                y: 160
            },
            {
                x: 160,
                y: 220
            },
            {
                x: -80,
                y: 180
            },
            {
                x: 150,
                y: 240
            },]

    ]
    const coordinates2 = [
        {
            x: -80,
            y: 40
        },
        {
            x: -60,
            y: 200
        },
        {
            x: 100,
            y: 220
        },
        {
            x: -120,
            y: -40
        },
        {
            x: 140,
            y: 140
        },
        {
            x: 170,
            y: 170
        },
        {
            x: 190,
            y: 190
        },
    ]
    const coordinates3 = [
        {
            x: 120,
            y: 160
        },
        {
            x: 160,
            y: 220
        },
        {
            x: -80,
            y: 180
        },
        {
            x: 150,
            y: 240
        },
    ]
    const coordinates4 = [
        {
            x: -60,
            y: 120
        },
        {
            x: 100,
            y: 140
        },
        {
            x: 200,
            y: 140
        },
    ]

    const avatars = [
        require('@/assets/images/avatar.jpg'),
        require('@/assets/images/avatar.jpg'),
        require('@/assets/images/avatar.jpg'),
    ];

    return (
        <LinearGradient
            colors={['#e0d4f2ff', '#FFFFFF', '#E8F5E9']}
            locations={[0, 0.55, 1]}
            style={[styles.container, { paddingBottom: bottom + 8, paddingTop: top + 20 }]}
        >
            <Animated.View entering={FadeInDown.duration(800).springify()}>
                <Text style={styles.headerTitle}>GIFTER</Text>
            </Animated.View>

            <Animated.View style={[styles.contentContainer, {
                animationName: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                animationDuration: '800ms',
                animationTimingFunction: "ease-in-out",
            }]}>
                <View style={{ alignItems: 'center' }}>
                    <Animated.View style={[styles.rowCenter, { columnGap: 4 }]}>
                        {text1.split(" ").map((word, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {word.split("").map((char, charIndex) => (
                                    <Animated.Text
                                        key={charIndex}
                                        style={[styles.title, {
                                            animationName: {
                                                from: { transform: [{ translateY: coordinates1[index][charIndex].y }, { translateX: coordinates1[index][charIndex].x }, { scale: 3 }] },
                                                to: { transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }] },
                                            },
                                            animationDuration: '800ms',
                                            animationTimingFunction: "ease-in-out",
                                            animationFillMode: 'forwards',
                                        }]}
                                    >
                                        {char}
                                    </Animated.Text>
                                ))}
                            </View>
                        ))}
                    </Animated.View>
                    <Animated.View
                        style={styles.rowCenter}
                    >
                        {text2.split("").map((char, charIndex) => (
                            <Animated.Text
                                key={charIndex}
                                style={[styles.title, {
                                    animationName: {
                                        from: { transform: [{ translateY: coordinates2[charIndex].y }, { translateX: coordinates2[charIndex].x }, { scale: 3 }] },
                                        to: { transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }] },
                                    },
                                    animationDuration: '800ms',
                                    animationTimingFunction: "ease-in-out",
                                    animationFillMode: 'forwards',
                                }]}
                            >
                                {char}
                            </Animated.Text>
                        ))}
                        <Animated.View style={{ flexDirection: 'row', alignItems: "center", marginHorizontal: 2 }}>
                            {avatars.map((avatar, index) => (
                                <Animated.Image
                                    key={index}
                                    source={avatar}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: 16,
                                        marginLeft: index === 0 ? 0 : -10,
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        animationName: {
                                            from: { transform: [{ translateY: coordinates4[index].y }, { translateX: coordinates4[index].x }, { scale: 3 }] },
                                            to: { transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }] },
                                        },
                                        animationDuration: '800ms',
                                        animationTimingFunction: "ease-in-out",
                                        animationFillMode: 'forwards',

                                    }}
                                    resizeMode="cover"
                                />
                            ))}
                        </Animated.View>
                        {text3.split("").map((char, charIndex) => (
                            <Animated.Text
                                key={charIndex}
                                style={[styles.title, {
                                    animationName: {
                                        from: { transform: [{ translateY: coordinates3[charIndex].y }, { translateX: coordinates3[charIndex].x }, { scale: 3 }] },
                                        to: { transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }] },
                                    },
                                    animationDuration: '800ms',
                                    animationTimingFunction: "ease-in-out",
                                    animationFillMode: 'forwards',
                                }]}
                            >
                                {char}
                            </Animated.Text>
                        ))}
                    </Animated.View>
                    <Animated.View>
                        <Animated.Text style={[styles.subtitle, {
                            animationName: {
                                from: { transform: [{ translateY: 200 }, { translateX: 0 }, { scale: 2 }] },
                                to: { transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }] },
                            },
                            animationDuration: '800ms',
                            animationTimingFunction: "ease-in-out",
                        }]}>
                            Your friends' wish lists are waiting{'\n'}— sneak a look and spread the joy!
                        </Animated.Text>
                    </Animated.View>
                </View>

                <CardCarousel />
            </Animated.View>

            {/* Bottom Buttons */}
            <Animated.View
                style={[styles.buttonContainer, {
                    animationName: {
                        from: { transform: [{ translateY: 100 }, { translateX: 0 }, { scale: 1 }] },
                        to: { transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }] },
                    },
                    animationDuration: '600ms',
                    animationTimingFunction: "ease-in-out",
                }]}
            >
                <TouchableOpacity style={styles.buttonSecondary}>
                    <Text style={styles.buttonSecondaryText}>Find Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrimary}>
                    <Text style={styles.buttonPrimaryText}>Create an account</Text>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowCenter: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerTitle: {
        fontFamily: 'CaveatBrush-Regular',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontFamily: 'Piepia W01 Regular',
        fontSize: 28,
        color: '#002434',
        textAlign: 'center',
        lineHeight: 36,
    },
    emoji: {
        fontSize: 32,
    },
    subtitle: {
        fontSize: 14,
        color: '#002434',
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 12,
    },
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: CARD_HEIGHT + 40,
        width: width,
        marginVertical: 20,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    cardLeft: {
        position: 'absolute',
        left: -20,
        zIndex: 1,
    },
    cardCenter: {
        zIndex: 3,
        borderWidth: 4,
        borderColor: '#fff',
    },
    cardRight: {
        position: 'absolute',
        right: width * 0.25,
        zIndex: 2,
        backgroundColor: '#f8f8f8',
    },
    cardRightmost: {
        position: 'absolute',
        right: -20,
        zIndex: 1,
        backgroundColor: '#e8d7ff',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    giftCardContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    giftCardTitle: {
        fontFamily: 'CooperFiveOpti-Black',
        fontSize: 18,
        color: '#1a1a2e',
        lineHeight: 24,
    },
    giftCardImages: {
        flexDirection: 'row',
        gap: 8,
    },
    smallAvatar: {
        width: 50,
        height: 50,
        borderRadius: 12,
    },
    createCardContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    createCardTitle: {
        fontFamily: 'CooperFiveOpti-Black',
        fontSize: 16,
        color: '#6b4ce6',
        lineHeight: 22,
    },
    buttonContainer: {
        paddingHorizontal: 32,
        gap: 8,
    },
    buttonSecondary: {
        backgroundColor: '#fff',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonSecondaryText: {
        fontSize: 14,
        color: '#1a1a2e',
        fontWeight: '600',
    },
    buttonPrimary: {
        backgroundColor: '#02B7FE',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    buttonInnerGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    buttonPrimaryText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
});