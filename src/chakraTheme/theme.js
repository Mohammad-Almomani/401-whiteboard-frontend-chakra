import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
        primary: {
          100: '#CFF5E7',
          200: '#A0E4CB',
          300: '#59C1BD',
          400: '#0D4C92'
        },
        secondary: {
            100: '#DC3535',
            200: '#8D9EFF',
            300: '#54B435',
        }
    },
    fonts: {
        heading: "Roboto",
    },
    fontWeights: {
        normal: 400,
        medium: 500,
        bold: 700,
    },
    fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
    },
    lineHeights: {
        normal: "normal",
        none: 1,
        shorter: 1.25,
        short: 1.375,
        base: 1.5,
        tall: 1.625,
        taller: "2",
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: "bold",
                color: "white",
                borderRadius: "md",
                _focus: {
                    boxShadow: "outline",
                },  
            },
            variants: {
                primary: {
                    bg: "primary.400",
                    color: "white",
                    _hover: {
                        bg: "primary.300",
                    },
                },
                secondary: {
                    bg: "white",
                    color: "primary.400",
                    border: "1px solid",
                    borderColor: "primary.400",
                    _hover: {
                        bg: "primary.100",
                    },
                },
            },
        },
    },
});
