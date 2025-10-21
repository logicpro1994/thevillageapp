export const theme = {
  colors: {
    primary: '#E8755E', // Coral/salmon color from the interface
    primaryDark: '#D66650',
    secondary: '#00C26F', // Original green as secondary
    secondaryDark: '#00AC62',
    
    background: '#FFFFFF',
    backgroundGray: '#F8F8F8',
    
    dark: '#3E3E3E',
    darkLight: '#E1E1E1',
    gray: '#E3E3E3',
    
    text: '#494949',
    textLight: '#7C7C7C',
    textDark: '#1D1D1D',
    
    // Status colors
    active: '#E8755E', // Coral for active status
    rose: '#EF4444',
    roseLight: '#F87171',
    
    // Avatar colors (from the screenshot)
    avatar: {
      pink: '#E8A5D4',
      blue: '#6B9BD1',
      purple: '#9B8FD8',
      orange: '#E8755E',
      teal: '#5DBFB3',
      yellow: '#F5D86F',
    },
    
    // Icon colors
    iconGray: '#9E9E9E',
    iconActive: '#E8755E',
  },
  
  fonts: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  fontSizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
  },
  
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    round: 9999, // For circular elements
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};