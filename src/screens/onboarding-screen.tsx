import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.35;
const CARD_HEIGHT = CARD_WIDTH * 1.3;

export const OnboardingScreen = () => {
    const { bottom, top } = useSafeAreaInsets();

    const text1 = "See what your"
    const text2 = "friends"
    const text3 = "want"

    const avatars = [
        require('@/assets/images/avatar.jpg'),
        require('@/assets/images/avatar.jpg'),
        require('@/assets/images/avatar.jpg'),
    ];

    return (
        <LinearGradient
            colors={['#e0d4f2ff', '#FFFFFF', '#E8F5E9']}
            locations={[0, 0.55, 1]}
            style={[styles.container, { paddingBottom: bottom + 20, paddingTop: top + 20 }]}
        >
            <Animated.View entering={FadeInDown.delay(100).springify()}>
                <Text style={styles.headerTitle}>GIFTER</Text>
            </Animated.View>

            <View style={styles.contentContainer}>
                <Animated.View style={[styles.rowCenter, {columnGap: 4}]}>
                    {text1.split(" ").map((word, index) => (
                        <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                            {word.split("").map((char, charIndex) => (
                                <Animated.Text
                                    key={charIndex}
                                    style={styles.title}
                                >
                                    {char}
                                </Animated.Text>
                            ))}
                        </View>
                    ))}
                </Animated.View>
                <Animated.View
                    style={{
                        flexDirection: "row",
                        alignItems: 'center',
                    }}
                >
                    <Animated.Text style={styles.title}>
                        {text2}
                    </Animated.Text>
                    <Animated.View style={{flexDirection: 'row', alignItems: "center", marginHorizontal: 2}}>
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
                                }}
                                resizeMode="cover"
                            />
                        ))}
                    </Animated.View>
                    <Animated.Text style={styles.title}>
                        {text3}
                    </Animated.Text>
                </Animated.View>
                <Animated.View>
                    <Text style={styles.subtitle}>
                        Your friends' wish lists are waiting{'\n'}— sneak a look and spread the joy!
                    </Text>
                </Animated.View>

                {/* Cards Carousel */}
                <Animated.View
                    style={styles.carouselContainer}
                    entering={FadeInUp.delay(400).springify()}
                >
                    {/* Left Card (Partial) */}
                    <View style={[styles.card, styles.cardLeft, { transform: [{ scale: 0.85 }] }]}>
                        <Image
                            source={require('@/assets/images/avatar.jpg')}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Center Card */}
                    <View style={[styles.card, styles.cardCenter]}>
                        <Image
                            source={require('@/assets/images/avatar.jpg')}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Right Card */}
                    <View style={[styles.card, styles.cardRight, { transform: [{ scale: 0.9 }] }]}>
                        <View style={styles.giftCardContent}>
                            <Text style={styles.giftCardTitle}>Gift your{'\n'}Friends</Text>
                            <View style={styles.giftCardImages}>
                                <Image
                                    source={require('@/assets/images/avatar.jpg')}
                                    style={styles.smallAvatar}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Rightmost Card (Partial) */}
                    <View style={[styles.card, styles.cardRightmost, { transform: [{ scale: 0.85 }] }]}>
                        <View
                            style={styles.createCardContent}>
                            <Text style={styles.createCardTitle}>Create{'\n'}your list</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>

            {/* Bottom Buttons */}
            <Animated.View
                style={styles.buttonContainer}
                entering={FadeInUp.delay(600).springify()}
            >
                <TouchableOpacity style={styles.buttonSecondary}>
                    <Text style={styles.buttonSecondaryText}>Find Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrimary}>
                    <Text style={styles.buttonPrimaryText}>Create an account</Text>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowCenter: {
        justifyContent: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontFamily: 'Piepia W01 Regular',
        fontSize: 32,
        color: '#002434',
        textAlign: 'center',
        lineHeight: 36,
    },
    emoji: {
        fontSize: 32,
    },
    subtitle: {
        fontSize: 15,
        color: '#002434',
        textAlign: 'center',
        fontWeight: '500',
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