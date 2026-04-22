import { TextStyle } from 'react-native';
import { Colors, FontSize, LineHeight } from './tokens';

export const FontFamily = {
  quran:   'KFGQPCUthmanicScriptHAFS',
  amiri:   'Amiri_400Regular',
  heading: 'CormorantGaramond_600SemiBold',
  body:    'Inter_400Regular',
  bodyMed: 'Inter_500Medium',
  bodySB:  'Inter_600SemiBold',
} as const;

/** Canonical gatekeeper — ALL Quranic Arabic text must use this. */
export function sacredTextStyle(fontSizeOffset = 0): TextStyle {
  return {
    fontFamily:       FontFamily.quran,
    fontSize:         FontSize.quranBody + fontSizeOffset,
    lineHeight:       (FontSize.quranBody + fontSizeOffset) * 1.85,
    writingDirection: 'rtl',
    textAlign:        'right',
    color:            Colors.ink,
    allowFontScaling: false,
  };
}

export const TextStyles = {
  arabicUI: {
    fontFamily:       FontFamily.amiri,
    fontSize:         FontSize.arabicUI,
    lineHeight:       LineHeight.arabic,
    writingDirection: 'rtl' as const,
    textAlign:        'right' as const,
    allowFontScaling: false,
  } as TextStyle,

  heading1: {
    fontFamily: FontFamily.heading,
    fontSize:   FontSize.heading1,
    lineHeight: LineHeight.heading,
    color:      Colors.ink,
  } as TextStyle,

  heading2: {
    fontFamily: FontFamily.heading,
    fontSize:   FontSize.heading2,
    lineHeight: 32,
    color:      Colors.ink,
  } as TextStyle,

  heading3: {
    fontFamily: FontFamily.heading,
    fontSize:   FontSize.heading3,
    lineHeight: 28,
    color:      Colors.ink,
  } as TextStyle,

  body: {
    fontFamily: FontFamily.body,
    fontSize:   FontSize.body,
    lineHeight: LineHeight.body,
    color:      Colors.ink,
  } as TextStyle,

  bodyMedium: {
    fontFamily: FontFamily.bodyMed,
    fontSize:   FontSize.body,
    lineHeight: LineHeight.body,
    color:      Colors.ink,
  } as TextStyle,

  caption: {
    fontFamily: FontFamily.body,
    fontSize:   FontSize.caption,
    lineHeight: LineHeight.caption,
    color:      Colors.inkMuted,
  } as TextStyle,
};
